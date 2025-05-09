import category from './category'
import post from './post'
import author from './author'
import page from './page'
import ctaBlock from './ctaBlock'
import ctaRef from './ctaRef'
import serviceSection from './serviceSection'
import blockContent from './blockContent'

export const schemaTypes = [
  // Document types
  post,
  author,
  category,
  page,
  ctaBlock,

  // Object types
  ctaRef,
  serviceSection,
  blockContent
]
