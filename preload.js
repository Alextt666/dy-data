const { ipcRenderer } = require("electron");
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
  // 通信
  // ipcRenderer.send('check-data');
  const analyzeBtn = document.querySelector(".analyse-btn");
  analyzeBtn.addEventListener("click", () => {
    const args = window.localStorage.getItem("Urls");
    // ipcRenderer.send('check-data',args);
    ipcRenderer.invoke("check-data", args).then((res) => {
       const result = JSON.parse(res);
       console.log(result.address);
       console.log(result.msg);
    });
  });
});
