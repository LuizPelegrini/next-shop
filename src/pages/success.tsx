import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from 'next/image';
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, Container, ProductsImages } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase completed | Next Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <h1>Purchase completed!</h1>

        <ProductsImages>
          <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt="" />
          </ImageContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt="" />
          </ImageContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt="" />
          </ImageContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={120} height={110} alt="" />
          </ImageContainer>
        </ProductsImages>

        <p>
          Woohoo! <strong>{customerName}</strong>, your T-shirt <strong>{product.name}</strong> is on its way.
        </p>

        <Link href="/">
          Back to catalogue
        </Link>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });


  const customerName = session.customer_details!.name;
  const product = session.line_items!.data[0].price?.product as Stripe.Product;


  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  };
};
