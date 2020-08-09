import { useState, useEffect } from 'react';

// Exposes a Stripe Checkout session.
// Draws from https://github.com/stripe-samples/checkout-single-subscription/blob/master/client-and-server/client/success.html#L60

export const useCheckoutSession = () => {
  const [checkoutSession, setCheckoutSession] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    const process = async () => {
      const result = await fetch('/checkout-session?sessionId=' + sessionId);
      setCheckoutSession(await result.json());
    };

    if (sessionId) {
      process();
    }
  }, []);

  return checkoutSession;
};
