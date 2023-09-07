/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'
import 'animate.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import draggable from 'vuedraggable'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vue virtual scroller
import VueVirtualScroller from 'vue-virtual-scroller'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueVirtualScroller)
app.component('draggable', draggable)

app.mount('#app')
