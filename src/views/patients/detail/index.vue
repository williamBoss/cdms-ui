<template>
  <div>
    <div class="patients">
      <el-button class="btn-size" type="primary" size="medium" @click="back" style="margin-bottom: 20px">返回</el-button>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div class="title" slot="header">
              <span>用药数量</span>
            </div>
            <div class="el-card-body" style="height: 250px">
              <line-graph ref="useMedGraph" :id="'useMedGraph'" :graph-style="[{height:'220px'}]"></line-graph>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div class="title" slot="header">
              <span>药物治疗</span>
            </div>
            <div class="el-card-body" style="height: 250px">
              <pie-graph ref="useMedicalTreatment" :id="'useMedicalTreatment'"
                         :graph-style="[{height:'220px'}]"></pie-graph>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-card>
            <div class="title" slot="header">
              <span>费用</span>
            </div>
            <div class="el-card-body" style="height: 250px">
              <bar-graph ref="fee" :id="'fee'" :graph-style="[{height:'220px'}]"></bar-graph>
            </div>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-card>
            <div class="title" slot="header">
              <span>生存质量</span>
            </div>
            <div class="el-card-body" style="height: 250px">
              <line-graph ref="qualityLifeGraph" :id="'qualityLifeGraph'"
                          :graph-style="[{height:'220px'}]"></line-graph>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-tabs type="border-card" stretch v-model="activeTab" @tab-click="changeTab">
        <el-tab-pane v-for="item in tabList" :label="item.name" :name="item.key" :key="item.id">
        </el-tab-pane>
        <line-graph ref="inspection" :id="'inspection'" :graph-style="[{height:'300px'}]"></line-graph>
      </el-tabs>
      <PatientAssessmentDrawer ref="patientDrawer"
                               :visible="visible"
                               :modal="false"
                               @closedDrawer="closedDrawer"
                               @getInfo="getInfo"></PatientAssessmentDrawer>
    </div>
    <div>
      <el-drawer
        title=""
        :visible.sync="drawerShow"
        direction="ltr"
        class="drawer-tab"
        size="70%">
        <tab-page :assessmentId="assessmentId"></tab-page>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import tabPage from '../components/pgCom/index.vue'
import {
  getBloodPressure,
  getBloodSugar,
  getElectrolyte,
  getHeartRate,
  getHomocysteine,
  getKidneyFunction,
  getLipidsUricAcid,
  getLiverFunction,
  getMedicalFee,
  getMedicalScale,
  getUseMedicalTreatment,
  getUseMedicine
} from '@/api/patients'
import PatientAssessmentDrawer from '@/views/patients/components/PatientAssessmentDrawer';
import BarChart from '@/views/dashboard/BarChart';
import LineGraph from '@/views/echarts/LineGraph';
import PieGraph from '@/views/echarts/PieGraph';
import BarGraph from '@/views/echarts/BarGraph';

export default {

  name: 'patientsDetail', // 患者管理详情
  components: {BarGraph, PieGraph, LineGraph, BarChart, PatientAssessmentDrawer, tabPage},
  data() {
    return {
      visible: true,
      drawerShow: false,
      assessmentId: '',
      activeTab: 'getBloodPressure',
      tabList: [
        {
          name: '血压',
          key: 'getBloodPressure',
          id: 'bloodPressure'
        }, {
          name: '心率',
          key: 'getHeartRate',
          id: 'heartRate'
        }, {
          name: '血脂尿酸',
          key: 'getLipidsUricAcid',
          id: 'lipidsUricAcid'
        }, {
          name: '血糖',
          key: 'getBloodSugar',
          id: 'bloodSugar'
        }, {
          name: '肝功能',
          key: 'getLiverFunction',
          id: 'liverFunction'
        }, {
          name: '肾功能',
          key: 'getKidneyFunction',
          id: 'kidneyFunction'
        }, {
          name: '同型半胱氨酸',
          key: 'getHomocysteine',
          id: 'homocysteine'
        }, {
          name: '电解质',
          key: 'getElectrolyte',
          id: 'electrolyte'
        } ]
    }
  },
  created() {
    this.getList()
    this.getTabData(this.activeTab)
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
          let {data} = res
          let {series} = data
          series.forEach(v => {
            v.smooth = true
          })
          if (series.length !== 0) {
            this.$refs.useMedGraph.chartOption = {
              legend: {
                data: data.legendData
              },
              xAxis: {
                type: 'category',
                data: data.xaxisData
              },
              yAxis: {
                type: 'value'
              },
              series: series
            };
          }
        }
      })
      getUseMedicalTreatment(param).then((res) => {
        let {data} = res
        if (res.code === 200 && data) {
          let {series} = data
          series.forEach(v => {
            v.smooth = true
            v.radius = [ 20, 110 ]
            v.center = [ '60%', '50%' ]
            v.roseType = 'area'
            v.data = v.dataList
            v.itemStyle = {
              borderRadius: 8
            }
          })
          if (series.length !== 0) {
            this.$refs.useMedicalTreatment.chartOption = {
              legend: {
                data: data.legendData
              },
              series: series
            }
          }
        }
      })
      getMedicalFee(param).then((res) => {
        let {data} = res
        if (res.code === 200 && data) {
          let {series} = data
          if (series.length !== 0) {
            series.forEach(v => {
              v.stack = 'total'
              v.label = {
                show: true
              }
              v.emphasis = {
                focus: 'series'
              }
            });
            this.$refs.fee.chartOption = {
              legend: {
                data: data.legendData
              },
              grid: {
                top: '20%'
              },
              xAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value} 元'
                }
              },
              yAxis: {
                type: 'category',
                data: data.xaxisData
              },
              series: series
            }
          }
        }
      })
      getMedicalScale(param).then((res) => {
        let {data} = res
        if (res.code === 200 && data) {
          let {series} = data
          this.$refs.qualityLifeGraph.chartOption = {
            legend: {
              data: data.legendData
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: data.xaxisData
            },
            yAxis: {
              type: 'value'
            },
            series: series
          }
        }
      })
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
      let {series} = data
      if (series.length !== 0) {
        this.$refs.inspection.chartOption = {
          legend: {
            data: data.legendData
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.xaxisData
          },
          yAxis: {
            type: 'value'
          },
          series: series
        }
      }
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
  max-width: 1700px;
  padding: 30px;

  ::v-deep .el-card__body {

    .title {
      font-size: 14px;
    }

    .el-card-body {
      padding: 15px;
    }

  }

  .el-row {
    margin-bottom: 20px;
  }
}
</style>
