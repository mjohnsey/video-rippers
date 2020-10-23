import * as fs from 'fs'

export default class Handbrake {
  static DefaultInstallationLocation(): string {
    const platform = process.platform
    switch (platform) {
    case 'darwin':
      return '/usr/local/bin/HandBrakeCLI'
    case 'linux':
      return '/usr/bin/HandBrakeCLI'
    case 'win32':
      return 'C:\\Program Files\\HandBrake\\HandBrakeCLI.exe'
    default:
      throw new Error(`Do not recognize platform: ${platform}`)
    }
  }

  static IsInstalled(location: string = this.DefaultInstallationLocation()): boolean {
    return fs.existsSync(location)
  }
}
