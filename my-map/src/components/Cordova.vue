<template>
    <div>
        <div id="allmap"  ref="allmap"></div>
    </div>
</template>
<script>
import '../assets/jquery-3.1.0.min.js'
export default {
    data(){
        return{

        }
    },
    mounted(){
       
        var map = new BMap.Map("allmap");//创建地图实例
//页面初始化
$(function() {
    //初始化地图 默认加载上海
    var point = new BMap.Point(121.570374, 31.163718);
    map.centerAndZoom(point,16);//初始化地图，point为中心点，缩放级别为16
    map.enableScrollWheelZoom(true);
    
    //判断手机浏览器是否支持定位
    if(navigator.geolocation){
        var geolocation = new BMap.Geolocation();//创建定位实例
        
        geolocation.getCurrentPosition(showLocation,{enableHighAccuracy: true});//enableHighAccuracy 要求浏览器获取最佳结果

    }else{
     // alert("浏览器不支持地理定位。")
        this.map.addControl(new BMap.GeolocationControl());//添加定位控件 支持定位
    }
});
//处理定位后的信息
function showLocation(r){

    if(this.getStatus() == BMAP_STATUS_SUCCESS){//定位成功
    console.log(map);
        //新建中心点 并将地图中心移动过去
        var centerPoint = new BMap.Point(r.longitude,r.latitude);
        map.panTo(centerPoint);
        map.setCenter(centerPoint);
        console.log(centerPoint);//拿到自身经纬度
        //标注
        var mk = new BMap.Marker(centerPoint);
      //  mk.disableDragging();// 不可拖拽
        map.addOverlay(mk);
    }
    else {
        alert('failed'+this.getStatus());//定位失败
    }  
     // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true //会多出来一个点
  });  
    map.addControl(navigationControl);    
     // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
 
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);
     //var centerPoint = JSON.parse(centerPoint);
     //var p1 = new BMap.Point(centerPoint.lng,centerPoint.lat);
    console.log(centerPoint.lat,centerPoint.lng);
    var p1 = new BMap.Point(121.568026,31.173384);
    var p2 = new BMap.Point(121.570312,31.165022);
    var p4 = new BMap.Point(121.565301,31.178595);
    var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});
    driving.search(p1, p2,{waypoints:[p4]});//waypoints表示途经点
    

}

    }
}
</script>
<style>
#allmap{
    height: 800px;
}
</style>


