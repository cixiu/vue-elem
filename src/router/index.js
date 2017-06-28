import Vue from 'vue';
import Router from 'vue-router';
// import App from '../App';
import Shop from 'components/shop/shop';
import Food from 'components/food/food';
import Search from 'components/search/search';
import SearchList from 'components/search-list/search-list';
import Msite from 'components/msite/msite';
import Discover from 'components/discover/discover';
import Order from 'components/order/order';
import Profile from 'components/profile/profile';

Vue.use(Router);

export default new Router({
	mode: 'history',
  routes: [
		{
			path: '/',
			redirect: '/msite'
		},
		{
			path: '/msite',
			component: Msite
		},
		{
			path: '/discover',
			component: Discover
		},
		{
			path: '/order',
			component: Order
		},
		{
			path: '/profile',
			component: Profile
		},
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
