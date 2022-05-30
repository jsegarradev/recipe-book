import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import Button from "primevue/button";
import Menubar from "primevue/menubar";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')

app.component('p-button',Button)
app.component('p-menubar',Menubar)
