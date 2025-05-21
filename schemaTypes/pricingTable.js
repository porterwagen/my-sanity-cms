import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pricingTable',
  title: 'Pricing Table',
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
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'plan',
          title: 'Pricing Plan',
          fields: [
            {
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'highlight',
              title: 'Highlight this plan',
              description: 'Mark this as the recommended or featured plan',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g. "$29" or "Free"',
              validation: Rule => Rule.required()
            },
            {
              name: 'period',
              title: 'Billing Period',
              type: 'string',
              description: 'e.g. "per month" or "yearly"'
            },
            {
              name: 'description',
              title: 'Plan Description',
              type: 'text',
              rows: 2
            },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'feature',
                  fields: [
                    {
                      name: 'text',
                      title: 'Feature Text',
                      type: 'string',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true
                    }
                  ]
                }
              ],
              validation: Rule => Rule.required().min(1, 'Add at least one feature')
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Get Started'
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'url'
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              highlighted: 'highlight'
            },
            prepare({title, subtitle, highlighted}) {
              return {
                title: `${highlighted ? '✓ ' : ''}${title}`,
                subtitle: subtitle
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1, 'You need at least one pricing plan')
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          {title: 'Cards', value: 'cards'},
          {title: 'Table', value: 'table'},
          {title: 'Toggle Monthly/Yearly', value: 'toggle'}
        ],
        layout: 'radio'
      },
      initialValue: 'cards'
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      description: 'Extra text to display below the pricing plans (refund policy, guarantees, etc.)',
      type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'title',
      plans: 'plans'
    },
    prepare({title, plans = []}) {
      return {
        title: title || 'Pricing Table',
        subtitle: `${plans.length} pricing plan${plans.length === 1 ? '' : 's'}`
      }
    }
  }
})
