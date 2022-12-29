import Link from "next/link";
import Image from 'next/image';
import { ReactNode } from "react";
import { Handbag } from "phosphor-react";

import logoImg from '../../../assets/logo.svg';

import { ButtonCart, Container, Header } from "./styles";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Container>
      <Header>
         <Link href="/">
           <Image src={logoImg} alt="" />
         </Link>

         <ButtonCart type="button" state="full" style={{ content: '2'}} >
           <Handbag weight="bold" size={24}/>
         </ButtonCart>
       </Header>
      {children}
    </Container>
  );
}
