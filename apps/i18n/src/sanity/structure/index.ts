import { StructureResolver } from 'sanity/structure'
import pages from './page.structure'
import settings from './settings.structure'
import projects from './projects.structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      pages(S, context),
      projects(S, context),
      S.divider(),
      settings(S, context),
    ])
