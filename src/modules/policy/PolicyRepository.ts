import { BaseFindAllMethod } from '../../@core/modules/BaseFindAllMethod'
import BaseRepository from '../../@core/modules/BaseRepository'
import Policy, { PolicyPeriodTypeEnum, PolicyTypeEnum } from './Policy'

export type PolicyFindAllOptions = BaseFindAllMethod<{
    id?: string,
    name?: string,
    type?: PolicyTypeEnum,
    periodType?: PolicyPeriodTypeEnum
}>

export interface PolicyRepository extends BaseRepository<Policy, string> {
    findAll(options: PolicyFindAllOptions): Promise<Policy[]>
}