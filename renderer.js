/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require("electron");

window.onload = function () {
  // 通信
  // ipcRenderer.send('check-data');
  const dataArrs = [];
  // 格式化日期
  function formatDate(value) {
    var date = new Date(value * 1000);
    var y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate(),
      h = date.getHours(),
      i = date.getMinutes(),
      s = date.getSeconds();
    if (m < 10) {
      m = "0" + m;
    }
    if (d < 10) {
      d = "0" + d;
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (i < 10) {
      i = "0" + i;
    }
    if (s < 10) {
      s = "0" + s;
    }
    var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
    return t;
  }
  // 定时 fetch
  async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 20000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  }
  // 发送函数
  async function loadUrls(url) {
    try {
      const response = await fetchWithTimeout(url, {
        timeout: 25000,
      });
      const games = await response.json();
      return games;
    } catch (error) {
      // Timeouts if the request takes
      // longer than 6 seconds
      console.log(error.name === "AbortError");
      alert(new Error("Timesout!"));
    }
  }

  // formateData
  function formateData(data) {
    const { statistics, author, create_time } = data;
    const date = formatDate(+create_time);
    const temp = {
      博主名称: author.nickname || '',
      user_id: statistics.aweme_id,
      点赞数: statistics.digg_count,
      收藏数: statistics.collect_count,
      评论数: statistics.comment_count,
      转发数: statistics.share_count,
      发布时间: date,
    };
    dataArrs.push(temp);
  }

  // 唤醒主程序
  function invokeFun() {
    ipcRenderer.invoke("check-data", dataArrs).then((res) => {
      if (res.status == "success") {
        const successBtn = document.querySelector('#result');
        successBtn.style.visibility = 'visible';
        // reset dataArrs
        dataArrs.splice(0, dataArrs.length);
        setTimeout(()=>{
          successBtn.style.visibility = 'hidden';
        },6000)

      }
    });
  }
  window.dyAnalyze = async function () {
    // 取出缓存链接
    let args = window.localStorage.getItem("Urls");
    args = JSON.parse(args);
    try {
      const argsList = args.map((item) => {
        const url = `https://api.douyin.wtf/api?url=${item}/&minimal=false`;
        return loadUrls(url);
      });
      const values = await Promise.allSettled(argsList);
      values.forEach((item) => {
        console.log(item.value, "valuesItem");
        if(item.status == 'fulfilled'){
          formateData(item.value);
        }else{
          console.log(item + 'reject');
        }
      });
      invokeFun();
    } catch (error) {
      alert(error,'111')
    }
  };
};
