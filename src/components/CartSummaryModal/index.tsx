import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';
import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/currency-formatter';
import { CartItem } from '../CartItem';
import { Content, Overlay, Footer, CloseButton } from './styles';


export function CartSummaryModal () {
  const { products, checkout } = useContext(CartContext);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);


  const cartSummary = products.reduce((acc, product) => {
    const quantity = acc.quantity + product.quantity
    const totalPriceInCents = acc.totalPriceInCents + (product.quantity * product.priceInCents);

    return {
      quantity,
      totalPriceInCents
    }
  }, {
    quantity: 0,
    totalPriceInCents: 0
  });

  async function createCheckoutSession() {
      try {
        setIsCreatingCheckoutSession(true);

      const checkoutURL = await checkout();

      // redirect user to Stripe checkout page
      window.location.href = checkoutURL;
    } catch (error: any) {
      // TODO: integrate with observability tool (Datadog / Sentry)
      alert('Failed on creating checkout session');
      console.log(error.stack);

      setIsCreatingCheckoutSession(false);
    }
  }

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
            <span>{cartSummary.quantity} items</span>
          </p>
          <p>
            <strong>Total</strong>
            <strong>{formatPrice(cartSummary.totalPriceInCents)}</strong>
          </p>

          <button
            type="button"
            disabled={products.length === 0 || isCreatingCheckoutSession}
            onClick={createCheckoutSession}
          >
            Purchase
          </button>
        </Footer>

        <CloseButton asChild>
          <button>
            <X size={24} />
          </button>
        </CloseButton>
      </Content>
    </Dialog.Portal>
  );
}
