<template>
  <div class="life-style yyjl-wrap">
    <el-row>
      <el-col :span="12">
        <el-button class="add-btn" type="primary" @click="addRecord">添加记录</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" class="right-btn" @click="goPg">评估量表</el-button>
      </el-col>
    </el-row>
    <el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        label="序号"
        width="50">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="diseaseName"
        label="相关疾病"
        width="180">
      </el-table-column>
      <el-table-column
        prop="medName"
        label="相关药物"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="问题类型"
        width="300">
        <template slot-scope="scope">
          <el-form-item v-for="item in proDict" :label="item.medicationProblems">
            <span v-show="scope.row.id && !scope.row.edit">{{scope.row[item.type + 'Text']}}</span>
            <el-cascader v-show="!scope.row.id || scope.row.edit" v-model="scope.row[item.type]" :options="item.childList" :props="props"></el-cascader>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="具体问题"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id && !scope.row.edit">{{scope.row.problem}}</span>
          <el-input v-show="!scope.row.id || scope.row.edit" v-model="scope.row.problem"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="处理建议"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id && !scope.row.edit">{{scope.row.treatmentSuggestion}}</span>
          <el-input v-show="!scope.row.id || scope.row.edit" v-model="scope.row.treatmentSuggestion"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="是否解决"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id && !scope.row.edit">{{scope.row.isResolvedText}}</span>
          <el-select v-show="!scope.row.id || scope.row.edit" v-model="scope.row.isResolved">
            <el-option v-for="item in options" :label="item.label" :value="item.value">{{item.label}}</el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="改善详情"
        width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.id && !scope.row.edit">{{scope.row.improvementDetails}}</span>
          <el-input v-show="!scope.row.id || scope.row.edit" v-model="scope.row.improvementDetails"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <div class="flex">
            <el-button type="text" @click="saveInfo(scope.row)">保存</el-button>
            <el-button type="text" @click="editForm(scope.row)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
      <el-form-item style="margin-top: 20px;float: right;">
        <el-button type="primary" style="margin-right: 10px;" @click="goNext">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择"
      :visible.sync="dialogVisible"
      width="50%">
      <span>
        <el-form>
          <el-form-item label="选择病种">
            <el-select v-model="newForm.diseaseId">
              <el-option v-for="item in diseaseList" :value="item.diseaseId" :label="item.diseaseName">{{item.diseaseName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择药物">
            <!-- <el-checkbox-group v-model="newForm.indicationsList">
              <el-checkbox v-for="item in medList" :label="item.medName"></el-checkbox>
            </el-checkbox-group> -->
            <el-select v-model="newForm.medId">
              <el-option v-for="item in medList" :value="item.medId" :label="item.medName">{{item.medName}}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNewPro">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDisease,
    getAllMedList
  } from '@/api/param'
  import {
    getProblemsDict,
    saveMedProblems,
    getMedProblems
  } from '@/api/patients'
  export default {
    data() {
      return {
        form: {},
        dialogVisible: false,
        tableData: [],
        diseaseList: [],
        medList: [],
        options: [{
          label: '本次就诊解决',
          value: 1
        },{
          label: '未解决',
          value: 2
        },{
          label: '待解决',
          value: 3
        }],
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
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        getDisease().then((res) => {
          if (res.code === 200) {
            this.diseaseList = res.data
          }
        })
        getAllMedList().then((res) => {
          if (res.code === 200) {
            this.medList = res.data
          }
        })
        getProblemsDict().then((res) => {
          if (res.code === 200) {
            res.data.forEach((vv) => {
              if (vv.medicationProblems === '适应证') {
                vv.type = 'indications'
              }
              if (vv.medicationProblems === '安全性') {
                vv.type = 'safety'
              }
              if (vv.medicationProblems === '有效性') {
                vv.type = 'effectiveness'
              }
              if (vv.medicationProblems === '依从性') {
                vv.type = 'compliance'
              }
            })
            this.proDict = res.data
            this.getProblem()
          }
        })
      },
      getProblem () {
        let param = {
          "assessmentId": this.$route.params.assessmentId,
          "patientId": this.$route.params.id,
          "pageNum": 1,
          "pageSize": 100
        }
        getMedProblems(param).then((res) => {
          if (res.code === 200) {
            res.data.records.forEach((vv) => {
              vv.isResolvedText = this.options[vv.isResolved - 1].label
              var list = ['effectiveness', 'indications', 'safety', 'compliance']
              list.forEach((ll) => {
                let newList = []
                vv[ll].forEach((ee) => {
                  newList.push(parseInt(ee))
                })
                vv[ll] = newList
              })
              vv.edit = false
              this.proDict.forEach((pp) => {
                list.forEach((ll) => {
                  if (pp.type === ll && pp.childList.length > 0) {
                    pp.childList.forEach((cc) => {
                      if (cc.id === vv[ll][0]) {
                        vv[pp.type + 'Text'] = cc.medicationProblems + '/'
                        if (cc.childList.length > 0) {
                          cc.childList.forEach((ff) => {
                            if (ff.id === vv[ll][1]) {
                              vv[pp.type + 'Text'] = vv[pp.type + 'Text'] + ff.medicationProblems
                            }
                          })
                        }
                      }
                    })
                  }
                })
              })
              console.log(vv)
            })
            this.tableData = res.data.records
          }
        })
      },
      addRecord () {
        this.dialogVisible = true
      },
      saveNewPro () {
        this.diseaseList.forEach((vv) => {
          if (vv.diseaseId === this.newForm.diseaseId) {
            this.newForm.diseaseName = vv.diseaseName
          }
        })
        this.medList.forEach((vv) => {
          if (vv.medId === this.newForm.medId) {
            this.newForm.medName = vv.medName
          }
        })
        this.tableData.push(this.newForm)
        this.dialogVisible = false
      },
      goPg () {
        this.$router.push({name: 'pgSet', params: {id:this.$route.params.id, assessmentId: this.$route.params.assessmentId}})
      },
      editForm (item) {
        item.edit = true
        this.newForm = item
      },
      goNext () {},
      saveInfo (item) {
        this.newForm.assessmentId = this.$route.params.assessmentId
        this.newForm.patientId = this.$route.params.id
        saveMedProblems(this.newForm).then((res) => {
          if (res.code === 200) {
            this.$message.success('保存成功')
            this.getProblem()
          } else {
            this.$message.error(res.errorMessage)
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
    .dialog-footer{
      .el-button{
        float: inherit;
      }
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
      font-weight: normal;
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
