const { app, BrowserWindow, Menu } = require("electron");
// const fastify = require('./server/server'); // 引入 Fastify 实例

// // 启动服务器
// fastify.listen({ port: 8081 }, function (err) {
//   if (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
//   fastify.log.info(`Server is now listening on http://localhost:8081`);
// });

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  Menu.setApplicationMenu(null);
  win.loadURL("http://localhost:8080");
  win.setTitle(" Polease - Development Environment - Ver.Alpha 241008");
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
