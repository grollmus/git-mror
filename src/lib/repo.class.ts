import {CliUx} from '@oclif/core'
import simpleGit, {SimpleGit} from 'simple-git'

interface RepoInit {
  repoUrl: string
  workingDirectory: string
}

export default abstract class Repo {
  targetName!: string
  isCloned = false

  private repo!: SimpleGit
  private repoUrl: string
  private workingDirectory: string

  constructor(args: RepoInit) {
    this.repoUrl = args.repoUrl
    this.workingDirectory = args.workingDirectory
  }

  async init() {
    CliUx.ux.action.start(`setup ${this.targetName} working directory`)
    this.repo = simpleGit(this.workingDirectory)
    CliUx.ux.action.stop('✔')

    CliUx.ux.action.start(`clone ${this.targetName} repository`)
    await this.repo.clone(this.repoUrl, './')
    this.isCloned = true
    CliUx.ux.action.stop('✔')
  }
}
