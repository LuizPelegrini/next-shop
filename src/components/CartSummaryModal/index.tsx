import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { CartItem } from '../CartItem';
import { Content, Overlay, Footer } from './styles';


export function CartSummaryModal () {
  const { products } = useContext(CartContext);

  const itemsQuantity = products.reduce((acc, product) => {
    return acc + product.quantity
  }, 0);

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <h2>Shopping Cart</h2>

        { products.map(product => (
          <CartItem key={product.id} product={product}/>
        ))}

        <Footer>
          <p>
            <span>Quantity</span>
            <span>{itemsQuantity} items</span>
          </p>
          <p>
            <strong>Total</strong>
            <strong>$54.99</strong>
          </p>

          <button>Purchase</button>
        </Footer>
      </Content>
    </Dialog.Portal>
  );
}
