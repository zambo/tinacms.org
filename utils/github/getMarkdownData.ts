import { readFile } from '../readFile'
import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'
import matter from 'gray-matter'
import getDecodedData from './getDecodedData'
import { formatExcerpt } from '..'
import { getPath } from '../getPath'

const getMarkdownData = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  if (sourceProviderConnection && accessToken) {
    const response = await getDecodedData(
      sourceProviderConnection.forkFullName,
      sourceProviderConnection.headBranch || 'master',
      filePath,
      accessToken
    )

    const { content: markdownBody, data: frontmatter } = matter(
      response.content
    )

    return {
      sha: response.sha,
      fileRelativePath: filePath,
      data: { frontmatter, markdownBody },
    }
  } else {
    const absPath = getPath(filePath)
    console.log(`absPath ${absPath}`)
    const doc = matter(await readFile(absPath))
    return {
      fileRelativePath: filePath,
      data: {
        frontmatter: doc.data,
        excerpt: await formatExcerpt(doc.content),
        markdownBody: doc.content,
      },
    }
  }
}

export default getMarkdownData
