import {Controller, Get} from '@overnightjs/core'
import {Logger} from '@overnightjs/logger'
import {Request, Response} from 'express'
import {OK} from 'http-status-codes'

@Controller('queue')
export default class RipQueueController {
  constructor() {
  }

  @Get('')
  private get(_req: Request, res: Response) {
    Logger.Info('GET /')
    const result: any = {}
    result.foo = 'hello'
    return res.status(OK).json(result)
  }
}
