import {defineField, defineType} from 'sanity'

export const award = defineType({
  title: 'Award',
  name: 'award',
  type: 'object',
  fields: [
    defineField({
      title: 'Organization',
      name: 'organization',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'awardDescription',
      type: 'string',
    }),
  ],
})
