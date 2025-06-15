import groq from 'groq'
import { ImageQuery } from '@/sanity/queries/atoms/Image.query'

export const SocialsSection_Query = groq`
  _type == "SocialsSection" => {
    ...,
  }
`
