import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import {
  Briefcase,
  Folder,
  Film,
  Music,
  Sparkles,
  Tag,
} from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>(async (S, context) => {
  const client = context.getClient({ apiVersion: '2023-01-01' })

  // Define case types with their display names and icons
  const caseTypes = [
    { value: 'fictional', title: 'Fictional', icon: Sparkles },
    { value: 'commercial', title: 'Commercial', icon: Film },
    { value: 'musical', title: 'Musical', icon: Music },
  ]

  // Create dynamic folders for each case type
  const dynamicCaseTypeFolders = caseTypes.map((caseType) =>
    S.listItem()
      .title(caseType.title)
      .icon(caseType.icon)
      .child(
        S.documentList()
          .title(`${caseType.title} Cases`)
          .filter('_type == "case" && caseType == $caseType')
          .params({ caseType: caseType.value })
          .child((documentId) =>
            S.document().documentId(documentId).schemaType('case'),
          ),
      ),
  )

  return S.listItem()
    .title('Cases')
    .icon(Briefcase)
    .id('cases')
    .child(
      S.list()
        .title('Cases og Typer')
        .items([
          S.listItem()
            .title('Alle Cases')
            .icon(Briefcase)
            .child(
              S.documentTypeList('case')
                .title('Cases')
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType('case'),
                ),
            ),
          S.divider(),
          ...dynamicCaseTypeFolders,
          S.divider(),
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
    )
})
