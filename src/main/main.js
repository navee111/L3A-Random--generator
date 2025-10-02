const {app, BrowserWindow} = require('electron')
const path = require(path)

function createWindow () {
  const win = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // kan tas bort senare
    }
  })
  // ladda index.html
  win.loadFile.File(path.resolve(__dirname, '../public/index.html'))
}
app.whenReady().then(createWindow)

app.on("window-all-closed", () =>{
  if(process.platform!=="darwin") app.quit()
})