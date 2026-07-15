'use client';

import React, { useEffect, useRef } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart/cart-context';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount, isCartOpen: isOpen, closeCart: onClose } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus and prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const closeBtn = drawerRef.current?.querySelector<HTMLButtonElement>('[data-close-btn]');
      closeBtn?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your Cart"
        className={`fixed z-[110] bg-[#FAF7F2] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col
          /* Mobile: Bottom sheet */
          bottom-0 left-0 right-0 h-[85vh] rounded-t-3xl
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          /* Desktop: Slide in from right */
          md:top-0 md:bottom-0 md:right-0 md:left-auto md:w-[420px] md:h-screen md:rounded-none
          ${isOpen ? 'md:translate-x-0' : 'md:translate-x-full'} md:!translate-y-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 bg-white border-b border-[#2f3e36]/10 shrink-0 rounded-t-3xl md:rounded-none">
          <div className="flex items-center gap-3 text-[#2f3e36]">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-bold m-0 leading-none mt-1">Your Order</h2>
            {itemCount > 0 && (
              <Badge className="bg-[#2f3e36] text-white border-none ml-2">{itemCount}</Badge>
            )}
          </div>
          <button
            data-close-btn
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Demo Warning Notice */}
        <div className="bg-[#fff9c4] border-b border-[#fbc02d]/30 p-4 shrink-0 flex gap-3 text-[#f57f17]">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium leading-snug">
            This is a demo — place your order at the counter. Online ordering launches soon. No payment will be collected.
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="text-lg">Your cart is empty</p>
              <Button onClick={onClose} variant="outline" className="mt-4">
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-[#1A1F1C] leading-snug">{item.name}</h4>
                        <span className="font-bold text-[#2f3e36] whitespace-nowrap price">
                          {item.price * item.quantity}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1 price opacity-70">
                        {item.price} each
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 font-medium text-sm min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-[#74bd58] transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="bg-white border-t border-[#2f3e36]/10 p-5 md:p-6 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold text-[#2f3e36] price">{subtotal}</span>
            </div>
            <div className="flex gap-3">
              <Button onClick={clearCart} variant="outline" className="flex-1 text-gray-600 border-gray-300">
                Clear
              </Button>
              <Button onClick={onClose} className="flex-[2] bg-[#74bd58] hover:bg-[#63a34a] text-white">
                Review Only (Demo)
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
