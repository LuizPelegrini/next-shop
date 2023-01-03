import Image from 'next/image';
import { Minus, Plus } from 'phosphor-react';
import { ChangeEvent, useContext } from 'react';
import tempImg from '../../assets/tshirt.png';
import { CartContext } from '../../contexts/CartContext';
import { Container, ProductDetails, RemoveButton, ItemQuantityInput, ImageContainer } from './styles';

interface CartItemProps {
  product: Product;
}

export function CartItem ({ product }: CartItemProps) {
  const { updateProduct, removeFromCart } = useContext(CartContext);

  function handleChangeQuantity(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const amount = parseInt(value);

    if(isNaN(amount)){
      updateProduct(product.id, 1);
    }else {
      updateProduct(product.id, amount);
    }
  }

  function handleAdd() {
    updateProduct(product.id, product.quantity + 1);
  }

  function handleSubtract() {
    const newAmount =  product.quantity - 1;
    updateProduct(product.id, newAmount <= 0 ? 1 : newAmount);
  }

  function handleRemoveFromCart() {
    removeFromCart(product.id);
  }

  return (
    <Container>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={100} height={100} />
      </ImageContainer>
      <ProductDetails>
        <span>{product.name}</span>
        <strong>{product.price}</strong>
        <footer>
          <RemoveButton
            type="button"
            onClick={handleRemoveFromCart}
          >
            Remove
          </RemoveButton>
          <ItemQuantityInput>
            <button type="button" onClick={handleSubtract}>
              <Minus  size={10} weight="bold"/>
            </button>
            <input
              type="number"
              value={product.quantity}
              onChange={handleChangeQuantity}
            />
            <button type="button" onClick={handleAdd}>
              <Plus size={10} weight="bold" />
            </button>
          </ItemQuantityInput>
        </footer>
      </ProductDetails>
    </Container>
  );
}
