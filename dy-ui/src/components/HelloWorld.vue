<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="result">
      <span style="margin-right:10px">Success</span> <svg-icon icon-class="check" class-name="success-class" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#result {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #41bb84;
  font-weight: bold;
  /* visibility: hidden; */
}
h3 {
  margin: 40px 0 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
