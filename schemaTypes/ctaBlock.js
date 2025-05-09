import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'CTA Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'style',
      title: 'CTA Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Highlight', value: 'highlight'}
        ],
        layout: 'radio'
      },
      initialValue: 'primary'
    })
  ],
  preview: {
    select: {
      title: 'title',
      buttonText: 'buttonText'
    },
    prepare({title, buttonText}) {
      return {
        title: title || 'Call to Action',
        subtitle: buttonText ? `Button: ${buttonText}` : 'No button text set'
      }
    }
  }
})