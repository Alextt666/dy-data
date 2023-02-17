<template>
     <router-view v-slot="{ Component }">
          <keep-alive >
              <component  :is="Component"/>
          </keep-alive>
     </router-view>

</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {},
};
</script>

<style lang="scss" src="./assets/common.scss" />
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  width: 100%;
  height: 100vh;
  background: linear-gradient(#81b29a, #f2cc8f);
  padding-top: 60px;
}
</style>
