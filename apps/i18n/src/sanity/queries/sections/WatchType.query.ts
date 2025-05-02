import { groq } from 'next-sanity'
import { ImageQuery } from '../atoms/Image.query'

export const Watch_Query = groq`
_type == "WatchType" => {
    ...,
    fallback{
        ${ImageQuery}
    }
}`
