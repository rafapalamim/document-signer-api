import BaseError from './BaseError'

export default class DomainModelError extends BaseError {

    constructor(message: string, httpError: number) {
        super(message, httpError)
    }

}