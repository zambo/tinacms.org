import path from 'path'

export const getPath = (filePath: string) => {
  const directory = path.join(process.cwd(), filePath)
  return directory
}
