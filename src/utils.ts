import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

export class Config {
  static loadConfig(configDir: string, configFileName: string = this.defaultFileName()): Config {
    const location = path.join(configDir, configFileName)
    const config = this.loadConfigFromFile(location)
    return config
  }

  static loadConfigFromFile(location: string): Config {
    const toml = require('toml')
    const data = fs.readFileSync(location)
    const tomlData = toml.parse(data)
    const libraryLocation = tomlData.library_location
    const serverPort = tomlData.server.port
    const makeMkvDefaultSource = tomlData.makemkv.default_source
    return new Config(location, libraryLocation, serverPort, makeMkvDefaultSource)
  }

  static defaultFileName(): string {
    return 'config.toml'
  }

  public ConfigLocation: string
  public LibraryLocation: string
  public ServerPort: number
  public MakeMKVDefaultSource: string

  constructor(location: string, libraryLocation: string, serverPort: number, makeMkvDefaultSource: string) {
    this.ConfigLocation = location
    this.LibraryLocation = libraryLocation
    this.ServerPort = serverPort
    this.MakeMKVDefaultSource = makeMkvDefaultSource
  }
}

export function ListAllDirs(root: string): any {
  const foo = fs.readdirSync(root, {withFileTypes: true})
  const dirs: string[] = []
  foo.forEach(childDir => {
    if (childDir.isDirectory()) {
      dirs.push(path.join(root, childDir.name))
    }
  })
  return dirs
}

export function GetPlatform(): string {
  let platform = process.platform.toString()
  if (platform === 'linux' && os.release().toLowerCase().includes('microsoft')) {
    platform = 'wsl'
  }
  return platform
}
