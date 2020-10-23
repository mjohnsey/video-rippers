import {Command} from '@oclif/command'

import {RipperServer} from '../server/ripper-server'
import {Config} from '../utils'

export default class Server extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ video-rippers server
`,
  ]

  static flags = {
  }

  static args = []

  async run() {
    const config = Config.loadConfig(this.config.configDir)
    const serverPort = config.ServerPort
    const server = new RipperServer()
    server.start(serverPort)
  }
}
