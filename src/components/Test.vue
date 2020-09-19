<template>
  <div>
    <h1>I am Test</h1>
    <button v-on:click="switchComponents"></button>
  </div>
</template>

<script>
export default {
  name: "Test",
  methods: {
    switchComponents() {
      this.$store.commit("switchComponent", "Substitutions");
    }
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
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
