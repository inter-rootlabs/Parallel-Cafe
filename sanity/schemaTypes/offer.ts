import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'offer',
  type: 'document',
  title: 'Offer',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Offer Title' }),
    defineField({ name: 'description', type: 'string', title: 'Description' }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Offer Type',
      options: { list: ['flat', 'weekday', 'loyalty', 'startingFrom'] },
    }),
    defineField({ name: 'day', type: 'string', title: 'Applicable Day (for weekday offers)' }),
    defineField({ name: 'condition', type: 'string', title: 'Condition / Requirement' }),
    defineField({ name: 'active', type: 'boolean', title: 'Currently Active', initialValue: true }),
    defineField({ name: 'priority', type: 'number', title: 'Display Priority (lower = higher)' }),
  ],
});
