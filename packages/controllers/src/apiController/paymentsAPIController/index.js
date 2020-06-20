import { resolve } from 'path';
import Stripe from 'stripe';

// Note: the following environment variables are required:
//  * STRIPE_SECRET_KEY
//  * STRIPE_DOMAIN
//  * STRIPE_WEBHOOK_SECRET
//
const stripe = Stripe(process.env.VIZHUB_STRIPE_SECRET_KEY);
const domainURL = process.env.VIZHUB_STRIPE_DOMAIN;

console.log('domainURL');
console.log(domainURL);

//app.use(
//  express.json({
//    // We need the raw body to verify webhook signatures.
//    // Let's compute it only when hitting the Stripe webhook endpoint.
//    verify: function (req, res, buf) {
//      if (req.originalUrl.startsWith("/webhook")) {
//        req.rawBody = buf.toString();
//      }
//    },
//  })
//);

export const paymentsAPIController = (expressApp, paymentsGateway) => {
  //expressApp.get("payments/checkout-session", async (req, res) => {
  //  const { sessionId } = req.query;
  //  const session = await stripe.checkout.sessions.retrieve(sessionId);
  //  res.send(session);
  //});

  console.log('heeere');
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
      success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/canceled.html`,
    });

    res.send({ sessionId: session.id });
  });

  // Webhook handler for asynchronous events.
  expressApp.post('/webhook', async (req, res) => {
    let eventType;
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }

    if (eventType === 'checkout.session.completed') {
      console.log(`🔔  Payment received!`);
    }

    res.sendStatus(200);
  });
};
