import { Briefcase } from '@mynaui/icons-react'
import { dir } from 'console'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fictionalCase',
  title: 'Fictional Case',
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
      name: 'poster',
      title: 'Plakat',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'production',
      title: 'Production',
      type: 'string',
      initialValue: 'Wisholm FILM',
    }),
    defineField({
      name: 'director',
      title: 'Instruktør',
      type: 'string',
      initialValue: 'Oliver Birk Wisholm',
    }),
    defineField({
      name: 'releaseYear',
      title: 'Udgivelses år',
      type: 'number',
    }),
    defineField({
      name: 'cast',
      title: 'Cast',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      description: 'En kort beskrivelse af projektet',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      slug: 'slug.current',
      production: 'production',
      director: 'director',
    },
    prepare({ title, media, slug, production, director }) {
      return {
        title: title || 'Igen title',
        subtitle: production + ' — ' + director || 'Igen Kunde',
        description: slug ? `/${slug}` : '',
        media: media || Briefcase,
      }
    },
  },
})
