import BaseUpdateUseCase from '../../../@core/domain/use-case/BaseUpdateUseCase'
import Policy, { PolicyPeriodTypeEnum } from '../Policy'
import PolicyRepository from '../PolicyRepository'

type UpdatePolicyInputDTO = {
    name?: string,
    description?: string,
    periodType?: PolicyPeriodTypeEnum,
    periodValue?: number
}

export default class UpdatePolicyUC implements BaseUpdateUseCase<string, Policy, UpdatePolicyInputDTO> {

    constructor(private readonly repository: PolicyRepository) { }

    async execute(id: string, newData: UpdatePolicyInputDTO): Promise<Policy> {

        const policy = await this.repository.findById(id)

        const newPolicy = new Policy({
            id: policy.id,
            name: newData.name ?? policy.name,
            description: newData.description ?? policy.description,
            type: policy.type,
            periodType: newData.periodType ?? policy.periodType,
            periodValue: newData.periodValue ?? policy.periodValue,
            version: policy.version,
            createdAt: policy.createdAt
        })

        newPolicy.updateVersion()
                        
        await this.repository.save(newPolicy)
        return newPolicy
    }

}