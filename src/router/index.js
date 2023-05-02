import { createRouter, createWebHistory } from 'vue-router';
const TestPage = () => import("@/pages/TestPage.vue");
const StartPage = () => import("@/pages/StartPage.vue");
const CompletePage = () => import("@/pages/CompletePage.vue");

const checkComplete = (to, from) => {
  if (from.path !== '/test') return '/';
};

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
    },
    {
      path: '/complete',
      name: 'CompletePage',
      component: CompletePage,
      beforeEnter: checkComplete,
      props: (route) => ({
        accuracy: route.query.accuracy,
        printSpeed: route.query.printSpeed
      })
    }
  ]
});

export default router;
