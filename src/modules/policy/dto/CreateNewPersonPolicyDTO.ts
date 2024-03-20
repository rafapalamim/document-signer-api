import { PolicyPeriodTypeEnum } from '../Policy'

export type CreateNewPersonPolicyInputDTO = {
    name: string,
    description?: string,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}