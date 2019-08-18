const {app, BrowserWindow, ipcMain, dialog} = require('electron')

class AppWindow extends BrowserWindow{
  constructor(config,fileLocation){
    const basicConfig={
      width: 800,
      height: 600,
      webPreferences:{
        nodeIntegration: true
      }
    }
    const finalConfig = {...basicConfig,...config}//es6 展开对象合并
    super (finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show',() => {
      this.show()
    })
  }
}
app.on('ready',() => {
  const mainWindow = new AppWindow({},'./renderer/index.html')
  ipcMain.on('add-music-window',() => {
    const addWindow = new AppWindow({
      width: 500,
      height: 400,
      parent:mainWindow
    },'./renderer/add.html')
  })
  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music', extensions: ['mp3'] }]
    }, (files) => {
      if (files) {
        event.sender.send('selected-file', files)
      }
    })
  })
})