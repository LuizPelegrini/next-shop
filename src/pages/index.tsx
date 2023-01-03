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
import { formatPrice } from '../utils/currency-formatter';

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
      ...product,
      quantity: 1
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
                  <span>{product.formattedPrice}</span>
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

type StaticProps = {
  products: Product[]
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map<Product>(product => {
    const priceInCents = product.default_price as Stripe.Price;
    const price = priceInCents.unit_amount ?? 0;

    const formattedPrice = formatPrice(price);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      formattedPrice,
      priceInCents: priceInCents.unit_amount ?? 0,
      priceId: priceInCents.id,
      quantity: 0
    };
  });

  return {
    props: {
      products
    },
  }
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
}

export default Home;
