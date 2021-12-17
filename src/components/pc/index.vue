<template>
  <div class="container">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from "./header.vue";
import Footer from "./footer.vue";
</script>

<style lang="less">
</style>
