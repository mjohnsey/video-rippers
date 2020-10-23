import {Server as OvernightServer} from '@overnightjs/core'
import {Logger} from '@overnightjs/logger'
import * as bodyParser from 'body-parser'

import BaseController from './controllers/base'
import RipQueueController from './controllers/rip-queue'

export class RipperServer extends OvernightServer {
  constructor() {
    super()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: true}))
    this.setupControllers()
  }

  public start(port: number = 8080): void {
    this.app.listen(port, () => {
      Logger.Imp(`Server running: http://localhost:${port}`)
    })
  }

  private setupControllers(): void {
    const controllers = []
    controllers.push(new RipQueueController())
    controllers.push(new BaseController())
    super.addControllers(controllers)
  }
}
