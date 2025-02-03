import { Folder, FileText, Tag } from '@mynaui/icons-react'
import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Projekter')
    .icon(Folder)
    .id('case')
    .child(
      S.list()
        .title('Projekter og Kategorier')
        .items([
          S.listItem()
            .title('Projekter')
            .icon(FileText)
            .child(
              S.documentTypeList('case')
                .title('Projekter')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('case')
                    .views([S.view.form().id('caseEditor')]),
                ),
            ),
          S.listItem()
            .title('Kategori')
            .icon(Tag)
            .child(
              S.documentTypeList('category')
                .title('Kategori')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('category')
                    .views([S.view.form().id('categoryEditor')]),
                ),
            ),
        ]),
    ),
)
