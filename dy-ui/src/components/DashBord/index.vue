<template>
  <transition name="bord" mode="">
    <div class="dashbord-page" v-if="bordShow">
      <div class="dashbord-wrapper">
        <div class="dashbord-item flex-center">
          <router-link to="analyze">Analyze</router-link>
        </div>
      </div>
      <div class="author-info">CopyRight@Alexzhang</div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Dash-bord",
  data() {
    return {
      bordShow: false,
    };
  },
  async beforeMount() {
    function getPromise() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("success");
        }, 1500);
      });
    }
    await getPromise();
    this.bordShow = true;
    this.$emit("bord-ready");
  },
  mounted() {},
};
</script>
<style lang="scss">
.bord-enter-active {
  transition: opacity 1.2s ease;
}

.bord-enter-from {
  opacity: 0;
}

.author-info {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  font-size: 1rem;
  font-weight: normal;
}
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
