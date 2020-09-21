<template>
  <div id="app">
    <div class="logo-center">
      <div id="logo">
        <img alt="CherryKiosk Logo" src="./assets/logo.png" />
        <p>{{ $store.getters.getComponent }}</p>
      </div>
    </div>
    <transition
      name="component-fade"
      mode="out-in"
    >
      <component v-bind:is="$store.getters.getComponent" />
    </transition>
  </div>
</template>

<script>
import Test from "./components/Test";
import Test2 from "./components/Test2";
import Substitutions from "./components/Substitutions";

export default {
  name: "App",
  components: {
    Test,
    Test2,
    Substitutions,
  },
};
</script>

<style lang="scss">


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

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  // background-color: #696969;
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
