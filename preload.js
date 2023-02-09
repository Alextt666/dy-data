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
  // 维护链接列表
  const URL_List = [
    "https://v.douyin.com/BPwMmno",
    "https://www.douyin.com/video/7186494375692602662",
  ];
  const temp = JSON.stringify(URL_List);
  window.localStorage.setItem("Urls", temp);
});
