import Vue from 'vue';
import Router from 'vue-router';

const Shop = (resolve) => {
	import('components/shop/shop').then((module) => {
		resolve(module);
	});
};

const Food = (resolve) => {
	import('components/food/food').then((module) => {
		resolve(module);
	});
};

const Search = (resolve) => {
	import('components/search/search').then((module) => {
		resolve(module);
	});
};

const SearchList = (resolve) => {
	import('components/search-list/search-list').then((module) => {
		resolve(module);
	});
};

const Msite = (resolve) => {
	import('components/msite/msite').then((module) => {
		resolve(module);
	});
};

const Discover = (resolve) => {
	import('components/discover/discover').then((module) => {
		resolve(module);
	});
};

const Order = (resolve) => {
	import('components/order/order').then((module) => {
		resolve(module);
	});
};

const Profile = (resolve) => {
	import('components/profile/profile').then((module) => {
		resolve(module);
	});
};

const Login = (resolve) => {
	import('components/login/login').then((module) => {
		resolve(module);
	});
};

const Info = (resolve) => {
	import('components/info/info').then((module) => {
		resolve(module);
	});
};

const Service = (resolve) => {
	import('components/service/service').then((module) => {
		resolve(module);
	});
};

const Vipcard = (resolve) => {
	import('components/vipcard/vipcard').then((module) => {
		resolve(module);
	});
};

Vue.use(Router);

export default new Router({
	// mode: 'history',
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
			component: Profile,
			children: [
				{
					path: 'info',
					component: Info
				}
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/service',
			component: Service
		},
		{
			path: '/vipcard',
			component: Vipcard
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
