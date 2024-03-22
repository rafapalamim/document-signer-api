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

    removeAction(actionName: string): void {
        const newList = this.actions.filter((action) => action.name !== actionName)
        this.actions = newList
    }

    clearActions(): void {
        this.actions = []
    }

    async runSync<I, O>(actionName: string, data: I): Promise<O> {
        const findAction = this.actions.find((action) => action.name === actionName)
        if (!findAction) throw new Error('Ação não encontrada')
        return await findAction.execute(data)
    }
}