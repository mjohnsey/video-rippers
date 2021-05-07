import * as _ from 'lodash'
import * as Airtable from 'airtable'
import * as moment from 'moment'

export interface BaseIdDict {
  [name: string]: string
}

export class AirtableStore {
  private apiKey: string

  public baseIds: {[baseId: string]: string}

  public client: any

  constructor(apiKey: string, baseIds: BaseIdDict = {}) {
    this.apiKey = apiKey
    this.baseIds = baseIds
    this.client = new Airtable({apiKey: apiKey})
  }

  // https://airtable.com/tblx0VJ7yQ5x8CRMx/viwsw9OpeyrpVo9GW?blocks=hide
  public async getVideoQueue(videoQueueTableName = 'Video Queue') {
    const caffeineBaseID = this.baseIds.caffeine
    if (_.isEmpty(caffeineBaseID)) {
      throw new Error('caffeine baseID not set!')
    }
    const base = this.client.base(caffeineBaseID)
    const records = await base(videoQueueTableName).select().all()
    
    return {}
  }
}
