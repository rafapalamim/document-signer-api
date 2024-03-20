export default interface RequestHandler<B, Q> {
    get body(): B
    get query(): Q
}