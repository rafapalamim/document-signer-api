import { BaseType } from './BaseType'

export default abstract class BaseModel<T extends BaseType<I>, I> {

    private readonly _id: I
    private readonly _createdAt: Date
    private _updatedAt: Date | null
    private _deletedAt: Date | null

    protected data: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

    constructor(props: T) {
        const { id, createdAt, updatedAt, deletedAt, ...fields } = props

        this._id = id
        this._createdAt = createdAt ?? new Date()
        this._updatedAt = updatedAt ?? null
        this._deletedAt = deletedAt ?? null

        this.data = fields
    }

    get id(): I {
        return this._id
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get updatedAt(): Date | null {
        return this._updatedAt
    }

    get deletedAt(): Date | null {
        return this._deletedAt
    }

    markAsUpdated(): void {
        this._updatedAt = new Date()
    }

    markAsDeleted(): void {
        this.markAsUpdated()
        this._deletedAt = new Date()
    }

}