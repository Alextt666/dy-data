<template>
  <div class="input-top" style="display: flex;">
    <el-input
    v-model="input"
    type="password"
    placeholder="Please input password"
    show-password
  />

   <el-button style="display: inline-block;">确认</el-button>
  </div>
  <div>
    <ul>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const input = ref('')
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-top {
  margin: 3rem 0;
}
</style>
