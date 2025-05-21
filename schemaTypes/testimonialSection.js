import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonialSection',
  title: 'Testimonial Section',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required()
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'role',
              title: 'Author Role/Company',
              type: 'string'
            },
            {
              name: 'avatar',
              title: 'Author Avatar',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
              validation: Rule => Rule.min(1).max(5).precision(1)
            }
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'quote',
              media: 'avatar'
            }
          }
        }
      ],
      validation: Rule => Rule.min(1, 'You need at least one testimonial')
    }),
    defineField({
      name: 'layout',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          {title: 'Carousel', value: 'carousel'},
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'}
        ],
        layout: 'radio'
      },
      initialValue: 'carousel'
    }),
    defineField({
      name: 'background',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Brand', value: 'brand'}
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    })
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials'
    },
    prepare({title, testimonials = []}) {
      return {
        title: title || 'Testimonial Section',
        subtitle: `${testimonials.length} testimonial${testimonials.length === 1 ? '' : 's'}`
      }
    }
  }
})
