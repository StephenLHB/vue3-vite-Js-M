<template>
  <div class="container">
    <Header />
    <router-view />
    <footer>
      <div
        style="
          position: fixed;
          bottom: 0;
          width: 100%;
          height: 40px;
          text-align: center;
        "
      >
        <a href="https://beian.miit.gov.cn/" target="_blank"
          >苏ICP备2021056807号-1</a
        >
      </div>
    </footer>
  </div>
</template>

<script setup>
import Header from "./header.vue";
import Footer from "./footer.vue";
</script>

<style lang="less"></style>
