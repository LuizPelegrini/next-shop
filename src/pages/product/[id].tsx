import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { Container, ImageContainer, ProductDetails } from "../../styles/pages/product";


interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  priceId: string;
}

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleCreateCheckoutSession() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/createCheckoutSession', {
        priceId: product.priceId
      });

      const { checkoutURL } = response.data;

      // redirect user to Stripe checkout page
      window.location.href = checkoutURL;
    } catch (error: any) {
      // TODO: integrate with observability tool (Datadog / Sentry)
      alert('Failed on creating checkout session');
      console.log(error.stack);

      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Next Shop</title>
      </Head>

      <Container>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleCreateCheckoutSession}
          >
            Buy
          </button>
        </ProductDetails>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await stripe.products.list();

  const paths = data.map(product => ({
    params: { id: product.id }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // If no params is provided, return 404
  if (!params) {
    return {
      notFound: true
    }
  }

  const productId = params.id;
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const priceInCents = product.default_price as Stripe.Price;
  const price = (priceInCents.unit_amount ?? 0) / 100;

  const formattedPrice = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);


  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formattedPrice,
        description: product.description,
        priceId: priceInCents.id
      }
    },
    revalidate: 60 * 60 * 1, // revalidate cache every 1 hour
  }
}
