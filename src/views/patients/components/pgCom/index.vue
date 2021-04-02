<template>
  <div class="patients">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in curTabList" :label="item.name" :name="item.key" :key="item.key"></el-tab-pane>
    </el-tabs>
    <life-style :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'lifeStyle'"></life-style>
    <history :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'bs'"></history>
    <cur-sym :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'curSym'"></cur-sym>
    <ywpgjl :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'ywpgjl'"></ywpgjl>
    <yyjl :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'yyjl'"></yyjl>
    <ywzlwt :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'ywzlwt'"></ywzlwt>
    <pglb :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'pglb'"></pglb>
    <jyjc :assessmentId="assessmentId" :activeName.sync="activeName" v-if="activeName === 'jyjc'"></jyjc>
    <baseDrawer v-if="canEdit"></baseDrawer>
  </div>
</template>

<script>
  import baseDrawer from '../baseDrawer.vue'
import {
  getReportInfo
} from '@/api/patients'
import lifeStyle from './lifeStyle'
import history from './history'
import curSym from './curSym'
import ywpgjl from './ywpgjl'
import yyjl from './yyjl'
import ywzlwt from './ywzlwt'
import pglb from './pglb'
import jyjc from './jyjc'
export default {
  name: 'patientsDetail', // 患者管理详情
  components: {lifeStyle, history, curSym, ywpgjl, yyjl, ywzlwt, pglb, jyjc, baseDrawer},
  data () {
    return {
      canEdit: true,
      checkTabList: [{
        name: '家族病史和既往病史',
        key: 'bs'
      }, {
        name: '现有症状',
        key: 'curSym'
      }, {
        name: '生活方式',
        key: 'lifeStyle'
      }, {
        name: '用药记录',
        key: 'yyjl'
      }, {
        name: '检验检查',
        key: 'jyjc'
      }, {
        name: '药物治疗问题',
        key: 'ywzlwt'
      }, {
        name: '评估量表',
        key: 'pglb'
      },{
        name: '药物重整评估记录',
        key: 'ywpgjl'
      }],
      tabList: [{
        name: '药物重整评估记录',
        key: 'ywpgjl'
      },{
        name: '家族病史和既往病史',
        key: 'bs'
      }, {
        name: '现有症状',
        key: 'curSym'
      }, {
        name: '生活方式',
        key: 'lifeStyle'
      }, {
        name: '用药记录',
        key: 'yyjl'
      }, {
        name: '检验检查',
        key: 'jyjc'
      }, {
        name: '药物治疗问题',
        key: 'ywzlwt'
      }, {
        name: '评估量表',
        key: 'pglb'
      }],
      curTabList: [],
      activeName: 'ywpgjl',
      reportInfo: {}
    }
  },
  props: ['assessmentId'],
  watch: {
    'assessmentId': function (val) {
      if (val) {
        this.assessmentId = val
        if (this.assessmentId) {
          this.curTabList = this.tabList
        } else {
          this.curTabList = this.checkTabList
        }
        this.activeName = this.curTabList[0].key
        if (this.$route.query.tab) {
          this.activeName = this.$route.query.tab
        }
      }
    }
  },
  created () {
    if (this.assessmentId) {
      this.curTabList = this.tabList
    } else {
      this.curTabList = this.checkTabList
    }
    this.activeName = this.curTabList[0].key
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab
    }
    // this.getReportInfo()
  },
  methods: {
    handleClick () {

    }
  }
}
</script>

<style lang="scss">
.patients{
  padding: 28px 20px 0 40px;
}
.flex{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.life-style{
  .left-item {
    text-align: center;
    background: #1e3f7c;
    color: #fff;
    font-size: 14px;
    line-height: 13;
  }
  .el-card{
    min-height: 180px;
    height: 180px;
    font-size:14px;
    font-weight: 700;
    color: #606266;
    border-radius: 8px;
  }
  .el-card__body,.el-card__body>.el-row{
    height: 100%;
  }
  .life-item{
    line-height: 44px;
    height: 100%;
    border-right: 1px solid #e1e1e1;
  }
  .extra{
    padding-left: 20px;
    margin: 8px 0;
  }
  .el-form>.el-row{
    margin-bottom: 20px;
  }
  .content-item {
    padding: 8px 20px;
    position: relative;
    z-index: 0;
    .el-form-item{
      margin-bottom: 5px;
    }
    .food-item{
      line-height: 35px;
    }
    .name-item{
      width: 185px;
      line-height: 36px;
    }
    .el-textarea,.el-textarea__inner{
      min-height: 120px;
      height: 100%;
      background: #f0f0f0;
      border: 0;
    }
  }
  .el-textarea__inner{
    height: 100%!important;
  }
  .el-button{
    float: right;
  }
  .el-tag{
    margin: 5px;
    font-weight: normal;
    border-radius: 25px;
  }
}
</style>
