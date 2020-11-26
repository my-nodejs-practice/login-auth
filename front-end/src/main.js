import Vue from 'vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './layouts/BlankLayout.vue';

Vue.use(ElementUI);
// Vue.prototype.$loading = ElementUI.Loading.service;
// Vue.prototype.$msgbox = ElementUI.MessageBox;
// Vue.prototype.$alert = ElementUI.MessageBox.alert;
// Vue.prototype.$confirm = ElementUI.MessageBox.confirm;
// Vue.prototype.$prompt = ElementUI.MessageBox.prompt;
// Vue.prototype.$notify = ElementUI.Notification;
// Vue.prototype.$message = ElementUI.Message;
Vue.prototype.$message = ElementUI.Message;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
