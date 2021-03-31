<template>
  <div class="life-style jyjc-wrap">
    <div class="view">
    <el-row :gutter="24">
      <el-col :span="chartIndex < 2 || chartIndex == 6 || chartIndex == 7 ? 12: 24" v-for="(chart, chartIndex) in chartList" :key="chartIndex">
        <el-card>
          <el-row type="flex" :gutter="24">
            <el-col class="left-item" :span="chartIndex < 2 || chartIndex == 6 || chartIndex == 7 ? 4: 2">
              <div class="item-wrap">
                {{chart.title}}
                <div class="add-btn">
                  <i class="el-icon-plus" @click="pushData(chartIndex)"></i>
                </div>
              </div>
              <div class="add-angle flex">
                <div class="icon_01" >
                  <img src="@/assets/icons/jyjc_01.png" alt="">
                </div>
                <div class="icon_02" @click="toggleChart(chartIndex)">
                  <img src="@/assets/icons/jyjc_02.png" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="chartIndex < 2 || chartIndex == 6 || chartIndex == 7 ? 20: 22">
              <div class="table" v-if="!chart.showChart">
                <el-table
                  :data="chart.tableData"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    v-for="(prop, propIndex) in chart.tableProps"
                    :key="propIndex"
                    :width="prop.width"
                    :prop="prop.key"
                    :label="prop.name">
                    <template slot-scope="scope" >
                      <el-input v-if="!scope.row.id && propIndex > 0" v-model="scope.row[prop.key]" placeholder="" type="number" :min="0"></el-input>
                      <el-date-picker
                        v-else-if="!scope.row.id && propIndex === 0"
                        v-model="scope.row[prop.key]"
                        value-format="yyyy/MM/dd"
                        type="date"
                        placeholder="日期">
                      </el-date-picker>
                      <span v-else>{{scope.row[prop.key]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="act"
                    label="编辑">
                    <template slot-scope="scope" v-if="!scope.row.id">
                      <div class="flex">
                        <el-button @click="saveData(chartIndex, scope.$index)" type="text" size="small">保存</el-button>
                        <el-button type="text" size="small" @click="cancelData(chartIndex, scope.$index)">取消</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="charts" v-else>
                <line-charts :key="chartIndex" :grid="lineGrid" :chartData="chart.lineData"></line-charts>
              </div>
            </el-col>
          </el-row>
        </el-card> 
      </el-col>
    </el-row>
    </div>
    <baseDrawer :drawer="true"></baseDrawer>
  </div>
</template>

<script>
import request from '@/utils/request'
import baseDrawer from './baseDrawer.vue'
// import VeLine from 'v-charts/lib/line.common'
import lineCharts from '@/views/components/echarts/lineCharts'
import chartList from '../config/jyjcCharts'
export default {
  props: {
    activeName: {
      type: String,
      default: '',
    },
  },
  data(){
    return {
      chartList: chartList,
      tableData:[],
      lineGrid: {
        x: 20,
        y: 20
      },
    }
  },
  components: {baseDrawer, lineCharts},
  mounted(){
    this.getAllTableData()
  },
  methods: {
    // 获取数据
    getData(url){
      return request({
        url: url,
        method: 'get',
        params: { patientId:this.$route.params.id }
      })
    },
    // 保存数据
    saveTableData(url, params){
      console.log(url, params)
      return request({
        url: url,
        method: 'post',
        data: {patientId:this.$route.params.id, ...params}
      })
    },
    getAllTableData(){
      this.chartList.forEach((chart, index) => {
        this.getData(chart.getTableUrl).then(res => {
          let {data:{records}} = res
          this.chartList[index].tableData = records
        })
      })
    },
    // 插入数据
    pushData(chartIndex){
      let pushData = {}
      this.chartList[chartIndex].tableProps.forEach(item => {
        pushData[item.key] = ''
      })
      this.chartList[chartIndex].tableData.unshift(pushData)
    },
    // 取消数据
    cancelData(chartIndex, delindex) {
      this.chartList[chartIndex].tableData.splice(delindex, 1)
    },
    // 保存数据
    saveData(chartIndex, saveIndex){
      let url = this.chartList[chartIndex].saveTableUrl
      let params = this.chartList[chartIndex].tableData[saveIndex]
      this.saveTableData(url, params).then(res => {
        if (res.code === 200 && res.success) {
          this.getData(this.chartList[chartIndex].getChartUrl).then(res => {
            let {data:{records}} = res
            this.chartList[chartIndex].tableData = records
          })
        }
      })
    },
    // 查看图表
    toggleChart(chartIndex){
      if (this.chartList[chartIndex].showChart) {
        this.chartList[chartIndex].showChart = false
      } else {
        let url = this.chartList[chartIndex].getChartUrl
        this.getData(url).then(res => {
          console.log('图表：', res)
          let {data} = res
          // let lineData = {
          //   "columns": [
          //     "日期"
          //   ],
          //   "rows": [
          //     {}
          //   ]
          // }
          // if (data) {
          //   data.forEach(item => {

          //   })
          // }
          this.chartList[chartIndex].lineData = data
          this.chartList[chartIndex].showChart = true
        })
      }
    }
  }
}
</script>

<style lang="scss">
.life-style.jyjc-wrap{
  ::-webkit-scrollbar {
    width : 3px;
    height: 3px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background   : #afadad;
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background   : #ededed;
  }
  .flex{display:flex;}
  .item-wrap{
    line-height: 40px;
    margin-top: 40px;
  }
  .add-btn{
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #081f49;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    margin: 0 auto;
    cursor: pointer;
  }
  .add-angle {
    line-height: 30px;
    height: 30px;
    padding: 0 17px;
    margin-top: 10px;
    justify-content: space-between;
    >div{
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
      img{
        width: 14px;
      }
    }
  }
  .el-col{
    margin-bottom: 24px;
  }
  .el-card__body {
    .el-col,  .el-row{
      margin:0!important;
      padding: 0!important;
    }
  }
  .charts{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .table {
    height: 100%;
    overflow-y: auto;
    .el-table{
      font-size: 12px;
      .el-button{padding:0;}
      .el-input__inner{
        line-height: 23px;
        height: 23px;
        padding: 0 5px;
        font-size: 12px;
      }
      .el-date-editor.el-input{
        width: 100%;
      }
      .el-date-editor--date {
        .el-input__inner{
          padding-left: 30px;
        }
      }
      .el-input--medium .el-input__icon{
        line-height: 23px;
      }
    }
  }
}
</style>