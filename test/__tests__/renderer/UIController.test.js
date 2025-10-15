jest.mock('electron') // uses renderer mock

describe('UIController', () => {
  let UIController, ipcRenderer

  beforeEach(() => {
    jest.resetModules()
    ipcRenderer = require('electron').ipcRenderer
    document.body.innerHTML = `
      <div id="password-result"></div>
      <button id="copy-password" disabled></button>
      <input id="pwd-length" value="12" />
      <input id="pwd-uppercase" checked />
      <input id="pwd-lowercase" checked />
      <input id="pwd-numbers" checked />
      <input id="pwd-symbols" />
    `
    UIController = require('../../src/public/app.js').UIController
  })

  test('generatePassword updates DOM and enables copy', async () => {
    ipcRenderer.invoke.mockResolvedValue('strong-password')
    const controller = new UIController()

    await controller.generatePassword()

    expect(ipcRenderer.invoke).toHaveBeenCalledWith('generate-password', expect.any(Object))
    expect(document.getElementById('password-result').textContent).toBe('strong-password')
    expect(document.getElementById('copy-password').disabled).toBe(false)
  })

  test('error path renders error', async () => {
    ipcRenderer.invoke.mockRejectedValue(new Error('boom'))
    const controller = new UIController()

    await controller.generatePassword()

    expect(document.getElementById('password-result').textContent).toMatch(/^Error: boom/)
  })
})