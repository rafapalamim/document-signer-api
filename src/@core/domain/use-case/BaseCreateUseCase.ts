export default interface BaseCreateUseCase<T, M> {
    execute(data: T) : Promise<M>
}