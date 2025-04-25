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

    {
      group: 'settings',
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    },
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
