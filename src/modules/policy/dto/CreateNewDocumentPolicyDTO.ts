import { PolicyPeriodTypeEnum } from '../Policy'

export type CreateNewDocumentPolicyInputDTO = {
    name: string,
    description?: string,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}
