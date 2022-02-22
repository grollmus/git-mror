import {CliUx, Command, Flags} from '@oclif/core'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import path = require('node:path')
import simpleGit from 'simple-git'
import {prepareWorkingDirectory} from '../../lib/file-system.helper'
import {isValidRepoUrl} from '../../lib/repository.helper'

export default class It extends Command {
  static description = 'Mirror an repository'

  static examples = [
    '$ mror it -s git@repo.com:source-project.git -d git@repo.com:destination-project.git',
  ]

  static flags = {
    source: Flags.string({
      char: 's',
      description: 'Source repository',
      required: true,
    }),
    destination: Flags.string({
      char: 'd',
      description: 'Destination repository',
      required: true,
    }),
    workingdirectory: Flags.string({
      char: 'w',
      description: 'Custom working directory. Default: System temp folder.',
      required: false,
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(It)

    const trimedSource = flags.source.trim()
    const trimedDestination = flags.destination.trim()
    const trimedWorkingDirectory = flags.workingdirectory?.trim()

    if (trimedSource === trimedDestination)
      this.error('Source and destination are equal, they must be different.')
    else if (!isValidRepoUrl(trimedSource))
      this.error('Source is not an valid repository url.')
    else if (!isValidRepoUrl(trimedDestination))
      this.error('Destination is not an valid repository url.')

    const workingDirectories = await prepareWorkingDirectory(
      trimedWorkingDirectory ?? path.join(tmpdir(), this.config.name),
    )

    CliUx.ux.action.start('clone source repository')
    const sourceRepository = await simpleGit(
      join(workingDirectories.basePath, workingDirectories.sourceRepoDirectory),
    )
    await sourceRepository.clone(trimedSource, './')
    CliUx.ux.action.stop('✔')

    CliUx.ux.action.start('clone source repository')
    const branch = await sourceRepository.branch()
    const allBranches = branch.all
    this.log('branch:', branch)
    CliUx.ux.action.stop('✔')

    CliUx.ux.action.start('clone destination repository')
    const destinationRepository = await simpleGit(
      join(
        workingDirectories.basePath,
        workingDirectories.destinationRepoDirectory,
      ),
    ).clone(trimedDestination, './')
    CliUx.ux.action.stop('✔')
  }
}
