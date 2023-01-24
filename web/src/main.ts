import '../node_modules/bulma/css/bulma.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./routers";

createApp(App)
  .use(router)
  .mount('#app')
