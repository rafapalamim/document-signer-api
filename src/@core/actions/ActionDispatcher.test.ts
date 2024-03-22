import { describe, expect, beforeEach } from '@jest/globals'
import ActionDispatcher from './ActionDispatcher'
import Action from './Action'

class ActionMock extends Action {

    constructor() {
        super('TEST_ACTION')
    }

    async execute(): Promise<{ id: number }> {
        return { id: 1 }
    }
}

class AnotherActionMock extends Action {

    constructor() {
        super('TEST_ACTION_2')
    }

    async execute(): Promise<{ id: number }> {
        return { id: 2 }
    }
}

describe('Action dispatcher unit test', () => {

    let dispatcher: ActionDispatcher
    let actions: Action[]

    beforeEach(() => {
        actions = [new ActionMock(), new AnotherActionMock()]
        dispatcher = new ActionDispatcher(actions)
    })

    test('Should be able to instantiate a dispatcher', () => {
        expect(dispatcher).toBeInstanceOf(ActionDispatcher)
    })

    test('Should be able to execute a single action', async () => {

        const spyExecute = jest.spyOn(actions[0], 'execute')
        const spyExecute2 = jest.spyOn(actions[1], 'execute')

        await dispatcher.runSync<object, { id: number }>('TEST_ACTION', {})

        expect(spyExecute).toHaveBeenCalled()
        expect(spyExecute2).not.toHaveBeenCalled()

    })

    test('Should be able to execute two actions', async () => {

        const spyExecute = jest.spyOn(actions[0], 'execute')
        const spyExecute2 = jest.spyOn(actions[1], 'execute')

        await dispatcher.runSync<object, { id: number }>('TEST_ACTION', {})
        await dispatcher.runSync<object, { id: number }>('TEST_ACTION_2', {})

        expect(spyExecute).toHaveBeenCalled()
        expect(spyExecute2).toHaveBeenCalled()

    })
})