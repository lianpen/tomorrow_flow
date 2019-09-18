import Vue from 'vue'
import Router from 'vue-router'
import Cash from './views/cash/Cash.vue'
import DebugSeal from './views/debugSeal/DebugSeal.vue'

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
		}, {
			path: '/debugSeal',
			name: 'debugSeal',
			component: () => import('./views/debugSeal/DebugSeal.vue')
		}
	]
})
