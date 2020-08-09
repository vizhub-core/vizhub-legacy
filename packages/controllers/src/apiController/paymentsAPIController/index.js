import { resolve } from 'path';
import bodyParser from 'body-parser';
import Stripe from 'stripe';

// This module handles all Stripe integration for subscriptions and payments.
//
// Draws from
// https://github.com/stripe-samples/checkout-single-subscription/tree/master/client-and-server
//
// Note: the following environment variables are required:
const stripe = Stripe(process.env.VIZHUB_STRIPE_SECRET_KEY);
const domainURL = process.env.VIZHUB_STRIPE_DOMAIN;
const endpointSecret = process.env.VIZHUB_STRIPE_WEBHOOK_SECRET;

export const paymentsAPIController = (expressApp, paymentsGateway) => {
  expressApp.get('/api/payments/checkout-session', async (req, res) => {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  });

  expressApp.post('/api/payments/create-checkout-session', async (req, res) => {
    const { priceId } = req.body;

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
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

    console.log(event);

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('PaymentMethod was attached to a Customer!');
        break;
      // ... handle other event types
      default:
        // Unexpected event type
        return response.status(400).end();
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  });
};
