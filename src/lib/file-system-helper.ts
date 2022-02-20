import {existsSync, mkdirSync, readdirSync} from 'node:fs'
import {emptyDirSync} from 'fs-extra'
import {join} from 'node:path'

export const prepareWorkingDirectory = (workingDirectory: string): string => {
  if (!existsSync(workingDirectory)) mkdirSync(workingDirectory)
  if (readdirSync(workingDirectory).length > 0) emptyDirSync(workingDirectory)

  mkdirSync(join(workingDirectory, 'source-repo'))
  mkdirSync(join(workingDirectory, 'destination-repo'))

  return workingDirectory
}
