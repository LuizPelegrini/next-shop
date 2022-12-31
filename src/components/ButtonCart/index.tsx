import { Handbag } from 'phosphor-react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Button } from './styles';

export function ButtonCart() {
  const { products } = useContext(CartContext);

  const quantity = products.reduce((acc, elem) => {
    return acc += elem.quantity;
  }, 0);

  return (
    <Button type="button" state={quantity > 0 ? 'full' : ''} >
      <Handbag weight="bold" size={24}/>
      { quantity > 0 && <span>{quantity}</span>}
    </Button>
  );
}
