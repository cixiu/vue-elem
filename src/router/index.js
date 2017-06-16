import Vue from 'vue';
import Router from 'vue-router';
import Shop from 'components/shop/shop';

Vue.use(Router);

export default new Router({
	mode: 'history',
  routes: [
		{
			path: '/shop/id=:id',
			component: Shop
		}
  ]
});
