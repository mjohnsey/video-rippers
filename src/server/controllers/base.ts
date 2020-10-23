import {Controller, Get} from '@overnightjs/core'
import {Logger} from '@overnightjs/logger'
import {Request, Response} from 'express'
import {OK} from 'http-status-codes'

import Handbrake from '../../models/handbrake'
import MakeMKV from '../../models/makemkv'

@Controller('/')
export default class BaseController {
  public HandbrakeLocation: string
  public MakeMKVLocation: string

  constructor(handbrakeLocation: string = Handbrake.DefaultInstallationLocation(), makemkvLocation: string = MakeMKV.DefaultInstallationLocation()) {
    this.HandbrakeLocation = handbrakeLocation
    this.MakeMKVLocation = makemkvLocation
  }

  @Get('')
  private get(_req: Request, res: Response) {
    Logger.Info('GET /')
    const result: any = {}
    result.server = {
      platform: process.platform,
      architecture: process.arch,
      nodeVersion: process.version
    }
    result.handbrake = {
      installed: Handbrake.IsInstalled(this.HandbrakeLocation),
      location: this.HandbrakeLocation

    }

    result.makemkv = {}
    try {
      result.makemkv.installed = MakeMKV.IsInstalled(this.MakeMKVLocation)
      result.makemkv.location = this.MakeMKVLocation
    } catch (err) {
      Logger.Info(err)
      result.makemkv.installed = false
      result.makemkv.location = null
    }

    return res.status(OK).json(result)
  }
}
