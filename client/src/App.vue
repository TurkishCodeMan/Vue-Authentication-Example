<template>
  <body>
    <div id="app">
      <Home></Home>
    </div>
  </body>
</template>

<script>
import Home from "./components/Home";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: { Home },
  methods: {
    ...mapGetters(["getError"]),
    ...mapActions(["initAuth"]),
  },
  computed: {
    error() {
      return this.getError();
    },
  },
  watch: {
    error() {
      this.$noty.error(this.getError().message);
    },
  },

};
</script>

<style lang='scss'>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
