import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import ParentView from '@/components/ParentView';

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 unfold: true,                  // 将二级菜单在第一级展示
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: (resolve) => require([ '@/views/login' ], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require([ '@/views/error/404' ], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require([ '@/views/error/401' ], resolve),
    hidden: true
  },
  {
    path: '',
    // component: Layout,
    component: (resolve) => require([ '@/views/index' ], resolve),
    redirect: 'index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: (resolve) => require([ '@/views/index' ], resolve),
        name: '首页',
        meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true},
        hidden: true
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require([ '@/views/system/dict/data' ],
          resolve),
        name: 'Data',
        meta: {title: '字典数据', icon: ''}
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require([ '@/views/monitor/job/log' ], resolve),
        name: 'JobLog',
        meta: {title: '调度日志'}
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit/:tableId(\\d+)',
        component: (resolve) => require([ '@/views/tool/gen/editTable' ],
          resolve),
        name: 'GenEdit',
        meta: {title: '修改生成配置'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    unfold: true,
    children: [
      {
        path: 'outpatient',
        component: (resolve) => require([ '@/views/outpatient/index' ],
          resolve),
        name: 'outpatient',
        meta: {title: '药学门诊', icon: require('@/assets/icons/menu/yxmz.png')}
      },
      {
        path: 'outpatientList',
        component: (resolve) => require([ '@/views/outpatient/list/index' ],
          resolve),
        name: 'outpatientList',
        hidden: true,
        meta: {title: '药学门诊', icon: require('@/assets/icons/menu/yxmz.png')}
      },
      {
        path: 'patients',
        component: (resolve) => require([ '@/views/patients/list/index' ],
          resolve),
        name: 'patients',
        meta: {title: '患者管理', icon: require('@/assets/icons/menu/hzgl.png')}
      },
      {
        path: 'pgSet/:id/:assessmentId',
        component: (resolve) => require([ '@/views/patients/list/pgSet' ],
          resolve),
        name: 'pgSet',
        hidden: true,
        meta: {title: '评估量表', icon: ''}
      },
      {
        path: 'patientsDetail/:id',
        component: (resolve) => require([ '@/views/patients/detail/index' ],
          resolve),
        name: 'patientsDetail',
        hidden: true,
        meta: {title: '患者评估', icon: require('@/assets/icons/menu/hzgl.png')}
      },
      {
        path: 'patientsForm/:id/:assessmentId',
        component: (resolve) => require([ '@/views/patients/form/index' ],
          resolve),
        name: 'patientsForm',
        hidden: true,
        meta: {title: '患者评估', icon: require('@/assets/icons/menu/hzgl.png')}
      },
      {
        path: 'patientsEdit',
        component: (resolve) => require([ '@/views/patients/editForm/index' ],
          resolve),
        name: 'patientsEdit',
        hidden: true,
        meta: {title: '患者信息', icon: require('@/assets/icons/menu/hzgl.png')}
      },
      {
        path: 'followup',
        component: (resolve) => require([ '@/views/followup/index' ], resolve),
        name: 'followup',
        meta: {title: '随访管理', icon: require('@/assets/icons/menu/sfgl.png')}
      },
      {
        path: 'analysis',
        component: (resolve) => require([ '@/views/analysis/index' ], resolve),
        name: 'analysis',
        meta: {title: '数据分析', icon: require('@/assets/icons/menu/sjfx.png')}
      },
      {
        path: 'knowledge',
        component: (resolve) => require([ '@/views/knowledge/index' ], resolve),
        name: 'knowledge',
        meta: {title: '知识库', icon: require('@/assets/icons/menu/zsk.png')}
      },
      {
        path: 'diseases',
        component: (resolve) => require([ '@/views/diseases/list' ], resolve),
        name: 'diseases',
        meta: {title: '病种管理', icon: require('@/assets/icons/menu/bzgl.png')}
      }
    ]
  }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
