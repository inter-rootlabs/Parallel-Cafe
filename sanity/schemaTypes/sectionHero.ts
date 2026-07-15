import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sectionHero',
  type: 'document',
  title: 'Section Hero',
  fields: [
    defineField({
      name: 'section',
      type: 'string',
      title: 'Section',
      options: { list: ['cafe', 'screening', 'gaming'] },
    }),
    defineField({ name: 'title', type: 'string', title: 'Hero Title' }),
    defineField({ name: 'subtitle', type: 'string', title: 'Hero Subtitle' }),
    defineField({ name: 'heroImage', type: 'image', title: 'Hero Background Image' }),
  ],
  preview: {
    select: { title: 'section', subtitle: 'title' },
  },
});
