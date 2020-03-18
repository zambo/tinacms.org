import path from 'path'

export const getPath = (filePath: string) => {
  const directory = path.resolve(process.cwd(), filePath)
  return directory
}
