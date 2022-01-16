import {Controller, Get, Middleware, Post} from '@overnightjs/core'
import {Logger} from '@overnightjs/logger'
import {Request, Response} from 'express'
import {OK} from 'http-status-codes'
import {RipQueueStore} from '../../stores/rip-queue'

@Controller('queue')
export default class RipQueueController {
  private queueStore: RipQueueStore
  constructor() {
    this.queueStore = new RipQueueStore()
  }

  @Get(':guid')
  private get(req: Request, res: Response) {
    const guid = req.params.guid
    Logger.Info(`GET /${guid}`)
    try {
      const movie = this.queueStore.getMovie(guid)
      const result: any = {}
      result.currentTime = new Date().toISOString()
      result.movie = movie
      return res.status(OK).json(result)
    } catch (error) {
      return res.status(500).json({currentTime: new Date().toISOString(), error: error.toString()})
    }
  }

  
  @Get('')
  private getAll(_req: Request, res: Response) {
    Logger.Info('GET /')
    const result: any = {}
    result.currentTime = new Date().toISOString()
    result.entries = this.queueStore.getQueue()
    result.todo = []
    result.inProgress = []
    return res.status(OK).json(result)
  }

  @Post('')
  private addMovieToQueue(req: Request, res: Response) {
    Logger.Info('POST /')
    Logger.Info(req.body, true)
    const body = req.body
    const movie = body.movie
    const result: any = {}
    result.currentTime = new Date().toISOString()
    try {
      const guid = this.queueStore.addMovieToQueue(movie)
      result.guid = guid
      return res.status(OK).json(result)
    } catch(error: any) {
      Logger.Err(error)
      return res.status(500).json({currentTime: new Date().toISOString(), error: error.toString()})
    }
  }
}
