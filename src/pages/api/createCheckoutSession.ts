import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(request: NextApiRequest, response: NextApiResponse){
  if(request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.'});
  }

  const { priceId } = request.body;
  if(!priceId) {
    return response.status(400).json({ error: 'Price not provided.' })
  }

  // Urls to be used by Stripe for success and cancel operations
  const successURL = `${process.env.NEXT_APP_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelURL = `${process.env.NEXT_APP_DOMAIN}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successURL,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  });

  return response.status(201).json({
    checkoutURL: checkoutSession.url
  });
}
