import { Briefcase } from "@mynaui/icons-react";
import { t } from "i18next";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "case",
  title: "Projekt",
  type: "document",
  icon: Briefcase,

  groups: [
    { name: "content", title: "Indhold" },
    { name: "pageBuilder", title: "Sideopbygning"},
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "caseType",
      title: "Type",
      type: 'string',
      options: {
        list: [
          { title: 'Fictional', value: 'fictional' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Musical', value: 'musical' },
        ]
      }
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
      name: 'image',
      title: 'Image',
      type: 'image',
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
        })
      ]
    }),

    defineField({
      name: 'musicalObject',
      title: 'Musical',
      type: 'object',
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
        })
      ]
    }),
    defineField({
      group: 'pageBuilder',
      title: 'Indhold',
      description: 'Indholdet på siden (Sektioner / Blokke)',
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),


    defineField({
      group: "seo",
      title: "SEO",
      description: "SEO indstillinger",
      name: 'seoGroup',
      type: 'seoGroup',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'caseType',
    },
    prepare(selection) {
      const {title, media, subtitle} = selection;
      return {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        subtitle: subtitle.charAt(0).toUpperCase() + subtitle.slice(1),
        media: media,
      }
    }
  }
});
