// Draws from
// https://github.com/stripe-samples/checkout-single-subscription/tree/master/client-and-server

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const proPriceId = process.env.REACT_APP_STRIPE_PRO_PRICE_ID;

// Create a Checkout Session with the selected plan ID
const createCheckoutSession = async (priceId) =>
  await (
    await fetch('/payments/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    })
  ).json();

// Handle any errors returned from Checkout
const handleResult = (result) => {
  if (result.error) {
    console.error('Stripe error:');
    console.error(result.error);
  }
};

export const handleUpgradeClick = () => {
  const stripe = window.Stripe(publishableKey);
  createCheckoutSession(proPriceId).then(({ sessionId }) => {
    stripe.redirectToCheckout({ sessionId }).then(handleResult);
  });
};
