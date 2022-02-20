import {Command, Flags} from '@oclif/core'
import {tmpdir} from 'node:os'
import {mkdir} from 'node:fs'
import {join} from 'node:path'
import simpleGit from 'simple-git'
import {isValidRepoUrl} from '../../lib/repository-helper'

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

    if (trimedSource === trimedDestination)
      this.error('Source and destination are equal, they must be different.')
    else if (!isValidRepoUrl(trimedSource))
      this.error('Source is not an valid repository url.')
    else if (!isValidRepoUrl(trimedDestination))
      this.error('Destination is not an valid repository url.')

    this.log(tmpdir())

    mkdir(join(tmpdir(), 'mror'), (err) => {
      if (err) {
        return console.error(err)
      }

      this.log(`Tempfolder created: ${tmpdir}/mror`)
    })

    // simpleGit().clone(trimedSource, tmpdir())
  }
}
