import { randomUUID } from 'crypto'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import BaseCreateUseCase from '../../../@core/domain/use-case/BaseCreateUseCase'
import PolicyRepository from '../PolicyRepository'

export type CreateNewPersonPolicyInputDTO = {
    name: string,
    description?: string,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}

export default class CreateNewPersonPolicyUC implements BaseCreateUseCase<CreateNewPersonPolicyInputDTO, Policy> {

    constructor(private readonly repository: PolicyRepository) { }

    async execute(data: CreateNewPersonPolicyInputDTO): Promise<Policy> {
        
        const policy = new Policy({
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            type: PolicyTypeEnum.PERSON,
            periodType: data.periodType,
            periodValue: data.periodValue,
            version: 1
        })

        await this.repository.save(policy)

        return policy
    }
}