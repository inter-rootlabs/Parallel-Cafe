'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { MenuCategory } from '@/types';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface MenuFiltersProps {
  categories: MenuCategory[];
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  typeFilter: 'all' | 'food' | 'beverage';
  onTypeFilterChange: (type: 'all' | 'food' | 'beverage') => void;
}

export default function MenuFilters({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  typeFilter,
  onTypeFilterChange,
}: MenuFiltersProps) {
  return (
    <div className="bg-white sticky top-16 sm:top-20 z-40 border-b border-[#2f3e36]/10 shadow-sm">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        
        {/* Top Row: Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#74bd58] focus:border-transparent transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto scroll-hide pb-2 sm:pb-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200">
              {(['all', 'food', 'beverage'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => onTypeFilterChange(type)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                    typeFilter === type 
                      ? 'bg-[#2f3e36] text-white shadow' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            <div className="relative flex-shrink-0">
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#74bd58]"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto scroll-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => onSelectCategory(null)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-[#74bd58] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-[#74bd58] hover:text-[#74bd58]'
            }`}
          >
            All Categories
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.slug
                  ? 'bg-[#74bd58] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#74bd58] hover:text-[#74bd58]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
        
        {/* Jain Indicator Strip */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#2f3e36]/70 bg-[#d3fbd8]/30 px-3 py-1.5 rounded-lg border border-[#74bd58]/20 w-max">
          <span className="text-[#74bd58] font-bold">INFO:</span> We serve both Jain & Regular (Jain = no onion, no garlic). Let staff know your preference when ordering.
        </div>
      </div>
    </div>
  );
}
