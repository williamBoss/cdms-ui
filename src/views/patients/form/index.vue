<template>
  <div class="patients">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.key" :key="item.key"></el-tab-pane>
    </el-tabs>
    <life-style :activeName.sync="activeName" v-if="activeName === 'lifeStyle'"></life-style>
    <history :activeName.sync="activeName" v-if="activeName === 'bs'"></history>
    <cur-sym :activeName.sync="activeName" v-if="activeName === 'curSym'"></cur-sym>
    <ywpgjl :activeName.sync="activeName" v-if="activeName === 'ywpgjl'"></ywpgjl>
    <yyjl :activeName.sync="activeName" v-if="activeName === 'yyjl'"></yyjl>
    <ywzlwt :activeName.sync="activeName" v-if="activeName === 'ywzlwt'"></ywzlwt>
    <pglb v-if="activeName === 'pglb'"></pglb>
    <jyjc :activeName.sync="activeName" v-if="activeName === 'jyjc'"></jyjc>
  </div>
</template>

<script>
import {
  getReportInfo
} from '@/api/patients'
import lifeStyle from '../components/lifeStyle'
import history from '../components/history'
import curSym from '../components/curSym'
import ywpgjl from '../components/ywpgjl'
import yyjl from '../components/yyjl'
import ywzlwt from '../components/ywzlwt'
import pglb from '../components/pglb'
import jyjc from '../components/jyjc'
export default {
  name: 'patientsDetail', // 患者管理详情
  components: {lifeStyle, history, curSym, ywpgjl, yyjl, ywzlwt, pglb, jyjc},
  data () {
    return {
      tabList: [{
        name: '药物重整评估记录',
        key: 'ywpgjl'
      }, {
        name: '现有症状',
        key: 'curSym'
      }, {
        name: '家族病史和既往病史',
        key: 'bs'
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
      activeName: 'ywpgjl',
      reportInfo: {}
    }
  },
  created () {
    // this.getReportInfo()
  },
  methods: {
    getReportInfo () {
      let param = {
        "assessmentId": this.$route.params.assessmentId,
        "patientId": this.$route.params.id
      }
      getReportInfo(param).then((res) => {
        if (res.code === 200) {
          this.reportInfo = res.data
        }
      })
    },
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
      background: #f0f0f0;
      border: 0;
    }
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
