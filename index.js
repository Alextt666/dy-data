const axios = require("axios");
const fs = require("fs");
const json2xls = require("json2xls");
const promiseList = [];
const RESULT_ARR = [];
// 数据地址
const URL_List = [
  "https://v.douyin.com/BPwMmno",
  "https://www.douyin.com/video/7186494375692602662",
];

// 写入excel
function writeFile(arr) {
  const xls = json2xls(arr);
  fs.writeFileSync("data.xlsx", xls, "binary");
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

function startWrite() {
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
    console.log(RESULT_ARR, "done");
  });
}
startWrite();
