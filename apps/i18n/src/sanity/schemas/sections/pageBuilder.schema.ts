import { defineArrayMember, defineType } from 'sanity'
export const pageBuilder = defineType({
  name: 'pageBuilder',
  type: 'array',
  title: 'Indhold',
  options: {
    sortable: true,
    layout: 'tags',
    insertMenu: {
      filter: true,
      showIcons: true,
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) =>
            `/images/backend/${schemaTypeName}.png`,
        },
        { name: 'list' },
      ],
      groups: [
        {
          name: 'hero',
          title: 'Topbanner',
          of: ['hero', 'Hero2', 'Hero3'],
        },
        {
          name: 'gallery',
          title: 'Galleri',
          of: ['Gallery', 'LogoGallery', 'LogoGallery2'],
        },
        {
          name: 'content',
          title: 'Indhold',
          of: ['textWithIllustration', 'textContainer'],
        },
      ],
    },
  },
  of: [
    defineArrayMember({
      name: 'hero',
      type: 'hero',
    }),
    defineArrayMember({
      name: 'Hero2',
      type: 'Hero2',
    }),
    defineArrayMember({
      name: 'Hero3',
      type: 'Hero3',
    }),
    defineArrayMember({
      name: 'EmployeesType',
      type: 'EmployeesType',
    }),
    defineArrayMember({
      name: 'contactFormType',
      type: 'contactFormType',
    }),
    defineArrayMember({
      name: 'ArticlesType',
      type: 'ArticlesType',
    }),
    defineArrayMember({
      name: 'CallToAction',
      type: 'CallToAction',
    }),
    defineArrayMember({
      name: 'CallToAction2',
      type: 'CallToAction2',
    }),
    defineArrayMember({
      name: 'Gallery',
      type: 'Gallery',
    }),
    defineArrayMember({
      name: 'LogoGallery',
      type: 'LogoGallery',
    }),
    defineArrayMember({
      name: 'LogoGallery2',
      type: 'LogoGallery2',
    }),
    defineArrayMember({
      name: 'EventType',
      type: 'EventType',
    }),
    defineArrayMember({
      name: 'MediaType',
      type: 'MediaType',
    }),
    defineArrayMember({
      name: 'textWithIllustration',
      type: 'textWithIllustration',
    }),
    defineArrayMember({
      name: 'textContainer',
      type: 'textContainer',
    }),
    defineArrayMember({
      name: 'IconPicker',
      type: 'IconPicker',
    }),

    /* New */
    defineArrayMember({
      name: 'WatchType',
      type: 'WatchType',
    }),
    defineArrayMember({
      name: 'ImagesType',
      type: 'ImagesType',
    }),
    defineArrayMember({
      name: 'projectsType',
      type: 'projectsType',
    }),
    defineArrayMember({
      name: 'SocialsSection',
      type: 'SocialsSection',
    }),
    defineArrayMember({
      name: 'HonorsAndAwardsType',
      type: 'HonorsAndAwardsType',
    }),
  ],
})
