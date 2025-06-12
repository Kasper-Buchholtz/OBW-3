import { StructureResolver } from 'sanity/structure'
import pages from './page.structure'
import settings from './settings.structure'
import projects from './projects.structure'

export const structure: StructureResolver = async (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      await pages(S, context),
      await projects(S, context),
      S.divider(),
      await settings(S, context),
    ])
