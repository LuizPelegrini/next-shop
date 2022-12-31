import Link from "next/link";
import Image from 'next/image';
import { ReactNode } from "react";

import logoImg from '../../../assets/logo.svg';

import { Container, Header } from "./styles";
import { CartProvider } from "../../../contexts/CartContext";
import { ButtonCart } from "../../ButtonCart";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <CartProvider>
      <Container>
        <Header>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>

          <ButtonCart />
        </Header>
        {children}
      </Container>
    </CartProvider>
  );
}
