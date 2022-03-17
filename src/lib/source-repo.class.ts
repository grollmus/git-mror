import {CliUx, Errors} from '@oclif/core'
import Repo from './repo.class'
import {removeOriginPath} from './string.helper'

interface BranchMergeList {
  source: string
  destination: string
}

export default class SourceRepo extends Repo {
  targetName = 'source'

  async checkoutBranch(branchName: string): Promise<void> {
    const currentBranch = (await this.repo.branch()).current
    try {
      this.repo.checkoutBranch(branchName, currentBranch)
    } catch (error: unknown) {
      const err = error as Error
      Errors.error(err)
    }
  }

  async getBranches(): Promise<BranchMergeList[]> {
    const originBranchList = (await this.repo.branch(['-r'])).all
    return this.generateBranchMergeList(originBranchList)
  }

  private generateBranchMergeList(branches: string[]): BranchMergeList[] {
    return branches.map(branch => ({
      source: branch,
      destination: removeOriginPath(branch),
    }))
  }
}
