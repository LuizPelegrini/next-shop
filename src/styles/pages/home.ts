import { styled } from '..';

export const Container = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(1180px + ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
    width: '100%',
    height: 'auto'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',

      strong: {
        fontSize: '$lg',
        color: '$gray100'
      },

      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300'
      }
    },

    button: {
      backgroundColor: '$green500',
      color: '$white',
      width: '3.5rem',
      height: '3.5rem',
      border: 0,
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'background-color 0.15s',

      '&:hover': {
        backgroundColor: '$green300'
      }
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})
