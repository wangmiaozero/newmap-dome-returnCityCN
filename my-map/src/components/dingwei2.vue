<template>
    <div>
        <div id="allmap"></div>
    </div>
</template>
<script>
export default {
     data(){
          return{
            map:null
          }
      },
    created () {
      this.dingwei();  
    },
    methods:{
        dingwei(){
            // 百度地图API功能  
var map = new BMap.Map("allmap");//创建百度地图实例，这里的allmap是地图容器的id  
var point = new BMap.Point(113.721713, 34.774855);//创建一个点对象，这里的参数是地图上的经纬度  
map.centerAndZoom(point, 12);//这里是将地图的中心移动到我们刚才创建的点；这里的12是地图的缩放界别；数值越大，地图看的越细  
  
//定位  
var geolocation = new BMap.Geolocation();  
   geolocation.getCurrentPosition(function(result){  
    if(this.getStatus() == BMAP_STATUS_SUCCESS){  
           var mk = new BMap.Marker(result.point);//创建一个覆盖物  
           map.addOverlay(mk);//增加一个标示到地图上  
           map.panTo(result.point);  
           latitude  = result.point.lat;//获取到的纬度  
           longitude = result.point.lng;//获取到的经度  
       }  
   });
//定位  
    var geolocation = new BMap.Geolocation();  
    geolocation.getCurrentPosition(function(result){  
        if(this.getStatus() == BMAP_STATUS_SUCCESS){  
            var mk = new BMap.Marker(result.point);//创建一个覆盖物  
            map.addOverlay(mk);//增加一个标示到地图上  
            addMarker(result.point);  
            latitude  = result.point.lat;//获取到的纬度  
            longitude = result.point.lng;//获取到的经度  
            console.log(latitude,longitude)
        }  
    });  
  
    function addMarker(point){  // 创建图标对象     
        var myIcon = new BMap.Icon("position.png", new BMap.Size(23, 50), {offset: new BMap.Size(10, 25)});  
        // 创建标注对象并添加到地图     
        var marker = new BMap.Marker(point, {icon: myIcon});      
        map.addOverlay(marker);  
    }  


        }
    }
};
</script>
<style>
body{font-size:13px;margin:0px}
#container{width:600px;height:400px}
.label{margin-left:20px;font-weight:bold;font-size:14px}
.lng-lat{
	margin: 0 0 30px 0px;
}
.lng-lat .item{
	margin: 10px;
}
</style>


