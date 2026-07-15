'use client';

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import type { MenuItem } from '@/types';
import { useCart } from '@/lib/cart/cart-context';

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { addItem } = useCart();

  return (
    <div className="glass-card overflow-hidden flex flex-col group animate-card-enter bg-white/90">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={item.image || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isVeg && (
            <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded shadow-sm" title="Pure Veg">
              <span className="veg-indicator" />
            </div>
          )}
          {item.jainAvailable && (
            <div className="bg-[#FAF7F2]/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-[#74bd58] uppercase tracking-wide shadow-sm border border-[#74bd58]/20">
              Jain Opt
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-lg font-semibold text-[#1A1F1C] leading-snug">{item.name}</h3>
        </div>
        
        {item.description && (
          <p className="text-sm text-[#1A1F1C]/70 line-clamp-2 mb-4 flex-1">
            {item.description}
          </p>
        )}
        
        {/* Price & Action Row */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-black/5">
          <div className="text-lg font-bold text-[#2f3e36] price">
            {item.price}
          </div>
          
          <button
            onClick={() => addItem(item)}
            className="flex items-center gap-1.5 bg-white border-2 border-[#74bd58] text-[#74bd58] hover:bg-[#74bd58] hover:text-white px-4 py-1.5 rounded-full font-medium transition-colors text-sm shadow-sm active:scale-95"
            aria-label={`Add ${item.name} to order`}
          >
            ADD
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
