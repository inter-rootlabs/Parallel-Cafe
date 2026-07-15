import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menuItem',
  type: 'document',
  title: 'Menu Item',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Item Name' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
    defineField({ name: 'price', type: 'number', title: 'Price (₹)' }),
    defineField({ name: 'category', type: 'reference', title: 'Category', to: [{ type: 'menuCategory' }] }),
    defineField({ name: 'image', type: 'image', title: 'Item Photo' }),
    defineField({ name: 'isVeg', type: 'boolean', title: 'Vegetarian', initialValue: true }),
    defineField({ name: 'jainAvailable', type: 'boolean', title: 'Jain Option Available', initialValue: true }),
    defineField({ name: 'isSignature', type: 'boolean', title: 'Parallel Special / Signature' }),
    defineField({ name: 'available', type: 'boolean', title: 'Currently Available', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category.title', media: 'image' },
  },
});
