import Image from 'next/image';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe';

import { Container, Product } from '../styles/pages/home';

import 'keen-slider/keen-slider.min.css'
import Stripe from 'stripe';
import Head from 'next/head';
import { Handbag } from 'phosphor-react';
import { NextPageWithLayout } from './_app';
import { ReactElement, useContext } from 'react';
import { DefaultLayout } from '../components/layouts/DefaultLayout';
import { CartContext } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
}

interface HomeProps {
  products: Product[]
}

const Home: NextPageWithLayout<HomeProps> = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const [sliderRef] = useKeenSlider({
    slides: {
      spacing: 48,
      perView: 2
    }
  })

  function handleAddToCart (product: Product) {
    addToCart({
      id: product.id,
      name: product.name,
      price: 100,
      quantity: 1,
      priceId: product.priceId
    });
  }

  return (
    <>
      <Head>
        <title>Home | Next Shop</title>
      </Head>
      <Container ref={sliderRef} className="keen-slider">
        {products.map(product => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt=""/>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>${product.price}</span>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    handleAddToCart(product)}
                  }>
                  <Handbag weight="bold" size={32}/>
                </button>
              </footer>
            </Product>
          </Link>
        ))}
      </Container>

    </>
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
      priceId: priceInCents.id
    };
  });

  return {
    props: {
      products
    }
  }
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
}

export default Home;
