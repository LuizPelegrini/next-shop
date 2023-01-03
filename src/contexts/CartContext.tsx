import { createContext, ReactNode, useState } from 'react';

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

export function CartProvider ({ children }: CartProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  function addToCart(newProduct: Product) {
    const existentProduct = products.find(product => product.id === newProduct.id);

    if(!existentProduct){
      setProducts((state) => [...state, newProduct]);
    } else {
      setProducts((state) => {
        return state.map(product => {
          if(product.id === existentProduct.id){
            const updatedProduct: Product = {
              ...product,
              quantity: product.quantity + 1
            }

            return updatedProduct;
          }

          return product;
        })
      });
    }
  }

  function updateProduct(id: string, amount: number) {
    const existentProduct = products.find(product => product.id === id);

    if(existentProduct){
      setProducts((state) => {
        return state.map(product => {
          if(product.id === id){
            const newProduct: Product = {
              ...product,
              quantity: amount
            };

            return newProduct;
          }

          return product;
        })
      });
    }

  }

  function removeFromCart(id: string) {
    setProducts(state =>
      state.filter(product => product.id !== id)
    );
  }

  function resetCart() {
    setProducts([]);
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
