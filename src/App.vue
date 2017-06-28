<template>
  <div id="app">
    <geo-position @goback="setGPS" v-if="showFlagGPS"></geo-position>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import GeoPosition from 'components/geo-position/geo-position';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'showFlagGPS'
      ])
    },
    methods: {
      setGPS () {
        this.setGPSShow(!this.showFlagGPS);
      },
      ...mapMutations({
        'setGPSShow': 'SET_SHOWFLAGGPS'
      })
    },
    components: {
      GeoPosition
    }
  };
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
