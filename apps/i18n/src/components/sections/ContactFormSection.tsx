'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import Section from '@/components/sections/Section'
import { AdvancedButton } from '../atoms/AdvancedButton'
import Link from 'next/link'

const ContactFormSection = ({ data }) => {

  return (
    <Section
      variant="lys"
      data={data}
      className={`relative overflow-hidden min-h-screen`}
    >
      <div className='col-span-full my-auto'>
        {data.heading && ((
          <div className='mb-3'>
            <Heading type='h2' tag='h2' dangerouslySetInnerHTML={{ __html: data.heading }} />
          </div>
        ))}
        <ul>
          {data.contactInfomations.map((contact, index) => (
            <ContactItem key={index} contact={contact} />
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default ContactFormSection




const ContactItem = ({ contact }) => {
  return (
    <li className='mb-4 flex h-full flex-col md:flex-row'>
      <div className='md:w-1/3 md:border md:border-lights-0  md:border-l-0 h-auto flex '>
        <Heading tag='h5' type='h4' fontFamily='sans' className='my-auto py-3 md:py-0' spacing='none'>{contact.title}</Heading>
      </div>
      <div className='md:w-2/3 md:border md:border-lights-0 md:border-l-0 md:py-4 md:pl-12 flex md:gap-8 flex-col md:flex-row'>
        {contact.mail && (
          <Paragraph>
            <Link href={`mailto:${contact.mail}`} className='text-light-0 hover:underline' title={`Ring til ${contact?.mail}`}>
              {contact.mail}
            </Link>
          </Paragraph>
        )}
        {contact.phone && (
          <Paragraph>
            <Link href={`tel:${contact.phone}`} className='text-light-0 hover:underline' title={`Ring til ${contact?.phone}`}>
              +45 {contact.phone}
            </Link>
          </Paragraph>
        )}
      </div>
    </li>
  )
}