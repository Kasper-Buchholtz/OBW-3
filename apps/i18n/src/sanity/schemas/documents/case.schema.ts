import { Briefcase } from '@mynaui/icons-react'
import { t } from 'i18next'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'case',
  title: 'Projekt',
  type: 'document',
  icon: Briefcase,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'caseType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Fictional', value: 'fictional' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Musical', value: 'musical' },
        ],
      },
    }),

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
      name: 'locale',
      title: 'Sprog',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
    }),

    defineField({
      name: 'commercialObj',
      title: 'Commercial',
      type: 'object',
      hidden: ({ parent }) => parent?.caseType !== 'commercial',
      fields: [
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
    }),
    defineField({
      name: 'musicalObject',
      title: 'Musical',
      type: 'object',
      hidden: ({ parent }) => parent?.caseType !== 'musical',
      fields: [
        defineField({
          name: 'artist',
          title: 'Artist',
          type: 'string',
        }),
        defineField({
          name: 'production',
          title: 'Production',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'FictionalObject',
      title: 'Fictional',
      type: 'object',
      hidden: ({ parent }) => parent?.caseType !== 'fictional',
      groups: [
        { name: 'production', title: 'Produktion' },
        { name: 'director', title: 'Instruktør' },
        { name: 'releaseYear', title: 'Udgivelses år' },
        { name: 'cast', title: 'Cast' },
        { name: 'poster', title: 'Plakat' },
        { name: 'description', title: 'Beskrivelse' },
      ],
      fields: [
        defineField({
          group: 'production',
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
          group: 'director',
        }),
        defineField({
          name: 'releaseYear',
          title: 'Udgivelses år',
          type: 'number',
          group: 'releaseYear',
        }),
        defineField({
          name: 'cast',
          title: 'Cast',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
          group: 'cast',
        }),
        defineField({
          name: 'poster',
          title: 'Plakat',
          type: 'image',
          options: {
            hotspot: true,
          },
          group: 'poster',
        }),
        defineField({
          name: 'description',
          title: 'Beskrivelse',
          type: 'text',
          description: 'En kort beskrivelse af projektet',
          group: 'description',
        }),
      ],
    }),
    defineField({
      group: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden (Sektioner / Blokke)',
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),

    defineField({
      group: 'seo',
      title: 'SEO',
      description: 'SEO indstillinger',
      name: 'seoGroup',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      slug: 'slug.current',
      subtitle: 'caseType',
    },
    prepare(selection) {
      const { title, media, subtitle, slug } = selection
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle:
          subtitle.charAt(0).toUpperCase() +
          subtitle.slice(1) +
          (slug ? ` /${slug}` : ''),
        media: media,
      }
    },
  },
})
