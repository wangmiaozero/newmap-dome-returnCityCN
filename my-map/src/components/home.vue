<template>
  <div>
    <h1>为什么地图不显示,因为你没有给高度</h1>
    <router-link to="/linmap">公交线路地图</router-link>
    <div id="container"></div>
  </div>
</template>
<script>
  export default {
    data:function(){
      return{
      }
    },
    mounted(){
      this.mYnewMap();
    },
    methods:{
      mYnewMap(){
        var map = new BMap.Map("container");
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        window.setTimeout(function(){
          map.panTo(new BMap.Point(116.409, 39.918));
        }, 2000);
        var opts = {
          width : 250,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : "Hello"  // 信息窗口标题
        }
        var infoWindow = new BMap.InfoWindow("World", opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口
      }
    }
  }
</script>

<!--Add"scoped" attribute to limit CSS to this component only -->
<style >
div #container{
  height: 640px;
}
</style>
