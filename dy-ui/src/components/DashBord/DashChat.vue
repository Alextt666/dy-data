<template>
  <div class="dashbord-chat">
    <div class="dashbord-chat__title">Welcome to Lazy-Zone!</div>
    <div class="dashbord-chat__content">
      <vue-typed :strings="myStrings">
        <h1><span class="typing"></span></h1>
      </vue-typed>
    </div>
  </div>
</template>
<script>
import { VueTyped } from "vue3-typed.js";
export default {
  name: "Dash-Chat",
  components: {
    VueTyped,
  },
  data() {
    return {
      myStrings: [
        "Hi there! This is a single application made for my lover QQ. Hope you can enjoy this app, and reduce the burden of work.All features are continuously updated.If there is a bug or a feature you need, please let me know! Hava fun!",
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
