<template>
  <!--地图容器-->
  <div id="divId" class="XSDFXPage"></div>

</template>
<script>
  export default {
    data () {
      return {

      }
    },
    mounted() {

      function baiduMapFunction(divId, hotelArray) {
        var map = new BMap.Map(divId);// 创建百度地图对象


        map.centerAndZoom(new BMap.Point(116.404, 39.915),12);


        map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); // 启用地图惯性拖拽，默认禁用
        map.addControl(new BMap.NavigationControl()); // 添加默认缩放平移控件,左上角
        map.addControl(new BMap.ScaleControl()); // 添加默认比例尺控件
        map.addControl(new BMap.MapTypeControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT
        })); // 左上角，默认地图控件
        for (var o in hotelArray) {
          var point = new BMap.Point(hotelArray[o].lng, hotelArray[o].lat);// 坐标点


          var hotelNameLabel = new BMap.Label(hotelArray[o].hotelName, {
            offset: new BMap.Size(20, -10)
          });// 标注显示名称


          var sContent = "<div>"
            + "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"
            + hotelArray[o].hotelName
            + "</h4>"
            + "<img style='float:right;margin:4px' id='imgDemo' src='../images/"
            + hotelArray[o].srcImage
            + "' width='139' height='104' title=''/>"
            + "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"
            + hotelArray[o].hotelAddress + "</p>" + "</div>";


          // 设置label 文本框的样式
          hotelNameLabel.setStyle({
            "borderColor": "red",
            "color": "red",
            "cursor": "pointer"


          });
          console.log(hotelArray[o].srcImage + sContent);

          var 	createMark = function(lng, lat, info_html) {
            var _marker = new BMap.Marker(new BMap.Point(lng, lat));
            _marker.addEventListener("click", function(e) {
              this.openInfoWindow(new BMap.InfoWindow(info_html));
            });
            _marker.addEventListener("mouseover", function(e) {
              this.setTitle("位于: " + lng + "," + lat);
            });
            return _marker;
          };



          var marker = createMark(hotelArray[o].lng, hotelArray[o].lat, sContent);


          map.addOverlay(marker);
          marker.setLabel(hotelNameLabel); // 添加百度label


        }
        city = new BMap.LocalSearch(map, {
          renderOptions: {
            map: map,
            autoViewport: true
          }
        }); // 地图显示到查询结果处
      }


      function searchCity() {
        var s = $("#searchValue").val();
        console.log(s);
        city.search(s); // 查找城市
      }
      var wangmiao = [116.301934,39.977552]
      baiduMapFunction(divId,wangmiao);
    }

  }
</script>
<style scoped>
  /*html,body,#XSDFXPage{*/
  /*width: 50%;*/
  /*height: 50%;*/
  /*overflow: hidden;*/
  /*margin: 0px auto;*/
  /*font-family: "微软雅黑";*/
  /*}*/
  #divId{
    width: 100%;
    height: 600px;
  }
</style>
