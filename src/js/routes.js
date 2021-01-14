import PanelRight from '../pages/panel-right.vue';

import HomePage from '../pages/home.vue';
import ZonesPage from '../pages/zones.vue';
import SettingsPage from '../pages/settings.vue';

import PrivacyPage from '../pages/privacy.vue';
import NotFoundPage from '../pages/404.vue';


var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/panel-right/',
    component: PanelRight,
  },
  {
    path: '/zones/',
    component: ZonesPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/privacy/',
    component: PrivacyPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
