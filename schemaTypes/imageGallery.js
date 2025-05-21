import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Gallery Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              validation: Rule => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1, 'You need at least one image'),
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Carousel', value: 'carousel'},
          {title: 'Masonry', value: 'masonry'},
        ],
        layout: 'radio'
      },
      initialValue: 'grid'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0'
    },
    prepare({title, media}) {
      return {
        title: title || 'Image Gallery',
        subtitle: 'Gallery Component',
        media
      }
    }
  }
})
