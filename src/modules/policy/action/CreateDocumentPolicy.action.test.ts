import { describe } from '@jest/globals'
import CreateDocumentPolicyAction from './CreateDocumentPolicy.action'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'
import { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import { PolicyActionsEnum } from './Policy.action'

describe('Create document policy action unit test', () => {

    test('Should be able to create a new document policy with an action', async () => {
        
        const repo = new IMPolicyRepository()
        const action = new CreateDocumentPolicyAction(repo)

        expect(action.name).toEqual(PolicyActionsEnum.CREATE_DOCUMENT_POLICY)

        const policy = await action.execute({
            name: 'Policy name',
            description: 'Policy description',
            periodType: PolicyPeriodTypeEnum.MONTH,
            periodValue: 16
        })

        expect(policy).toStrictEqual({
            id: expect.any(String),
            name: 'Policy name',
            description: 'Policy description',
            type: PolicyTypeEnum.DOCUMENT,
            periodType: PolicyPeriodTypeEnum.MONTH,
            periodValue: 16
        })

        expect(policy.id.length).toEqual(36)
    })

})