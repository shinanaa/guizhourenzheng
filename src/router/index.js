import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
// 所有权限通用路由表
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// 异步挂载的路由
export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/attestation/graduationRequire',
    alwaysShow: true, // will always show the root menu
    meta: { title: '认证管理', icon: 'component', roles: ['admin', 'editor'] }
  },
  {
    path: '/attestation',
    component: Layout,
    redirect: '/attestation/graduationRequire',
    alwaysShow: true, // will always show the root menu
    meta: { title: '认证管理', icon: 'component', roles: ['admin', 'editor'] },
    children: [{
      path: '/attestation/target',
      component: () => import('@/views/attestation/target'),
      name: 'trainTarget',
      meta: { title: '培养目标', icon: 'chart', noCache: true }
    },
    {
      path: '/attestation/graduationRequire',
      component: () => import('@/views/attestation/graduationRequire'),
      name: 'graduationRequire',
      meta: { title: '毕业要求', icon: 'clipboard', noCache: true }
    },
    {
      path: '/attestation/standards',
      component: () => import('@/views/attestation/standards'),
      name: 'standards',
      meta: { title: '认证标准', icon: 'form', noCache: true }
    },
    {
      path: '/attestation/requireAndCourses',
      component: () => import('@/views/attestation/requireAndCourses'),
      name: 'requireAndCourses',
      meta: { title: '要求与课程', icon: 'message', noCache: true }
    },
    {
      path: '/attestation/eligibility',
      component: () => import('@/views/attestation/eligibility'),
      name: 'eligibility',
      meta: { title: '合格标准', icon: 'example', noCache: true }
    },
    {
      path: '/attestation/setWeights',
      component: () => import('@/views/attestation/setWeights'),
      name: 'setWeights',
      meta: { title: '设置权重', icon: 'drag', noCache: true }
    }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/courseManage',
    alwaysShow: true, // will always show the root menu
    meta: { title: '课程管理', icon: 'dashboard', roles: ['admin', 'editor'] },
    children: [{
      path: '/course/courseManage',
      component: () => import('@/views/course/courseManage'),
      name: 'courseManage',
      meta: { title: '课程管理', icon: 'documentation', noCache: true }
    },
    {
      path: '/course/knowledge',
      component: () => import('@/views/course/knowledge'),
      name: 'knowledge',
      meta: { title: '章节知识点', icon: 'edit', noCache: true }
    },
    {
      path: '/course/knowledge/details',
      component: () => import('@/views/course/setKnowledgeDetails'),
      name: 'setKnowledgeDetails',
      meta: { title: '知识点详情', icon: 'email', noCache: true },
      hidden: true
    },
    {
      path: '/course/indicator',
      component: () => import('@/views/course/indicator'),
      name: 'indicator',
      meta: { title: '对应指标点', icon: 'excel', noCache: true }
    },
    {
      path: '/course/target',
      component: () => import('@/views/course/target'),
      name: 'target',
      meta: { title: '课程安排', icon: 'nested', noCache: true }
    },
    {
      path: '/course/grading',
      component: () => import('@/views/course/grading'),
      name: 'granding',
      meta: { title: '课程组成', icon: 'guide', noCache: true }
    },
    {
      path: '/course/grading/details',
      component: () => import('@/views/course/courseFormDetails'),
      name: 'courseFormDetails',
      meta: { title: '课程组成详情', icon: 'icon', noCache: true },
      hidden: true
    }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/graduationRequirementsAchievement',
    alwaysShow: true, // will always show the root menu
    meta: { title: '认证统计', icon: 'table', roles: ['admin', 'editor'] },
    children: [{
      path: '/statistics/graduationRequirementsAchievement',
      component: () => import('@/views/statistics/graduationRequirementsAchievement'),
      name: 'graduationRequirementsAchievement',
      meta: { title: '毕业要求达成度', icon: 'tab', noCache: true }
    },
    {
      path: '/statistics/achievementTable',
      component: () => import('@/views/statistics/achievementTable'),
      name: 'achievementTable',
      meta: { title: '要求达成度计算表', icon: 'list', noCache: true }
    },
    {
      path: '/statistics/courseAchievement',
      component: () => import('@/views/statistics/courseAchievement'),
      name: 'courseAchievement',
      meta: { title: '课程达成度', icon: 'international', noCache: true }
    }
    ]
  },
  {
    path: '/examManagement',
    component: Layout,
    redirect: '/examManagement/examManagement',
    alwaysShow: false, // will always show the root menu
    meta: { title: '考试管理', icon: 'table', roles: ['admin', 'editor'] },
    children: [{
      path: '/examManagement/examManagement',
      component: () => import('@/views/examManagement/examManagement'),
      name: 'examManagement',
      meta: { title: '考试管理', icon: 'tab', noCache: true }
    },
    {
      path: '/examManagement/propositionalTask',
      component: () => import('@/views/examManagement/propositionalTask'),
      name: 'propositionalTask',
      meta: { title: '命题任务', icon: 'list', noCache: true }
    },
    {
      path: '/examManagement/examPlan',
      component: () => import('@/views/examManagement/examPlan'),
      name: 'examPlan',
      meta: { title: '考试计划', icon: 'international', noCache: true }
    }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
