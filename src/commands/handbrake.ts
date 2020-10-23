import { Command } from '@oclif/command'
import * as fs from 'fs'
import * as path from 'path'
import * as _ from 'lodash'

import { Config } from '../utils'

export default class HandbrakeCmd extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ video-rippers server
`,
  ]

  static flags = {
  }

  static args = [{
    name: 'input',
    required: true,
    description: 'input file',
    parse: (input: any) => {
      if (!fs.existsSync(input)) {
        throw new Error('input file does not exist')
      }
      const ext = path.extname(input)
      const videoExtensions = ['.avi', '.divx', '.m4v', '.mkv', '.mp4']
      if(!_.includes(videoExtensions, ext)) {
        throw new Error(`input file is not a video file must be one of: ${videoExtensions}`)
      }
      return input
    }
  }, {
    name: 'output',
    required: true,
    description: 'output file'
  },
  {
    name: 'preset',
    required: false,
    default: 'Fast 1080p30',
    description: 'HandbrakeCLI preset to use'
  }
  ]

  async run() {
    const config = Config.loadConfig(this.config.configDir)
    const { args } = this.parse(HandbrakeCmd)
    console.log(config)
    console.log(args)
    const inputFileName = args.input
    const outputFileName = args.output
    const preset = args.preset
    // https://github.com/sindresorhus/execa
    // HandBrakeCLI -i ${input_file} -o ${output_file} --all-audio --preset "${preset}"
    const hbFlags = {'-i': inputFileName, '-o': outputFileName, '--preset': preset, '--all-audio': true}
  }
}
