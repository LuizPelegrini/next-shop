import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react'

import { Container, Product } from '../styles/pages/home';

import tshirt1 from '../assets/tshirts/1.png';
import tshirt2 from '../assets/tshirts/2.png';
import tshirt3 from '../assets/tshirts/3.png';

import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      spacing: 48,
      perView: 3
    }
  })

  return (
    <Container ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={tshirt1} width={520} height={480} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={tshirt2} width={520} height={520} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={tshirt3} width={520} height={520} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
      <Product className="keen-slider__slide">
        <Image src={tshirt3} width={520} height={520} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
    </Container>
  );
}
