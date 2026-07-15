import type { CartItem } from '@/types';

/**
 * Create an order from the current cart.
 *
 * DEMO: This function simulates an order API call with a delay.
 * In production, replace the function body with a real API call.
 * No component changes needed — just swap the implementation here.
 */
export async function createOrder(items: CartItem[]): Promise<{
  orderId: string;
  items: CartItem[];
  subtotal: number;
  message: string;
}> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const orderId = `DEMO-ORD-${Date.now().toString(36).toUpperCase()}`;

  return {
    orderId,
    items,
    subtotal,
    message: 'This is a demo — place your order at the counter. Online ordering launches soon.',
  };

  /* PRODUCTION TODO:
   * Replace the above with:
   *
   * const response = await fetch('/api/orders', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ items, subtotal }),
   * });
   *
   * if (!response.ok) throw new Error('Order submission failed');
   * return response.json();
   */
}
