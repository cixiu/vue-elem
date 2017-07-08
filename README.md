# 使用vue全家桶实现饿了么外卖webapp的绝大部分功能

## 前言说明

在学习了vue的官方文档后，后续在网上又找了些有关vue实战的项目学习，其中比较经典的是慕课网的那门彷饿了么外卖app的课程。那么课程作为对vue的入门教程还是可以的，不过那么课程只是开发了一个商家详情页，其他的功能都没有实现，项目的复杂程度也远不如真实的饿了么。而本项目旨在完成饿了么的全部功能！

在这个项目开始前，本来想选豆瓣做的，看了下豆瓣的开发者平台，其中大部分的api都需要授权，所以就放弃了！之后又对比了下其他的外卖app,发现饿了么的页面给人的感觉是比较有层次感的，而且饿了么的api可以直接获取，大部分没有限制！有了数据支持，那么，接下来的事情就是可以进行开发了！

## 技术栈
> vue + vue-router + vuex + axios + webpack + es6 + stylus

## 项目运行

``` bash
git clone https://github.com/cixiu/vue-elem.git

cd vue-elem

npm install

npm run dev

npm run build
```

## 项目说明
> 由于后面数据api的受限，与用户有关的订单没有开发，其他功能基本开发完毕，后续还会继续完善这个项目~~

# 项目的目录结构

```
.
├─build
├─config
├─dist
├─src
│  │  App.vue                           // 入口组件
│  │  main.js                           // 程序入口
│  ├─api                               // 数据接口
│  │      category.js                  
│  │      config.js
│  │      discover.js
│  │      entries.js
│  │      filter.js
│  │      m-header.js
│  │      profile.js
│  │      search.js
│  │      service.js
│  │      shop.js
│  │      shopper.js  
│  ├─base                              // 基础组件
│  │  ├─back-top                      
│  │  │      back-top.vue              // 回到顶部组件
│  │  ├─cartball
│  │  │      cartball.vue              // 购物车小球组件
│  │  ├─filter-category
│  │  │      filter-category.vue       // 食品分类过滤组件
│  │  ├─filter-more
│  │  │      filter-more.vue           // 食品筛选过滤组件
│  │  ├─filter-sort
│  │  │      filter-sort.vue           // 食品排序过滤组件
│  │  ├─loading
│  │  │      loading.vue               // 加载更多组件
│  │  ├─m-filter
│  │  │      m-filter.vue              // 过滤组件头部
│  │  ├─m-title
│  │  │      m-title.vue               // 各个页面的头部组件
│  │  ├─no-result
│  │  │      no-result.vue             // 没有更多了组件
│  │  ├─scroll
│  │  │      scroll.vue                // Scroll组件
│  │  ├─slider
│  │  │      slider.vue                // 轮播图组件
│  │  ├─split
│  │  │      split.vue                 // 空隙组件
│  │  ├─star
│  │  │      star.vue                  // 星级评分组件
│  │  └─tips-alert
│  │          tips-alert.vue            // 操作提示组件
│  ├─common
│  │  ├─fonts                         // icon字体
│  │  ├─images                        // 默认图片
│  │  │      avatar.jpeg               // 默认的头像
│  │  │      default.jpg               // 图片懒加载默认图片
│  │  ├─js                            // 公用的js
│  │  │      cache.js
│  │  │      config.js
│  │  │      entries.js
│  │  │      food.js
│  │  │      jsonp.js
│  │  │      util.js
│  │  └─stylus                        // 公用的css
│  │          base.styl
│  │          icon.styl
│  │          index.styl
│  │          mixin.styl
│  │          reset.styl
│  ├─components                        // 业务组件
│  │  ├─discover                      // 发现页组件
│  │  │      discover.vue
│  │  ├─food                          // 食品组件
│  │  │      food.vue 
│  │  ├─geo-position
│  │  │      geo-position.vue          // 地理信息组件  
│  │  ├─goods                         
│  │  │      goods.vue                 // 商家详情页中的商品组件
│  │  ├─info
│  │  │      info.vue                  // 登录后的个人信息组件
│  │  ├─login
│  │  │      login.vue                 // 登录组件
│  │  ├─m-footer
│  │  │      m-footer.vue              // 底部footer组件
│  │  ├─m-header
│  │  │      m-header.vue              // 首页头部组件
│  │  ├─msite
│  │  │      msite.vue                 // 首页组件
│  │  ├─order
│  │  │      order.vue                 // 订单组件
│  │  ├─profile
│  │  │      profile.vue               // 登录信息组件
│  │  ├─ratings
│  │  │      ratings.vue               // 商家详情页中的评论组件
│  │  ├─search
│  │  │      search.vue                // 搜索商家、商品组件
│  │  ├─search-list
│  │  │      search-list.vue           // 搜索列表组件
│  │  ├─service
│  │  │      service.vue               // 服务组件
│  │  ├─shop
│  │  │      shop.vue                  // 商家详情页组件 
│  │  ├─shop-header
│  │  │      shop-header.vue           // 商家详情也头部组件
│  │  ├─shopcart
│  │  │      shopcart.vue              // 购物车组件
│  │  ├─shopper
│  │  │      shopper.vue               // 商家组件    
│  │  ├─tab
│  │  │      tab.vue                   // 食品分类导航组件  
│  │  └─vipcard
│  │          vipcard.vue               // 饿了么会员卡组件  
│  ├─router
│  │      index.js                      // 路由配置
│  └─store                             // vuex状态管理
│          actions.js
│          getters.js
│          index.js
│          mutations-types.js
│          mutations.js
│          state.js
└─static
.
```
# License

[GPL](https://github.com/cixiu/vue-elem/blob/master/LICENSE)
