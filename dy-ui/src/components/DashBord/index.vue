<template>
  <transition name="bord" mode="">
    <div class="dashbord-page" v-if="bordShow">
      <DashWrapper />
      <AuthorInfo />
    </div>
  </transition>
</template>
<script>
import DashWrapper from "./DashWrapper.vue";
import AuthorInfo from "./AuthorInfo.vue";
export default {
  name: "Dash-bord",
  components: {
    DashWrapper,
    AuthorInfo
  },
  data() {
    return {
      bordShow: false,
    };
  },
  async beforeMount() {
    // 未来接口 做准备
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

</style>
