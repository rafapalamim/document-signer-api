import { PolicyPeriodTypeEnum } from '../Policy'

export type UpdatePolicyInputDTO = {
    name?: string,
    description?: string,
    periodType?: PolicyPeriodTypeEnum,
    periodValue?: number
}