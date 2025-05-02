import { defineArrayMember, defineField, defineType } from 'sanity'

export const ImagesType = defineType({
  name: 'ImagesType',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'images.0',
    },
    prepare(selection) {
      return {
        title: 'Images',
        media: selection.media,
        subtitle: 'Billeder',
      }
    },
  },
})
