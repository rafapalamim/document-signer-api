import Action from './Action'

export default class ActionDispatcher {

    private actions: Action[] = []

    constructor(actions: Action[]) {
        this.addActions(actions)
    }

    addActions(newActions: Action[]): void {
        newActions.map((newAction) => {
            const findAction = this.actions.find((action) => action.name === newAction.name)
            if (!findAction) this.actions.push(newAction)
        })
    }

    removeAction(actionName: string) : void {
        const newList = this.actions.filter((action) => action.name !== actionName)
        this.actions = newList
    }

    clearActions() : void {
        this.actions = []
    }

    async run<I,O>(actioName: string, data: I): Promise<O> {
        const findAction = this.actions.find((action) => action.name === actioName)
        if (!findAction) throw new Error('Ação não encontrada')
        return await findAction.execute(data)
    }

    // async runAll<I>(data: I) : Promise<any> {
    //     return Promise.all(this.actions.map((action) => new Promise((resolve) => resolve(action.execute(data)))))
    // }
}