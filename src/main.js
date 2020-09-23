import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    component: "Substitutions",
    availableComponents: ["Substitutions", "FirebaseAnnouncements"],
    substitutions: undefined,
    substitutionsScrolling: false
  },
  mutations: {
    switchComponent: (state, newComponent) => (state.component = newComponent),
    setSubstitutions: (state, substitutions) =>
      (state.substitutions = substitutions),
    setSubstitutionsScrolling: (state, scrolling) =>
      (state.substitutionsScrolling = scrolling)
  },
  getters: {
    getComponent: state => state.component,
    getAvailableComponents: state => state.availableComponents,
    getSubstitutions: state => state.substitutions,
    getSubstitutionsScrolling: state => state.substitutionsScrolling
  }
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
