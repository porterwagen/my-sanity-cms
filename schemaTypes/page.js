import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Content',
      description: 'Add, edit, and reorder content sections of the page',
      group: 'content',
      type: 'array',
      of: [
        // Hero section (usually for page top)
        {
          type: 'heroSection'
        },
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
        // Service section
        {
          type: 'serviceSection'
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
        // Pricing table
        {
          type: 'pricingTable'
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
      name: 'isServicePage',
      title: 'Is Service Page',
      type: 'boolean',
      group: 'content',
      description: 'Enable service page features and layout',
      initialValue: false,
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
        subtitle: 'Page',
        media,
      }
    },
  },
})