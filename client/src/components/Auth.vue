<template>
  <div class="container">
    <div class="row justify-content-center mt-5 align-items-center">
      <div
        class="card p-3"
        :class="{ 'border-success': !isUser, 'border-primary': isUser }"
      >
        <div
          class="card-header bg-transparent text-center"
          :class="{ 'text-success': !isUser, 'text-primary': isUser }"
        >
          <h4>Vuejs | Auth</h4>
        </div>
        <div class="card-body">
          <label for="email">E Posta</label>
          <input type="text" v-model="user.email" class="form-control" />
          <label for="email">Şifre</label>
          <input type="password" v-model="user.password" class="form-control" />
        </div>
        <div
          class="card-footer bg-transparent d-flex flex-column align-items-center"
        >
          <button
            @click.prevent="clickButton"
            class="btn btn-block"
            :class="{ 'btn-success': !isUser, 'btn-primary': isUser }"
          >
            {{ isUser ? "Giriş Yap" : "Kayıt Ol" }}
          </button>
          <a @click.prevent="isUser = !isUser" class="text-muted mtt-2">{{
            isUser ? "Üyelik Al" : "Üyeliğim Var"
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
  data() {
    return {
        user:{
            email:"",
            password:""
        },
      isUser: false,
    };
  },
  methods:{
      ...mapActions(["signUp","login"]),
      async clickButton(){
         if(this.user.eposta!='' && this.user.password!=''){
              if(this.isUser){
              //Login
              await this.login(this.user);
          }else{
              //Signup
                await this.signUp(this.user);
          }
         }else{
             alert("Please Enter...")
         }
      }
  }
};
</script>

<style>
</style>