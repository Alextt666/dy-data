<template>
  <div class="dashbord-wrapper">
    <div class="dashbord-item flex-center">
      <router-link to="analyze">Analyze</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dash-wrapper",
};
</script>
<style lang="scss" scoped>
.dashbord-wrapper {
  position: absolute;
  bottom: 15rem;
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
