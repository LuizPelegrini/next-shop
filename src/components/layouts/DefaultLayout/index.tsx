import Link from "next/link";
import Image from 'next/image';
import { ReactNode } from "react";

import logoImg from '../../../assets/logo.svg';

import * as Dialog from '@radix-ui/react-dialog';

import { Container, Header } from "./styles";
import { CartProvider } from "../../../contexts/CartContext";
import ButtonCart from "../../ButtonCart";
import { CartSummaryModal } from "../../CartSummaryModal";


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

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <ButtonCart />
            </Dialog.Trigger>
            <CartSummaryModal />
          </Dialog.Root>

        </Header>
        {children}
      </Container>
    </CartProvider>
  );
}
