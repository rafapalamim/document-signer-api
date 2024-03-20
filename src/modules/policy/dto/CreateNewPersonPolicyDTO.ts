import { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'

export type CreateNewPersonPolicyInputDTO = {
    name: string,
    description?: string,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}

export type CreateNewPersonPolicyOutputDTO = {
    id: string,
    name: string,
    description: string | null,
    type: PolicyTypeEnum
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}
