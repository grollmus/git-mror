import Repo from './repo.class'

export default class SourceRepo extends Repo {
  targetName = 'source'

  async getBranches(): Promise<string[]> {
    return (await this.repo.branch()).all
  }
}
