class WebContents { openDevTools() {} }
class BrowserWindow {
  constructor(opts) { this.opts = opts; this.webContents = new WebContents() }
  loadFile() {}
  static getAllWindows() { return [] }
}
const ipcMain = { handle: jest.fn() }
// Return a real Promise so code that does app.whenReady().then(...) works
const app = { whenReady: () => Promise.resolve(), on: jest.fn() }
module.exports = { BrowserWindow, ipcMain, app }