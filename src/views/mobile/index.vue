<template>
  <div class="main">这是移动端的首页内容区</div>
  <h2>数据库中的数据:</h2>
  <h3>移动端显示性别:{{userInfo.sex}}</h3> 
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getMouInfo } from '@/apis/user.js'

const userInfo = reactive({
  sex:""
})

onMounted(()=>{
  let queryInfo = {}
  getMouInfo(queryInfo).then(res=>{
    console.log("res===>",res)
    let rowData = res.data[0]
    userInfo.sex = rowData.sex
  })
})
</script>

<style lang="less" scope>
.main {
  width: 100%;
  // height: 50px;
  // line-height: 50px;
  // background: pink;
}
</style>