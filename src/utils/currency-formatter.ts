export function formatPrice (priceInCents: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(priceInCents / 100);
}
