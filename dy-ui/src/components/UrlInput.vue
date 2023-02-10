<template>
  <div class="input-top">
    <div class="input-wrapper">
      <el-input v-model="input" placeholder="Please input the url " />
    </div>
    <el-button style="width: 80px" type="primary" @click="handleAdd"
      >添 加</el-button
    >
  </div>
  <div class="btn-wrapper">
    <button class="update-btn" @click="handleUpdate">更 新</button>
    <button class="analyse-btn">分 析</button>
  </div>
  <div class="ul-wrapper">
    <ol>
      <div v-for="(item, index) of inputArr" :key="index" class="item-wrapper">
        <li>
          {{ item }}
        </li>
        <div class="close-icon" @click="handleClose(index)">
          <svg-icon icon-class="close" class-name="icon" />
        </div>
      </div>
    </ol>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
let input = ref("");
let inputArr = reactive([]);
let localArr = window.localStorage.getItem("Urls");
onMounted(() => {
  if (localArr) {
    localArr = JSON.parse(localArr);
    localArr.map((item) => inputArr.push(item));
  }
});

// 正则匹配
function validate(str) {
  let regRex =
    /\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  const res = regRex.test(str);
  return res;
}
// 检查输入
function checkInput(ipt) {
  if (validate(ipt)) {
    inputArr.push(ipt);
    ElMessage({
      type: "success",
      message: "添加成功!",
    });
  } else {
    ElMessage({
      type: "warning",
      message: "请输入正确的链接地址!",
    });
  }
}
// 处理添加按钮
function handleAdd() {
  if (input.value) {
    checkInput(input.value);
    input.value = "";
  } else {
    ElMessage({
      type: "warning",
      message: "当前输入为空! ",
    });
  }
}
// 关闭按钮
function handleClose(index) {
  inputArr.splice(index, 1);
  ElMessage({
    type: "success",
    message: "已删除此条记录",
  });
}
// 是否更新列表
function isUpdated() {
  if (inputArr.length != localArr.length) {
    return true;
  }
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] != localArr[i]) {

      return true;
    }
  }
  return false;
}
// 更新
function handleUpdate() {
  if (isUpdated()) {
    const temp = JSON.stringify(inputArr);
    window.localStorage.setItem("Urls", temp);
    localArr = JSON.parse(window.localStorage.getItem('Urls'));
    ElMessage({
      type: "success",
      message: "列表更新成功!",
    });
    return;
  }else{
    ElMessage({
      type: "warning",
      message: "列表未更新",
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-top {
  margin: 3rem 0 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-wrapper {
  width: 40rem;
  margin: 0 1.5rem;
}
.ul-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
ol {
  width: 65rem;
}
li {
  height: 2.6rem;
  line-height: 2.6rem;
  text-align: left;
}
.close-icon {
  right: 60px;
}
.update-btn {
  margin: 0.2rem 0.5rem;
  margin: 0.2rem 0.5rem;
  width: 4.5rem;
  height: 2rem;
  border: none;
  border-radius: 10px;
  color: white;
  background: #24c6dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #24c6dc,
    #514a9d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24c6dc,
    #514a9d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  cursor: pointer;
}
.analyse-btn {
  margin: 0.2rem 0.5rem;
  width: 4.5rem;
  height: 2rem;
  border: none;
  border-radius: 8px;
  color: white;
  background: #5f2c82; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #5f2c82,
    #49a09d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #5f2c82,
    #49a09d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  cursor: pointer;
}
.analyse-btn:hover {
  box-shadow: 0 0 20px #a8a7a7;
}
.update-btn:hover {
  box-shadow: 0 0 10px #a8a7a7;
}
</style>
