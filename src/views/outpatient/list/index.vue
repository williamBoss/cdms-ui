<template>
  <div class="outpatient-list">
    <el-row :gutter="20">
      <el-col>
        <el-button class="back-btn btn-size" size="medium" type="primary" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入问题或解答的内容" v-model="searchName"></el-input>
      </el-col>
      <el-col :span="8">
        <el-autocomplete
          v-model="medName"
          :fetch-suggestions="querySearchMedInfo"
          :trigger-on-focus="true"
          placeholder="输入咨询的药品名"
          @select="handleSelectMedInfo"
          :clearable="true"
          style="width: 100%"
        >
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-date-picker
          v-model="searchDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy/MM/dd"
          style="width: 100%">
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <el-cascader
          v-model="problems"
          :options="options"
          :props="propsSearch"
          clearable
          placeholder="问题类型"
          style="width: 100%">
        </el-cascader>
      </el-col>
      <el-col :span="8">
        <el-button class="btn-size" type="primary" @click="getOutList()">查询</el-button>
        <el-button class="btn-size" type="info">导出</el-button>
        <el-button class="btn-size" @click="clearSearch">重置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#1e3f7c',color:'white'}"
        border
        stripe>
        <el-table-column
          fixed="left"
          prop="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="clinicConsultDate"
          label="日期"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="left"
          prop="patientName"
          label="姓名"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="medNames"
          label="咨询药物"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="consultContext"
          label="问题"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="consultReply"
          label="解答"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="questionTypes"
          label="问题类型"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-cascader
              :options="options"
              :props="props"
              v-model="scope.row.questionTypes"></el-cascader>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
            <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="getOutList"
    />
  </div>
</template>

<script>
import { deleteData, getMed, getOutList, getProb } from '@/api/outpatient'

export default {
  name: 'outpatient', // 药学门诊
  components: {},
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      searchName: '',
      medName: '',
      medId: '',
      tags: [],
      restaurants: [],
      options: [],
      props: {multiple: true, value: 'id', label: 'medicationProblems', children: 'childList'},
      propsSearch: {value: 'id', label: 'medicationProblems', children: 'childList'},
      value: '',
      tableData: [],
      searchDate: [],
      problems: []
    }
  },
  mounted() {
    this.getOutList()
    this.getProb()
  },
  watch: {
    'medName': function(val) {
      if (val === '') {
        this.medId = ''
      }
    }
  },
  methods: {
    goList() {
      this.$router.push({name: 'outpatientList'})
    },
    async getProb() {
      const res = await getProb()
      let {data} = res
      if (data) {
        this.options = data
      }
    },
    async getOutList() {
      let params = {
        searchValue: this.searchName,
        beginTime: this.searchDate[ 0 ] || '',
        endTime: this.searchDate[ 1 ] || '',
        questionTypes: this.problems,
        medId: this.medId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      console.log('参数：', params)
      let res = await getOutList(params)
      console.log('列表数据：', res)
      let {data} = res;
      if (data) {
        let {records} = data
        if (records) {
          records.forEach((val, index) => {
            val.index = index + 1;
            let arrVal = []
            val.questionTypes.forEach(item => {
              arrVal.push(item.split(','))
            })
            val.questionTypes = arrVal
          });
          this.tableData = records;
          this.total = parseInt(data.total)
        }
      }
    },
    querySearchMedInfo(medName, medInfo) {
      let res_arr = []
      getMed({
        medName: medName
      }).then(res => {
        let {data} = res
        if (data) {
          data.forEach(el => {
            res_arr.push({
              value: `${ el.medName } - ${ el.medSpec } -${ el.vendor } `,
              medId: el.medId
            })
          });
        }
        if (data.length === 0) {
          this.$message({
            message: '该药品名称未搜索到相关药品信息，请更换药品名称',
            type: 'warning'
          });
        }
        if (medInfo) {
          medInfo(res_arr)
        }
      })
    },
    handleSelectMedInfo: function(item) {
      this.medId = item.medId
    },
    clearSearch: function() {
      this.searchName = ''
      this.searchDate = []
      this.problems = []
      this.medId = ''
      this.getOutList();
    },
    handleClick(v) {
      console.log(v)
    },
    goBack() {
      this.$router.push({name: 'outpatient'})
    },
    async deleteData(data) {
      let res = await deleteData(data.id)
      if (res.code === 200 && res.success === true) {
        this.$message({showClose: true, message: '删除成功', type: 'success'});
        await this.getOutList()
      }
    }
  }
}
</script>

<style lang="scss">
.outpatient-list {
  padding: 40px 80px 60px 70px;

  .el-row {
    margin-bottom: 20px;
  }

}
</style>
