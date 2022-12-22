import Image from 'next/image';

import { Container, Product } from '../styles/pages/home';

import tshirt1 from '../assets/tshirts/1.png';
import tshirt2 from '../assets/tshirts/2.png';
import tshirt3 from '../assets/tshirts/3.png';

export default function Home() {
  return (
    <Container>
      <Product>
        <Image src={tshirt1} width={520} height={480} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
      <Product>
        <Image src={tshirt2} width={520} height={520} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
      <Product>
        <Image src={tshirt3} width={520} height={520} alt=""/>
        <footer>
          <strong>T-Shirt X</strong>
          <span>$19.90</span>
        </footer>
      </Product>
    </Container>
  );
}
