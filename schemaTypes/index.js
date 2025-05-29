import category from './category'
import post from './post'
import page from './page'
import project from './project'
import ctaBlock from './ctaBlock'
import ctaRef from './ctaRef'
import imageGallery from './imageGallery'
import faqSection from './faqSection'
import testimonialSection from './testimonialSection'
import blockContent from './blockContent'
import todo from './todo'

export const schemaTypes = [
  // Document types
  post,
  category,
  page,
  project,
  ctaBlock,
  todo,

  // Object types
  ctaRef,
  imageGallery,
  faqSection,
  testimonialSection,
  blockContent
]
