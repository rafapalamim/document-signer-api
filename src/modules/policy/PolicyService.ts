import { randomUUID } from 'crypto'
import Policy, { PolicyTypeEnum } from './Policy'
import PolicyRepository from './PolicyRepository'
import { CreateNewDocumentPolicyInputDTO, CreateNewDocumentPolicyOutputDTO } from './dto/CreateNewDocumentPolicyDTO'
import { CreateNewPersonPolicyInputDTO, CreateNewPersonPolicyOutputDTO } from './dto/CreateNewPersonPolicyDTO'
import { UpdatePolicyInputDTO, UpdatePolicyOutputDTO } from './dto/UpdatePolicyDTO'

export default class PolicyService {

    constructor(private readonly policyRepository: PolicyRepository) { }

    async createNewDocumentPolicy(data: CreateNewDocumentPolicyInputDTO): Promise<CreateNewDocumentPolicyOutputDTO> {

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

        return {
            id: policy.id,
            name: policy.name,
            description: policy.description,
            type: policy.type,
            periodType: policy.periodType,
            periodValue: policy.periodValue
        }
    }

    async createNewPersonPolicy(data: CreateNewPersonPolicyInputDTO): Promise<CreateNewPersonPolicyOutputDTO> {

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

        return {
            id: policy.id,
            name: policy.name,
            description: policy.description,
            type: policy.type,
            periodType: policy.periodType,
            periodValue: policy.periodValue
        }
    }

    async updatePolicy(id: string, newData: UpdatePolicyInputDTO): Promise<UpdatePolicyOutputDTO> {

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

        return {
            id: newPolicy.id,
            name: newPolicy.name,
            description: newPolicy.description,
            type: newPolicy.type,
            periodType: newPolicy.periodType,
            periodValue: newPolicy.periodValue
        }
    }

}