import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'celebrationPackage',
  type: 'document',
  title: 'Celebration Package',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Package Name' }),
    defineField({ name: 'price', type: 'number', title: 'Current Price (₹)' }),
    defineField({ name: 'originalPrice', type: 'number', title: 'Original Price (₹)' }),
    defineField({
      name: 'inclusions',
      type: 'array',
      title: 'What\'s Included',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'idealFor',
      type: 'array',
      title: 'Ideal For',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'image', type: 'image', title: 'Package Image' }),
  ],
});
