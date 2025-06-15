import { UserCircle, UsersGroup } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const SocialsSection = defineType({
  name: 'SocialsSection',
  icon: UserCircle,
  title: 'Sociale Medier',
  description: 'Viser en liste af sociale medier links.',
  type: 'object',
  fields: [
    defineField({
      type: 'array',
      name: 'socials',
      title: 'Sociale Medier',
      options: {
        sortable: true,
        layout: 'tags',
      },
      description: 'Tilføj links til sociale medier.',
      of: [
        defineField({
          type: 'object',
          name: 'socialLink',
          title: 'Socialt Medie Link',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: '',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Github', value: 'github' },
                  { title: 'Google', value: 'google' },
                  { title: 'Vimeo', value: 'vimeo' },
                  { title: 'Youtube', value: 'youtube' },
                  { title: 'Apple', value: 'apple' },
                  { title: 'Snapchat', value: 'snapchat' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Figma', value: 'figma' },
                  { title: 'Dribble', value: 'dribble' },
                  { title: 'Reddit', value: 'reddit' },
                  { title: 'Discord', value: 'discord' },
                  { title: 'Tiktok', value: 'tiktok' },
                  { title: 'Clubhouse', value: 'clubhouse' },
                  { title: 'Slack', value: 'slack' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Telegram', value: 'telegram' },
                  { title: 'IMDb', value: 'imdb' },
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'SoundCloud', value: 'soundcloud' },
                  { title: 'Behance', value: 'behance' },
                ],
              },
            }),
            defineField({
              name: 'url',
              hidden: ({ parent }) => !parent?.platform,
              type: 'url',
              title: 'URL',
              description: 'URL for the selected social media platform',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: 'Sociale Medier',
      }
    },
  },
})
