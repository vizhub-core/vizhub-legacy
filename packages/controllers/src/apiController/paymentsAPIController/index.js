import { resolve } from 'path';
import { UpgradeUser } from 'vizhub-use-cases';
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import { userIdFromReq } from '../../userIdFromReq';

// This module handles all Stripe integration for subscriptions and payments.
//
// Draws from
// https://github.com/stripe-samples/checkout-single-subscription/tree/master/client-and-server
//
// Note: the following environment variables are required:
const stripe = Stripe(process.env.VIZHUB_STRIPE_SECRET_KEY);
const domainURL = process.env.VIZHUB_STRIPE_DOMAIN;
const endpointSecret = process.env.VIZHUB_STRIPE_WEBHOOK_SECRET;

export const paymentsAPIController = (expressApp, gateways) => {
  const upgradeUser = new UpgradeUser(gateways);

  expressApp.get('/api/payments/checkout-session', async (req, res) => {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  });

  expressApp.post('/api/payments/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;

    const userId = userIdFromReq(req);
    if (!userId) {
      res.json({
        error: {
          message: 'Cannot upgrade without being logged in first',
        },
      });
      return;
    }

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}/upgrade-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/upgrade-canceled`,
    });

    res.send({ sessionId: session.id });
  });

  // From https://stripe.com/docs/webhooks/signatures
  // Match the raw body to content type application/json
  expressApp.post('/webhook', (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret
      );
    } catch (err) {
      console.error(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const { client_reference_id, customer } = event.data.object;
        upgradeUser.execute({
          id: client_reference_id,
          stripeCustomerId: customer,
        });
        break;
      default:
        // Unexpected event type
        return response.status(400).end();
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  });
};
