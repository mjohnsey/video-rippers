import {Command} from '@oclif/command'
import * as fs from 'fs'
import * as _ from 'lodash'

import {Config} from '../utils'

export abstract class MakeMkvOutputMsg {
  static KnownMessageTypes() {
    return ['MSG', 'PRGC', 'PRGT', 'PRGV', 'DRV', 'TCOUT', 'CINFO', 'TINFO', 'SINFO', 'DRV']
  }

  static MessageTypeParseRegex(): RegExp {
    const knowMessageKeySizes = _.uniq(_.map(MakeMkvOutputMsg.KnownMessageTypes(), key => key.length))
    const minNumOfLetters = _.min(knowMessageKeySizes) || 0
    const maxNumOfLetters = _.max(knowMessageKeySizes) || 0
    let regex = '^('
    for (let index = 0; index < maxNumOfLetters; index++) {
      if (index < minNumOfLetters) {
        regex += '\\w'
      } else {
        regex += '\\w?'
      }
    }
    regex += '):(.*)'
    return new RegExp(regex)
  }
}

export class MakeMkvMsg {
  static MsgKey = 'MSG'

  static FromParsedLine(fields: string[]) {
    const code = fields.shift() || ''
    const flags = fields.shift() || ''
    const count = parseInt(fields.shift() || '0', 10)
    const message = fields.shift() || ''
    const format = fields.shift() || ''
    return new MakeMkvMsg(code, flags, count, message, format, fields)
  }

  public Code: string
  public Flags: string
  public ParamCount: number
  public Message: string
  public Format: string
  public Params: string[]

  constructor(code: string, flags: string, count: number, message: string, format: string, params: string[]) {
    this.Code = code
    this.Flags = flags
    this.ParamCount = count
    this.Message = message
    this.Format = format
    this.Params = params
  }
}

export class MakeMkv {
  static InfoParse(infoTxt: string) {
    const info: {[msgType: string]: string[][]} = {}
    const lines = _.filter(_.split(infoTxt, '\r\n').map(line => line.trim()), line => !_.isEmpty(line))
    const getTypeRegex = MakeMkvOutputMsg.MessageTypeParseRegex()
    _.each(lines, line => {
      const f = getTypeRegex.exec(line)
      if (f && f[1] && f[2]) {
        const msgType = f[1]
        if (!_.includes(MakeMkvOutputMsg.KnownMessageTypes(), msgType)) {
          throw new Error('Unknown message type')
        }
        const values = _.split(f[2], ',')
        if (!info[msgType]) {
          info[msgType] = []
        }
        info[msgType].push(values)
      }
    })
    return info
  }
}

export default class MakeMKVCmd extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ video-rippers server
`,
  ]

  static flags = {
  }

  static args = []

  static loadExampleDisc() {
    const exampleLocation = '/Users/mjohnsey/dev/src/github.com/mjohnsey/video-rippers/example_outputs/mkv_output.txt'
    return fs.readFileSync(exampleLocation).toString()
  }

  async run() {
    const config = Config.loadConfig(this.config.configDir)
    const defaultSource = config.MakeMKVDefaultSource
    // TODO: Add logic to override default source
    const source = defaultSource
    // TODO: make this dynamic
    const discInfo = MakeMKVCmd.loadExampleDisc()
    const foo = MakeMkv.InfoParse(discInfo)
    _.forEach(foo, (line, key) => {
      _.forEach(line, (field) => {
        if (key === MakeMkvMsg.MsgKey) { // Message output
          const msg = MakeMkvMsg.FromParsedLine(field)
          // console.log(msg)
        } else if (key === 'DRV') { //Drive scan messages
          console.log(field)
        } else {
          if (false) {
            console.log(key)
          }
        }
        // 'PRGC'
        // 'PRGT'
        // 'PRGV'
        // 'DRV'
        // 'TCOUT'
        // 'CINFO'
        // 'TINFO'
        // 'SINFO'
        // 'DRV'
      })
    })
  }
}
