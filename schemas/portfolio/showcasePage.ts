import {BsHouseDoorFill, BsLink45Deg} from 'react-icons/bs'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const showcasePage = defineType({
  title: 'Showcase',
  name: 'showcase',
  icon: BsHouseDoorFill,
  description: 'Content of everything in the showcase page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'heroLinks',
      title: 'Hero Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'linkItem',
          type: 'object',
          icon: BsLink45Deg,
          fields: [
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
            }),
            defineField({
              title: 'Link URL',
              name: 'linkURL',
              type: 'string',
            }),
            defineField({
              title: 'React Icon',
              name: 'reactIcon',
              type: 'reference',
              to: {
                type: 'reactIcon',
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'experiences',
      title: 'Experiences',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'experience'},
        },
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'project'},
        }),
      ],
    }),
  ],
})
