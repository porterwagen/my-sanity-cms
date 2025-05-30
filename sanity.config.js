import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'My Sanity CMS',

  projectId: '9gjsljwo',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],
  
  mediaLibrary: {
    enabled: true,
  },
  
  schema: {
    types: schemaTypes,
  },
})
