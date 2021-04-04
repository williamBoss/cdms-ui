<template>
  <div class="outpatient-list">
    <el-button class="back-btn" size="mini" type="primary" @click="goBack">返回</el-button>
    <div class="flex-wrap">
      <div class="search-wrap">
        <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select">
          <el-button slot="append" @click="getOutList()">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="select-wrap">
      <el-date-picker
        v-model="searchDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy/MM/dd">
      </el-date-picker>
      <el-cascader
        style="margin-left: 20px;"
        v-model="problems"
        :options="options"
        :props="propsSearch"
        clearable></el-cascader>
    </div>
    <div class="main-wrap">
      <el-table
        :data="tableData"
        :header-cell-style="{background:'#1e3f7c',color:'white'}"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="clinicConsultDate"
          label="日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="patientName"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="60">
        </el-table-column>
        <el-table-column
          prop="medNames"
          label="咨询药物"
          width="300">
        </el-table-column>
        <el-table-column
          prop="consultContext"
          label="问题">
        </el-table-column>
        <el-table-column
          prop="consultReply"
          label="解答">
        </el-table-column>
        <el-table-column
          prop="questionTypes"
          label="问题类型"
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
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <baseDrawer :drawer="true"></baseDrawer> -->
  </div>
</template>

<script>
import baseDrawer from '@/layout/components/PatientDrawer.vue'
import {
  getOutList,
  getProb,
  deleteData
} from '@/api/outpatient'

export default {
  name: 'outpatient', // 药学门诊
  components: {baseDrawer},
  data() {
    return {
      searchName: '',
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
    getAge(strAge) {
      var birArr = strAge.split('/');
      var birYear = birArr[ 0 ];
      var birMonth = birArr[ 1 ];
      var birDay = birArr[ 2 ];

      d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1; //记得加1
      var nowDay = d.getDate();
      var returnAge;

      if (birArr == null) {
        return false
      }
      ;
      var d = new Date(birYear, birMonth - 1, birDay);
      if (d.getFullYear() == birYear && (d.getMonth() + 1) == birMonth && d.getDate() == birDay) {
        if (nowYear == birYear) {
          returnAge = 0; //
        } else {
          var ageDiff = nowYear - birYear; //
          if (ageDiff > 0) {
            if (nowMonth == birMonth) {
              var dayDiff = nowDay - birDay; //
              if (dayDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff;
              }
            } else {
              var monthDiff = nowMonth - birMonth; //
              if (monthDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff;
              }
            }
          } else {
            return '出生日期晚于今天，数据有误'; //返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge;
      } else {
        return ('输入的日期格式错误！');
      }
    },
    async getOutList() {
      //
      let params = {
        searchValue: this.searchName,
        beginTime: this.searchDate[ 0 ] || '',
        endTime: this.searchDate[ 1 ] || '',
        questionTypes: this.problems
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
            val.age = this.getAge(val.birthday);
            let arrVal = []
            val.questionTypes.forEach(item => {
              arrVal.push(item.split(','))
            })
            val.questionTypes = arrVal
          });
          this.tableData = records;
        }
      }
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
        this.getOutList()
      }
    }
  }
}
</script>

<style lang="scss">
.outpatient-list {
  padding: 10px 40px 60px 70px;
  max-width: 1440px;

  .back-btn {
    margin: 20px 0;
  }

  // .search-wrap{
  //   width: 900px;
  // }
  .select-wrap {
    padding: 17px 0 35px;

    .el-select {
      margin-right: 10px;
    }
  }
}
</style>
