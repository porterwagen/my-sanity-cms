import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      description: 'Opacity of the dark overlay (0 = transparent, 100 = solid black)',
      type: 'number',
      validation: Rule => Rule.min(0).max(100).precision(0),
      initialValue: 50
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'url'
        }
      ]
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string'
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'url'
        }
      ]
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Centered', value: 'centered'},
          {title: 'Left Aligned', value: 'left'},
          {title: 'Split (Image Right)', value: 'split-right'},
          {title: 'Split (Image Left)', value: 'split-left'}
        ],
        layout: 'radio'
      },
      initialValue: 'centered'
    }),
    defineField({
      name: 'fullHeight',
      title: 'Full Height Hero',
      description: 'Make the hero section take up the full height of the screen',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'}
        ],
        layout: 'radio'
      },
      initialValue: 'light'
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'tagline',
      media: 'image'
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle,
        media
      }
    }
  }
})
