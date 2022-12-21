import { styled } from '../styles';

const Button = styled('button', {
  backgroundColor: '$primary',
});

export default function Home() {
  return (
    <Button>Hello World</Button>
  );
}
