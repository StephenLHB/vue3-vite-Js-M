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

// export default {
//   components: {
//     Header,
//     Footer
//   }
// };
</script>

<style lang="less">
</style>
