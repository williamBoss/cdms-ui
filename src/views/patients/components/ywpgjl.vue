<template>
  <div class="life-style ywp-wrap">
    <el-card class="info-wrap">
      <el-row>
        <el-col :span="4">
          <div class="name-wrap">
            <div class="label-item">姓名</div>
            <div class="name-item">{{form.patientInfoVO.patientName}}</div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="other-wrap">
            <el-row>
              <el-col :span="4">
                ID : {{form.patientInfoVO.patId}}
              </el-col>
              <el-col :span="3">
                性别 : {{form.patientInfoVO.gender}}
              </el-col>
              <el-col :span="3">
                年龄 : {{form.patientInfoVO.age}}
              </el-col>
              <el-col :span="5">
                手机 : {{form.patientInfoVO.phone}}
              </el-col>
              <el-col class="time-item" :span="9">
                就诊时间 : {{form.patientInfoVO.fillDate}}
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row class="table-wrap" :gutter="20">
          <el-col>
            <div class="table-title">既往病史</div>
            <el-table
                :data="form.pastHistoryVO"
                stripe
                style="width: 100%">
                <el-table-column
                  label="name"
                  prop="name"
                  width="100px">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="list">
                  <template slot-scope="scope">
                    <span v-if="scope.row.list && scope.row.list.length > 0">
                      <el-tag v-for="item in scope.row.list">{{item.surgeryName || item.diseaseName}}</el-tag>
                    </span>
                    <span v-if="scope.row.data">{{scope.row.data}}</span>
                  </template>
                </el-table-column>
              </el-table>
          </el-col>
          <el-col>
            <div class="table-title">现有症状</div>
            <el-table
                :data="form.curSysVO"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Date"
                  width="120px"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="list">
                  <template slot-scope="scope">
                    <span v-if="scope.row.list && scope.row.list.length > 0">
                      <el-tag v-for="item in scope.row.list">{{item.diseaseName}}</el-tag>
                    </span>
                    <span v-if="scope.row.data">{{scope.row.data}}</span>
                  </template>
                </el-table-column>
              </el-table>
          </el-col>
          <el-col>
            <div class="table-title">费用</div>
            <el-table
                :data="form.costVO"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Date"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="name">
                  <template slot-scope="scope">
                    每月医疗总花费（元）：
                    {{scope.row.beforeTotal || scope.row.afterSixTotal || scope.row.afterThreeTotal || scope.row.afterTwelveTotal}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="name">
                  <template slot-scope="scope">
                    每月药费（元）：
                    {{scope.row.afterSixMedicalExpenses || scope.row.afterThreeMedicalExpenses || scope.row.afterTwelveMedicalExpenses || scope.row.beforeMedicalExpenses}}
                  </template>
                </el-table-column>
              </el-table>
          </el-col>
          <el-col>
            <div class="table-title">生存质量分析</div>
            <el-table
                :data="form.scaleList"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Date"
                  prop="key">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="value">
                </el-table-column>
              </el-table>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="table-wrap" :gutter="20">
          <el-col>
            <div class="table-title">药物不良反应史</div>
            <el-table
                :data="form.medSideEffectVOList"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Date"
                  prop="medName">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="adverseReactionsSymptoms">
                </el-table-column>
              </el-table>
          </el-col>
          <el-col>
            <div class="table-title">生活方式</div>
              <el-table
                :data="form.lifestyleVO"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Date"
                  width="100px"
                  prop="name1">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="value1">
                  <template slot-scope="scope">
                    <span v-show="scope.row.name1 === '油脂'">
                      <span v-show="scope.row.value1 === 1">少</span>
                      <span v-show="scope.row.value1 === 2">中</span>
                      <span v-show="scope.row.value1 === 3">多</span>
                    </span>
                    <span v-show="scope.row.name1 !== '油脂'">
                      {{scope.row.value1}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Date"
                  prop="name2">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="value2">
                  <template slot-scope="scope">
                    <span v-show="scope.row.name2 === '摄盐量' || scope.row.name2 === '蔬菜水果'">
                      <span v-show="scope.row.value2 === 1">少</span>
                      <span v-show="scope.row.value2 === 2">中</span>
                      <span v-show="scope.row.value2 === 3">多</span>
                    </span>
                    <span v-show="scope.row.name2 !== '摄盐量' && scope.row.name2 !== '蔬菜水果' ">
                      {{scope.row.value2}}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            <!-- <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  label="Date"
                  prop="date">
                </el-table-column>
                <el-table-column
                  label="Name"
                  prop="name">
                </el-table-column>
              </el-table> -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="table-wrap big-table" :gutter="20">
      <el-col>
        <div class="table-title">药物治疗相关处理建议</div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              label="Date"
              prop="date">
            </el-table-column>
            <el-table-column
              label="Name"
              prop="name">
            </el-table-column>
          </el-table>
      </el-col>
    </el-row>
    <el-form>
      <el-row class="form-wrap" :gutter="20">
        <el-col :span="12">
          <div class="title-item">问题及干预</div>
          <el-input type="textarea" v-model="obj1.problemsInterventions" placeholder="请描述患者的问题">
          </el-input>
          <el-button class="save-btn" size="mini" type="info" @click="saveProblem('problemsInterventions')">保存</el-button>
        </el-col>
        <el-col :span="12">
          <div class="title-item">转归</div>
          <el-input type="textarea" v-model="obj2.sequelae" placeholder="请描述患者的问题">
          </el-input>
          <el-button class="save-btn" size="mini" type="info" @click="saveProblem('sequelae')">保存</el-button>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="goNext">完成</el-button>
        <el-button type="primary" style="margin-right: 10px;" @click="saveInfo">上一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getReportInfo, saveReportProblem, saveReportSequelae, getReportProblem, getReportSequelae } from '@/api/patients'
  export default {
    props: {
      activeName: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        form: {
          patientInfoVO: {},
          pastHistoryVO: [],
          curSysVO: [],
          costVO: [],
          lifestyleVO: [],
          medSideEffectVOList: [],
          scaleList: []
        },
        tableData: [],
        obj1: {},
        obj2: {}
      }
    },
    created () {
      this.getReportInfo()
    },
    methods: {
      getReportInfo () {
        let param = {
          "assessmentId": this.$route.params.assessmentId,
          "patientId": this.$route.params.id
        }
        getReportInfo(param).then((res) => {
          if (res.code === 200) {
            // this.form = res.data
            this.hanldeData(res.data)
          } else {
            this.$message.error(res.errorMessage)
          }
        })
        getReportProblem(param).then((res) => {
          if (res.code === 200) {
            this.obj1 = res.data ? res.data : {}
          } else {
            this.$message.error(res.errorMessage)
          }
        })
        getReportSequelae(param).then((res) => {
          if (res.code === 200) {
            this.obj2 = res.data ? res.data : {}
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      },
      hanldeData (data) {
        if (data.pastHistoryVO) { // 既往史
          let newList = []
          Object.keys(data.pastHistoryVO).forEach((vv) => {
            switch (vv) {
              case 'allergyHistoryVOList': {
                let param = {
                  name: '过敏史',
                  value: 'allergyHistoryVOList'
                }
                param.data = data.pastHistoryVO['allergyHistoryVOList'].length > 0 ? '有': '无'
                newList.push(param)
                break;
              }
              case 'pastMedicalHistoryVO': {
                let param = {
                  name: '既往病史',
                  value: 'pastMedicalHistoryVO',
                  list: data.pastHistoryVO['pastMedicalHistoryVO']
                }
                newList.push(param)
                break;
              }
              case 'pastSurgicalHistoryVOList': {
                let param = {
                  name: '既往手术史',
                  value: 'pastSurgicalHistoryVOList',
                  list: data.pastHistoryVO['pastSurgicalHistoryVOList']
                }
                newList.push(param)
                break;
              }
              case 'patientConditionKidneyVO': {
                let param = {
                  name: '肾损伤',
                  value: 'patientConditionKidneyVO'
                }
                param.data = data.pastHistoryVO['patientConditionKidneyVO'].kidneyDamage !== 0 ? '有': '无'
                newList.push(param)
                break;
              }
              case 'patientConditionLiverVO': {
                let param = {
                  name: '肝损伤',
                  value: 'patientConditionLiverVO'
                }
                param.data = data.pastHistoryVO['patientConditionLiverVO'].liverDamage !== 0 ? '有': '无'
                newList.push(param)
                break;
              }
            }
          })
          this.form.pastHistoryVO = newList
        }
        if (data.mainConsultVO || data.assessmentDiagnosisVO || data.symptomDescriptionVO) {
          let newList = []
          newList.push({
            name: '主述',
            value: 'mainConsultVO',
            data: data.mainConsultVO && data.mainConsultVO.mainConsult
          })
          newList.push({
            name: '诊断',
            value: 'assessmentDiagnosisVO',
            list: data.assessmentDiagnosisVO
          })
          newList.push({
            name: '当前症状描述',
            value: 'symptomDescriptionVO',
            list: data.symptomDescriptionVO
          })
          this.form.curSysVO = newList
          // console.log(data.symptomDescriptionVO)
        }
        if (data.lifestyleVO) {
          let newList = []
          newList.push({
            name: '就诊前',
            'beforeMedicalExpenses': data.lifestyleVO.beforeMedicalExpenses,
            'beforeTotal': data.lifestyleVO.beforeTotal
          })
          newList.push({
            name: '就诊3个月后',
            'afterThreeMedicalExpenses': data.lifestyleVO.afterThreeMedicalExpenses,
            'afterThreeTotal': data.lifestyleVO.afterThreeTotal
          })
          newList.push({
            name: '就诊6个月后',
            'afterSixMedicalExpenses': data.lifestyleVO.afterThreeMedicalExpenses,
            'afterSixTotal': data.lifestyleVO.afterThreeTotal
          })
          newList.push({
            name: '就诊12个月后',
            'afterTwelveMedicalExpenses': data.lifestyleVO.afterThreeMedicalExpenses,
            'afterTwelveTotal': data.lifestyleVO.afterThreeTotal
          })
          this.form.costVO = newList
        }
        if (data.patientInfoVO) {
          let newList = []
          this.form.patientInfoVO = data.patientInfoVO
          newList.push({
            name1: '身高',
            value1: data.patientInfoVO.height + 'cm',
            name2: '体重',
            value2: data.patientInfoVO.weight + 'kg'
          })
          newList.push({
            name1: 'BMI',
            value1: data.patientInfoVO.bmi + 'cm',
            name2: '过去一年体重变化',
            value2: data.lifestyleVO && (data.lifestyleVO.weightLossValue ? data.lifestyleVO.weightLossValue + 'kg' : data.lifestyleVO.weightGainValue + 'kg')
          })
          newList.push({
            name1: '每日主食',
            value1: data.lifestyleVO && data.lifestyleVO.dailyBasicFoodAmount + '两',
            name2: '摄盐量',
            value2: data.lifestyleVO && data.lifestyleVO.dailySaltAmount
          })
          newList.push({
            name1: '油脂',
            value1: data.lifestyleVO && data.lifestyleVO.dailyFatAmount,
            name2: '蔬菜水果',
            value2: data.lifestyleVO && data.lifestyleVO.dailyVegetableFruitAmount
          })
          this.form.lifestyleVO = newList
        }
        if (data.medSideEffectVOList) {
          this.form.medSideEffectVOList = data.medSideEffectVOList
        }
        if (data.scale) {
          let newList = []
          Object.keys(data.scale).forEach((vv) => {
            newList.push({
              key: vv,
              value: data.scale[vv]
            })
          })
          this.form.scaleList = newList
        }
      },
      saveProblem (type) {
        let param = {
          "assessmentId": this.$route.params.assessmentId,
          "patientId": this.$route.params.id
        }
        if (type === 'problemsInterventions') {
          param[type] = this.obj1.problemsInterventions
          param.id = this.obj1.id
          saveReportProblem(param).then((res) => {
            if (res.code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        } else {
          param[type] = this.obj2.sequelae
          param.id = this.obj2.id
          saveReportSequelae(param).then((res) => {
            if (res.code === 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      },
      goNext () {
        this.$router.push({name: 'patients'})
      },
      saveInfo () {
        this.$emit('update:activeName', 'pglb');
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
  .ywp-wrap{
    .el-table__header-wrapper{
      display: none;
    }
    // .el-table::before, .el-table--group::after, .el-table--border::after{
    //    width: 0;
    // }
    // .el-table--border{
    //   border: 0;
    // }
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
      padding: 22px 0;
      text-align: center;
      height: 100%;
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
    // table
    .table-title{
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      background: #1e3f7c;
      color: #dde3eb;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      font-size: 14px;
    }
    .table-wrap{
      .el-col{
        margin-bottom: 20px;
      }
    }
    .big-table .el-table{
      border-bottom: 2px solid #1e3f7c;
    }
    .form-wrap{
      .title-item{
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #1e3f7c;
        position: relative;
        padding-left: 8px;
        &::before{
          height: 16px;
          width: 2px;
          background:#1E3F7C;
          content: '';
          position: absolute;
          top: 10px;
          left: 0px;
        }
      }
      .el-textarea{
        height: 144px;
      }
      .el-col {
        position: relative;
      }
      .save-btn{
        position: absolute;
        right: 15px;
        bottom: 7px;
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
