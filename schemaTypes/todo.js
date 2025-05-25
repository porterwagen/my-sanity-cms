export default {
  name: 'todo',
  title: 'Todo',
  type: 'document',
  fields: [
    { name: 'text', title: 'Text', type: 'string', validation: Rule => Rule.required() },
    { name: 'done', title: 'Done', type: 'boolean', initialValue: false },
    { name: 'createdAt', title: 'Created At', type: 'datetime' }
  ]
}