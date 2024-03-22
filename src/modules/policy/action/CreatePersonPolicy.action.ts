import { randomUUID } from 'crypto'
import Policy, { PolicyTypeEnum } from '../Policy'
import Action from '../../../@core/actions/Action'
import { CreateNewPersonPolicyInputDTO, CreateNewPersonPolicyOutputDTO } from '../dto/CreateNewPersonPolicyDTO'
import { PolicyActionsEnum } from './Policy.action'
import { PolicyRepository } from '../PolicyRepository'

export default class CreatePersonPolicyAction extends Action {

    constructor(private readonly repository: PolicyRepository) {
        super(PolicyActionsEnum.CREATE_PERSON_POLICY)
    }

    async execute(data: CreateNewPersonPolicyInputDTO): Promise<CreateNewPersonPolicyOutputDTO> {
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

        return {
            id: policy.id,
            name: policy.name,
            description: policy.description,
            type: policy.type,
            periodType: policy.periodType,
            periodValue: policy.periodValue
        }
    }

}