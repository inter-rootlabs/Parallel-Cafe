'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { MenuItem, CartItem, CartState } from '@/types';

// We need to extend the CartState type here locally since the types/index.ts might not have it yet.
interface ExtendedCartState extends CartState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<ExtendedCartState | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback((menuItem: MenuItem) => {
    setItems(prev => {
      const existing = prev.find(item => item.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
    openCart(); // Open cart automatically when an item is added
  }, [openCart]);

  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.menuItem.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.menuItem.id !== itemId));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const value = useMemo<ExtendedCartState>(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, isCartOpen, openCart, closeCart }),
    [items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount, isCartOpen, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): ExtendedCartState {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
