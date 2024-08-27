import { RouteLocationNormalized, Router } from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalized;
  }
}

import 'vue-router';

declare module 'vue-router' {
  interface Router {
    previousRoute?: RouteLocationNormalized;
  }
}