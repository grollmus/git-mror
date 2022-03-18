import {existsSync, mkdirSync, readdirSync} from 'node:fs'
import {emptyDirSync} from 'fs-extra'
import {join, posix} from 'node:path'
import {WorkingDirectories} from './interfaces/working-directories.interface'
import {CliUx} from '@oclif/core'

const SOURCE_DIR_NAME = 'source-repo'
const DESTINATION_DIR_NAME = 'destination-repo'

export const prepareWorkingDirectory = (
  workingDirectory: string,
): WorkingDirectories => {
  CliUx.ux.action.start('prepare working directory')

  if (!existsSync(workingDirectory)) mkdirSync(workingDirectory)
  if (readdirSync(workingDirectory).length > 0) emptyDirSync(workingDirectory)

  mkdirSync(posix.join(workingDirectory, SOURCE_DIR_NAME))
  mkdirSync(posix.join(workingDirectory, DESTINATION_DIR_NAME))

  CliUx.ux.action.stop('✔')
  return {
    basePath: posix.join(workingDirectory, ""),
    sourceRepoDirectory: SOURCE_DIR_NAME,
    destinationRepoDirectory: DESTINATION_DIR_NAME,
  }
}
