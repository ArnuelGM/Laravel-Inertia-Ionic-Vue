import { createApp, h } from 'vue'

import { IonicVue } from '@ionic/vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
const routes = [
  // routes go here
]
const router = createRouter({
  history: createWebHistory(process?.env?.BASE_URL || '/'),
  routes,
})

import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

InertiaProgress.init()

createInertiaApp({
  resolve: name => require(`./Pages/${name}`),
  title: title => title ? `${title} - Ping CRM` : 'Ping CRM',
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(IonicVue)
      .use(router)
      .mount(el)
  },
})
