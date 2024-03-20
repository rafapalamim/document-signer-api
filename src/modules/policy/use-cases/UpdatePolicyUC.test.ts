import {describe, test, expect} from '@jest/globals'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'
import UpdatePolicyUC from './UpdatePolicyUC'
import { randomUUID } from 'crypto'
import IMPolicyRepository from '../../../database/in-memory/IMPolicyRepository'

describe('Update policy DOMAIN USE CASE unit tests', () => {

    test('Should be able to update a policy', async () => {

        const repo = new IMPolicyRepository()
        
        const policy = new Policy({
            id: randomUUID(),
            name: 'Default name',
            description: 'Default description',
            type: PolicyTypeEnum.DOCUMENT,
            periodType: PolicyPeriodTypeEnum.YEAR,
            periodValue: 5,
            version: 1
        })
        await repo.save(policy)
        
        const updateUC = new UpdatePolicyUC(repo)
        const inputUpdate = {
            name: 'updated name',
            description: 'updated description',
            periodType: PolicyPeriodTypeEnum.MONTH,
            periodValue: 1
        }
        const updatedPolicy = await updateUC.execute(policy.id, inputUpdate)

        expect(updatedPolicy).toBeInstanceOf(Policy)
        expect(updatedPolicy.name).toEqual(inputUpdate.name)
        expect(updatedPolicy.description).toEqual(inputUpdate.description)
        expect(updatedPolicy.periodType).toEqual(inputUpdate.periodType)
        expect(updatedPolicy.periodValue).toEqual(inputUpdate.periodValue)
        expect(updatedPolicy.version).toEqual(2)
        expect(updatedPolicy.id).toEqual(policy.id)
    })

})