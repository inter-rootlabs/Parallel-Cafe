'use client';

import React, { useState, useMemo } from 'react';
import type { MenuItem, MenuCategory } from '@/types';
import MenuCard from './MenuCard';
import MenuFilters, { SortOption } from './MenuFilters';
import Container from '@/components/ui/Container';

interface MenuGridProps {
  initialItems: MenuItem[];
  categories: MenuCategory[];
}

export default function MenuGrid({ initialItems, categories }: MenuGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [typeFilter, setTypeFilter] = useState<'all' | 'food' | 'beverage'>('all');

  const filteredItems = useMemo(() => {
    let result = initialItems;

    // Filter by Category
    if (activeCategory) {
      result = result.filter(item => item.category === activeCategory);
    }

    // Filter by Type
    if (typeFilter !== 'all') {
      const typeCats = categories.filter(c => c.type === typeFilter).map(c => c.slug);
      result = result.filter(item => typeCats.includes(item.category));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) || 
        (item.description && item.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    // 'default' uses the initial fetched order (category->order, then name)

    return result;
  }, [initialItems, categories, activeCategory, typeFilter, searchQuery, sortOption]);

  // Group items by category for rendering if sorting is default and no active category
  const renderGrouped = sortOption === 'default' && !activeCategory && !searchQuery && typeFilter === 'all';

  return (
    <>
      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />
      
      <Container className="py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 glass-card bg-white/50 border border-black/5">
            <h3 className="text-2xl text-gray-500 mb-2">No items found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
                setTypeFilter('all');
              }}
              className="mt-6 text-[#74bd58] hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : renderGrouped ? (
          // Grouped by Category Render
          categories.map(cat => {
            const catItems = filteredItems.filter(item => item.category === cat.slug);
            if (catItems.length === 0) return null;
            return (
              <div key={cat.id || cat.slug} className="mb-16">
                <h2 className="text-3xl text-[#2f3e36] mb-6 border-b border-black/5 pb-2 inline-block">
                  {cat.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {catItems.map((item, i) => (
                    <MenuCard key={item.id || item.name} item={item} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Flat List Render
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MenuCard key={item.id || item.name} item={item} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
