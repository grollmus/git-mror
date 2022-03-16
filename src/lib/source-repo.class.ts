import {CliUx} from '@oclif/core'
import Repo from './repo.class'
import { removeOriginPath } from './string.helper'

interface BranchMergeList {
  source: string
  destination: string 
}

export default class SourceRepo extends Repo {
  targetName = 'source'

  clone(branchName: string) {
    this.repo.checkoutBranch(branchName)
  }

  async getBranches(): Promise<BranchMergeList[]> {
    const originBranchList = (await this.repo.branch(['-r'])).all
    return this.generateBranchMergeList(originBranchList)
  }

  private generateBranchMergeList(branches: string[]): BranchMergeList[] {
    return branches.map(branch => ({source: branch, destination: removeOriginPath(branch)}))
  }
}
