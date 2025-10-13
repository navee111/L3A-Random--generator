const { app, BrowserWindow, ipcMain } = require("electron")
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
  async init() {
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
        contextIsolation: false,
      },
    })
    this.#window.loadFile(path.join(__dirname, "../public/index.html"))
    this.#window.webContents.openDevTools()
  }

  #registerIpcHandlers() {
    ipcMain.handle("generate-password", (_, config) =>
      this.#generatePassword(config)
    )
    ipcMain.handle("generate-name", (_, config) => this.#generateName(config))
    ipcMain.handle("generate-username", (_, config) =>
      this.#generateUsername(config)
    )
    ipcMain.handle("generate-business", (_, config) =>
      this.#generateBusinessName(config)
    )
  }

  #createGenerator() {
    return new RandomGeneratorModule.default()
  }

  #generatePassword(config) {
    const generator = this.#createGenerator()
    return generator.generatePassword(config.length, {
      includeUppercase: config.includeUppercase,
      includeLowercase: config.includeLowercase,
      includeNumbers: config.includeNumbers,
      includeSymbols: config.includeSymbols,
    })
  }

  #generateName(config) {
    const generator = this.#createGenerator()
    return generator.generateName(config.type, config.gender)
  }

  #generateUsername(config) {
    const generator = this.#createGenerator()
    return generator.generateUsername(config.style, config.maxLength)
  }

  #generateBusinessName(config) {
    const generator = this.#createGenerator()
    return generator.generateBusinessName(config.industry)
  }
}

const controller = new Appcontroller()
app.whenReady().then(() => controller.init())

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) controller.init()
})
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
