import { Envelope } from '@mynaui/icons-react'
import { defineArrayMember, defineField, defineType } from 'sanity'

const contactFormType = defineType({
  name: 'contactFormType',
  title: 'Kontakt måder',
  type: 'object',
  // {title: 'indstillinger', name: 'settings'}
  icon: Envelope,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'contactInfomations',
      type: 'array',
      title: 'Kontaktinformationer',
      description: 'Tilføj kontaktinformationer',
      of: [
        defineField({
          name: 'contactInformation',
          type: 'object',
          title: 'Kontaktinformation',
          preview: {
            select: {
              title: 'title',
              mail: 'mail',
              phone: 'phone',
            },
            prepare(selection) {
              const { title, mail, phone } = selection
              return {
                title: title,
                subtitle: `mail:${mail ? mail : ''} |  tlf:${phone ? phone : ''}`,
              }
            },
          },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Titel',
            }),
            defineField({
              name: 'mail',
              type: 'email',
              title: 'E-mail',
              description: 'E-mail adresse for kontakt',
            }),
            defineField({
              name: 'phone',
              type: 'string',
              title: 'Telefon',
              description: 'Telefonnummer for kontakt',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'design',
      type: 'design',
      title: 'Design',
    }),
    defineField({
      // group: "settings",
      name: 'SectionSettings',
      title: 'Indstillinger',
      type: 'SectionSettings',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'Form Fields',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: 'Kontakt måder',
      }
    },
  },
})

export { contactFormType }
