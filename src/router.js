import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      children: [
        {
          path: '',
          name: 'projects',
          component: () => import('./pages/home/projects/ProjectsComponent.vue'),
        }
      ]
    },
    {
      path: '/projects/:id',
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
