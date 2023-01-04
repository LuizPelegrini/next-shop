import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import zod from 'zod';

const bodySchema = zod.object({
  priceId: zod.string(),
  quantity: zod.number().min(1)
}).array().nonempty();

type RequestBodyType = zod.infer<typeof bodySchema>;

export default async function handler(request: NextApiRequest, response: NextApiResponse){
  if(request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.'});
  }

  const { products } = request.body;
  if(!products) {
    return response.status(400).json({ error: 'Products not provided.' })
  }

  let productsInfo: RequestBodyType;
  try {
    productsInfo = bodySchema.parse(products);
  } catch (err: any) {
    if(err instanceof zod.ZodError){
      return response.status(400).json({ error: err.issues });
    }

    console.log(err.stack);
    return response.status(500).json({ error: 'Internal Server Error' });
  }

  // Urls to be used by Stripe for success and cancel operations
  const successURL = `${process.env.NEXT_APP_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelURL = `${process.env.NEXT_APP_DOMAIN}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successURL,
    cancel_url: cancelURL,
    mode: 'payment',
    line_items: productsInfo.map(info => ({
      price: info.priceId,
      quantity: info.quantity
    }))
  });

  return response.status(201).json({
    checkoutURL: checkoutSession.url
  });
}
