import { useRouter } from "next/router";
import { Container, ImageContainer, ProductDetails } from "../../styles/pages/product";

export default function Product() {
  const { query } = useRouter();

  return (
    <Container>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Tshirt X</h1>
        <span>$19.90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste beatae, laudantium, deleniti obcaecati sed pariatur quibusdam mollitia repellat consectetur tenetur minima necessitatibus dolore ipsa dolor dolorum eveniet temporibus veniam neque?</p>

        <button>Buy</button>
      </ProductDetails>
    </Container>
  );
}
