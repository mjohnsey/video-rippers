import * as fs from 'fs'
import {GetPlatform} from '../utils'

export default class MakeMKV {
  static DefaultInstallationLocation(): string {
    const platform = GetPlatform()
    switch (platform) {
    case 'darwin':
      return '/Applications/MakeMKV.app/Contents/MacOS/makemkvcon'
    case 'linux':
      throw new Error('MakeMKV not supported on Linux')
    case 'wsl':
      return this.WslInstallationLocation()
    case 'win32':
      return 'C:\\Program Files (x86)\\MakeMKV\\makemkvcon64'
    default:
      throw new Error(`Do not recognize platform: ${platform}`)
    }
  }

  static WslInstallationLocation(): string {
    return "/mnt/c/Program Files (x86)/MakeMKV/makemkvcon64.exe"
  }

  static IsInstalled(location: string = this.DefaultInstallationLocation()): boolean {
    return fs.existsSync(location)
  }
}
