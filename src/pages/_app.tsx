import type { AppProps } from 'next/app'
import Image from 'next/image';

import { globalStyles } from '../styles/global'
import { Container, Header } from '../styles/pages/_app';

import logoImg from '../assets/logo.svg'

// adding global styles
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
