// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const os = require("os");
const json2xls = require("json2xls");
const promiseList = [];
const RESULT_ARR = [];
// Menu.setApplicationMenu(null);
//\b(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|] url正则






// 写入相关

// 写入excel
function writeFile(arr) {
  const xls = json2xls(arr);
  fs.writeFileSync(os.homedir() + "\\Downloads\\Data.xlsx", xls, "binary");
  RESULT_ARR.splice(0, RESULT_ARR.length);
}

// 拉取json数据源
async function fetchDyData(url) {
  axios({
    method: "get",
    url: `https://api.douyin.wtf/api?url=${url}/&minimal=false`,
    setTimeout: 100000,
    headers: {
      Connection: "keep-alive",
      UserAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    },
    responseType: "json",
    transfromResponse: [
      function (data) {
        return data;
      },
    ],
  })
    .then(function (res) {
      console.log(res, "res");

      // const { statistics, author, create_time } = res.data;
      // const date = formatDate(+create_time);
      // console.log(res,'statistic')
      // const temp = {
      //   博主名称: author.nickname,
      //   user_id: statistics.aweme_id,
      //   点赞数: statistics.digg_count,
      //   收藏数: statistics.collect_count,
      //   评论数: statistics.comment_count,
      //   转发数: statistics.share_count,
      //   发布时间: date,
      // };
      // resolve(temp);
    })
    .catch((err) => {
      console.log(err);
      rejects(new Error(err));
    });
}

function startWrite(URL_List) {
  try {
    if (promiseList.length != 0) {
      promiseList.splice(0, promiseList.length);
    }
    // 存入PromiseList
    URL_List.forEach((item) => {
      promiseList.push(fetchDyData(item));
    });
    // 全部发出等待结果后写入
    Promise.allSettled(promiseList)
      .then((res) => {
        res.forEach((result) => {
          RESULT_ARR.push(result.value);
        });
        writeFile(RESULT_ARR);
      })
      .catch((err) => {
        return new Error(err);
      });
    return "success";
  } catch {
    return new Error("some wrong");
  }
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // fullscreen:true,
    icon: path.join(__dirname, "./dy-ui/dist/favicon.ico"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // 等待ipc 通信
  ipcMain.handle("check-data", async (event, args) => {
    writeFile(args);
    return {
      status:'success'
    }
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
