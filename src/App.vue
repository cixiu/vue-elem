<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <split></split>
    <div class="recommend">
      <h1 class="recommend-shopper border-1px">推荐商家</h1>
      <shopper></shopper>
    </div>
  </div>
</template>

<script  type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';
  import Split from 'base/split/split';
  import Shopper from 'components/shopper/shopper';

  export default {
    components: {
      MHeader,
      Tab,
      Split,
      Shopper
    }
  };
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  
  .recommend
    .recommend-shopper
      padding-left: 15px
      line-height: 34px
      font-size: 16px
      font-weight: 600
      background: #fff;
      border-1px(#eee)
</style>
