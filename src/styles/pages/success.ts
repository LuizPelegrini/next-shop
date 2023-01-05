import { styled } from "..";

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
});

export const ImageContainer = styled('div', {
  width: 145,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',
  boxShadow: '0 0 50px 2px black',
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& + &': {
    marginLeft: '-3.2rem'
  },

  img: {
    objectFit: 'cover',
  },

  span: {
    padding: '0.1rem 0.5rem',
    fontWeight: 'bold',
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: '$green500',
    bottom: 0,
    transform: 'translateY(50%)',
  }
});

export const ProductsImages = styled('div', {
  marginTop: '4rem',

  display: 'flex',
  justifyContent: 'center',
});
