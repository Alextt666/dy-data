<template>
  <transition name="lot" mode="">
    <Lottie animateType="cat" propsId="lottie1" v-show="animateShow" />
  </transition>
  <transition name="" mode="">
    <DashBord @bord-ready="handleBordReady" />
  </transition>
</template>

<script>
import Lottie from "@comp/Lottie";
import DashBord from "@comp/DashBord";
export default {
  name: "Dash-bord",
  activated(){
    console.log('actived')
  },
  data() {
    return {
      animateShow: true,
    };
  },
  methods: {
    handleBordReady() {
      this.animateShow = false;
    },
  },
  components: {
    Lottie,
    DashBord,
  },
};
</script>

<style scoped lang="scss">
/* 下面我们会解释这些 class 是做什么的 */
.lot-enter-active,
.lot-leave-active {
  transition: opacity 0.8s ease;
}

.lot-enter-from,
.lot-leave-to {
  opacity: 0;
}

.bord-enter-active {
  transition: opacity 1.2s ease;
}

.bord-enter-from {
  opacity: 0;
}
</style>
