import { groq } from 'next-sanity'

export const Watch_Query = groq`
_type == "WatchType" => {
    ...,
}`
