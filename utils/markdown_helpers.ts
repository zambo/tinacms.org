import matter from 'gray-matter'
import { formatExcerpt } from './blog_helpers'

export const markdownToObject = async rawData => {
  const data = matter(rawData)
  return {
    frontmatter: data.data,
    excerpt: await formatExcerpt(data.content),
    markdownBody: data.content,
  }
}
