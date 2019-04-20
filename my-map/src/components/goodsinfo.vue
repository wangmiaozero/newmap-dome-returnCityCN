<template>
    <div>
        <h1>地图跳转</h1>  
        <a href="amapuri://route/plan/?sid=BGVIS1&slat=39.92848272&slon=116.39560823&sname=A&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0">aaaa</a>
        <h1  @click="to">跳转高德IOS</h1>
        <h1  @click="to1">跳转高德Android</h1>
    </div>
</template>
<script>
export default {
    data(){
        return{
            gaode:"",
            gaode1:""
        }
    },
    created(){

    },
    mounted(){
       // this.gaodeif();
    },
    methods:{
        gaodeif(){
            if (isInstallApk(mContext, "com.autonavi.minimap")) {// 是否安装了高德
                var intents = new Intent();
                intents.setData(Uri.parse("androidamap://navi?sourceApplication=nyx_super&lat=" +    wLatLng.latitude + "&lon=" + wLatLng.longitude + "&dev=0&style=2"));
                startActivity(intents); // 启动调用
            }
            if (isInstallApk(mContext, "com.baidu.BaiduMap")) {// 是否安装了百度地图
                var intent = new Intent();
                // 驾车导航
                 intent.setData(Uri.parse("baidumap://map/navi?location=" + CommonUtils.bd_encrypt(wLatLng.latitude, wLatLng.longitude)));
                startActivity(intent); // 启动调用
            }
            if (!isInstallApk(mContext, "com.autonavi.minimap")&&!isInstallApk(mContext, "com.baidu.BaiduMap")) {
                var intent = new Intent();
                intent.setAction("android.intent.action.VIEW");
                // 驾车导航
                intent.setData(Uri.parse("http://uri.amap.com/navigation?from=" + cLatLng.longitude + "," + cLatLng.latitude + "&to="+ wLatLng.longitude + "," + wLatLng.latitude + "&mode=car&src=nyx_super"));
                startActivity(intent); // 启动调用
            }
          
        },
        to(){
              this.gaode = `iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat=39.92848272&slon=116.39560823&sname=A&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0`
            console.log(this.gaode);
            this.$router.push({
                path:this.gaode
            })
        },
        to1(){
           // 调用第三方程序
function launchTest() {
    if ( plus.os.name == "Android" ) {
        plus.runtime.launchApplication( {pname:"第三方app包名"
            ,extra:{url:"第三方提供的uri"}}, function ( e ) {
                alert( "Open system default browser failed: " + e.message );
        } );
    } else if ( plus.os.name == "iOS" ) {
        plus.runtime.launchApplication( {action:"第三方提供的uri"}, function ( e ) {
            alert( "Open system default browser failed: " + e.message );
        } );
    }
}
        }
    }
}
</script>
<style>

</style>


