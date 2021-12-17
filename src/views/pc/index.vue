<template>
  <div class="main-pc">这是PC端的内容区</div>
  <div>
    <h2>数据库中的数据：</h2>
    <h3>PC端显示姓名：{{userInfo.name}}</h3> 
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getMouInfo } from '@/apis/user.js'

const userInfo = reactive({
  name:""
})

onMounted(()=>{
  let queryInfo = {}
  getMouInfo(queryInfo).then(res=>{
    console.log("res===>",res)
    let rowData = res.data[0]
    userInfo.name = rowData.name
  })
})

</script>

<style lang="less" scope>
.main-pc {
  width: 100%;
  // height: 50px;
  // line-height: 50px;
  // background: pink;
}
</style>