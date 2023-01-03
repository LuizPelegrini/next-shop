import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement, useContext, useState } from "react";
import Stripe from "stripe";
import { DefaultLayout } from "../../components/layouts/DefaultLayout";
import { CartContext } from "../../contexts/CartContext";
import { stripe } from "../../lib/stripe";
import { Container, ImageContainer, ProductDetails } from "../../styles/pages/product";
import { formatPrice } from "../../utils/currency-formatter";
import { NextPageWithLayout } from "../_app";

interface ProductProps {
  product: Product;
}

const Product: NextPageWithLayout<ProductProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  // async function handleCreateCheckoutSession() {
  //   try {
  //     setIsCreatingCheckoutSession(true);

  //     const response = await axios.post('/api/createCheckoutSession', {
  //       priceId: product.priceId
  //     });

  //     const { checkoutURL } = response.data;

  //     // redirect user to Stripe checkout page
  //     window.location.href = checkoutURL;
  //   } catch (error: any) {
  //     // TODO: integrate with observability tool (Datadog / Sentry)
  //     alert('Failed on creating checkout session');
  //     console.log(error.stack);

  //     setIsCreatingCheckoutSession(false);
  //   }
  // }

  function handleAddProductToCart() {
    addToCart({
      ...product,
      quantity: 1
    });
  }

  const pageTitle = `${product.name} | Next Shop`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Container>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button
            onClick={handleAddProductToCart}
          >
            Add To Cart
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

type StaticProps = {
  product: Product;
}

export const getStaticProps: GetStaticProps<StaticProps, { id: string }> = async ({ params }) => {
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
  const price = priceInCents.unit_amount ?? 0;

  const formattedPrice = formatPrice(price);

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        formattedPrice,
        priceInCents: priceInCents.unit_amount ?? 0,
        description: product.description,
        priceId: priceInCents.id,
        quantity: 0
      }
    },
    revalidate: 60 * 60 * 1, // revalidate cache every 1 hour
  }
}

Product.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}

export default Product;
