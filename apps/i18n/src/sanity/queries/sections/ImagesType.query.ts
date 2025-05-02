import groq from 'groq'
import { MediaObjectQuery } from '@/sanity/queries/molecules/MediaObject.query'
import { DesignQuery } from '@/sanity/queries/atoms/Design.query'
import { ButtonQuery } from '@/sanity/queries/atoms/Button.query'
import { ImageQuery } from '../atoms/Image.query'
export const ImagesType_QUERY = groq`
  _type == 'ImagesType' => {
    ...,
    images[] {
      ${ImageQuery}
    }
  }
`
