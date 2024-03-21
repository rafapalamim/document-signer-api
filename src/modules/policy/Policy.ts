import BaseModel from '../../@core/modules/BaseModel'
import { BaseType } from '../../@core/modules/BaseType'

export enum PolicyTypeEnum {
    DOCUMENT = 'document',
    PERSON = 'person'
}

export enum PolicyPeriodTypeEnum {
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day'
}

type PolicyType = {
    name: string,
    description: string | null,
    type: PolicyTypeEnum,
    periodType: PolicyPeriodTypeEnum,
    periodValue: number,
    version: number
} & BaseType<string>

export default class Policy extends BaseModel<PolicyType, string> {

    constructor(props: PolicyType) {
        props.description = props.description ?? null
        super(props)
    }

    get name(): string {
        return this.data.name
    }

    get description(): string | null {
        return this.data.description
    }

    get type(): PolicyTypeEnum {
        return this.data.type
    }

    get periodType(): PolicyPeriodTypeEnum {
        return this.data.periodType
    }

    get periodValue(): number {
        return this.data.periodValue
    }

    get version(): number {
        return this.data.version
    }

    updateVersion(): void {
        this.data.version++
    }

}