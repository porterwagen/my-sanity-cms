import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'serviceSection',
  title: 'Service Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'layout',
      title: 'Section Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Image Left', value: 'imageLeft'},
          {title: 'Image Right', value: 'imageRight'},
          {title: 'Image Top', value: 'imageTop'},
          {title: 'Content Only', value: 'contentOnly'}
        ],
        layout: 'radio'
      },
      initialValue: 'imageRight'
    })
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      media: 'image'
    },
    prepare({title, media}) {
      return {
        title: title || 'Service Section',
        subtitle: 'Service content section',
        media
      }
    }
  }
})