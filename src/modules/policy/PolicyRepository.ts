import { BaseFindAllMethod } from '../../@core/repositories/BaseFindAllMethod'
import BaseRepository from '../../@core/repositories/BaseRepository'
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