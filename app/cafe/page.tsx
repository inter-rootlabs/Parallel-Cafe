import React from 'react';
import type { Metadata } from 'next';
import { getMenuCategories, getMenuItems, getSectionHero } from '@/lib/sanity/queries';
import MenuGrid from '@/components/menu/MenuGrid';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Cafe & Menu | Parallel Cafe',
  description: 'Explore our pure veg menu, featuring handcrafted coffees, wholesome food, and refreshing beverages.',
};

export const revalidate = 60; // ISR

export default async function CafePage() {
  const [categories, items, hero] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getSectionHero('cafe'),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-section-primary text-section-surface py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay" />
        <Container className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl mb-6 font-heading text-white drop-shadow-sm animate-card-enter">
            {hero?.title || 'Good Food. Good Mood. Good Vibes.'}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium animate-card-enter stagger-1">
            {hero?.subtitle || 'Pure veg café serving fresh, made-with-love food and handcrafted coffees in the heart of Jayanagar.'}
          </p>
        </Container>
      </section>

      {/* Main Menu Area */}
      <section className="bg-[#FAF7F2] min-h-screen pb-24">
        <MenuGrid initialItems={items} categories={categories} />
      </section>
    </>
  );
}
