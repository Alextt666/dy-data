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

  window.dyAnalyze = function () {
    const args = window.localStorage.getItem("Urls");
    // ipcRenderer.send('check-data',args);
    ipcRenderer.invoke("check-data", args).then((res) => {
      const result = JSON.parse(res);
      //  console.log(result.address);
      if (result.msg == "success") {
        const resDom = document.querySelector("#result");
        resDom.style.visibility = "visible";
        setTimeout(() => {
          resDom.style.visibility = "hidden";
        }, 3000);
      }
    });
  };
  //   const analyzeBtn = document.querySelector(".analyse-btn");
  //   analyzeBtn.addEventListener("click", () => {

  //   });
};
