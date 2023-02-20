<template>
    <TitleMsg msg="Welcome to Your Data-Analyzer" />
    <UrlInput />
    <div class="home-icon">
      <svg-icon icon-class="home" @click="BackBord"/>
    </div>
  </template>
  
  <script>
  import TitleMsg from "./TitleMsg.vue";
  import UrlInput from "./UrlInput.vue";
  
  export default {
    name: "DataAnalyze",
    components: {
      TitleMsg,
      UrlInput,
    },
    methods:{
      BackBord(){
        this.$router.push('/')
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  .home-icon{
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
  }
  </style>
  