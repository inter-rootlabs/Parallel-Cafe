import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menuCategory',
  type: 'document',
  title: 'Menu Category',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Category Name' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Category Type',
      options: { list: ['food', 'beverage', 'dessert'] },
    }),
  ],
});
