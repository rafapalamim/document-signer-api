import { describe, test, expect} from '@jest/globals'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from './Policy'
import { randomUUID } from 'crypto'

describe('Policy domain model unit tests', () => {

    test('Should be able to create a new document policy', () => {

        const input = {
            id: randomUUID(),
            name: 'test name',
            description: 'test description',
            policyIdentifier: randomUUID(),
            type: PolicyTypeEnum.DOCUMENT,
            periodType: PolicyPeriodTypeEnum.YEAR,
            periodValue: 5,
            version: 1
        }

        const policy = new Policy(input)

        expect(policy).toBeInstanceOf(Policy)
        expect(policy.id).toEqual(input.id)
        expect(policy.name).toEqual(input.name)
        expect(policy.description).toEqual(input.description)
        expect(policy.policyIdentifier).toEqual(input.policyIdentifier)
        expect(policy.type).toEqual(input.type)
        expect(policy.periodType).toEqual(input.periodType)
        expect(policy.periodValue).toEqual(input.periodValue)
        expect(policy.version).toEqual(input.version)

    })

    test('Should be able to create a new person policy', () => {

        const input = {
            id: randomUUID(),
            name: 'test name',
            description: 'test description',
            policyIdentifier: randomUUID(),
            type: PolicyTypeEnum.PERSON,
            periodType: PolicyPeriodTypeEnum.DAY,
            periodValue: 1,
            version: 1
        }

        const policy = new Policy(input)

        expect(policy).toBeInstanceOf(Policy)
        expect(policy.id).toEqual(input.id)
        expect(policy.name).toEqual(input.name)
        expect(policy.description).toEqual(input.description)
        expect(policy.policyIdentifier).toEqual(input.policyIdentifier)
        expect(policy.type).toEqual(input.type)
        expect(policy.periodType).toEqual(input.periodType)
        expect(policy.periodValue).toEqual(input.periodValue)
        expect(policy.version).toEqual(input.version)

    })

})