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
        // 初始化地图,设置中心点坐标
        var point = new BMap.Point(116.404, 39.915);// 创建点坐标
        this.map.centerAndZoom(point,15);
        //添加鼠标滚动缩放
        this.map.enableScrollWheelZoom();
        var p1 = new BMap.Point(116.301934,39.977552);
        var p2 = new BMap.Point(116.508328,39.919141);
        //设置标注的图标
        var icon = new BMap.Icon("./static/img/map.png",new BMap.Size(100,100));
        var icon1 = new BMap.Icon("./static/img/map.png",new BMap.Size(100,100));
        //设置标注的经纬度
        var marker = new BMap.Marker(new BMap.Point(116.301934,39.977552),{icon:icon});
        var marker1 = new BMap.Marker(new BMap.Point(116.508328,39.919141),{icon:icon1});
        //把标注添加到地图上
        this.map.addOverlay(marker);
        this.map.addOverlay(marker1);
        var content = "<table>";
        content = content + "<tr><td> 编号：001</td></tr>";
        content = content + "<tr><td> 地点：上海云邻通信科技有限公司</td></tr>";
        content = content + "<tr><td> 时间：2019-3-17</td></tr>";
        content += "</table>";
        var content1 = "<table>";
        content1 = content1 + "<tr><td> 编号：002</td></tr>";
        content1 = content1 + "<tr><td> 地点：上海云邻通信科技有限公司</td></tr>";
        content1 = content1 + "<tr><td> 时间：2019-3-17</td></tr>";
        content1 += "</table>";
        var infowindow = new BMap.InfoWindow(content);
       // var infowindow1 = new BMap.InfoWindow(content1);
        marker.openInfoWindow(infowindow);//页面加载就让他显示
      //  marker1.openInfoWindow(infowindow1);
        marker.addEventListener("click",function(){
          console.dir(this);//这里的this指向v  也就是new出来marker
          this.openInfoWindow(infowindow);
        });
        marker1.addEventListener("click",function(){
          console.dir(this);//这里的this指向v  也就是new出来marker
          this.openInfoWindow(infowindow1);
        });
        var transit = new BMap.TransitRoute(this.map, {
          renderOptions: {map: this.map}
        });
        transit.search(p1, p2);
        //搜索站点,并且标点
        var local = new BMap.LocalSearch(this.map, {
          renderOptions: {map: this.map, panel: "r-result"}
        });
        local.search("公交车站");
        enableAutoPan(true);
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
