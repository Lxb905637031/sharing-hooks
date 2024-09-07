import * as hooks from '../index'

describe('sharing-hooks', () => {
  test('exports modules should be defined', () => {
    Object.keys(hooks).forEach((module) => {
      expect(hooks[module]).toBeDefined()
    })
  })
})
