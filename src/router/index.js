import { createRouter, createWebHistory } from "vue-router"
import pcHomePage from '@/components/pc/index.vue'
import mobileHomePage from '@/components/mobile/index.vue'
import pxIndex from '@/views/pc/index.vue'
import mobileIndex from '@/views/mobile/index.vue'

const routesP = [{
  path: '/',
  name: 'Pc',
  redirect: '/',
  component: pcHomePage,
  children: [{
    path: '/',
    name: 'index',
    component: pxIndex
  }]
}]

const routesM = [{
  path: '/',
  name: 'Mobile',
  redirect: '/',
  component: mobileHomePage,
  children: [{
    path: '/',
    name: 'index',
    component: mobileIndex
  }]
}]

var routes = [];
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  routes = routesM
} else {
  routes = routesP
}


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

