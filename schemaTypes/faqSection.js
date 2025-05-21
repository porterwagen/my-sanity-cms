import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'question'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1, 'You need at least one FAQ item')
    }),
    defineField({
      name: 'layout',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Accordion', value: 'accordion'},
          {title: 'Expanded', value: 'expanded'},
          {title: 'Grid', value: 'grid'}
        ],
        layout: 'radio'
      },
      initialValue: 'accordion'
    })
  ],
  preview: {
    select: {
      title: 'title',
      faqs: 'faqs'
    },
    prepare({title, faqs = []}) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${faqs.length} question${faqs.length === 1 ? '' : 's'}`
      }
    }
  }
})
