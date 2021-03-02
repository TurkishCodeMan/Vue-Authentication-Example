import API from "../../services/API";
import { store } from "@/store/store"
import { router } from "../../router/router";
import Vue from "vue"
const state = {
    token: "",
    expireTime: "",
    user: null,
    apiKey: "KEY"

}
const getters = {
    isAuthenticated(state) {
        return state.token != '' && state.user != null;
    }
}
const mutations = {
    SET_TOKEN(state, value) {
        state.token = value;
    },
    SET_EXPIRETIME(state, value) {
        state.expireTime = value;
    },
    SET_USER(state, value) {
        state.user = value
    },
    CLEAR_TOKEN(state) {
        state.token = '';
    },
    CLEAR_EXPIRETIME(state) {
        state.expireTime = '';
    }
}
const actions = {
    async initAuth({ dispatch }) {//First START
        //Sayfa yenilendiğinde çalışacak expireIne bakmalıyız burada token varsa geçerli mi? 
        let token = Vue.$cookies.get('token');
        let expireTime = Vue.$cookies.get("expireTime")
        if (token) {
            let time = new Date().getTime();//Ms
     
            if (time >= +expireTime) {//Expire Time Kontrol Zamanı Geçmişse
                console.log("Token Süresi Dolmuş.....")
                dispatch('logout');
            } else {
                //Timer Değişti Zaman Geçti
                let newExpireTime = +expireTime - time;
                console.log(newExpireTime);
                await dispatch('attempt', { token: token, expireTime: newExpireTime });
            }

        } else {
            router.push("/auth");
            return false;
        }

    },

    async signUp({ dispatch, state }, payload) {
        try {
            payload.returnSecureToken = true;

            let response = await API().post(`/accounts:signUp?key=${state.apiKey}`, payload);
            dispatch('attempt', { token: response.data.idToken, expireTime: response.data.expiresIn });
        } catch (error) {
            store.commit('SET_ERROR', error.response.data.error);

            return error;
        }
    },
    async login({ dispatch, state }, payload) {
        try {
            payload.returnSecureToken = true;
            let response = await API().post(`accounts:signInWithPassword?key=${state.apiKey}`, payload);

            dispatch('attempt', { token: response.data.idToken, expireTime: response.data.expiresIn });
        } catch (error) {
            store.commit('SET_ERROR', error.response.data.error);
            return error;
        }
    },
    logout({ commit }) {
        console.log("Logout")
        commit("CLEAR_TOKEN");
        commit("CLEAR_EXPIRETIME");
        router.replace("/auth")
    },
    async attempt({ commit, state,  dispatch}, payload) {
        if (payload.token && payload.expireTime) {
            commit("SET_TOKEN", payload.token);

            commit("SET_EXPIRETIME", new Date().getTime() + +(payload.expireTime));
            //Expire Time Aşağıdad da Çalıştırılabilir
           dispatch("expiresInTimer", +(payload.expireTime)) 

        }
        if (!state.token && !state.expireTime) {
            return;
        }

        try {
            let response = await API().post(`accounts:lookup?key=${state.apiKey}`, { idToken: payload.token });
            commit("SET_USER", response.data.users[0]);


            if (router.currentRoute.path != '/') {
                router.replace("/")
            }

        } catch (error) {
            console.log(error.response)
            store.commit('SET_ERROR', error.response.data.error);
            commit("SET_TOKEN", "");
            commit("SET_EXPIRETIME", "");
            commit("SET_USER", null)
            return error;
        }

    },
    async expiresInTimer({ dispatch }, expiresIn) {
        console.log(expiresIn)
        console.log("-----")
        setTimeout(() => {
            dispatch('logout');//Timer End Logout
        }, expiresIn)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}