<template>
    <div class="linmap">
        hello world
      <router-link to="/mymap">标记店铺分店坐标</router-link>
      <div id="allmap" ref="allmap"></div>
        <div id="l-map" ref="l-map"></div>
        <div id="r-result"></div>


    </div>
</template>

<script>
    export default {
        name: "linmap",
      data(){
          return{
            map:null
          }
      },
      mounted(){
        this.map = new BMap.Map(this.$refs.allmap);
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);// 初始化地图,设置中心点坐标和地图级别
        this.map.setCurrentCity("北京");
        if(this.$route.params.from == 0 ){
          this.busLocation()
        }else if(this.$route.params.from == 1){
          this.busRoute()
        }else if(this.$route.params.from == 2){
          this.nearSite()
        }
        var p1 = new BMap.Point(116.301934,39.977552);
        var p2 = new BMap.Point(116.508328,39.919141);
        var transit = new BMap.TransitRoute(this.map, {
          renderOptions: {map: this.map}
        });
        transit.search(p1, p2);
        //这个是附近的搜索站点,并且标点
        var local = new BMap.LocalSearch(this.map, {
          renderOptions: {map: this.map, panel: "r-result"}
        });
        local.search("公交车站");
          this.mylinmap();
        var text = document.querySelector('.BMap_pop');
        console.log(text);
        // console.log(this.$refs.l-map);
      },
      methods:{
        mylinmap(){

        }
      }
    }
</script>

<style scoped >
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #allmap,#allmap[data-v-28dae9bb]{
    width: 100% ;
    height: 600px ;
  }
  body[data-v-28dae9bb], html[data-v-28dae9bb], #allmap[data-v-28dae9bb].BMap_pop{
    display: block;
  }
  body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>
