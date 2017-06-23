import Vue from 'vue';
import Router from 'vue-router';
// import App from '../App';
import Shop from 'components/shop/shop';
import Food from 'components/food/food';

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
		}
  ]
});
