import {BsFillBagFill, BsCheckCircle} from 'react-icons/bs'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const experience = defineType({
  title: 'Experience',
  icon: BsFillBagFill,
  name: 'experience',
  type: 'document',
  fields: [
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'string',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'string',
    }),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'experienceBullet',
          type: 'object',
          icon: BsCheckCircle,
          fields: [
            defineField({
              title: 'Content',
              name: 'content',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {
            type: 'skill',
          },
        }),
      ],
    }),
  ],
})
