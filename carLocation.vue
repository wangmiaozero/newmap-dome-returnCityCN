<template>
  <div id="app">
    <div id="allmap" ref="allmap"></div>
  </div>
</template>
<script>
  import {busNowLocation} from '../../api/index'
  import {getBusInfo} from '../../api/index'
  export default {
    data(){
      return {
        map:null,
        ubsId:""
      }
    },
    created(){
     this.ubsId= sessionStorage.getItem('lineBusId')
    },
    mounted(){
      this.map = new BMap.Map(this.$refs.allmap);
      this.map.centerAndZoom(new BMap.Point(121.570374, 31.163718), 11);// 初始化地图,设置中心点坐标和地图级别
      this.map.setCurrentCity("上海");
      this.map.enableScrollWheelZoom(true);
      this.waypoints();
    },
    methods:{
      //途径点
      waypoints(){
        let data = JSON.parse(this.ubsId);
        getBusInfo(data).then((res)=>{
          console.log(res);

        })
      },
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

</style>
