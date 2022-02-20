import {existsSync, mkdirSync, readdirSync} from 'node:fs'
import {emptyDirSync} from 'fs-extra'
import {join} from 'node:path'
import {WorkingDirectories} from './interfaces/working-directories.interface'
import {CliUx} from '@oclif/core'

export const prepareWorkingDirectory = (
  workingDirectory: string,
): WorkingDirectories => {
  CliUx.ux.action.start('prepare working directory')

  if (!existsSync(workingDirectory)) mkdirSync(workingDirectory)
  if (readdirSync(workingDirectory).length > 0) emptyDirSync(workingDirectory)

  const sourceRepoDirectory = join(workingDirectory, 'source-repo')
  const destinationRepoDirectory = join(workingDirectory, 'destination-repo')

  mkdirSync(sourceRepoDirectory)
  mkdirSync(destinationRepoDirectory)

  CliUx.ux.action.stop('✔')
  return {workingDirectory, sourceRepoDirectory, destinationRepoDirectory}
}
