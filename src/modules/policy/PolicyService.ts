import { randomUUID } from 'crypto'
import Policy, { PolicyTypeEnum } from './Policy'
import PolicyRepository from './PolicyRepository'
import { CreateNewDocumentPolicyInputDTO } from './dto/CreateNewDocumentPolicyDTO'
import { CreateNewPersonPolicyInputDTO } from './dto/CreateNewPersonPolicyDTO'
import { UpdatePolicyInputDTO } from './dto/UpdatePolicyDTO'

export default class PolicyService {

    constructor(private readonly policyRepository: PolicyRepository) { }

    async createNewDocumentPolicy(data: CreateNewDocumentPolicyInputDTO): Promise<Policy> {

        const policy = new Policy({
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            type: PolicyTypeEnum.DOCUMENT,
            periodType: data.periodType,
            periodValue: data.periodValue,
            version: 1
        })

        await this.policyRepository.save(policy)
        return policy

    }

    async createNewPersonPolicy(data: CreateNewPersonPolicyInputDTO): Promise<Policy> {

        const policy = new Policy({
            id: randomUUID(),
            name: data.name,
            description: data.description ?? null,
            type: PolicyTypeEnum.PERSON,
            periodType: data.periodType,
            periodValue: data.periodValue,
            version: 1
        })

        await this.policyRepository.save(policy)
        return policy
    }

    async updatePolicy(id: string, newData: UpdatePolicyInputDTO): Promise<Policy> {

        const policy = await this.policyRepository.findById(id)

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

        await this.policyRepository.save(newPolicy)
        return newPolicy

    }

}