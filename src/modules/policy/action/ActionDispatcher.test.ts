import { describe } from '@jest/globals'
import CreateDocumentPolicyAction from './CreateDocumentPolicy.action'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'
import { CreateNewDocumentPolicyInputDTO, CreateNewDocumentPolicyOutputDTO } from '../dto/CreateNewDocumentPolicyDTO'
import { PolicyPeriodTypeEnum } from '../Policy'
import { PolicyActionsEnum } from './Policy.actions'
import ActionDispatcher from '../../../@core/modules/actions/ActionDispatcher'

describe('Action dispatcher test', () => {
    test('Should run', async () => {

        const repo = new IMPolicyRepository()
        const dispatcher = new ActionDispatcher([
            new CreateDocumentPolicyAction(repo)
        ])

        const result = await dispatcher.run<CreateNewDocumentPolicyInputDTO, CreateNewDocumentPolicyOutputDTO>(
            PolicyActionsEnum.CREATE_DOCUMENT_POLICY,
            {
                name: 'test',
                description: 'test d',
                periodType: PolicyPeriodTypeEnum.YEAR,
                periodValue: 5
            }
        )

        console.log(result)

    })
})