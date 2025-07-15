const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("path");

let mainWindow;

const iconPath = path.join(__dirname, "libby.png");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    icon: nativeImage.createFromPath(iconPath),
    autoHideMenuBar: true,
    backgroundColor: "#000000",
  });

  win.on("minimize", function (event) {
    event.preventDefault();
    win.hide();
  });

  win.on("close", (event) => {
    event.preventDefault();
    win.hide();
  });

  win.loadURL("https://libbyapp.com");

  return win;
};

app.whenReady().then(() => {
  mainWindow = createWindow();

  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: "Quit", click: () => app.exit(0) },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("Libby");
  tray.setTitle("Libby");
  tray.on("click", () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    } else {
      mainWindow = createWindow();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
