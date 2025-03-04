import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: () => import('./pages/splash/SplashPage.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./pages/home/HomePage.vue'),
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('./pages/project/ProjectPage.vue'),
      children: [
        {
          path: '',
          name: 'tasks',
          component: () => import('./pages/project/taks/TasksComponent.vue'),
        },
        {
          path: 'tasks/new',
          name: 'task-new',
          component: () => import('./pages/project/taks/TaskFormComponent.vue'),
        },
        {
          path: 'tasks/:taskId',
          name: 'task-edit',
          component: () => import('./pages/project/taks/TaskFormComponent.vue'),
        }
      ]
    },
  ],
})

export default router
