import { createContext, ReactNode, useReducer } from 'react';
import { cartReducer, CartState } from '../reducers/cart';
import { addProductAction, changeProductQuantityAction, removeProductAction, resetCartAction } from '../reducers/cart/actions';

interface Cart {
  products: Product[];
  addToCart: (newProduct: Product) => void;
  updateProduct: (id: string, amount: number) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
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

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        updateProduct,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
