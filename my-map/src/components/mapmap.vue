<template>
    <div>
             <div id="allmap"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        // 百度地图API功能
    //GPS坐标121.570374, 31.163718
    var x = 121.570374;
    var y = 31.163718;
    var ggPoint = new BMap.Point(x,y);

    //地图初始化
    var bm = new BMap.Map("allmap");
    bm.centerAndZoom(ggPoint, 15);
    bm.addControl(new BMap.NavigationControl());

    //添加gps marker和label
    var markergg = new BMap.Marker(ggPoint);
    bm.addOverlay(markergg); //添加GPS marker
    var labelgg = new BMap.Label("未转换的GPS坐标（错误）",{offset:new BMap.Size(20,-10)});
    markergg.setLabel(labelgg); //添加GPS label

    //坐标转换完之后的回调函数
    translateCallback = function (data){
      if(data.status === 0) {
        var marker = new BMap.Marker(data.points[0]);
        bm.addOverlay(marker);
        var label = new BMap.Label("转换后的百度坐标（正确）",{offset:new BMap.Size(20,-10)});
        marker.setLabel(label); //添加百度label
        bm.setCenter(data.points[0]);
      }
    }

    setTimeout(function(){
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback)
    }, 1000);
    }
}
</script>
<style>

</style>


