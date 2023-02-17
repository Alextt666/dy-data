<template>
  <transition name="bord" mode="">
    <div class="dashbord-page" v-if="bordShow">
      <div class="dashbord-chat">
        <div class="dashbord-chat__title">Welcome to Lazy-Zone!</div>
        <div class="dashbord-chat__content">
          <vue-typed :strings="myStrings">
            <h1><span class="typing"></span></h1>
          </vue-typed>
        </div>
      </div>
      <DashWrapper />
      <AuthorInfo />
    </div>
  </transition>
</template>
<script>
import DashWrapper from "./DashWrapper.vue";
import AuthorInfo from "./AuthorInfo.vue";
import { VueTyped } from "vue3-typed.js";

export default {
  name: "Dash-bord",
  components: {
    DashWrapper,
    AuthorInfo,
    VueTyped,
  },
  data() {
    return {
      bordShow: false,
      myStrings: [
        "Hi there! This is a single application made for my lover QQ. Hope you can enjoy this app, and reduce the burden of work.All features are continuously updated.If there is a bug or a feature you need, please let me know! Hava fun!",
      ],
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

.dashbord-chat {
  width: 35vw;
  position: absolute;
  right: 6rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 1px solid black;
  &__title {
    margin: 0 0 25px 0;
    font-size: 2.3rem;
  }
  &__content {
    width: 24rem;
    font-size: 1.2rem;
    font-weight: normal;
    text-align: justify;
  }
}
</style>
