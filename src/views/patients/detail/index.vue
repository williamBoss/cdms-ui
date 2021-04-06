<template>
  <div class="patients">
    <el-button type="primary" size="medium" @click="back" style="margin-bottom: 20px">返回</el-button>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div class="title">用药数量</div>
          <ve-line height="200px" :grid="lineGrid" :legend-visible="showLegend" :data="chartData"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="title">药物治疗</div>
          <ve-pie height="200px" :grid="pieGrid" :extend="pieExtend" :settings="pieSettings" legend-position="left"
                  :data="pieData"></ve-pie>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card>
          <div class="title">费用</div>
          <ve-histogram :grid="lineGrid" :data="hisData"></ve-histogram>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <div class="title">生存质量</div>
          <ve-line :grid="lineGrid" :data="lineData"></ve-line>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs type="border-card" v-model="activeTab" @tab-click="changeTab">
      <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.key" :key="item.key">
      </el-tab-pane>
      <ve-line :grid="lineGrid" :data="tabData"></ve-line>
    </el-tabs>
    <PatientAssessmentDrawer ref="patientDrawer"
                             :visible="visible"
                             :modal="false"
                             @closedDrawer="closedDrawer"
                             @getInfo="getInfo"></PatientAssessmentDrawer>
    <el-drawer
      title=""
      :visible.sync="drawerShow"
      direction="ltr"
      class="drawer-tab"
      size="70%">
      <tab-page :assessmentId="assessmentId"></tab-page>
    </el-drawer>
  </div>
</template>

<script>
import 'echarts/lib/component/legendScroll';
import VeLine from 'v-charts/lib/line.common'
import VePie from 'v-charts/lib/pie.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import tabPage from '../components/pgCom/index.vue'
import {
  getUseMedicine,
  getUseMedicalTreatment,
  getMedicalFee,
  getMedicalScale,
  getBloodPressure,
  getBloodSugar,
  getElectrolyte,
  getHeartRate,
  getHomocysteine,
  getKidneyFunction,
  getLipidsUricAcid,
  getLiverFunction
} from '@/api/patients'
import PatientAssessmentDrawer from '@/views/patients/components/PatientAssessmentDrawer';

