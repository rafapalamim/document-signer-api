export type BaseType<I> = {
    id: I,
    createdAt?: Date,
    updatedAt?: Date | null,
    deletedAt?: Date | null
}