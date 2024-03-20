import { randomUUID } from 'crypto'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import BaseCreateUseCase from '../../../@core/domain/use-case/BaseCreateUseCase'
import PolicyRepository from '../PolicyRepository'

export type CreateNewDocumentPolicyInputDTO = {
    name: string,
    description?: string,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}

export default class CreateNewDocumentPolicyUC implements BaseCreateUseCase<CreateNewDocumentPolicyInputDTO, Policy> {

    constructor(private readonly repository: PolicyRepository) { }

    async execute(data: CreateNewDocumentPolicyInputDTO): Promise<Policy> {

        const policy = new Policy({
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            type: PolicyTypeEnum.DOCUMENT,
            periodType: data.periodType,
            periodValue: data.periodValue,
            version: 1
        })

        await this.repository.save(policy)

        return policy
    }

}