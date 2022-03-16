import {CliUx} from '@oclif/core'
import Repo from './repo.class'

export default class SourceRepo extends Repo {
  targetName = 'source'

  async getBranches(): Promise<string[]> {
    CliUx.ux.action.start('Fetch all remote branches')
    await this.repo.fetch(['--all'])
    CliUx.ux.action.stop('✔')
    return (await this.repo.branch()).all
  }
}
