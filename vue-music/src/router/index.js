import Vue from 'vue';
import Router from 'vue-router';
import Search from 'components/search/search';
import Singer from 'components/singer/singer';
import Rank from 'components/rank/rank';
import Recommend from 'components/recommend/recommend';

// 注册
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/rank',
      component: Rank,
    },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
    },
    {
      path: '/search',
      component: Search,
    },
  ],
});
