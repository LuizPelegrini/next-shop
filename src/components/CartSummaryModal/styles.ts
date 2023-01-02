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
  position: 'fixed',
  top: 0,
  right: 0,
  width: 400,
  backgroundColor: '$white',
  height: '100vh'
});
