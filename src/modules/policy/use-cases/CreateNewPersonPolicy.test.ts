import {describe, test, expect} from '@jest/globals'
import CreateNewPersonPolicyUC from './CreateNewPersonPolicy'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'

describe('Create new person policy DOMAIN UC unit tests', () => {

    test('Should be able to create a new policy with a use case', async () => {

        const input = {
            name: 'Person policy',
            periodType: PolicyPeriodTypeEnum.DAY,
            periodValue: 3
        }

        const repo = new IMPolicyRepository()
        const uc = new CreateNewPersonPolicyUC(repo)

        const policy = await uc.execute(input)

        expect(policy).toBeInstanceOf(Policy)
        expect(policy.id.length).toEqual(36)
        expect(policy.name).toEqual(input.name)
        expect(policy.description).toBeNull()
        expect(policy.type).toEqual(PolicyTypeEnum.PERSON)
        expect(policy.periodType).toEqual(input.periodType)
        expect(policy.periodValue).toEqual(input.periodValue)
        expect(policy.version).toEqual(1)
    })

})