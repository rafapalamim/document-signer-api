import Policy from '../Policy'
import Action from '../../../@core/actions/Action'
import { UpdatePolicyInputDTO, UpdatePolicyOutputDTO } from '../dto/UpdatePolicyDTO'
import { PolicyActionsEnum } from './Policy.action'
import { PolicyRepository } from '../PolicyRepository'

export default class UpdatePolicyAction extends Action {

    constructor(private readonly repository: PolicyRepository) {
        super(PolicyActionsEnum.UPDATE_POLICY)
    }

    async execute(data: UpdatePolicyInputDTO): Promise<UpdatePolicyOutputDTO> {

        const policy = await this.repository.findById(data.id)

        const newPolicy = new Policy({
            id: policy.id,            
            type: policy.type,
            name: data.name ?? policy.name,
            description: data.description ?? policy.description,
            periodType: data.periodType ?? policy.periodType,
            periodValue: data.periodValue ?? policy.periodValue,
            version: policy.version
        })

        newPolicy.updateVersion()

        await this.repository.save(newPolicy)

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