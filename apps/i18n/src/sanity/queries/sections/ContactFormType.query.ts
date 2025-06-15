import groq from 'groq'
export const ContactFormTypeQuery = groq`
_type == "contactFormType" => {
...,
}
`
