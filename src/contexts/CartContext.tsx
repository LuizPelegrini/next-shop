import axios from 'axios';
import { createContext, ReactNode, useReducer } from 'react';
import { cartReducer, CartState } from '../reducers/cart';
import { addProductAction, changeProductQuantityAction, removeProductAction, resetCartAction } from '../reducers/cart/actions';

interface Cart {
  products: Product[];
  addToCart: (newProduct: Product) => void;
  updateProduct: (id: string, amount: number) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
  checkout: () => Promise<string>;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as Cart);

function initialiseCart(): CartState {
  return {
    products: []
  };
}

export function CartProvider ({ children }: CartProviderProps) {
  const [cartState, dispatch] = useReducer<typeof cartReducer, { products: Product[] }>(
    cartReducer,
    {
      products: []
    },
    initialiseCart
  );

  const { products } = cartState;

  function addToCart(newProduct: Product) {
    dispatch(addProductAction(newProduct));
  }

  function updateProduct(id: string, amount: number) {
    dispatch(changeProductQuantityAction(id, amount));
  }

  function removeFromCart(id: string) {
    dispatch(removeProductAction(id));
  }

  function resetCart() {
    dispatch(resetCartAction());
  }

  async function checkout(): Promise<string> {
    const { data } = await axios.post('/api/createCheckoutSession', {
      products: products.map(product => ({
        priceId: product.priceId,
        quantity: product.quantity
      }))
    });

    return data.checkoutURL as string;
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        updateProduct,
        resetCart,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
