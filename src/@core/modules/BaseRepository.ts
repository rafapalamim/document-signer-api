export default interface BaseRepository<M, I> {
    save(model: M): Promise<void>
    findById(id: I): Promise<M>
    delete(id: I): Promise<void>
}