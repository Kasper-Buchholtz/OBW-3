import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '../../utils/defineStructure'
import {
  Briefcase,
  Folder,
  Film,
  Music,
  Sparkles,
  Tag,
  Store,
  Compass,
} from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>(async (S, context) => {
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
          S.listItem()
            .title('Commercial Cases')
            .icon(Store)
            .id('commercialCases1')
            .child(
              S.documentTypeList('commercialCase')
                .title('Commercial Cases')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('commercialCase'),
                ),
            ),
          S.listItem()
            .title('Fictional Cases')
            .icon(Compass)
            .id('fictionalCases1')
            .child(
              S.documentTypeList('fictionalCase')
                .title('Fictional Cases')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('fictionalCase'),
                ),
            ),

          S.listItem()
            .title('Musical Cases')
            .icon(Music)
            .id('musicalCases1')
            .child(
              S.documentTypeList('musicalCase')
                .title('Musical Cases')
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType('musicalCase'),
                ),
            ),
        ]),
    )
})
