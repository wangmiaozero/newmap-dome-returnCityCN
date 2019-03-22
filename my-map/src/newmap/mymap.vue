<template>
  <!--地图容器-->
  <div id="XSDFXPage" class="XSDFXPage"></div>

</template>
<script>
  export default {
    data () {
      return {

      }
    },
    mounted() {

      //创建Map实例
      var map = new BMap.Map("XSDFXPage");
      // 初始化地图,设置中心点坐标
      var point = new BMap.Point(121.160724,31.173277);// 创建点坐标
      map.centerAndZoom(point,15);
      //添加鼠标滚动缩放
      map.enableScrollWheelZoom();

      //添加缩略图控件
      map.addControl(new BMap.OverviewMapControl({isOpen:false,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
      //添加缩放平移控件
      map.addControl(new BMap.NavigationControl());
      //添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      //添加地图类型控件
      //map.addControl(new BMap.MapTypeControl());

      //设置标注的图标
      var icon = new BMap.Icon("./static/img/map.png",new BMap.Size(100,100));
      //设置标注的经纬度
      var marker = new BMap.Marker(new BMap.Point(121.160724,31.173277),{icon:icon});
      //把标注添加到地图上
      map.addOverlay(marker);
      var content = "<table>";
      content = content + "<tr><td> 编号：001</td></tr>";
      content = content + "<tr><td> 地点：上海汉得信息技术股份有限公司</td></tr>";
      content = content + "<tr><td> 时间：2018-1-3</td></tr>";
      content += "</table>";
      var infowindow = new BMap.InfoWindow(content);
      marker.addEventListener("click",function(){
        this.openInfoWindow(infowindow);
      });

      //点击地图，获取经纬度坐标
      map.addEventListener("click",function(e){
        document.getElementById("a").innerHTML = "经度坐标："+e.point.lng+" &nbsp;纬度坐标："+e.point.lat;
      });


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
  #XSDFXPage{
    width: 100%;
    height: 600px;
  }
</style>
