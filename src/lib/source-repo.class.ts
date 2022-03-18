import {CliUx, Errors} from '@oclif/core'
import {copyFileSync} from 'fs-extra'
import {glob} from 'glob'
import Repo from './repo.class'
import {removeOriginPath} from './string.helper'

interface BranchMergeList {
  source: string
  destination: string
}

export default class SourceRepo extends Repo {
  targetName = 'source'

  async copyTo(destinationPath: string) {
    CliUx.ux.log(`copyTo() ${destinationPath}`)
    glob.sync(
      `${this.workingDirectory}/**/*`,
      {ignore: '.git'}).map(
       (file: string) => {
          const fileToCopy = typeof file === 'string' ? file : ''
          const destinationToCopy = fileToCopy.replace(
            this.workingDirectory,
            destinationPath,
          )
          CliUx.ux.log(`From: ${fileToCopy}`)
          CliUx.ux.log(`To: ${destinationToCopy}`)
          copyFileSync(fileToCopy, destinationToCopy)
        
      },
    )
  }

  async checkoutBranch(branchName: string): Promise<void> {
    try {
      this.repo.checkout(branchName, ['--track'])
    } catch (error: unknown) {
      const err = error as Error
      CliUx.ux.error(err)
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
