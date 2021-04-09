<template>
  <div class="life-style yyjl-wrap">
    <el-form>
      <el-table
        :data="tableData"
        stripe
        border
        :header-cell-style="{background:'#1e3f7c',color:'white'}">
        <el-table-column
          prop="diseaseName"
          label="相关疾病"
          align="center"
          width="180"
          fixed
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="medName"
          label="相关药物"
        align="center"
        width="180"
        fixed
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="questionType"
        label="问题类型"
        width="450"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <pre>{{ scope.row.questionType }}</pre>
        </template>
      </el-table-column>
      <el-table-column
        prop="problem"
        label="具体问题"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="treatmentSuggestion"
        label="处理建议"
        width="300"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="improvementDetails"
        label="改善详情"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="isResolved"
        label="是否解决"
        align="center"
        width="150">
        <template slot-scope="scope">
          <span v-show="scope.row.id">{{ scope.row.isResolvedText }}</span>
        </template>
      </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { getMedProblems, getProblemsDict } from '@/api/patients'

export default {
  props: {
    activeName: {
      type: String,
      default: ''
    },
    assessmentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      dialogVisible: false,
      tableData: [],
      diseaseList: [],
      medList: [],
      options: [
        {
          label: '本次就诊解决',
          value: 1
        }, {
          label: '未解决',
          value: 2
        }, {
          label: '待解决',
          value: 3
        } ],
      newForm: {
        diseaseId: '',
        diseaseName: '',
        medId: '',
        indicationsList: [],
        indications: ''
      },
      proDict: [],
      props: {
        label: 'medicationProblems',
        value: 'id',
        children: 'childList'
      },
      searchName: '',
      searchDiseaseName: '',
      curMed: {},
      curDisease: {}
    }
  },
  watch: {
    'assessmentId': function(val) {
      if (val) {
        this.assessmentId = val
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getProblemsDict().then((res) => {
        if (res.code === 200) {
          res.data.forEach((vv) => {
            switch (vv.problemType) {
              case 1:
                vv.type = 'indications'
                break;
              case 2:
                vv.type = 'safety'
                break;
              case 3:
                vv.type = 'effectiveness'
                break;
              case 4:
                vv.type = 'compliance'
                break;
              default:
                break;
            }
          })
          this.proDict = res.data
          this.getProblem()
        }
      })
    },
    getProblem() {
      let param = {
        'assessmentId': this.assessmentId,
        'patientId': this.$route.params.id,
        'pageNum': 1,
        'pageSize': 100
      }
      getMedProblems(param).then((res) => {
        if (res.code === 200) {
          res.data.records.forEach((vv) => {
            vv.isResolvedText = this.options[ vv.isResolved - 1 ].label
            var list = [ 'effectiveness', 'indications', 'safety', 'compliance' ]
            list.forEach((ll) => {
              let newList = []
              vv[ ll ].forEach((ee) => {
                newList.push(parseInt(ee))
              })
              vv[ ll ] = newList
            })
            vv.edit = false
            this.proDict.forEach((pp) => {
              list.forEach((ll) => {
                if (pp.type === ll && pp.childList.length > 0) {
                  pp.childList.forEach((cc) => {
                    if (cc.id === vv[ ll ][ 0 ]) {
                      vv[ pp.type + 'Text' ] = cc.medicationProblems + '/'
                      if (cc.childList.length > 0) {
                        cc.childList.forEach((ff) => {
                          if (ff.id === vv[ ll ][ 1 ]) {
                            vv[ pp.type + 'Text' ] = vv[ pp.type + 'Text' ] + ff.medicationProblems
                          }
                        })
                      }
                    }
                  })
                }
              })
            })
          })
          this.tableData = res.data.records
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.yyjl-wrap {
  .el-table__header-wrapper {
    display: none;
  }

  .right-btn {
    margin-bottom: 20px;
  }

  .add-btn {
    float: left;
    margin-bottom: 20px;
  }

  .dialog-footer {
    .el-button {
      float: inherit;
    }
  }

  .info-wrap {
    height: 70px;
    min-height: 70px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 20px;

    .el-col, .el-row {
      height: 100%;
    }
  }

  .warning-info {
    padding-left: 20px;
    font-weight: normal;
  }

  .name-wrap {
    height: 100%;
    width: 100%;
    background: #1e3f7c;

    .label-item {
      display: inline-block;
      color: #dde3eb;
      font-size: 12px;
      padding: 20px 0 0 10px;
      vertical-align: top;
    }

    .name-item {
      display: inline-block;
      color: #dde3eb;
      font-size: 24px;
      padding-left: 22px;
      line-height: 68px;
      vertical-align: top;
    }
  }

  .other-wrap {
    height: 36px;
    line-height: 36px;
    padding: 8px 0;
    text-align: center;
    font-weight: normal;

    .el-col {
      line-height: 24px;
      border-right: 1px solid #eee;
    }

    .time-item {
      text-align: right;
      border-right: 0;
      padding-right: 20px;
    }
  }
}
</style>
<style lang="scss">
.ywp-wrap {
  .el-table__header-wrapper {
    display: none;
  }

  .el-textarea__inner {
    height: 144px;
    padding-bottom: 35px;
  }
}
</style>
