export default abstract class BaseError extends Error {

    httpError: number

    constructor(message: string, httpError: number) {
        super(message)
        this.httpError = httpError
    }

}