<template>
  <div class="patients">
    <el-row :gutter="15">
      <el-col :span="5">
        <el-input
          placeholder="患者姓名"
          prefix-icon="el-icon-user-solid"
          v-model="param.patientName">
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input
          placeholder="手机号码"
          prefix-icon="el-icon-mobile"
          v-model="param.phone">
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-input
          placeholder="身份证号码"
          prefix-icon="el-icon-postcard"
          v-model="param.idCard">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="10">
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
      <el-col :span="5">
        <el-select multiple v-model="diseaseIdsList" placeholder="选择病种" style="width: 100%">
          <el-option
            v-for="item in diseaseList"
            :key="item.diseaseKey"
            :label="item.diseaseName"
            :value="item.diseaseId">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button type="info" @click="goSearch">查询</el-button>
        <el-button type="info" plain @click="resetParam">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" @click="goEdit">新建</el-button>
    </el-row>
    <div class="main-wrap">
      <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#1e3f7c',color:'white'}"
        style="width: 100%">
        <el-table-column
          fixed
          align="center"
          prop="patientName"
          label="患者姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gender"
          align="center"
          label="性别"
          width="50">
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
          width="60">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="diseaseName"
          align="center"
          label="诊断结果">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.diseaseList">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="recorder"
          label="记录人"
          align="center"
          width="120">
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
          width="100">
          <template slot-scope="scope">
            <el-button @click="goDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="delPatient(scope.row, scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPatients, delPatient } from '@/api/patients'
import { getDisease } from '@/api/param'

export default {
  name: 'patientsList',// 患者管理列表
  data() {
    return {
      tableData: [],
      diseaseList: [],
      diseaseIdsList: [],
      param: {
        phone: '',
        idCard: '',
        patientName: '',
        pgDate: [],
        diseaseIds: ''
      }
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
    }
  }
}
</script>

<style scoped lang="scss">
.patients {
  padding: 28px 20px 0 40px;

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
