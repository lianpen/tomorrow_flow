import Vue from 'vue'
import Router from 'vue-router'
import Cash from './views/cash/Cash.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'cash',
			component: Cash
		},
		{
			path: '/cash',
			name: 'cash',
			component: Cash // () => import('./views/Cash.vue')
		}, {
			path: '/resign',
			name: 'resign',
			component: () => import('./views/resign/Resign.vue')
		}
	]
})
