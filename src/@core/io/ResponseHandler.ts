export default interface ResponseHandler {
    status(code: number | string): this
    contentType(contentType: string): this
    send(data: object): void
}