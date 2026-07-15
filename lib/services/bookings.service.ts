import type { BookingFormData, BookingConfirmation } from '@/types';

/**
 * Create a booking for Private Screening or Gaming.
 *
 * DEMO: This function simulates a booking API call with a delay.
 * In production, replace the function body with a real API call to your
 * booking backend (e.g., Razorpay + custom booking service).
 * No component changes needed — just swap the implementation here.
 */
export async function createBooking(data: BookingFormData): Promise<BookingConfirmation> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // MOCK: Generate a fake booking ID
  const bookingId = `DEMO-${data.type.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return {
    id: bookingId,
    booking: data,
    status: 'confirmed',
    message: 'Demo booking flow — no payment has been taken. In production this will confirm in real time and process payment via Razorpay.',
  };

  /* PRODUCTION TODO:
   * Replace the above with:
   *
   * const response = await fetch('/api/bookings', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify(data),
   * });
   *
   * if (!response.ok) throw new Error('Booking failed');
   * return response.json();
   */
}

/**
 * Cancel a booking.
 * DEMO: Always succeeds after a delay.
 */
export async function cancelBooking(bookingId: string): Promise<{ success: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`[DEMO] Booking ${bookingId} cancelled`);
  return { success: true };
}
