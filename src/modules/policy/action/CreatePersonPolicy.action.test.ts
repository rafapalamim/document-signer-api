import { describe } from '@jest/globals'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'
import { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import { PolicyActionsEnum } from './Policy.action'
import CreatePersonPolicyAction from './CreatePersonPolicy.action'

describe('Create person policy action unit test', () => {

    test('Should be able to create a new person policy with an action', async () => {
        
        const repo = new IMPolicyRepository()
        const action = new CreatePersonPolicyAction(repo)

        expect(action.name).toEqual(PolicyActionsEnum.CREATE_PERSON_POLICY)

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
            type: PolicyTypeEnum.PERSON,
            periodType: PolicyPeriodTypeEnum.MONTH,
            periodValue: 16
        })

        expect(policy.id.length).toEqual(36)
    })

})