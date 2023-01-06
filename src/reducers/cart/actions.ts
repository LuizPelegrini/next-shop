import { ActionTypes, CartState } from ".";

interface InitCartStateActionProps {
  type: ActionTypes.INIT_CART;
  payload: CartState;
}

interface AddProductActionProps {
  type: ActionTypes.PRODUCT_ADDED;
  payload: {
    product: Product;
  }
}

interface RemoveProductActionProps {
  type: ActionTypes.PRODUCT_REMOVED;
  payload: {
    id: string;
  }
}

interface ChangeProductQuantityActionProps {
  type: ActionTypes.QUANTITY_CHANGED;
  payload: {
    id: string;
    quantity: number;
  }
}

interface ResetCartActionProps {
  type: ActionTypes.CART_RESET;
}

export type ActionProps =
  InitCartStateActionProps |
  AddProductActionProps |
  RemoveProductActionProps |
  ChangeProductQuantityActionProps |
  ResetCartActionProps;

export function initCartStateAction(state: CartState): InitCartStateActionProps {
  return {
    type: ActionTypes.INIT_CART,
    payload: state
  }
}

export function addProductAction(product: Product): AddProductActionProps {
  return {
    type: ActionTypes.PRODUCT_ADDED,
    payload: {
      product
    }
  }
}

export function changeProductQuantityAction(id: string, quantity: number): ChangeProductQuantityActionProps {
  return {
    type: ActionTypes.QUANTITY_CHANGED,
    payload: {
      id,
      quantity
    }
  }
}

export function removeProductAction(id: string): RemoveProductActionProps {
  return {
    type: ActionTypes.PRODUCT_REMOVED,
    payload: {
      id
    }
  }
}

export function resetCartAction(): ResetCartActionProps{
  return {
    type: ActionTypes.CART_RESET,
  }
}
