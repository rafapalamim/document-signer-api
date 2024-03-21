import { randomUUID } from 'crypto'
import Policy, { PolicyTypeEnum } from '../Policy'
import { CreateNewDocumentPolicyInputDTO, CreateNewDocumentPolicyOutputDTO } from '../dto/CreateNewDocumentPolicyDTO'
import PolicyRepository from '../PolicyRepository'
import Action from '../../../@core/modules/actions/Action'

export default class CreateDocumentPolicyAction extends Action {

    constructor(private readonly repository: PolicyRepository) {
        super('CREATE_DOCUMENT_POLICY')
    }

    async execute(data: CreateNewDocumentPolicyInputDTO): Promise<CreateNewDocumentPolicyOutputDTO> {
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