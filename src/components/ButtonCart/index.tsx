import { Handbag } from 'phosphor-react';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Button } from './styles';


function ButtonCart(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { products } = useContext(CartContext);

  const quantity = products.reduce((acc, elem) => {
    return acc += elem.quantity;
  }, 0);

  return (
    <Button {...props} ref={ref} state={quantity > 0 ? 'full' : undefined}>
      <Handbag weight="bold" size={24}/>
      { quantity > 0 && <span>{quantity}</span>}
    </Button>
  );
}

export default forwardRef(ButtonCart);
