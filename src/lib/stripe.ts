import Stripe from 'stripe';

if(!process.env.STRIPE_PRIVATE_KEY) {
  throw new Error("STRIPE_PRIVATE_KEY environment variable is not set");
}

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop'
  }
});
