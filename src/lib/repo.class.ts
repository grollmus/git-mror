import {CliUx, Errors} from '@oclif/core'
import simpleGit, {Options, SimpleGit, TaskOptions} from 'simple-git'

interface RepoInit {
  repoUrl: string
  workingDirectory: string
}

export default abstract class Repo {
  targetName!: string
  isCloned = false
  repo!: SimpleGit
  workingDirectory: string

  private repoUrl: string

  constructor(args: RepoInit) {
    this.repoUrl = args.repoUrl
    this.workingDirectory = args.workingDirectory
  }

  async init(cloneOptions?: TaskOptions<Options>) {
    CliUx.ux.action.start(`setup ${this.targetName} working directory`)
    this.repo = simpleGit(this.workingDirectory)
    CliUx.ux.action.stop('✔')

    CliUx.ux.action.start(`clone ${this.targetName} repository`)
    await this.repo.clone(this.repoUrl, './', cloneOptions, error => {
      if (error) Errors.error(error)
    })
    this.isCloned = true
    CliUx.ux.action.stop('✔')
  }
}
