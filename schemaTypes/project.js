import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'meta',
      title: 'SEO & Metadata',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainImageMobile',
      title: 'Main image - Mobile',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      description: 'Optional mobile-optimized version of the main image. If not provided, the main image will be used on all devices.',
    }),
    defineField({
      name: 'projectLead',
      title: 'Project Lead',
      type: 'string',
      group: 'content',
      description: 'The lead person or team responsible for this project',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'menuOrder',
      title: 'Menu Order',
      type: 'number',
      group: 'meta',
      description: 'Order in navigation menus (lower numbers appear first)',
      initialValue: 0,
      validation: Rule => Rule.min(0)
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Project Content',
      description: 'Add, edit, and reorder content sections of the project',
      group: 'content',
      type: 'array',
      of: [
        // Text content section (WYSIWYG editor)
        {
          type: 'object',
          name: 'textContent',
          title: 'Text Content',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }
          ],
          preview: {
            select: {
              blocks: 'content',
            },
            prepare(value) {
              const block = (value.blocks || []).find(block => block._type === 'block')
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No content',
                subtitle: 'Text Content'
              }
            }
          }
        },
        // Image gallery component
        {
          type: 'imageGallery'
        },
        // FAQ section
        {
          type: 'faqSection'
        },
        // Testimonial section
        {
          type: 'testimonialSection'
        },
        // Inline CTA section (reference to CTA documents)
        {
          type: 'reference',
          name: 'inlineCta',
          title: 'CTA Block',
          to: [{type: 'ctaBlock'}],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'meta',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
        }
      ]
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare({title, media}) {
      return {
        title,
        subtitle: 'Project',
        media,
      }
    },
  },
})
