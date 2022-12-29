import { styled } from '../../../styles';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
});

export const ButtonCart = styled('button', {
  padding: '0.75rem',
  border: 0,
  borderRadius: 8,
  backgroundColor: '$gray800',
  color: '$gray400',
  cursor: 'not-allowed',
  pointerEvents: 'none',
  marginLeft: 'auto',
  lineHeight: 0,
  position: 'relative',

  variants: {
    state: {
      full: {
        color: '$gray300',
        cursor: 'pointer',
        pointerEvents: 'auto',

        '&::before': {
          content: '2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '$white',
          width: '1.5rem',
          height: '1.5rem',
          backgroundColor: '$green300',
          position: 'absolute',
          right: 0,
          top: 0,
          transform: 'translate(50%, -50%)',
          borderRadius: '50%',
          border: '3px solid $gray900',
          fontWeight: 'bold',
          fontSize: '0.875rem'
        }
      }
    }
  }
});
