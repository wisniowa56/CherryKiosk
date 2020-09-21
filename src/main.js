import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    component: "Substitutions",
    substitutions: [],
  },
  mutations: {
    switchComponent: (state, newComponent) => (state.component = newComponent),
    setSubstitutions: (state, substitutions) =>
      (state.substitutions = substitutions),
  },
  getters: {
    getComponent: (state) => state.component,
    getSubstitutions: (state) => state.substitutions,
  },
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
