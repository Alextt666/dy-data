// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const json2xls = require("json2xls");
const promiseList = [];
const RESULT_ARR = [];

//\b(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|] url正则

// 写入相关

// 写入excel
function writeFile(arr) {
  const xls = json2xls(arr);
  fs.writeFileSync("C:\\Users\\Administrator\\Desktop\\Data.xlsx", xls, "binary");
  RESULT_ARR.splice(0, RESULT_ARR.length);
}

// 拉取json数据源
function fetchDyData(url) {
  return new Promise((resolve, rejects) => {
    axios({
      method: "get",
      url: `https://api.douyin.wtf/api?url=${url}/&minimal=false`,
    })
      .then(function (res) {
        const { statistics, author } = res.data;
        const temp = {
          博主名称: author.nickname,
          user_id: statistics.aweme_id,
          点赞数: statistics.digg_count,
          收藏数: statistics.collect_count,
          评论数: statistics.comment_count,
          转发数: statistics.share_count,
        };
        resolve(temp);
      })
      .catch((err) => {
        rejects(new Error(err));
      });
  });
}

function startWrite(URL_List) {
  if (promiseList.length != 0) {
    promiseList.splice(0, promiseList.length);
  }
  // 存入PromiseList
  URL_List.forEach((item) => {
    promiseList.push(fetchDyData(item));
  });
  // 全部发出等待结果后写入
  Promise.allSettled(promiseList).then((res) => {
    res.forEach((result) => {
      RESULT_ARR.push(result.value);
    });
    writeFile(RESULT_ARR);
  }).catch(err=>{
    return new Error(err)
  })
  return Promise.resolve('success')
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 等待ipc 通信
  ipcMain.handle("check-data", async (event, args) => {
    // 数据地址
    let URL_List = JSON.parse(args);
    const res = await startWrite(URL_List);
    const temp = JSON.stringify({address:__dirname + '\\Data.xlsx', msg:res});
    return temp;
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./dy-ui/dist/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
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
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
