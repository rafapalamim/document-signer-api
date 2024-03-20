import Policy from '../../modules/policy/Policy'
import PolicyRepository from '../../modules/policy/PolicyRepository'

export default class IMPolicyRepository implements PolicyRepository {

    private rows: Policy[] = []

    async save(model: Policy): Promise<void> {
        await this.delete(model.id)
        this.rows.push(model)
    }

    async findById(id: string): Promise<Policy> {
        const find = this.rows.find((policy) => policy.id === id && policy.deletedAt === null)
        if (!find) throw new Error('Policy não encontrada')
        return find
    }

    async findAll(): Promise<Policy[]> {
        return this.rows.filter((policy) => policy.deletedAt !== null)
    }

    async delete(id: string): Promise<void> {
        this.rows.map((policy) => {
            if(policy.id === id && policy.deletedAt === null) policy.markAsDeleted()
        })
    }

}