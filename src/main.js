import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    component: "Test",
  },
  mutations: {
    switchComponent: (state, newComponent) => (state.component = newComponent),
  },
  getters: {
    getComponent: (state) => state.component,
  },
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
