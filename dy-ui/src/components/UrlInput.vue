<template>
  <div class="input-top" >
    <div class="input-wrapper">
      <el-input
        v-model="input"
        placeholder="Please input the url "
      />
    </div>

    <el-button style="width:80px" type="primary" @click="handleAdd">添 加</el-button>
  </div>
  <div>
    <ul>
      <li v-for="(item,index) of inputArr" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<script setup>
import { ref ,reactive} from 'vue';
const input = ref('');
const inputArr = reactive([]);
function handleAdd(){
    if(input.value){
        inputArr.push(input.value);
        input.value = ''
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-top {
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-wrapper{
    width: 40rem;
    margin: 0 1.5rem;
}
</style>
