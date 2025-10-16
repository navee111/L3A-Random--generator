jest.mock('electron') // uses main mock
jest.mock('Random--generator') // uses generator mock

describe('AppController', () => {
  let AppController, electron

  beforeEach(() => {
    jest.resetModules()
    electron = require('electron')
    AppController = require('../../../src/main/main.js').AppController
  })

  test('init creates window and registers handlers', async () => {
    const ctrl = new AppController()
    await ctrl.init()

    expect(electron.BrowserWindow).toBeDefined()
    expect(electron.ipcMain.handle).toHaveBeenCalledTimes(4)
  })

  test('password handler calls generator and returns value', async () => {
    const ctrl = new AppController()
    await ctrl.init()
    const handler = electron.ipcMain.handle.mock.calls[0][1]
    const res = await handler(null, {
      length: 10,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false
    })
    expect(res).toBe('PWD') // from mock
  })
})