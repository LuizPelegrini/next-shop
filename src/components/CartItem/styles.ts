import { styled } from '../../styles';

export const Container = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  '& + &': {
    marginTop: '1.5rem'
  }
});

export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  width: '100%',
  height: 100,
  maxWidth: 100,
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
});

export const ProductDetails = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.475rem',

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  }
});

export const RemoveButton = styled('button', {
  backgroundColor: 'transparent',
  color: '$green500',
  border: 0,
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'color 0.15s',

  '&:hover': {
    color: '$green300',
  }
});

export const ItemQuantityInput = styled('label', {
  display: 'flex',
  borderRadius: 8,
  border: '1px solid $green500',

  '&:focus-within': {
    boxShadow: '0 0 0 2px #00875f'
  },

  input: {
    backgroundColor: 'transparent',
    border: 0,
    width: '2rem',
    color: '$white',
    lineHeight: 1.3,
    textAlign: 'center',

    '&:focus': {
      boxShadow: 'none',
      outline: 'none'
    },

    /* Chrome, Edge, Safari, Opera */
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },

    /* Firefox */
    '&[type=number]': {
      '-moz-appearance': 'textfield'
    }
  },

  button: {
    backgroundColor: 'transparent',
    color: '$green300',
    border: 0,
    padding: '0.5rem',
    cursor: 'pointer',

    '&:focus': {
      boxShadow: 'none',
      outline: '2px solid $green500'
    },

    '&:first-child': {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8
    },

    '&:last-child': {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    }
  },


});
