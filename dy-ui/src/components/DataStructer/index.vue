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
  </style>
  