import * as Dialog from '@radix-ui/react-dialog';

import { styled } from '../../styles';

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)'
});

export const Content = styled(Dialog.Content, {
  backgroundColor: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '30rem',
  height: '100vh',
  padding: '3rem',

  display: 'flex',
  flexDirection: 'column',

  h2: {
    fontSize: '$md',
    marginBottom: '2rem'
  }
});

export const Footer = styled('footer', {
  marginTop: 'auto',

  p: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  'p:first-child': {
    marginBottom: '0.5rem',
  },

  button: {
    marginTop: '3.5rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    width: '100%',
    padding: '1.25rem 0',
    fontWeight: 'bold',
    fontSize: '$md',
    cursor: 'pointer',
    transition: 'background-color 0.15s',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.6,
    }
  }
});

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  right: '1.5rem',
  top: '1.5rem',
  backgroundColor: 'transparent',
  lineHeight: 0,
  color: '$gray300',
  border: 0,
  cursor: 'pointer',

  '&:hover': {
    color: '$gray500',
  }
});
