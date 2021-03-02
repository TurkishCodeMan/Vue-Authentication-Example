<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand text-white">Auth İşlemleri</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item" tag="li" to="/">
          <a class="nav-link">Home <span class="sr-only">(current)</span></a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/about">
          <a class="nav-link">About <span class="sr-only">(current)</span></a>
        </router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <router-link class="nav-item" tag="li" to="/auth">
          <a class="nav-link" @click.prevent="logoutPage"
            >{{ authenticated ? "Logout" : "Auth" }}
            <span class="sr-only">(current)</span></a
          >
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    authenticated() {
      return this.isAuthenticated();
    },
  },
  methods: {
    ...mapGetters(["isAuthenticated"]),
    ...mapActions(["logout"]),

    async logoutPage() {
      if(this.authenticated){
          await this.logout();
      }
    },
  },
};
</script>

<style>
</style>