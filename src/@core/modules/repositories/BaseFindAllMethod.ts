export type BaseFindAllMethod<T> = {
    withDeleted?: boolean,
    orderBy?: {[x: string]: 'asc' | 'desc'}[],
    data?: T
}