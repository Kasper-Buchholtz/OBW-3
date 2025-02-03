import groq from 'groq'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'
import { ButtonQuery } from '../atoms/Button.query'
import { ImageQuery } from '../atoms/Image.query'

export const heroQuery = groq`
_type == "hero" => {
  _type,
  content[]{
    ${ButtonQuery},
    media{
      ${ImageQuery}
    }
  },
  ${MediaObjectQuery},
}
`