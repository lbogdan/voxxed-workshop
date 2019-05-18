import Vue from 'vue';
import 'materialize-css/dist/css/materialize.css';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
