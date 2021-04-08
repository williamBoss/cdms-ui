<template>
  <div class="outpatient">
    <div class="flex-wrap">
      <div class="search-wrap">
        <el-input placeholder="请输入内容" v-model="searchName">
          <el-button slot="append" icon="el-icon-search" @click="this.getProb">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="main-wrap">
      <el-tag
        class="tag-wrap"
        v-for="tag in tags"
        :key="tag.id"
        @click="choseTag(tag)"
        :type="tag.check ? '' : 'info'">
        {{ tag.questionnaireName }}
      </el-tag>
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
  name: 'pgSet',
  data() {
    return {
      searchName: '',
      tags: []
    }
  },
  mounted() {
    this.getProb()
  },
  methods: {
    getAssessmentTable() {
      let param = {
        assessmentId: this.$route.params.assessmentId,
        patientId: this.$route.params.id
      }
      getAssessmentTable(param).then((res) => {
        if (res.code === 200) {
          this.tags.forEach((vv) => {
            res.data.forEach((rr) => {
              if (vv.questionnaireKey === rr.questionnaireKey) {
                vv.check = true
              }
            })
          })
        }
      })
    },
    choseTag(item) {
      item.check = !item.check
    },
    saveData() {
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
      saveAssessmentTable(param).then((res) => {
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.$emit('onClose')
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    getProb() {
      getQuestionList({questionnaireName: this.searchName}).then((res) => {
        if (res.code === 200) {
          res.data.forEach((vv) => {
            vv.check = false
          })
          this.tags = res.data
          this.getAssessmentTable()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.outpatient {
  .back-btn {
    margin: 0 0 20px;
  }

  .search-wrap {
    .el-autocomplete {
      width: 100%;
    }
  }

  .main-wrap {
    padding-top: 25px;

    .tag-wrap {
      margin-bottom: 13px;
      margin: 0 11px 33px;
      border-radius: 25px;
      cursor: pointer;
    }
  }

  .select-wrap {
    padding: 15px 0;
    text-align: right;

    .el-select {
      margin-left: 8px;
    }
  }

  .btn-wrap {
    padding: 20px 0;
    text-align: right;
  }

  .btn-item {
    display: inline-block;
  }
}

</style>
