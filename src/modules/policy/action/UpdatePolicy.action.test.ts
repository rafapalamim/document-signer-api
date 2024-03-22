import { describe } from '@jest/globals'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'
import { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import { PolicyActionsEnum } from './Policy.action'
import CreatePersonPolicyAction from './CreatePersonPolicy.action'
import UpdatePolicyAction from './UpdatePolicy.action'

describe('Update policy action unit test', () => {

    test('Should be able to update a policy with an action', async () => {

        const repo = new IMPolicyRepository()
        const action = new CreatePersonPolicyAction(repo)

        const policy = await action.execute({
            name: 'Policy name',
            description: 'Policy description',
            periodType: PolicyPeriodTypeEnum.MONTH,
            periodValue: 16
        })

        const updateAction = new UpdatePolicyAction(repo)
        expect(updateAction.name).toEqual(PolicyActionsEnum.UPDATE_POLICY)

        const updatedAction = await updateAction.execute({
            id: policy.id,
            name: 'New name',
            description: 'New description',
            periodType: PolicyPeriodTypeEnum.YEAR,
            periodValue: 5
        })

        expect(updatedAction).toStrictEqual({
            id: policy.id,
            name: 'New name',
            description: 'New description',
            type: PolicyTypeEnum.PERSON,
            periodType: PolicyPeriodTypeEnum.YEAR,
            periodValue: 5
        })

        const findAllPolicies = await repo.findAll({ withDeleted: true })

        expect(findAllPolicies.length).toBe(2)
        expect(findAllPolicies[0].deletedAt).not.toBeNull()
        expect(findAllPolicies[1].deletedAt).toBeNull()
    })

})