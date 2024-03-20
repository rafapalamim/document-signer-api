import { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'

export type UpdatePolicyInputDTO = {
    name?: string,
    description?: string,
    periodType?: PolicyPeriodTypeEnum,
    periodValue?: number
}

export type UpdatePolicyOutputDTO = {
    id: string,
    name: string,
    description: string | null,
    type: PolicyTypeEnum
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}
