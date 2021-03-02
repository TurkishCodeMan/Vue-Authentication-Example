//For Axios Header Set Auth Token

import { store } from "./store";
import Vue from "vue"
//import axios from "axios";

store.subscribe((mutation) => {
    switch (mutation.type) {
        //Set axiıos headers
        case 'SET_TOKEN': {
            if (mutation.payload) {
                //AXİOS HEADER SET BEARER TOKEN

                //  axios.defaults.headers.common['Authorization']=`Bearer ${mutation.payload}`
                Vue.$cookies.set('token', mutation.payload);

            } else {
                //axios.defaults.headers.common['Authorization']=null
                Vue.$cookies.remove("token");
            }
            break;

        }
        case 'SET_EXPIRETIME': {
            if (mutation.payload) {
                Vue.$cookies.set('expireTime', mutation.payload);

            } else {
                Vue.$cookies.remove("expireTime");
            }
            break;

        }
        case 'CLEAR_TOKEN':{
            Vue.$cookies.remove('token');
            break;
        }
        case 'CLEAR_EXPIRETIME':{
            Vue.$cookies.remove('expireTime');
            break;
        }
    }
})