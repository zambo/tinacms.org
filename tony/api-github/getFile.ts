import { SourceProviderConnection } from './sourceProviderConnection'
import path from 'path'
import { getDecodedData } from './getDecodedData'

export const getFile = async (
  filePath: string,
  sourceProviderConnection: SourceProviderConnection,
  accessToken: string
) => {
  const response = await getDecodedData(
    sourceProviderConnection.forkFullName,
    sourceProviderConnection.headBranch || 'master',
    filePath,
    accessToken
  )

  return {
    sha: response.sha,
    contents: response.content,
  }
}
