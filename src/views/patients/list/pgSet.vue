<template>
  <div class="outpatient">
    <div class="flex-wrap">
      <div class="search-wrap">
        <el-autocomplete
          v-model="searchName"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          placeholder="输入咨询的药品名"
          @select="handleSelect"
        >
          <el-button slot="append" @click="searchMed()">搜索</el-button>
        </el-autocomplete>
      </div>
    </div>
    <div class="main-wrap">
      <el-tag
        class="tag-wrap"
        v-for="(tag, index) in tags"
        :key="tag.id"
        @click="choseTag(tag)"
        :type="tag.check ? '' : 'info'">
        {{tag.questionnaireName}}
      </el-tag>
      <div class="btn-wrap">
        <el-button type="primary" @click="saveData()">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getQuestionList
} from '@/api/param'
import {
  getAssessmentTable,
  saveAssessmentTable
} from '@/api/patients'
export default {
  name: 'patient', // 药学门诊
  data () {
    return {
      searchName:'',
      tags: [],
    }
  },
  mounted () {
    this.getProb()
    this.getAssessmentTable()
  },
  methods: {
    querySearch(queryString, cb) {
      this.searchMed(cb)
    },
    handleSelect() {},
    getAssessmentTable () {
      let param = {
        assessmentId: this.$route.params.assessmentId,
        patientId: this.$route.params.id
      }
      getAssessmentTable(param).then((res) => {
        if (res.code === 200) {
          this.tags.forEach((vv) => {
            res.data.forEach((rr) => {
              if (vv.id === rr.id) {
                vv.check = true
              }
            })
          })
        }
      })
    },
    choseTag (item) {
      item.check = !item.check
    },
    saveData () {
      let list = []
      this.tags.forEach((vv) => {
        if (vv.check) {
          list.push(vv.id)
        }
      })
      let param = {
        assessmentId: this.$route.params.assessmentId,
        patientId: this.$route.params.id,
        questionnaireIds: list
      }
      saveAssessmentTable (param).then((res) => {
        if (res.code === 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    getProb () {
      getQuestionList().then((res) => {
        if (res.code === 200) {
          res.data.forEach((vv) => {
            vv.check = false
          })
          this.tags = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" >
.outpatient{
  padding: 28px 0 0 24px;
  .search-wrap{
    width: 750px;
    display: inline-block;
    .el-autocomplete{
      width: 100%;
    }
  }
  .main-wrap{
    width: 750px;
    padding-top: 25px;
    .tag-wrap{
      margin-bottom: 13px;
      margin: 0 11px 33px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
  .select-wrap{
    padding: 15px 0;
    text-align: right;
    .el-select{
      margin-left: 8px;
    }
  }
  .btn-wrap{
    padding: 20px 0;
    text-align: right;
  }
  .btn-item{
    display: inline-block;
  }
}

</style>
