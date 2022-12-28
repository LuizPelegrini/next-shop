import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(request: NextApiRequest, response: NextApiResponse){
  const priceId = 'price_1MHkvpEZSTYQLJJm7MJRlwlz';

  const successURL = `${process.env.NEXT_APP_DOMAIN}/success`;
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
