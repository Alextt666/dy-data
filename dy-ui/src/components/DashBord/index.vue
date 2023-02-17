<template>
  <div class="dashbord-page" v-show="bordShow">
    <transition name="chat" mode="">
      <DashChat v-if="asyncShow" />
    </transition>
    <DashWrapper />
    <AuthorInfo />
  </div>
</template>
<script>
import DashWrapper from "./DashWrapper.vue";
import AuthorInfo from "./AuthorInfo.vue";
import DashChat from "./DashChat.vue";

export default {
  name: "Dash-bord",
  components: {
    DashWrapper,
    AuthorInfo,
    DashChat,
  },
  data() {
    return {
      bordShow: false,
      asyncShow: false,
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
    const res = await getPromise();
    if (res === "success") {
      this.bordShow = true;
      setTimeout(() => {
        this.asyncShow = true;
      }, 1000);
    }
    this.$emit("bord-ready");
  },
  mounted() {},
};
</script>
<style lang="scss">
.chat-enter-active,
.chat-leave-active {
  transition: opacity 0.8s ease;
}

.chat-enter-from,
.chat-leave-to {
  opacity: 0;
}

.dashbord-page {
  width: 100%;
  height: 100%;
  position: relative;
}
.dashbord-chat {
  width: 35vw;
  position: absolute;
  right: 3rem;
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
