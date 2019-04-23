import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import linmap from '@/components/linmap'
import mymap from '@/components/mymap'
import mymap2 from '@/components/mymap2'
import mymap3 from '@/components/mymap3'
import mapinfowinwod from '@/components/js-mapinfowinwod.vue'
import mapinfowinwod1 from '@/components/js-mapinfowinwod1.vue'
import maphuaxianlu from '@/components/huaxianlu'
import Cordova from '@/components/Cordova'
import dingwei from '@/components/dingwei'
import goodsinfo from '@/components/goodsinfo'
import dingwei2 from '@/components/dingwei2'
import mapmap from '@/components/mapmap'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/linmap',
      name: 'linmap',
      component:linmap
    },
    {
      path:'/mymap',
      name:'mymap',
      component:mymap
    },
    {
      path:'/mymap2',
      name:'mymap2',
      component:mymap2
    },
    {
      path:'/mymap3',
      name:'mymap3',
      component:mymap3
    },
    {
      path:'/mapinfowinwod',
      name:'mapinfowinwod',
      component:mapinfowinwod
    },
    {
      path:'/mapinfowinwod1',
      name:'mapinfowinwod1',
      component:mapinfowinwod1
    },
    {
      path:'/huaxianlu',
      name:'huaxianlu',
      component:maphuaxianlu
    },
    {
      path:'/Cordova',
      name:'Cordova',
      component:Cordova
    },
    {
      path:'/dingwei',
      name:'dingwei',
      component:dingwei
    },{
      path:'/goodsinfo',
      name:'goodsinfo',
      component:goodsinfo
    },
    {
      path:'/dingwei2',
      name:'dingwei',
      component:dingwei2
    },
    {
      path:'/mapmap',
      name:'mapmap',
      component:mapmap
    }
 
  ]
})
