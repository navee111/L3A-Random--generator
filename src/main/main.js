const {app, BrowserWindow,ipcMain} = require("electron")
const { type } = require("os")
const path = require("path")
const { config } = require("process")

let RandomGenerator

async function loadModule() {
  try {
    RandomGenerator = await import("random--generator")
  } catch (error) {
    console.error("Failed to load module:", error)
  }
}
 /**
  * klass för att hantera fönster.
  */
  class Appcontroller {
    #window
    async init(){
      await loadModule()
      this.#createWindow()
      this.#registerIpcHandlers()
      
    }
    #createWindow() {
      this.#window = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      })
      this.#window.loadFile(path.join(__dirname, '../public/index.html'))
      this.#window.webContents.openDevTools()
    }
  }
  
  #registerIpcHandlers() {
    ipcMain.handle('generate-password', (_, config) => 
    this.#generatePassword(config)
  )
    ipcMain.handle('generate-name', (_, config) =>
    this.#generateName(config)
  )
    ipcMain.handle('generate-username', (_, config) =>
    this.#generateUsername(config)
  )
    ipcMain.handle('generate-business', (_, config) =>
    this.#generateBusinessName(config)
  )
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
   win.webContents.openDevTools()
}
ipcMain.handle('generate-password', async (event, config) => {
  const generator = new RandomGenerator.default()
  return generator.generatePassword(config.length, {
    includeUppercase: config.includeUppercase,
    includeLowercase: config.includeLowercase,
    includeNumbers: config.includeNumbers,
    includeSymbols: config.includeSymbols
  })
})

ipcMain.handle('generate-name', async (event, config) => {
  const generator = new RandomGenerator.default()
  return generator.generateName(config.type, config.gender)
})

ipcMain.handle('generate-username', async (event, config) => {
  const generator = new RandomGenerator.default()
  return generator.generateUsername(config.style, config.maxLength)
})

ipcMain.handle('generate-business', async (event, config) => {
  const generator = new RandomGenerator.default()
  return generator.generateBusinessName(config.industry)
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
