import {existsSync, mkdirSync, readdirSync} from 'node:fs'
import {emptyDirSync} from 'fs-extra'
import {join} from 'node:path'
import {WorkingDirectories} from './interfaces/working-directories.interface'

export const prepareWorkingDirectory = (
  workingDirectory: string,
): WorkingDirectories => {
  if (!existsSync(workingDirectory)) mkdirSync(workingDirectory)
  if (readdirSync(workingDirectory).length > 0) emptyDirSync(workingDirectory)

  const sourceRepoDirectory = join(workingDirectory, 'source-repo')
  const destinationRepoDirectory = join(workingDirectory, 'destination-repo')

  mkdirSync(sourceRepoDirectory)
  mkdirSync(destinationRepoDirectory)

  return {workingDirectory, sourceRepoDirectory, destinationRepoDirectory}
}
