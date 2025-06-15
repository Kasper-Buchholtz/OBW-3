import { Envelope } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

const HonorsAndAwardsType = defineType({
  name: 'HonorsAndAwardsType',
  title: 'Udmærkelser og priser',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'horrorsAndAwards',
      type: 'array',
      title: 'Udmærkelser og priser',
      description: 'Tilføj udmærkelser og priser',
      of: [
        defineField({
          name: 'award',
          type: 'object',
          title: 'Udmærkelse',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Titel',
              description: 'Titel på udmærkelsen',
            }),
            defineField({
              name: 'icon',
              type: 'string',
              title: 'Ikon',
              description: 'Vælg et ikon for udmærkelsen',
              options: {
                list: [
                  { title: 'Creative Circle', value: 'CreativeCircle' },
                  {
                    title: 'Cannes Film Festival',
                    value: 'CannesFilmFestival',
                  },
                  { title: 'BAFTA Awards', value: 'BAFTA' },
                  { title: 'Golden Globe Awards', value: 'GoldenGlobe' },
                  {
                    title: 'Venice Film Festival',
                    value: 'VeniceFilmFestival',
                  },
                  {
                    title: 'Monthly Indie Shorts Award',
                    value: 'MonthlyIndieShortsAward',
                  },
                ],
              },
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
        title: title.heading.heading,
        subtitle: subtitle,
      }
    },
  },
})

export { HonorsAndAwardsType }
