// Import Vue
import Vue from 'vue';

// Import VueI18n (internationalization plugin for Vue.js)
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init locale info for root Vue instance
import messages from './messages.js';

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

// Import Chart.js
import Chart from 'Chart.js';

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),

  i18n,
  Chart,
  // Register App Component
  components: {
    app: App
  },
});