import * as Dialog from '@radix-ui/react-dialog';
import { Content, Overlay } from './styles';

export function CartSummaryModal () {
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        Hello
      </Content>
    </Dialog.Portal>
  );
}
