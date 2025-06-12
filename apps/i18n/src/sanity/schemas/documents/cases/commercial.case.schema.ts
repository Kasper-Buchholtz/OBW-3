import { Briefcase } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'commercialCase',
  title: 'Commercial Case',
  type: 'document',
  icon: Briefcase,
  groups: [
    { name: 'graphic', title: 'Video og billede' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'image',
      group: 'graphic',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'video',
      group: 'graphic',
      title: 'Video',
      type: 'file',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'production',
      title: 'Production',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      slug: 'slug.current',
      client: 'client',
    },
    prepare({ title, media, slug, client }) {
      return {
        title: title || 'Igen title',
        subtitle: client || 'Igen Kunde',
        description: slug ? `/${slug}` : '',
        media: media || Briefcase,
      }
    },
  },
})
