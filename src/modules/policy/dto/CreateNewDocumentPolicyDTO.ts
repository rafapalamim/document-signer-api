import { PolicyPeriodTypeEnum, PolicyTypeEnum } from '../Policy'

export type CreateNewDocumentPolicyInputDTO = {
    name: string,
    description?: string,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}

export type CreateNewDocumentPolicyOutputDTO = {
    id: string,
    name: string,
    description: string | null,
    type: PolicyTypeEnum
    periodType: PolicyPeriodTypeEnum,
    periodValue: number
}
