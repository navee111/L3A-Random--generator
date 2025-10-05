const {app, BrowserWindow,ipcMain} = require("electron")
const { type } = require("os")
const path = require("path")
const { config } = require("process")

let RandomGenerator

async function loadModule() {
  // Dynamisk import för ES module
  RandomGenerator = await import("random--generator")
}

async function createWindow () {
  await loadModule()  // Ladda modulen först
  
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  
  win.loadFile(path.join(__dirname, '../public/index.html'))
  
  
  console.log(RandomGenerator)
}
ipcMain.handle('generate-password',async (event, config) => {
  const generator = new RandomGenerator.default()
  return generator.generatePassword(type, gender)
  
})
ipcMain.handle('generate-name',async (event, type, gender)=> {
  const generator = new RandomGenerator.default()
  return generator.generateName(type, gender)
})
ipcMain.handle('generate-username', async (event, style, maxLength) => {
  const generator = new RandomGenerator.default()
  return generator.generateUsername(style, maxLength)
})
ipcMain.handle('generate-business', async (event, industry) => {
  const generator = new RandomGenerator.default()
  return generator.generateBusiness(industry)
})

app.whenReady().then(createWindow)

app.on("activate", () => {
  if(BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
