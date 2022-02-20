/* eslint-disable no-useless-escape */
/* eslint-disable unicorn/better-regex */
const REPO_REGEX =
  /((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:\/\-~]+)(\.git)(\/)?/

export const isValidRepoUrl = (repoUrl: string): boolean =>
  REPO_REGEX.test(repoUrl)
