<template>
    <HelloWorld msg="Welcome to Your Data-Analyzer" />
    <UrlInput />
  </template>
  
  <script>
  import HelloWorld from "./HelloWorld.vue";
  import UrlInput from "./UrlInput.vue";
  
  export default {
    name: "DataAnalyze",
    components: {
      HelloWorld,
      UrlInput,
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  