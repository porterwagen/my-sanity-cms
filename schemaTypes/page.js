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
      name: 'body',
      title: 'Body',
      type: 'blockContent', // This contains the CTA blocks
      group: 'content',
    }),
    // Page sections functionality commented out
    // defineField({
    //   name: 'pageBuilder',
    //   title: 'Page Sections',
    //   description: 'Add, edit, and reorder sections of the page',
    //   group: 'content',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'serviceSection',
    //     },
    //     {
    //       type: 'ctaBlock',
    //     },
    //   ],
    // }),
    // defineField({
    //   name: 'isServicePage',
    //   title: 'Is Service Page',
    //   type: 'boolean',
    //   group: 'content',
    //   description: 'Enable service page features and layout',
    //   initialValue: false,
    // }),
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