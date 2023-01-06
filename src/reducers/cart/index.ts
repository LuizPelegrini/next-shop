import { ActionProps } from "./actions";

export interface CartState {
  products: Product[];
}

export enum ActionTypes {
  INIT_CART = 'cart_initialised',
  PRODUCT_ADDED = 'product_added',
  QUANTITY_CHANGED = 'quantity_changed',
  PRODUCT_REMOVED = 'product_removed',
  CART_RESET = 'cart_reset'
}

export function cartReducer(state: CartState, action: ActionProps): CartState {
  if(action.type === ActionTypes.INIT_CART) {
    return action.payload;
  }

  if(action.type === ActionTypes.PRODUCT_ADDED) {
    const newProduct = action.payload.product;
    const existentProduct = state.products.find(product => product.id === newProduct.id);

    if(!existentProduct){
      return {
        ...state,
        products: [...state.products, newProduct]
      };
    } else {
      return {
        ...state,
        products: state.products.map(product => {
          if(product.id === existentProduct.id){
            const updatedProduct: Product = {
              ...product,
              quantity: product.quantity + 1
            }

            return updatedProduct;
          }

          return product;
        })
      }
    }
  }

  if(action.type === ActionTypes.PRODUCT_REMOVED) {
    const productToRemoveId = action.payload.id;
    return {
      ...state,
      products: state.products.filter(product => product.id !== productToRemoveId)
    };
  }

  if (action.type === ActionTypes.QUANTITY_CHANGED) {
    const { id, quantity } = action.payload;

    // Make sure the product is already in cart
    const existentProduct = state.products.find(product => product.id === id);
    if(existentProduct){
      return {
        ...state,
        products: state.products.map(product => {
          if(product.id === id){
            const newProduct: Product = {
              ...product,
              quantity
            };

            return newProduct;
          }

          return product;
        })
      }
    }
  }

  if (action.type === ActionTypes.CART_RESET) {
    return {
      ...state,
      products: []
    };
  }

  return state;
}
