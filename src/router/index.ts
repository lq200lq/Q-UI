import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/example/icons',
      name: 'example-icons',
      component: () => import('../../example/icons/IconGalleryPage.vue'),
    },
    {
      path: '/example/components',
      name: 'example-components',
      component: () =>
        import('../../example/components/ComponentsIndexPage.vue'),
    },
    {
      path: '/example/components/core',
      name: 'example-components-core',
      component: () => import('../../example/components/CoreGalleryPage.vue'),
    },
    {
      path: '/example/components/forms',
      name: 'example-components-forms',
      component: () => import('../../example/components/FormsGalleryPage.vue'),
    },
    {
      path: '/example/components/blocks',
      name: 'example-components-blocks',
      component: () => import('../../example/components/BlocksGalleryPage.vue'),
    },
    {
      path: '/example/components/board',
      name: 'example-components-board',
      component: () => import('../../example/components/BoardGalleryPage.vue'),
    },
    {
      path: '/example/layout',
      name: 'example-layout',
      component: () => import('../../example/layout/LayoutShellPage.vue'),
    },
    {
      path: '/example/page',
      name: 'example-page',
      component: () => import('../../example/page/PageDemoPage.vue'),
    },
  ],
})
