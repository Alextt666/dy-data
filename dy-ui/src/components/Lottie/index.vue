<template>
      <div :id="propsId" :style="comStyle"></div>
  </template>
  
  <script>
  import lottie from "lottie-web";
  
  export default {
    name: "LottieItem",
    components: {},
    props:['animateType','propWidth','propHeight','propsId'],
    data(){
      return {
          defWidth:'100%',
          defHeight:'70vh'
      }
    },
    mounted() {
      lottie.loadAnimation({
        container: document.querySelector(`#${this.propsId}`), // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        path:`./animates/${this.animateType}.json`, // the path to the animation json
      });
    },
    computed:{
      comStyle(){
          return `width:${this.propWidth || this.defWidth};height:${this.propHeight || this.defHeight}`
      }
    }
  };
  </script>
  
  <style scoped>
  

</style>
  