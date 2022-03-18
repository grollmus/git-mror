import { CliUx } from '@oclif/core'
import * as del from 'del'
import Repo from './repo.class'

export default class DestinationRepo extends Repo {
  targetName = 'destination'

  async checkoutLocalBranch(branchName: string): Promise<void> {
    await this.repo.checkoutLocalBranch(branchName)
  }
  
  async cleanRepo() {
    await del.sync([`${this.workingDirectory}/**/*`, `!${this.workingDirectory}/.git/**/*`])
  }
}
