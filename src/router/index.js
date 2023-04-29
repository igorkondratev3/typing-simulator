import { createRouter, createWebHistory } from 'vue-router';
import TestPage from '../pages/TestPage.vue';
import StartPage from '../pages/StartPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    }
  ]
});

export default router;
