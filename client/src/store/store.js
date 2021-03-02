import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import AuthModule from "./Modules/Auth"

import ErrorsModule from "./Modules/Errors"

export const store = new Vuex.Store({
    modules: {AuthModule,ErrorsModule }
})