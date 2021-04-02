<template>
  <div class="life-style yyjl-wrap">
    <el-card class="info-wrap">
      <el-row>
        <el-col :span="4">
          <div class="name-wrap">
            <div class="label-item">姓名</div>
            <div class="name-item">{{userInfo.patientName}}</div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="other-wrap">
            <el-row>
              <el-col :span="4">
                ID : {{userInfo.patId}}
              </el-col>
              <el-col :span="3">
                性别 : {{userInfo.sexName}}
              </el-col>
              <el-col :span="3">
                年龄 : {{userInfo.age}}
              </el-col>
              <el-col :span="5">
                手机 : {{userInfo.phone}}
              </el-col>
              <el-col class="time-item" :span="9">
              </el-col>
            </el-row>
          </div>
          <!-- <div class="warning-info">
            <span class="waning-name">过敏药物：</span>
            <el-tag size="mini">标签一</el-tag>
          </div> -->
        </el-col>
      </el-row>
    </el-card>
    <el-table
      :data="tableData"
      min-height="250"
      border
      :header-cell-style="{background:'#1e3f7c',color:'white'}"
      style="width: 100%">
      <!-- @selection-change="handleSelectionChange" -->
     <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        prop="useStartTime"
        label="开始时间"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.useStartTime}}</span>
          <el-date-picker v-show="!scope.row.id" v-model="scope.row.useStartTime" style="width: 100%;" format="yyyy/MM/dd" value-format="yyyy/MM/dd"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="useEndTime"
        label="结束时间"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.useEndTime}}</span>
          <el-date-picker v-show="!scope.row.id" v-model="scope.row.useEndTime" style="width: 100%;" format="yyyy/MM/dd" value-format="yyyy/MM/dd"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="medName"
        label="药品名称"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.medName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="indication"
        label="适应症">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.diseaseName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="dosage"
        label="用法">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.dosage}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="dosageMonthly"
        label="月用药量(盒)"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.dosageMonthly}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注(新增/停用)"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getMed
  } from '@/api/outpatient'
  import {
    getPatientInfo,
    getRecord,
    getDiseaseList
  } from '@/api/patients'
  export default {
    props: {
      activeName: {
        type: String,
        default: '',
      },
      assessmentId: {
        type: String,
        default: '',
      }
    },
    data() {
      return {
        form: {},
        userInfo: {},
        tableData: [],
        diseaseList: [],
        options: ['新增', '停用', '在用'],
        page: {
          pageSize: 20,
          pageNum: 1
        },
        searchName: '',
        searchDiseaseName: '',
        curMed: {},
        curDisease: {}
      }
    },
    watch: {
      'assessmentId': function (val) {
        if (val) {
          this.assessmentId = val
          this.getPatientInfo()
          this.getRecord()
        }
      }
    },
    created () {
      this.getPatientInfo()
      this.getRecord()
    },
    methods: {
      getRecord () {
        let param = {
          "assessmentId": this.assessmentId,
          "patientId": this.$route.params.id,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        }
        getRecord(param).then((res) => {
          if (res.code === 200) {
            this.tableData = res.data.records
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      },
      getPatientInfo () {
        getPatientInfo(this.$route.params.id).then((res) => {
          if (res.code) {
            this.userInfo = res.data
            if (res.data.gender === 1) {
              res.data.sexName = '男'
            } else {
              res.data.sexName = res.data.gender === 2 ? '女' : '未知'
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  // .life-style {
  //   .left-item {
  //     text-align: center;
  //     background: #1e3f7c;
  //     color: #fff;
  //     font-size: 14px;
  //   }
  // }
  .yyjl-wrap{
    .el-table__header-wrapper{
      display: none;
    }
    .add-btn{
      float: left;
      margin-bottom: 20px;
    }
    .info-wrap{
      height: 70px;
      min-height: 70px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin-bottom: 20px;
      .el-col,.el-row{
        height: 100%;
      }
    }
    .warning-info{
      padding-left: 20px;
      font-weight: normal;
    }
    .name-wrap{
      height: 100%;
      width: 100%;
      background: #1e3f7c;
      .label-item{
        display: inline-block;
        color: #dde3eb;
        font-size: 12px;
        padding: 20px 0 0 10px;
        vertical-align: top;
      }
      .name-item{
        display: inline-block;
        color: #dde3eb;
        font-size: 24px;
        padding-left: 22px;
        line-height: 68px;
        vertical-align: top;
      }
    }
    .other-wrap{
      height: 36px;
      line-height: 36px;
      padding: 8px 0;
      text-align: center;
      .el-col{
        line-height: 24px;
        border-right: 1px solid #eee;
      }
      .time-item{
        text-align: right;
        border-right: 0;
        padding-right: 20px;
      }
    }
  }
</style>
<style lang="scss">
.ywp-wrap{
  .el-table__header-wrapper{
    display: none;
  }
  .el-textarea__inner{
    height: 144px;
    padding-bottom: 35px;
  }
}
</style>
