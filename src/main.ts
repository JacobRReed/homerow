import { app, BrowserWindow, ipcMain, nativeTheme } from "electron";
import * as path from "path";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 1000,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  nativeTheme.themeSource = "dark";
}

// This method will be called when Electron has finished
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
