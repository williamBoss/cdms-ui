<template>
  <div class="life-style yyjl-wrap">
    <el-row>
      <el-col :span="12">
        <el-button class="add-btn" type="primary" @click="addRecord">添加记录</el-button>
      </el-col>
    </el-row>
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
      <el-table-column
        label="操作"
        align="center"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" @click="editForm(scope.row)" style="float: none">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 20px;float: right;">
      <el-button class="btn-size" type="primary" style="margin-right: 10px;" @click="goNext">下一步</el-button>
    </el-row>
    <el-dialog
      title="药物治疗问题"
      :visible.sync="dialogVisible">
      <div style="margin:0 auto;">
        <el-form :model="form" label-position="top">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="相关疾病">
                <el-autocomplete
                  v-model="form.diseaseName"
                  :fetch-suggestions="queryDisease"
                  :trigger-on-focus="true"
                  placeholder="输入适应症"
                  @select="handleDisease"
                  clearable
                  style="width: 100%"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="相关药物">
                <el-autocomplete
                  v-model="form.medName"
                  :fetch-suggestions="querySearch"
                  :trigger-on-focus="true"
                  placeholder="输入药品名"
                  @select="handleSelect"
                  clearable
                  style="width: 100%"
                ></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <label>问题类型</label>
          <el-row :gutter="20">
            <el-col :span="12" v-for="item in proDict">
              <el-form-item :label="item.medicationProblems">
                <el-cascader v-model="form[item.type]" :options="item.childList"
                             :props="props" style="width: 100%"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="具体问题">
            <el-input v-model="form.problem"></el-input>
          </el-form-item>
          <el-form-item label="处理建议">
            <el-input v-model="form.treatmentSuggestion"></el-input>
          </el-form-item>
          <el-form-item label="是否解决">
            <el-radio-group v-model="form.isResolved">
              <el-radio :label="item.value" v-for="item in options">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="改善详情">
            <el-input v-model="form.improvementDetails"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-size" @click="dialogVisible = false">取 消</el-button>
        <el-button class="btn-size" type="primary" @click="saveInfo()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMed
} from '@/api/outpatient'
import {
  getProblemsDict,
  saveMedProblems,
  getMedProblems,
  getDiseaseList
} from '@/api/patients'

export default {
  props: {
    activeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        diseaseId: '',
        diseaseName: '',
        medId: '',
        medName: '',
        problem: '',
        treatmentSuggestion: '',
        isResolved: '',
        improvementDetails: ''
      },
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
      proDict: [],
      props: {
        label: 'medicationProblems',
        value: 'id',
        children: 'childList'
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
    querySearch(queryString, cb) {
      this.searchMed(queryString, cb)
    },
    queryDisease(queryString, cb) {
      this.searchDisease(queryString, cb)
    },
    async searchMed(queryString, cb) {
      let result = []
      const res = await getMed({
        medName: queryString
      })
      let {data} = res
      if (data) {
        data.forEach(el => {
          result.push({
            value: el.medName,
            medId: el.medId
          })
        });
      }
      this.restaurants = result
      if (cb) {
        cb(this.restaurants)
      }
    },
    searchDisease(queryString, cb) {
      let param = {
        diseaseName: queryString
      }
      getDiseaseList(param).then((res) => {
        if (res.code === 200) {
          if (res.data && res.data.records) {
            let newList = []
            res.data.records.forEach((vv) => {
              newList.push({
                value: vv.diseaseName,
                diseaseId: vv.diseaseId
              })
            })
            cb(newList)
          }
        }
      })
    },
    handleSelect(item) {
      this.form.medId = item.medId
    },
    handleDisease(item) {
      this.form.diseaseId = item.diseaseId
    },
    getProblem() {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
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
    },
    addRecord() {
      this.dialogVisible = true
      this.form = {
        diseaseId: '',
        diseaseName: '',
        medId: '',
        medName: '',
        problem: '',
        treatmentSuggestion: '',
        isResolved: '',
        improvementDetails: ''
      }
    },
    editForm(item) {
      this.form = {
        diseaseId: '',
        diseaseName: '',
        medId: '',
        medName: '',
        problem: '',
        treatmentSuggestion: '',
        isResolved: '',
        improvementDetails: ''
      }
      this.form = item
      this.dialogVisible = true
    },
    goNext() {
      this.$emit('update:activeName', 'pglb');
    },
    saveInfo() {
      this.form.assessmentId = this.$route.params.assessmentId
      this.form.patientId = this.$route.params.id
      saveMedProblems(this.form).then((res) => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message.success('保存成功')
          this.getProblem()
        } else {
          this.$message.error(res.errorMessage)
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.yyjl-wrap {
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
  .el-textarea__inner {
    height: 144px;
    padding-bottom: 35px;
  }
}
</style>
