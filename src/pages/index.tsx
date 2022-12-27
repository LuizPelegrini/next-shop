import Image from 'next/image';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe';

import { Container, Product } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      spacing: 48,
      perView: 3
    }
  })

  return (
    <Container ref={sliderRef} className="keen-slider">
      {products.map(product => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt=""/>
            <footer>
              <strong>{product.name}</strong>
              <span>${product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const priceInCents = product.default_price as Stripe.Price;
    const price = (priceInCents.unit_amount ?? 0) / 100;

    const formattedPrice = Intl.NumberFormat('en-US', {
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formattedPrice,
    };
  });

  return {
    props: {
      products
    }
  }
};
