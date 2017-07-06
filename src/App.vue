<template>
  <div id="app">
    <geo-position @goback="setGPS" v-if="showFlagGPS"></geo-position>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import GeoPosition from 'components/geo-position/geo-position';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import {autoGPS} from 'api/search';

  export default {
    computed: {
      ...mapGetters([
        'showFlagGPS',
        'latitude',
        'longitude'
      ])
    },
    created () {
      // 获取当前的地理位置信息
      if (!this.latitude || !this.longitude) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            autoGPS(position.coords.latitude, position.coords.longitude).then((response) => {
              this.setGeoPosition({
                latitude: response.latitude,
                longitude: response.longitude,
                geohash: response.geohash
              });
            });
          });
        }
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
