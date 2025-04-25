import { defineField, defineType } from 'sanity'

export const projectsType = defineType({
  name: 'projectsType',
  type: 'object',
  description: 'En til at vise alle projekter i en bestemt type',
  title: 'Projekt type',
  groups: [
    { title: 'Medie', name: 'media' },
    { title: 'Design', name: 'design' },
    { title: 'indstillinger', name: 'settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'Indtast titel',
    }),
    defineField({
      type: 'string',
      name: 'select',
      title: 'Vælg',
      description: 'Vælg mellem de forskellige typer',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Musical', value: 'musical' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Fictional', value: 'fictional' },
        ],
      },
    })
  ],
  preview: {
    select: {
      title: 'select',
    },
    prepare({ title }) {
      return {
        title: title,
      }
    },
  },
})
