import {BsTools} from 'react-icons/bs'
import {defineField, defineType} from 'sanity'

export const skill = defineType({
  title: 'Skill',
  icon: BsTools,
  name: 'skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
})
