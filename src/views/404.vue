<template>
  <div class="missing">
    <el-button class="back" type="primary" round @click="back">返回首页</el-button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  if (sessionStorage.getItem("token")) {
    router.push("/homepage");
  } else {
    router.push("/");
  }
};
</script>
<style scoped>
.missing {
  height: 100%;
  background: url("@/assets/images/missing.jpeg") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}
.back {
  width: 200px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
