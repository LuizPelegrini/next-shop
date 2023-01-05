import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from 'next/image';
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, Container, ProductsImages } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    quantity: number;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <>
      <Head>
        <title>Purchase completed | Next Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <h1>Purchase completed!</h1>

        <ProductsImages>
          {products.map(product =>
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
              { product.quantity > 1 && <span>x{product.quantity}</span>}
            </ImageContainer>
          )}
        </ProductsImages>

        <p>
          Woohoo! <strong>{customerName}</strong>, your new <strong>{totalQuantity}</strong> T-Shirt(s) are on the way.
        </p>

        <Link href="/">
          Back to catalogue
        </Link>
      </Container>
    </>
  )
}

type StaticProps = {
  customerName: string | null;
  products: {
    id: string;
    imageUrl: string;
    quantity: number | null;
  }[];
}

export const getServerSideProps: GetServerSideProps<StaticProps> = async ({ query }) => {
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
  const products = session.line_items!.data.map(lineItem => {
    const product = lineItem.price!.product as Stripe.Product;

    return {
      id: product.id,
      imageUrl: product.images[0],
      quantity: lineItem.quantity,
    }
  });

  return {
    props: {
      customerName,
      products
    }
  };
};
