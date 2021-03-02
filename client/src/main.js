import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { router } from "@/router/router";
import { store } from "@/store/store";

import Noty from "vuejs-noty";
import 'vuejs-noty/dist/vuejs-noty.css'


require("./store/subscriber");

import VueCookies from 'vue-cookies'
Vue.use(VueCookies);
Vue.$cookies.config('7d')


Vue.use(Noty, {
  timeout: 2000,
  progressBar: true,
  layout: 'topRight'
});

store.dispatch('initAuth').then(() => {//Preventing Flick

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')

})