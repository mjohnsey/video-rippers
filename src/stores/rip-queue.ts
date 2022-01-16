import * as _ from 'lodash'
import {v4 as uuidv4} from 'uuid'

export enum ProcessingStatus {
    Todo = 'TODO',
    InProgress = 'In Progress',
    Error = 'Error',
    Done = 'Done'
}

class InMemoryRipQueue {
    private entries: any[]

    constructor(){
        this.entries = []
    }

    push(movie: any) {
        const theMovie = _.find(this.entries, e => e.title === movie.title)
        if (theMovie) {
            throw new Error(`movie already queued under guid: ${theMovie.guid}`)
        }
        movie.status = ProcessingStatus.Todo
        movie.guid = uuidv4()
        movie.lastUpdate = new Date().toISOString()
        this.entries.push(movie)
        return movie.guid
    }

    getAll() {
        return this.entries
    }

    getMovie(guid: any) {
        const theMovie = _.find(this.entries, e => e.guid === guid)
        if (!theMovie) {
            throw new Error('could not find that guid')
        }
        return theMovie
    }

    setStatus(guid: any, status: ProcessingStatus) {
        const theMovie = _.find(this.entries, e => e.guid === guid)
        if (!theMovie) {
            throw new Error('could not find that guid')
        }
        theMovie.status = status
        theMovie.lastUpdated = new Date()
        return theMovie.lastUpdated
    }
}

export class RipQueueStore {
    private queue: InMemoryRipQueue

    constructor() {
        this.queue = new InMemoryRipQueue()
    }

    addMovieToQueue(movie: any) {
        return this.queue.push(movie)
    }

    getQueue() {
        const entries = this.queue.getAll()
        return entries
    }

    getMovie(guid: string) {
        const movie = this.queue.getMovie(guid)
        return movie
    }
}