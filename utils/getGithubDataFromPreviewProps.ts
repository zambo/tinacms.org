import {
  PreviewData,
  SourceProviderConnection,
} from './github/sourceProviderConnection'

interface Response {
  accessToken: string
  sourceProviderConnection: SourceProviderConnection
}

export const getGithubDataFromPreviewProps = (
  previewData?: PreviewData
): Response => {
  if (!previewData) {
    return {
      sourceProviderConnection: null,
      accessToken: null,
    }
  }

  return {
    accessToken: previewData.github_access_token,
    sourceProviderConnection: {
      forkFullName: previewData.fork_full_name,
      headBranch: previewData.head_branch || 'master',
      baseRepoFullName: process.env.REPO_FULL_NAME,
    },
  }
}
