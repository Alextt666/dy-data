<template>
  <div class="dashbord-wrapper flex-ar">
    <div class="dashbord-item flex-center">
      <router-link to="analyze">Analyze</router-link>
    </div>
    <div class="dashbord-item flex-center">
      <div @click="handleAutoStart">AutoStart</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dash-wrapper",
  methods:{
    handleAutoStart(){
      window.location.href = 'weixin://';
      window.location.href = 'lark://';
      // window.open('lark://');
    }
  }
};
</script>
<style lang="scss" scoped>
.dashbord-wrapper {
  width: 30vw;
  position: absolute;
  bottom: 12rem;
  left: 10rem;
  .dashbord-item {
    width: 8rem;
    height: 6rem;
    border-radius: 15px;
    background: #aec1c1;
    box-shadow: -20px 20px 29px #94a4a4, 20px -20px 29px #c8dede;
    transition: all 0.7s;
    cursor: pointer;
  }
  .dashbord-item:hover {
    translate: -10px -5px;
    transition: all 0.7s;
    box-shadow: -20px 20px 29px #c8dede, 20px -20px 29px #94a4a4;
  }
}
</style>