export default {
  name: 'patientsDetail', // 患者管理详情
  components: {PatientAssessmentDrawer, VeLine, VePie, VeHistogram, tabPage},
  data() {
    return {
      visible: true,
      showLegend: false,
      drawerShow: false,
      assessmentId: '',
      lineGrid: {
        x: 20,
        y: 20,
        x2: 20,
        y2: 20
      },
      pieGrid: {
        x: 20,
        y: 40,
        x2: 20,
        y2: 40
      },
      pieSettings: {
        offsetY: '50%',
        label: {
          show: false
        }
      },
      chartData: {
        columns: [],
        rows: []
      },
      pieExtend: {
        legend: {
          orient: 'vertical',
          type: 'scroll',
          top: 10,
          left: 0
        }
      },
      pieData: {
        'columns': [
          '日期',
          '余额',
          '年龄'
        ],
        'rows': [
          {
            '日期': '1-1',
            '余额': 123,
            '年龄': 3
          },
          {
            '日期': '1-2',
            '余额': 1223,
            '年龄': 6
          },
          {
            '日期': '1-3',
            '余额': 2123,
            '年龄': 9
          },
          {
            '日期': '1-4',
            '余额': 4123,
            '年龄': 12
          },
          {
            '日期': '1-5',
            '余额': 3123,
            '年龄': 15
          },
          {
            '日期': '1-6',
            '余额': 7123,
            '年龄': 20
          }
        ]
      },
      hisData: {
        'columns': [
          '日期',
          '余额',
          '年龄'
        ],
        'rows': [
          {
            '日期': '1-1',
            '余额': 123,
            '年龄': 3
          },
          {
            '日期': '1-2',
            '余额': 1223,
            '年龄': 6
          },
          {
            '日期': '1-3',
            '余额': 2123,
            '年龄': 9
          },
          {
            '日期': '1-4',
            '余额': 4123,
            '年龄': 12
          },
          {
            '日期': '1-5',
            '余额': 3123,
            '年龄': 15
          },
          {
            '日期': '1-6',
            '余额': 7123,
            '年龄': 20
          }
        ]
      },
      lineData: {
        'columns': [],
        'rows': []
      },
      tabData: {
        'columns': [],
        'rows': []
      },
      activeTab: 'getBloodPressure',
      tabList: [
        {
          name: '血压',
          key: 'getBloodPressure'
        }, {
          name: '心率',
          key: 'getHeartRate'
        }, {
          name: '血脂尿酸',
          key: 'getLipidsUricAcid'
        }, {
          name: '血糖',
          key: 'getBloodSugar'
        }, {
          name: '肝功能',
          key: 'getLiverFunction'
        }, {
          name: '肾功能',
          key: 'getKidneyFunction'
        }, {
          name: '同型半胱氨酸',
          key: 'getHomocysteine'
        }, {
          name: '电解质',
          key: 'getElectrolyte'
        } ]
    }
  },
  created() {
    this.getList()
    this.getTabList()
  },
  methods: {
    closedDrawer(val) {
      this.visible = val
    },
    getInfo(val) {
      this.assessmentId = val.assessmentId.toString()
      this.drawerShow = true
    },
    getList() {
      let param = {
        'patientId': this.$route.params.id
      }
      getUseMedicine(param).then((res) => {
        if (res.code === 200) {
          this.chartData.columns = [ 'data', '数量' ]
          let list = []
          for (let i = 0; i < res.data.xaxisDatas.length; i++) {
            let param = {
              data: res.data.xaxisDatas[ i ],
              '数量': res.data.series[ 0 ].datas[ i ]
            }
            list.push(param)
          }
          this.chartData.rows = list
        }
      })
      getUseMedicalTreatment(param).then((res) => {
        if (res.code === 200) {
          this.pieData.columns = [ 'name', 'value' ]
          this.pieData.rows = res.data.series[ 0 ].dataList
        }
      })
      getMedicalFee(param).then((res) => {
        if (res.code === 200) {
          res.data.legendData.unshift('日期')
          this.hisData.columns = res.data.legendData
          let list = []
          for (let i = 0; i < res.data.xaxisDatas.length; i++) {
            let param = {
              '日期': res.data.xaxisDatas[ i ]
            }
            res.data.series.forEach((vv) => {
              param[ vv.name ] = vv.datas[ i ]
            })
            list.push(param)
          }
          this.hisData.rows = list
        }
      })
      getMedicalScale(param).then((res) => {
        if (res.code === 200) {
          res.data.legendData.unshift('日期')
          this.lineData.columns = res.data.legendData
          let list = []
          for (let i = 0; i < res.data.xaxisDatas.length; i++) {
            let param = {
              '日期': res.data.xaxisDatas[ i ]
            }
            res.data.series.forEach((vv) => {
              param[ vv.name ] = vv.datas[ i ] || 0
            })
            list.push(param)
          }
          this.lineData.rows = list
          // this.hisData.columns = res.data.legendData.unshift('日期')
          // console.log(this.hisData.columns)
        }
      })
    },
    getTabList(index) {
      if (!index) {
        this.tabList.forEach((vv) => {
          if (vv.key === this.activeTab) {
            this.getTabData(vv.key)
          }
        })
      } else {
        this.getTabData(this.tabList[ index ].key)
      }
    },
    getTabData(key) {
      let param = {
        'patientId': this.$route.params.id
      }
      if (key === 'getBloodPressure') {
        getBloodPressure(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getBloodSugar') {
        getBloodSugar(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getElectrolyte') {
        getElectrolyte(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getHeartRate') {
        getHeartRate(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getHomocysteine') {
        getHomocysteine(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getKidneyFunction') {
        getKidneyFunction(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getLipidsUricAcid') {
        getLipidsUricAcid(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
      if (key === 'getLiverFunction') {
        getLiverFunction(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.handleTableData(res.data)
          }
        })
      }
    },
    handleTableData(data) {
      this.tabData.columns = []
      this.tabData.rows = []
      data.legendData.unshift('日期')
      this.tabData.columns = data.legendData
      let list = []
      for (let i = 0; i < data.xaxisDatas.length; i++) {
        let param = {
          '日期': data.xaxisDatas[ i ]
        }
        data.series.forEach((vv) => {
          param[ vv.name ] = vv.datas[ i ]
        })
        list.push(param)
      }
      this.tabData.rows = list
    },
    changeTab(val) {
      this.activeTab = val.name
      this.getTabData(val.name)
    },
    back() {
      this.$router.push({
        name: 'patients'
      })
    }
  }
}
</script>
<style lang="scss">
.drawer-tab {
  .el-drawer__body {
    overflow: auto;
  }

  .patients {
    padding-top: 0 !important;
  }
}
</style>
<style scoped lang="scss">
.patients {
  padding: 30px 100px 30px 70px;

  .el-card {
    padding: 18px 15px;

    .title {
      font-size: 14px;
    }
  }

  .el-row {
    margin-bottom: 20px;
  }
}
</style>
