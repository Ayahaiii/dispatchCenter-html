import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import courseManage from '@/components/video/courseManage'
import videoManage from '@/components/video/videoManage'
import courseTypeManage from '@/components/video/courseTypeManage'
import courseNoteManage from '@/components/video/courseNoteManage'
import courseScoreManage from '@/components/video/courseScoreManage'
import courseCommentManage from '@/components/video/courseCommentManage'
import videoPlayRecordManage from '@/components/video/videoPlayRecordManage'
import courseBuyRecordManage from '@/components/video/courseBuyRecordManage'
import payOrderManage from '@/components/video/payOrderManage'
import bannerManage from '@/components/video/bannerManage'
import courseDetail from '@/components/video/courseDetail'
import videoDetail from '@/components/video/videoDetail'
import courseTypeDetail from '@/components/video/courseTypeDetail'
import courseNoteDetail from '@/components/video/courseNoteDetail'
import courseScoreDetail from '@/components/video/courseScoreDetail'
import courseCommentDetail from '@/components/video/courseCommentDetail'
import videoPlayRecordsDetail from '@/components/video/videoPlayRecordsDetail'
import courseBuyRecordDetail from '@/components/video/courseBuyRecordDetail'
import bannerDetail from '@/components/video/bannerDetail'

import nodeManage from '@/components/dispatchCenter/nodeManage'
import taskManage from '@/components/dispatchCenter/taskManage'
import projectManage from '@/components/dispatchCenter/projectManage'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/nodeManage',
      children: [{
          path: '/index/nodeManage',
          name: 'nodeManage',
          component: nodeManage
        },
        {
          path: '/index/taskManage',
          name: 'taskManage',
          component: taskManage
        },
        {
          path: '/index/projectManage',
          name: 'projectManage',
          component: projectManage
        }
      ]
    }
  ]
})