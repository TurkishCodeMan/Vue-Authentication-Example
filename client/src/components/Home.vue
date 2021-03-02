<template>
  <section>
    <Header></Header>
    <div class="container">
      <router-view></router-view>
    
    </div>
  </section>
</template>

<script>
import Header from "./Header";

export default {

  components: {
    Header,
  },

};
</script>

<style>
</style>