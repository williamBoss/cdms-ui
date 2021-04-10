<template>
  <div class="patients">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          placeholder="患者姓名"
          prefix-icon="el-icon-user-solid"
          v-model="param.patientName">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="手机号码"
          prefix-icon="el-icon-mobile"
          v-model="param.phone">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="身份证号码"
          prefix-icon="el-icon-postcard"
          v-model="param.idCard">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-date-picker
          v-model="param.pgDate"
          format="yyyy/MM/dd"
          value-format="yyyy/MM/dd"
          type="daterange"
          range-separator="至"
          start-placeholder="评估时间"
          end-placeholder="评估时间">
        </el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-select multiple v-model="diseaseIdsList" placeholder="选择病种" style="width: 100%">
          <el-option
            v-for="item in diseaseList"
            :key="item.diseaseKey"
            :label="item.diseaseName"
            :value="item.diseaseId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button class="btn-size" type="primary" @click="goSearch">查询</el-button>
        <el-button class="btn-size" type="info" @click="dialogExportVisible = true">导出</el-button>
        <el-button class="btn-size" @click="resetParam">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-button class="btn-size" type="primary" @click="goEdit">新建</el-button>
    </el-row>
    <div class="main-wrap">
      <el-table
        :data="tableData"
        border
        stripe
        :header-cell-style="{background:'#1e3f7c',color:'white'}">
        <el-table-column
          fixed
          align="center"
          prop="patientName"
          label="患者姓名"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          align="center"
          label="性别"
          min-width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.gender === 2">女</span>
            <span v-if="scope.row.gender === 0">未知</span>
            <span v-if="scope.row.gender === 1">男</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="年龄"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="diseaseName"
          header-align="center"
          label="诊断结果"
          min-width="500">
          <template slot-scope="scope">
            <div style="white-space: nowrap;">
              <el-popover
                placement="top-start"
                trigger="hover"
                :content="scope.row.diseaseName">
                <div slot="reference">
                 <span v-for="item in scope.row.diseaseList">
                   <el-tag size="medium">{{ item }}</el-tag>
                 </span>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="recorder"
          label="记录人"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="fillDate"
          label="评估时间"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="goAssessment(scope.row)" type="text">评估</el-button>
            <el-button @click="goDetail(scope.row)" type="text">查看</el-button>
            <el-dropdown>
              <el-button type="text" style="margin-left: 10px;">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button @click="delPatient(scope.row, scope.$index)" type="text">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button @click="" type="text">转诊</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="param.pageNum"
        :limit.sync="param.pageSize"
        @pagination="goSearch"
      />
    </div>
    <el-dialog title="导出" :visible.sync="dialogExportVisible">
      <el-table
        :data="exportData"
        style="width: 100%"
        @selection-change="handleExportSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="exportContent"
          label="导出内容"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="exportProgress"
          label="导出进度"
          min-width="220">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="26" :status="scope.row.progressStatus"
                         :percentage="scope.row.percentage"></el-progress>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-size" @click="dialogExportVisible = false">关 闭</el-button>
        <el-button class="btn-size" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { delPatient, getAssessment, getPatients } from '@/api/patients'
import { getDisease } from '@/api/param'

export default {
  name: 'patientsList',// 患者管理列表
  data() {
    return {
      tableData: [],
      diseaseList: [],
      diseaseIdsList: [],
      // 总条数
      total: 0,
      param: {
        pageNum: 1,
        pageSize: 10,
        phone: '',
        idCard: '',
        patientName: '',
        pgDate: [],
        diseaseIds: ''
      },
      dialogExportVisible: false,
      exportData: [
        {
          exportType: 1,
          exportContent: '患者个人信息',
          percentage: 0,
          progressStatus: ''
        }, {
          exportType: 2,
          exportContent: '用药记录',
          percentage: 100,
          progressStatus: 'success'
        }, {
          exportType: 3,
          exportContent: '检查检验',
          percentage: 50,
          progressStatus: 'exception'
        }, {
          exportType: 4,
          exportContent: '药物治疗问题',
          percentage: 30,
          progressStatus: 'warning'
        } ],
      exportChoose: []
    }
  },
  created() {
    this.getList()
    this.getDiease()
  },
  methods: {
    goSearch() {
      this.param.diseaseIds = this.diseaseIdsList.join(',')
      this.getList(this.param)
    },
    resetParam() {
      this.param = {
        phone: '',
        idCard: '',
        patientName: '',
        pgDate: [],
        diseaseIds: ''
      }
      this.diseaseIdsList = []
    },
    getList(param) {
      if (param && param.pgDate.length > 0) {
        param.beginTime = param.pgDate[ 0 ]
        param.endTime = param.pgDate[ 1 ]
      }
      getPatients(param).then((res) => {
        if (res.code === 200) {
          res.data.records.forEach((vv) => {
            if (vv.diseaseName) {
              vv.diseaseList = vv.diseaseName.split(',')
            }
          })
          this.tableData = res.data.records
          this.total = parseInt(res.data.total)
        }
      })
    },
    getDiease() {
      getDisease().then((res) => {
        if (res.code === 200) {
          this.diseaseList = res.data
        }
      })
    },
    delPatient(item, index) {
      delPatient(item.patientId).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.tableData.splice(index, 1)
        }
      })
    },
    goEdit() {
      this.$router.push({name: 'patientsEdit'})
    },
    goDetail(item) {
      this.$router.push({name: 'patientsDetail', params: {id: item.patientId}})
    },
    goAssessment(item) {
      getAssessment({patientId: item.patientId}).then((res) => {
        if (res.code === 200) {
          this.$router.push({
            name: 'patientsForm',
            params: {id: item.patientId, assessmentId: res.data.assessmentId},
            query: {type: 'newAssessment'}
          })
        }
      })
    },
    handleExportSelectionChange(val) {
      this.exportChoose.push(val)
    }
  }
}
</script>
<style scoped lang="scss">
.patients {
  padding: 30px 60px 30px 70px;

  .el-row {
    margin-bottom: 20px;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-tag {
    margin: 5px;
    border-radius: 25px;
  }
}
</style>
