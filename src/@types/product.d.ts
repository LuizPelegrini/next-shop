interface Product {
  id: string;
  name: string;
  description: string | null;
  formattedPrice: string;
  priceInCents: number;
  priceId: string;
  quantity: number;
  imageUrl: string;
}
