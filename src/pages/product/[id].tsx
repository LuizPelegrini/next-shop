import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { Container, ImageContainer, ProductDetails } from "../../styles/pages/product";


interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
}

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  return (
    <Container>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Buy</button>
      </ProductDetails>
    </Container>
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
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1, // revalidate cache every 1 hour
  }
}
