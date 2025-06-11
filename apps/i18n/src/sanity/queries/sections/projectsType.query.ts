import groq from 'groq'
import { ImageQuery } from '../atoms/Image.query'
export const projectsTypeQuery = groq`
_type == "projectsType" => {
    ...,
    // Pull in all "case" docs whose caseType matches this block’s "select"
    "cases": *[
      _type == "case" &&
      caseType == ^.select
    ] | order(_createdAt desc) {
      _id,
      title,
      locale,
      _type,
      caseType,
      slug,
      image{
        ${ImageQuery}
      },
      commercialObj,
      musicalObject,
      FictionalObject
    }
      }
`
