import RequestHandler from '../../@core/io/RequestHandler'
import PolicyService from './PolicyService'
import { CreateNewDocumentPolicyInputDTO } from './dto/CreateNewDocumentPolicyDTO'

export default class PolicyController {

    constructor(
        private readonly service: PolicyService
    ) { }

    async createDocumentPolicy(
        request: RequestHandler<CreateNewDocumentPolicyInputDTO, null>
    ): Promise<void> {

        const policy = await this.service.createNewDocumentPolicy(request.body)

    }

}