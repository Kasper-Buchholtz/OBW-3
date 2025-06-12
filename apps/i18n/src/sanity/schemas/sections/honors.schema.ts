import { Album } from '@mynaui/icons-react'
import { defineType } from 'sanity'

export const honorsGallery = defineType({
  name: 'honorsGallery',
  type: 'object',
  title: 'Logo Galleri',
  icon: Album,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Titel på logogalleriet',
    },
  ],
  preview: {
    select: {
      images: 'images',
      image: 'images.0',
      title: 'title',
    },
    prepare(selection) {
      const { images, image, title } = selection

      return {
        subtitle: `Galleri `,
        title: title
          ? `${title}`
          : `Galleri med ${Object.keys(images).length} billeder`,
        media: image,
      }
    },
  },
})
