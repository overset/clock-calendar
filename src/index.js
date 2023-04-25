const { app, BrowserView, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 625,
    hasShadow: false,
    title: "CAL",
    titleBarStyle: 'hidden',
    frame: false,
  })

  const viewClock = new BrowserView({ backgroundColor: '#000', darkTheme: true })
  mainWindow.addBrowserView(viewClock)
  viewClock.setAutoResize({ width: true, height: false, horizontal: true, vertical: false })
  viewClock.setBounds({ x: 0, y: 0, width: 1024, height: 125 })
  viewClock.webContents.loadFile('src/clock.html')

  const viewCal = new BrowserView()
  mainWindow.addBrowserView(viewCal)
  viewCal.setAutoResize({ width: true, height: true, horizontal: true, vertical: false })
  viewCal.setBounds({ x: 0, y: 125, width: 1024, height: 500 })
  viewCal.webContents.loadURL('https://calendar.google.com/calendar/u/1/r/week')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
