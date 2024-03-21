export default abstract class Action {

    private actionName: string

    constructor(actionName: string) {
        this.actionName = actionName
    }

    abstract execute(data: any): Promise<any>

    get name(): string {
        return this.actionName
    }
}