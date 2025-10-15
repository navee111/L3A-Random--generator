class WebContents { openDevTools() {} }
class BrowserWindow {
  constructor(opts) { this.opts = opts; this.webContents = new WebContents() }
  loadFile() {}
  static getAllWindows() { return [] }
}
const ipcMain = { handle: jest.fn() }
const app = { whenReady: () => ({ then: fn => fn() }), on: () => {} }
module.exports = { BrowserWindow, ipcMain, app }