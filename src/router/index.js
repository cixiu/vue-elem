import Vue from 'vue';
import Router from 'vue-router';
// import App from '../App';
import Shop from 'components/shop/shop';
import Food from 'components/food/food';
import Search from 'components/search/search';
import SearchList from 'components/search-list/search-list';

Vue.use(Router);

export default new Router({
	mode: 'history',
  routes: [
		{
			path: '/shop/id=:id',
			component: Shop
		},
		{
			path: '/food',
			component: Food
		},
		{
			path: '/search',
			component: Search,
			children: [
				{
					path: 'shop',
					component: SearchList
				}
			]
		}
  ]
});
