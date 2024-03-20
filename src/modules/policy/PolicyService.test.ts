import { describe, test, expect } from '@jest/globals'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from './Policy'
import IMPolicyRepository from '../../database/in-memory/IMPolicyRepository'
import { randomUUID } from 'crypto'
import PolicyService from './PolicyService'

describe('Create new document policy SERVICE unit tests', () => {

    const repo = new IMPolicyRepository()
    const service = new PolicyService(repo)

    test('Should be able to create a new policy with a service', async () => {

        const input = {
            name: 'Document policy',
            periodType: PolicyPeriodTypeEnum.YEAR,
            periodValue: 5,
            description: 'Description'
        }

        const policy = await service.createNewDocumentPolicy(input)

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

describe('Create new person policy SERVICE unit tests', () => {

    const repo = new IMPolicyRepository()
    const service = new PolicyService(repo)

    test('Should be able to create a new policy with a service', async () => {

        const input = {
            name: 'Person policy',
            periodType: PolicyPeriodTypeEnum.DAY,
            periodValue: 3
        }

        const policy = await service.createNewPersonPolicy(input)

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

describe('Update policy SERVICE unit tests', () => {

    const repo = new IMPolicyRepository()
    const service = new PolicyService(repo)

    test('Should be able to update a policy', async () => {

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

        const inputUpdate = {
            name: 'updated name',
            description: 'updated description',
            periodType: PolicyPeriodTypeEnum.MONTH,
            periodValue: 1
        }
        const updatedPolicy = await service.updatePolicy(policy.id, inputUpdate)

        expect(updatedPolicy).toBeInstanceOf(Policy)
        expect(updatedPolicy.name).toEqual(inputUpdate.name)
        expect(updatedPolicy.description).toEqual(inputUpdate.description)
        expect(updatedPolicy.periodType).toEqual(inputUpdate.periodType)
        expect(updatedPolicy.periodValue).toEqual(inputUpdate.periodValue)
        expect(updatedPolicy.version).toEqual(2)
        expect(updatedPolicy.id).toEqual(policy.id)
    })

})