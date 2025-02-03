import { Video } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const WatchType = defineType({
  name: 'WatchType',
  title: 'Watch',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: 'Vandret (Fuld bredde)', value: 'horizontal' },
          { title: 'Lodret (Fuld højde)', value: 'vertical' },
        ]
      }
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'url',
      type: 'string',
      title: 'Video ID',
      description: 'Vimeo video ID',
    }),
    defineField({
      title: 'Credits',
      name: 'credits',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'credit',
          icon: Video,
          type: 'object',
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
            }
          },
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'Role',
            }),
          ]
        })
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Watch section',
      }
    }
  }
})
