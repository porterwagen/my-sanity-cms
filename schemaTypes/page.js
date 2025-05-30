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
      name: 'hierarchy',
      title: 'Page Hierarchy',
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
      name: 'parent',
      title: 'Parent Page',
      type: 'reference',
      to: [{type: 'page'}],
      group: 'hierarchy',
      description: 'Select a parent page to create a hierarchy. Leave empty for top-level pages.',
      validation: Rule => Rule.custom((parent, context) => {
        // Prevent self-reference
        if (parent && parent._ref === context.document._id) {
          return 'A page cannot be its own parent'
        }
        return true
      })
    }),
    defineField({
      name: 'menuOrder',
      title: 'Menu Order',
      type: 'number',
      group: 'hierarchy',
      description: 'Order in navigation menus (lower numbers appear first)',
      initialValue: 0,
      validation: Rule => Rule.min(0)
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Content',
      description: 'Add, edit, and reorder content sections of the page',
      group: 'content',
      type: 'array',
      of: [
        // Text content section (WYSIWYG editor)
        {
          type: 'object',
          name: 'pageContent',
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
        subtitle: 'Page',
        media,
      }
    },
  },
})