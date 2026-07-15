import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tournament',
  type: 'document',
  title: 'Gaming Tournament',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Tournament Name' }),
    defineField({ name: 'date', type: 'datetime', title: 'Tournament Date' }),
    defineField({ name: 'entryFee', type: 'number', title: 'Entry Fee (₹)' }),
    defineField({ name: 'prize', type: 'string', title: 'Prize Description' }),
    defineField({ name: 'registrationOpen', type: 'boolean', title: 'Registration Open', initialValue: true }),
    defineField({ name: 'image', type: 'image', title: 'Tournament Banner' }),
  ],
});
