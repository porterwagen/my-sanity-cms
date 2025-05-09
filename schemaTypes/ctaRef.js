import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaRef',
  title: 'Call to Action (Inline)',
  type: 'object',
  fields: [
    defineField({
      name: 'cta',
      title: 'CTA Reference',
      type: 'reference',
      to: [{type: 'ctaBlock'}],
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: { title: 'cta.title', subtitle: 'cta.buttonText' }
  }
})