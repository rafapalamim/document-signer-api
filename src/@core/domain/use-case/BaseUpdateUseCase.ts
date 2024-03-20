export default interface BaseUpdateUseCase<I, M, D> {
    execute(id: I, newData: D): Promise<M>
}