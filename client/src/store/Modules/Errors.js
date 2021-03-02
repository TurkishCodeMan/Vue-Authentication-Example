
const state = {
    error:{}

}
const getters = {
    getError(state){
        return state.error;
    },
 
}
const mutations = {
    SET_ERROR(state,value){
        state.error=value;
     
    },
  
}


export default {
    state,
    getters,
    mutations,
}