<template>
  <div id="app">
    <div id="allmap" ref="allmap"></div>
    <div id="l-map"></div>
    <div id="r-result"></div>
  </div>
</template>
<script>
  import {busNowLocation} from '../../api/index'
  export default {
    data(){
      return {
        map:null,
        myallpoints :"",

      }
    },
    created(){
      console.log(JSON.parse(sessionStorage.getItem('MylineMapName')));
      this.myallpoints = JSON.parse(sessionStorage.getItem('MylineMapName'));
    },
    mounted(){

      this.map = new BMap.Map(this.$refs.allmap);
      this.map.centerAndZoom(new BMap.Point(121.570374, 31.163718), 11);// 初始化地图,设置中心点坐标和地图级别
      //this.map.setCurrentCity("上海");
      this.map.enableScrollWheelZoom();
      console.log(this.map);
      var map = this.map;
       var transit = new BMap.TransitRoute(this.map, {renderOptions: {map: this.map},onSearchComplete: function(result){
           if (transit.getStatus() == BMAP_STATUS_SUCCESS){
             var firstPlan = result.getPlan(0);

            // console.log(this.map);
             // 绘制公交线路
             for ( var i = 0; i < firstPlan.getNumLines(); i++){

               var line = firstPlan.getLine(i);
               map.addOverlay(new BMap.Polyline(line.getPath()));
             }
             // 输出方案信息
             var s = [];
             for (var i = 0; i < result.getNumPlans(); i++){
               s.push((i + 1) + ". " + result.getPlan(i).getDescription(false));
             }
             document.getElementById("r-result").innerHTML = s.join("<br/>");
           }
         }
       });
       //transit.search("周秀路瑞建路", "莲溪路北中路");
       transit.search(this.myallpoints.beginSiteName, this.myallpoints.endSiteName);





    },
    methods:{

    }
  }
</script>
<style scoped>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #allmap{
    width: 500px;
    height: 100%;
  }
  #l-map{height:300px;width:100%;}
  #r-result {width:100%; font-size:14px;line-height:20px;}
</style>


