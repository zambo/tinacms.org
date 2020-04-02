export interface SourceProviderConnection {
  forkFullName: string
  headBranch: string
  baseRepoFullName: string
}

export interface PreviewData {
  fork_full_name: string
  head_branch: string
  github_access_token: string
}
