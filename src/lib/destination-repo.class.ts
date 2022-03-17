import Repo from './repo.class'

export default class DestinationRepo extends Repo {
  targetName = 'destination'

  async checkoutLocalBranch(branchName: string): Promise<void> {
    await this.repo.checkoutLocalBranch(branchName)
  }
}
