import category from './category'
import post from './post'
import author from './author'
import page from './page'
import ctaBlock from './ctaBlock'
import ctaRef from './ctaRef'
import serviceSection from './serviceSection'
import imageGallery from './imageGallery'
import faqSection from './faqSection'
import testimonialSection from './testimonialSection'
import pricingTable from './pricingTable'
import heroSection from './heroSection'
import blockContent from './blockContent'
import todo from './todo'

export const schemaTypes = [
  // Document types
  post,
  author,
  category,
  page,
  ctaBlock,
  todo,

  // Object types
  ctaRef,
  serviceSection,
  imageGallery,
  faqSection,
  testimonialSection,
  pricingTable,
  heroSection,
  blockContent
]
