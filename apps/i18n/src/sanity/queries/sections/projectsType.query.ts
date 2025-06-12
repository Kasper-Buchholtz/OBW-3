import groq from 'groq'
import { ImageQuery } from '../atoms/Image.query'

const fictional_query = groq`
select == "fictional" => *[_type == "fictionalCase"] | order(_createdAt desc) {
  ...,
  _id,
  title,
  locale,
  _type,
  caseType,
  slug,
  image{
    ${ImageQuery}
  },
}
`
const commercial_query = groq`
select == "commercial" => *[_type == "commercialCase"] | order(_createdAt desc) {
  ...,
  _id,
  title,
  locale,
  _type,
  caseType,
  slug,
  image{
    ${ImageQuery}
  },
}
`

const musical_query = groq`
select == "musical" => *[_type == "musicalCase"] | order(_createdAt desc) {
  ...,
  _id,
  title,
  locale,
  _type,
  caseType,
  slug,
  image{
    ${ImageQuery}
  },
}
`

export const projectsTypeQuery = groq`
_type == "projectsType" => {
  ...,
  "cases": select(
    ${fictional_query}, 
    ${commercial_query}, 
    ${musical_query}
  )
}

`
