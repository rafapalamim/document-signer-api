import {describe, test, expect} from '@jest/globals'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import CreateNewDocumentPolicyUC from './CreateNewDocumentPolicy'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'

describe('Create new document policy DOMAIN UC unit tests', () => {

    test('Should be able to create a new policy with a use case', async () => {

        const input = {
            name: 'Document policy',
            periodType: PolicyPeriodTypeEnum.YEAR,
            periodValue: 5,
            description: 'Description'
        }

        const repo = new IMPolicyRepository()
        const uc = new CreateNewDocumentPolicyUC(repo)

        const policy = await uc.execute(input)

        expect(policy).toBeInstanceOf(Policy)
        expect(policy.id.length).toEqual(36)
        expect(policy.name).toEqual(input.name)
        expect(policy.description).toEqual(input.description)
        expect(policy.type).toEqual(PolicyTypeEnum.DOCUMENT)
        expect(policy.periodType).toEqual(input.periodType)
        expect(policy.periodValue).toEqual(input.periodValue)
        expect(policy.version).toEqual(1)
    })

})