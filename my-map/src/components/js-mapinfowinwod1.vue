<template>
    <div>
      <!--地图容器-->
      <div id="mapcontainer"></div>
    </div>
</template>

<script>
    import '../assets/jquery-3.1.0.min'
    export default {
      data() {
        return {}
      },
      mounted() {
        var car1 = [
          ["113.208619", "23.170208","广州","装车","2016-12-05 19:47:03"],
          ["112.622218","26.979794","","装车","2016-12-05 19:47:03"],
          ["113.006332","28.263503","长沙","当前位置","2016-12-05 19:47:03"],
          ["111.731111","40.842","呼和浩特","暂未到达目的地"]
        ];
        var car2 = [
          ["120.230199","30.215376","","装车","2016-12-05 19:47:03"],
          ["108.945456","34.366566","西安","当前位置","2016-12-05 19:47:03"],
          ["87.504831","43.937895","乌鲁木齐","暂未到达目的地"]
        ];
        //创建地图实例
        var mp = new BMap.Map("mapcontainer", {enableMapClick:false});
        mp.centerAndZoom(new BMap.Point(112.438233, 34.654336), 6);
        mp.enableScrollWheelZoom();
        currentLocation(["113.006332","28.263503"],car1);
        currentLocation(["108.945456","34.366566"],car2);
        //标注当前车辆坐标位置
        function currentLocation(curPosArr,carArr){
          var curPt = new BMap.Point(curPosArr[0],curPosArr[1]);      //当前位置
          var curIcon = new BMap.Icon("img/working.png",new BMap.Size(28,20));
          var curMarker = new BMap.Marker(curPt,{icon:curIcon});
          mp.addOverlay(curMarker);
          var isDraw = false;             //是否已经绘制过路线
          curMarker.onclick = function(){
            drawPath(carArr,isDraw);
            isDraw = true;
          }
        };
        //绘制路线
        function drawPath(carArr,isDraw){
          if(isDraw){                 //若绘制过路线  返回 false
            return false;
          };
          var pointArr = [];
          var ptNum = 0;
          var driving = new BMap.DrivingRoute(mp);    //创建驾车实例
          // 复杂的自定义覆盖物
          function ComplexCustomOverlay(point,state,time) {
            this._point = point;
            this.state = state;
            this.time = time;
          };
          ComplexCustomOverlay.prototype = new BMap.Overlay();
          ComplexCustomOverlay.prototype.initialize = function(map) {
            this._map = map;
            var div = this._div = document.createElement("div");
            $(div).addClass('state-wrap');
            var str =   '<div class="logistics-wrap">';
            str +=      '<div class="logistics-state">'+this.state+'</div>';
            str +=      '<div class="logistics-time">'+this.time+'</div>';
            str +=  '</div>';
            div.innerHTML = str;
            mp.getPanes().labelPane.appendChild(div);
            var he = div.offsetHeight;
            this._he = he;          //当前div的高度
            return div;
          };
          ComplexCustomOverlay.prototype.draw = function() {
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x -24+"px";
            this._div.style.top = pixel.y -this._he+5+ "px";
          };
          /*自定义复杂覆盖物结束*/
          for(var i = 0,len = carArr.length;i<len;i++){
            var point = new BMap.Point(carArr[i][0],carArr[i][1]);
            pointArr[i] = point;
            var myIcon = new BMap.Icon("img/location_icon.png",new BMap.Size(9,9));
            var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
            mp.addOverlay(marker);                              // 将标注添加到地图中
            //此处解决在for循环中添加事件总是执行最后一个的情况，传入参数并且立即执行
            (function(point,state,time){
              var myComOverlay = new ComplexCustomOverlay(point,state,time);
              mp.addOverlay(myComOverlay);
              marker.onclick = function(){                    //给各个点添加点击事件，显示、隐藏自定义复杂物
                if(myComOverlay.isVisible()){
                  myComOverlay.hide();
                }else{
                  myComOverlay.show();
                }
              }
            })(point,carArr[i][3], carArr[i][4]);
          };
          var len = pointArr.length-1;
          initRoute(ptNum);
          function initRoute(num){
            driving.search(pointArr[num],pointArr[num+1]);
            driving.setSearchCompleteCallback(function(){
              var plan = driving.getResults().getPlan(0);
              var pts = plan.getRoute(0).getPath();
              var lineCor = ptNum == (len-1) ? 'red':"#1aea0a";
              var lineSty = ptNum == (len-1) ? 'dashed':"solid";
              var polyline = new BMap.Polyline(pts,{strokeColor:lineCor, strokeWeight:3, strokeOpacity:0.8,strokeStyle:lineSty});
              mp.addOverlay(polyline);
              //查找下两个点
              ptNum++;
              if(ptNum < len){
                initRoute(ptNum);
              }
            });
          };
          mp.setViewport(pointArr);       //自动调整视野
        };
      },
      methods: {


      }
    }
</script>

<style scoped>
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
  #mapcontainer[data-v-9a96914a]{
    height: 600px;
  }
  #mapcontainer {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .state-wrap{
    padding-bottom: 16px;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    line-height: 16px;
    /*background:url(img/map_label.png) no-repeat left bottom;*/
  }
  .logistics-wrap{
    background: #fff;
    padding: 10px;
  }
  .logistics-state,.logistics-time{
    padding-left: 25px;
    height: 25px;
    line-height: 25px;
    width: 125px;
    overflow: hidden;
    text-overflow : ellipsis;
    white-space: nowrap;
  }
  .logistics-state{
    /*background:url(img/state_icon.png) no-repeat left center;*/
  }
  .logistics-time{
    /*background:url(img/clock_icon.png) no-repeat left center;*/
  }
</style>
