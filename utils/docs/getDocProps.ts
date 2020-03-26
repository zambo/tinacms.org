import { getGithubDataFromPreviewProps } from '../github/sourceProviderConnection'
import { getFile as getGithubFile } from '../../tony/api-github'
import { readFile } from '../../utils/readFile'
import path from 'path'
import { markdownToObject } from '../../utils/markdown_helpers'

export async function getDocProps({ preview, previewData }: any, slug: string) {
  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)

  const getFile = async (filepath, preview) => {
    if (preview) {
      return (
        await getGithubFile(filepath, sourceProviderConnection, accessToken)
      ).contents
    } else {
      return await readFile(path.resolve(filepath))
    }
  }

  const filepath = `content/docs/${slug}.md`
  const file = await markdownToObject(await getFile(filepath, preview))
  const docsNavData = JSON.parse(await getFile('content/toc-doc.json', preview))

  let nextDocPage = null,
    prevDocPage = null

  if (file.frontmatter.next) {
    nextDocPage = (
      await markdownToObject(
        await getFile(`content${file.frontmatter.next}.md`, preview)
      )
    ).frontmatter
  }
  if (file.frontmatter.prev) {
    prevDocPage = (
      await markdownToObject(
        await getFile(`content${file.frontmatter.prev}.md`, preview)
      )
    ).frontmatter
  }

  return {
    props: {
      markdownFile: {
        fileRelativePath: filepath,
        data: file,
      },
      sourceProviderConnection,
      editMode: !!preview,
      docsNav: docsNavData,
      nextPage: {
        slug: file.frontmatter.next || null,
        title: (nextDocPage && nextDocPage.title) || null,
      },
      prevPage: {
        slug: file.frontmatter.prev || null,
        title: (prevDocPage && prevDocPage.title) || null,
      },
    },
  }
}
