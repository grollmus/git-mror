import {CliUx, Command, Flags} from '@oclif/core'
import {tmpdir} from 'node:os'
import {join, posix} from 'node:path'
import path = require('node:path')
import simpleGit from 'simple-git'
import DestinationRepo from '../../lib/destination-repo.class'
import {prepareWorkingDirectory} from '../../lib/file-system.helper'
import {isValidRepoUrl} from '../../lib/repository.helper'
import SourceRepo from '../../lib/source-repo.class'

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
      trimedWorkingDirectory ?? posix.join(tmpdir(), this.config.name),
    )

    const sourceRepo = new SourceRepo({
      repoUrl: trimedSource,
      workingDirectory: posix.join(
        workingDirectories.basePath,
        workingDirectories.sourceRepoDirectory,
      ),
    })

    this.log("workingDirectories", workingDirectories)

    await sourceRepo.init(['--depth', '1', '--no-single-branch'])

    const destinationRepo = new DestinationRepo({
      repoUrl: trimedDestination,
      workingDirectory: posix.join(
        workingDirectories.basePath,
        workingDirectories.destinationRepoDirectory,
      ),
    })

    await destinationRepo.init()

    const allSourceBranches = await sourceRepo.getBranches()
    const branchCount = allSourceBranches.length

    for (const [index, branch] of allSourceBranches.entries()) {
      CliUx.ux.action.start(
        `[${index + 1} of ${branchCount}] do the magic with '${
          branch.destination
        }'`,
      )
      await sourceRepo.checkoutBranch(branch.source)
      await destinationRepo.checkoutLocalBranch(branch.destination)
      await destinationRepo.cleanRepo()
      this.log("destinationRepo.workingDirectory", destinationRepo.workingDirectory)
      await sourceRepo.copyTo(destinationRepo.workingDirectory)
      CliUx.ux.action.stop('✔')
    }
  }
}
