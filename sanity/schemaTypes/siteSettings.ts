import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  // Singleton — only one document of this type
  fields: [
    defineField({ name: 'logo', type: 'image', title: 'Logo' }),
    defineField({ name: 'address', type: 'text', title: 'Address' }),
    defineField({ name: 'landmark', type: 'string', title: 'Landmark' }),
    defineField({ name: 'hours', type: 'string', title: 'Operating Hours' }),
    defineField({ name: 'instagram', type: 'string', title: 'Instagram Handle' }),
    defineField({ name: 'dietaryNote', type: 'string', title: 'Dietary Note' }),
    defineField({ name: 'homeHeroTitle', type: 'string', title: 'Home Hero Title' }),
    defineField({ name: 'homeHeroSubtitle', type: 'string', title: 'Home Hero Subtitle' }),
    defineField({
      name: 'currentOffersImage',
      type: 'image',
      title: 'Current Offers Poster Image',
      description: 'Upload the latest offers poster here. This single field is the entire update workflow — no developer needed.',
    }),
  ],
});
