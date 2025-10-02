const {app, BrowserWindow} = require("electron")
const path = require("path")

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

app.whenReady().then(createWindow)

app.on("activate", () => {
  if(BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
