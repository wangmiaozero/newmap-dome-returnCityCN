<template>
  <div id="app">
    <div id="allmap" ref="allmap"></div>
    <div id="l-map"></div>
    <!--<div id="r-result"></div>-->


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
// 百度地图API功能
      this.map = new BMap.Map("l-map");            // 创建Map实例
      this.map.centerAndZoom(new BMap.Point(121.570374, 31.163718), 11);

      var busline = new BMap.BusLineSearch(this.map,{
        renderOptions:{map:this.map,panel:"r-result"},

        onGetBusListComplete: function(result){
          if(result) {
            var fstLine = result.getBusListItem(0);//获取第一个公交列表显示到map上
            busline.getBusLine(fstLine);
          }
        }
      });
     var   mybusName= JSON.parse(sessionStorage.getItem('MyMapUbsIDline'))
      function busSearch(){
        var busName = mybusName;
        busline.getBusList(busName);
      }
      setTimeout(function(){
        busSearch();
      },1500);
/*
// 百度地图API功能
      this.map = new BMap.Map("allmap");
      this.map.centerAndZoom(new BMap.Point(121.570374, 31.163718), 11);
      this.map.enableScrollWheelZoom();
      var start = "沪南路御桥路" ,end = "沪南路陈春路";
      var transit = new BMap.TransitRoute(this.map, {
        renderOptions: {map: this.map}
      });
      transit.search(start,end);
      var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/location.gif", new BMap.Size(14,23));
      //设置起终点图标
      transit.setMarkersSetCallback(function(result){
        result[0].marker.setIcon(myIcon);
        result[1].marker.setIcon(myIcon);
      })*/
       /*var map = new BMap.Map("allmap");
       map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
       map.enableScrollWheelZoom();
       var start = "魏公村" ,end = "百度大厦";
       var transit = new BMap.TransitRoute(map, {
         renderOptions: {map: map}
       });
       transit.search(start,end);
       var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/location.gif", new BMap.Size(14,23));
       //设置起终点图标
       transit.setMarkersSetCallback(function(result){
         result[0].marker.setIcon(myIcon);
         result[1].marker.setIcon(myIcon);
       })
      this.map = new BMap.Map(this.$refs.allmap);
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915),15);// 初始化地图,设置中心点坐标和地图级别
      //this.map.setCurrentCity("上海");
      this.map.enableScrollWheelZoom();
     // console.log(this.map);
      var myP1 = new BMap.Point(116.380967,39.913285);    //起点
      var myP2 = new BMap.Point(116.424374,39.914668);    //终点
      var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/Mario.png", new BMap.Size(32, 70), {    //小车图片
        //offset: new BMap.Size(0, -5),    //相当于CSS精灵
        imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
      });
      var driving2 = new BMap.DrivingRoute(this.map, {renderOptions:{map: this.map, autoViewport: true}});    //驾车实例
      driving2.search(myP1, myP2);    //显示一条公交线路
      var map = this.map;
      window.run = function (){
        var driving = new BMap.DrivingRoute(map);    //驾车实例
        driving.search(myP1, myP2);
        driving.setSearchCompleteCallback(function(){
          var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
          var paths = pts.length;    //获得有几个点

          var carMk = new BMap.Marker(pts[0],{icon:myIcon});
          map.addOverlay(carMk);
         var i=0;
          function resetMkPoint(i){
            carMk.setPosition(pts[i]);
            if(i < paths){
              setTimeout(function(){
                i++;
                resetMkPoint(i);
              },100);
            }
          }
          setTimeout(function(){
            resetMkPoint(5);
          },100)

        });
      }
*/
      setTimeout(function(){
        run();
      },1500);






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
  #l-map{height:100%;width:100%;}
  #r-result {width:100%;}

</style>


