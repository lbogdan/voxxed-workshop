import Vue from 'vue';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
