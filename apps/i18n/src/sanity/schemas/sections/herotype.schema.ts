import { PanelTopInactive } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'
export const heroType = defineType({
  name: 'hero',
  title: 'Topbanner',
  type: 'object',
  groups: [
    { title: 'Media', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'Content', name: 'content' },
    { title: 'Indstillinger', name: 'settings' },
  ],
  description:
    'Banneret fungerer som et sidehoved, der skaber blikfang fra første øjekast og gør siden overskuelig.',
  icon: PanelTopInactive,
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      title: 'Indhold',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Indhold',
          preview: {
            select: {
              title: 'link.label',
              subtitle: 'link._ref',
              media: 'media',
            },
            prepare({ title, media, subtitle }) {
              return {
                title: title || 'Ingen titel',
                subtitle: subtitle,
                media: media || undefined,
              }
            },
          },
          fields: [
            defineField({
              name: 'link',
              type: 'link',
              title: 'Link',
            }),
            defineField({
              name: 'media',
              type: 'file',
              title: 'Media',
            }),
          ],
        }),
      ],
    }),
    defineField({
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      amount: 'content',
    },
    prepare({ amount }) {
      return {
        title: `Topbanner`,
        subtitle: `Indhold: ${amount.length}`,
      }
    },
  },
})
