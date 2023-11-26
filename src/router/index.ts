import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProfileView from '@/views/ProfileView.vue';
import TodoView from '@/views/TodoView.vue';
import WeatherView from '@/views/WeatherView.vue';
import DashboardViewVue from '@/views/DashboardView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: DashboardViewVue },
  { path: '/profile', component: ProfileView },
  { path: '/todo', component: TodoView },
  { path: '/weather', component: WeatherView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
