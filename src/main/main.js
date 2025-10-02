const {app, BrowserWindow} = require("electron")
const path = require("path")
const myModule = require("../../L2M/myModule.js")

function createWindow () {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // kan tas bort senare
    }
  })
  // ladda index.html
  win.loadFile(path.join(__dirname, '../public/index.html'))
}
app.whenReady().then(createWindow)

app.on("activate", () =>{
  if(BrowserWindow.getAllWindows().length === 0) createWindow()
})