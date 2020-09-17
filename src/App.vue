<template>
  <div id="app">
    <div class="logo-center">
      <div id="logo">
        <img alt="CherryKiosk Logo" src="./assets/logo.png" />
        <p>{{ $store.getters.getComponent }}</p>
      </div>
    </div>
    <component id="dynamicComponent" v-bind:is="$store.getters.getComponent" />
  </div>
</template>

<script>
import Test from "./components/Test";
import Test2 from "./components/Test2";

export default {
  name: "App",
  components: {
    Test,
    Test2,
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "../node_modules/bootstrap-vue/src/index.scss";

body {
  background: linear-gradient(
    45deg,
    rgb(255, 128, 102) 0%,
    rgb(222, 21, 66) 100%
  );
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #696969;
}

#logo {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logo-center {
  background: linear-gradient(
    45deg,
    rgb(255, 128, 102) 0%,
    rgb(222, 21, 66) 100%
  );
  width: 100%;
  height: 94vh;
  position: absolute;
}
</style>
