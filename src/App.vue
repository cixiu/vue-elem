<template>
  <div id="app">
    <geo-position @goback="setGPS" v-if="showFlagGPS"></geo-position>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import GeoPosition from 'components/geo-position/geo-position';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'showFlagGPS'
      ])
    },
    created () {
      // 获取当前的地理位置信息
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setGeoPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            geohash: null
          });
        });
      }
    },
    methods: {
      setGPS () {
        this.setGPSShow(!this.showFlagGPS);
      },
      ...mapMutations({
        'setGPSShow': 'SET_SHOWFLAGGPS'
      }),
      ...mapActions([
        'setGeoPosition'
      ])
    },
    components: {
      GeoPosition
    }
  };
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
