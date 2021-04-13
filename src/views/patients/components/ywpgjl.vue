<template>
  <div class="life-style ywp-wrap">
    <el-card class="info-wrap">
      <el-row>
        <el-col :span="4">
          <div class="name-wrap">
            <div class="label-item">姓名</div>
            <div class="name-item">{{ form.patientInfoVO.patientName }}</div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="other-wrap">
            <el-row>
              <el-col :span="4">
                ID : {{ form.patientInfoVO.patId }}
              </el-col>
              <el-col :span="3">
                性别 : {{ form.patientInfoVO.gender }}
              </el-col>
              <el-col :span="3">
                年龄 : {{ form.patientInfoVO.age }}
              </el-col>
              <el-col :span="5">
                手机 : {{ form.patientInfoVO.phone }}
              </el-col>
              <el-col class="time-item" :span="9">
                就诊时间 : {{ form.patientInfoVO.fillDate }}
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
              :show-header="false"
              stripe
              border
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
                      <el-tag v-for="item in scope.row.list">{{ item.surgeryName || item.diseaseName }}</el-tag>
                    </span>
                  <span v-if="scope.row.data">{{ scope.row.data }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <div class="table-title">现有症状</div>
            <el-table
              :data="form.curSysVO"
              :show-header="false"
              stripe
              border
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
                  <span v-if="scope.row.data">{{ scope.row.data }}</span>
                  <span v-if="scope.row.list && scope.row.list.length > 0">
                    <el-row v-for="item in scope.row.list">
                      {{ `${item.nickName}:` }}
                      <el-tag v-for="desc in item.chooseDesc">
                        {{ desc }}
                      </el-tag>
                    </el-row>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <div class="table-title">费用（元/月）</div>
            <el-table
              :data="form.costVO"
              :show-header="false"
              border
              style="width: 100%">
              <el-table-column
                label="Date"
                prop="name"
                class-name="col-stripe">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="name">
                <template slot-scope="scope">
                  医疗费：
                  {{
                    scope.row.beforeTotal || scope.row.afterSixTotal || scope.row.afterThreeTotal ||
                    scope.row.afterTwelveTotal
                  }}
                </template>
              </el-table-column>
              <el-table-column
                label="Name"
                prop="name">
                <template slot-scope="scope">
                  药费：
                  {{
                    scope.row.afterSixMedicalExpenses || scope.row.afterThreeMedicalExpenses ||
                    scope.row.afterTwelveMedicalExpenses || scope.row.beforeMedicalExpenses
                  }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <div class="table-title">生存质量分析</div>
            <el-table
              :data="form.scaleList"
              :show-header="false"
              stripe
              border
              style="width: 100%">
              <el-table-column
                label="量表名称"
                prop="key">
              </el-table-column>
              <el-table-column
                label="得分"
                prop="value">
                <template slot-scope="scope">
                  <span :style="scope.row.color">{{ scope.row.value }} {{ scope.row.name }}</span>
                </template>
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
              border
              style="width: 100%">
              <el-table-column
                label="药物名称"
                prop="medName">
              </el-table-column>
              <el-table-column
                label="不良反应"
                prop="adverseReactionsSymptoms">
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <div class="table-title">生活方式</div>
            <el-table
              :data="form.lifestyleVO"
              :show-header="false"
              border
              style="width: 100%">
              <el-table-column
                label="Date"
                width="100px"
                prop="name1"
                class-name="col-stripe">
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
                      {{ scope.row.value1 }}
                    </span>
                </template>
              </el-table-column>
              <el-table-column
                label="Date"
                prop="name2"
                class-name="col-stripe">
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
                      {{ scope.row.value2 }}
                    </span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="form.smokeList"
              :show-header="false"
              border
              style="width: 100%">
              <el-table-column
                label="Date"
                width="100px"
                prop="name"
                class-name="col-stripe">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="value1">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="value2">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="value3">
              </el-table-column>
            </el-table>
            <el-table
              :data="form.drinkList"
              :span-method="objectSpanMethod"
              :show-header="false"
              border
              style="width: 100%">
              <el-table-column
                label="Date"
                width="100px"
                prop="name"
                class-name="col-stripe">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="value1">
              </el-table-column>
              <el-table-column
                label="Name"
                prop="value2">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="table-wrap big-table" :gutter="20">
      <el-col>
        <div class="table-title">药物治疗相关处理建议</div>
        <el-table
          :data="form.medProblemsVOList"
          stripe
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="80px">
          </el-table-column>
          <el-table-column
            label="相关疾病"
            prop="diseaseName"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="相关药物"
            prop="medName"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="适应性"
            prop="questionType"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="具体问题"
            prop="problem"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="处理建议"
            prop="treatmentSuggestion"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="改善详情"
            prop="improvementDetails"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="isResolved"
            label="是否解决"
            align="center"
            width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.isResolved === 1">本次就诊解决</span>
              <span v-if="scope.row.isResolved === 2">未解决</span>
              <span v-if="scope.row.isResolved === 3">待解决</span>
            </template>
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
          <el-button class="save-btn" size="mini" type="info" @click="saveProblem('problemsInterventions')">保存
          </el-button>
        </el-col>
        <el-col :span="12">
          <div class="title-item">转归</div>
          <el-input type="textarea" v-model="obj2.sequelae" placeholder="请描述患者的问题">
          </el-input>
          <el-button class="save-btn" size="mini" type="info" @click="saveProblem('sequelae')">保存</el-button>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button class="btn-size" type="primary" @click="saveInfo">完成</el-button>
        <el-button class="btn-size" type="primary" style="margin-right: 10px;" @click="goNext">上一步</el-button>
        <el-button class="btn-size" type="info">导出PDF</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getReportInfo,
  getReportProblem,
  getReportSequelae,
  saveReportProblem,
  saveReportSequelae
} from '@/api/patients'
import axios from 'axios';

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
        patientInfoVO: {},
        pastHistoryVO: [],
        curSysVO: [],
        costVO: [],
        lifestyleVO: [],
        lifestyle2VO: [],
        medSideEffectVOList: [],
        scaleList: [],
        medProblemsVOList: [],
        smokeList: [],
        drinkList: []
      },
      tableData: [],
      obj1: {},
      obj2: {},
      scales: [],
      diagnose: []
    }
  },
  created() {
    this.getReportInfo()
  },
  methods: {
    async getReportInfo() {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id
      }
      let _this = this
      await axios({
        method: 'get',
        url: '/question.json'
      }).then(function(response) {
        _this.scales = response.data.data
        _this.diagnose = response.data.diagnose
      }).catch(function(error) {
        console.log(error);
      });
      await getReportInfo(param).then((res) => {
        if (res.code === 200) {
          // this.form = res.data
          this.hanldeData(res.data)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
      await getReportProblem(param).then((res) => {
        if (res.code === 200) {
          this.obj1 = res.data ? res.data : {}
        } else {
          this.$message.error(res.errorMessage)
        }
      })
      await getReportSequelae(param).then((res) => {
        if (res.code === 200) {
          this.obj2 = res.data ? res.data : {}
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    hanldeData(data) {
      if (data.pastHistoryVO) { // 既往史
        let newList = []
        Object.keys(data.pastHistoryVO).forEach((vv) => {
          switch (vv) {
            case 'allergyHistoryVOList': {
              let param = {
                name: '过敏史',
                value: 'allergyHistoryVOList'
              }
              param.data = data.pastHistoryVO[ 'allergyHistoryVOList' ].length > 0 ? '有' : '无'
              newList.push(param)
              break;
            }
            case 'pastMedicalHistoryVO': {
              let param = {
                name: '既往病史',
                value: 'pastMedicalHistoryVO',
                list: data.pastHistoryVO[ 'pastMedicalHistoryVO' ]
              }
              newList.push(param)
              break;
            }
            case 'pastSurgicalHistoryVOList': {
              let param = {
                name: '既往手术史',
                value: 'pastSurgicalHistoryVOList',
                list: data.pastHistoryVO[ 'pastSurgicalHistoryVOList' ]
              }
              newList.push(param)
              break;
            }
            case 'patientConditionKidneyVO': {
              let param = {
                name: '肾损伤',
                value: 'patientConditionKidneyVO'
              }
              param.data = data.pastHistoryVO[ 'patientConditionKidneyVO' ].kidneyDamage !== 0 ? '有' : '无'
              newList.push(param)
              break;
            }
            case 'patientConditionLiverVO': {
              let param = {
                name: '肝损伤',
                value: 'patientConditionLiverVO'
              }
              param.data = data.pastHistoryVO[ 'patientConditionLiverVO' ].liverDamage !== 0 ? '有' : '无'
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
        let map = new Map(Object.entries(data.symptomDescriptionVO));
        let symptomDescription = []
        for (let [ k, v ] of map) {
          this.diagnose.forEach(arr => {
            if (k === arr.name) {
              let choose = []
              v.forEach(value => {
                arr.list.forEach(vv => {
                  if (value === vv.value) {
                    choose.push(vv.name)
                  }
                })
              })
              if (map.get(`${ k }OtherDesc`)) {
                choose.push(map.get(`${ k }OtherDesc`))
              }
              if (choose.length > 0) {
                symptomDescription.push({
                  nickName: arr.nickname,
                  chooseDesc: choose
                })
              }
            }
          })
        }
        newList.push({
          name: '当前症状描述',
          value: 'symptomDescriptionVO',
          list: symptomDescription
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
          name: '3个月后',
          'afterThreeMedicalExpenses': data.lifestyleVO.afterThreeMedicalExpenses,
          'afterThreeTotal': data.lifestyleVO.afterThreeTotal
        })
        newList.push({
          name: '6个月后',
          'afterSixMedicalExpenses': data.lifestyleVO.afterSixMedicalExpenses,
          'afterSixTotal': data.lifestyleVO.afterSixTotal
        })
        newList.push({
          name: '1年后',
          'afterTwelveMedicalExpenses': data.lifestyleVO.afterTwelveMedicalExpenses,
          'afterTwelveTotal': data.lifestyleVO.afterTwelveTotal
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
          value1: data.patientInfoVO.bmi,
          name2: '过去一年体重变化',
          value2: data.lifestyleVO && (data.lifestyleVO.weightLossValue
            ? data.lifestyleVO.weightLossValue + 'kg'
            : data.lifestyleVO.weightGainValue + 'kg')
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
      if (data.lifestyleVO) {
        let newList = []
        newList.push({
          name: '吸烟',
          value1: '吸烟量' + data.lifestyleVO.smokingNum + '支/天',
          value2: '吸烟年限' + data.lifestyleVO.smokingYear + '年',
          value3: '戒烟年限' + data.lifestyleVO.quitSmokingTime + '年'
        })
        this.form.smokeList = newList
        let otherList = []
        otherList.push({
          name: '饮酒',
          value1: '饮酒量' + data.lifestyleVO.drinkingNum + '两/天',
          value2: '饮酒年限' + data.lifestyleVO.drinkingYear + '年'
        })
        otherList.push({
          name: '运动',
          value1: '运动项目' + data.lifestyleVO.usualSports,
          value2: '每周运动时间' + data.lifestyleVO.weeklyExerciseTime + '年'
        })
        otherList.push({
          name: '睡眠/跌倒',
          value1: '睡眠障碍' + data.lifestyleVO.sleepDisorderAmount + '次/周',
          value2: '跌倒原因' + data.lifestyleVO.fallReason
        })
        otherList.push({
          name: '建议',
          value1: data.lifestyleVO.lifestyleSummary
        })
        this.form.drinkList = otherList
      }
      if (data.medSideEffectVOList) {
        this.form.medSideEffectVOList = data.medSideEffectVOList
      }
      if (data.scale) {
        let newList = []
        for (let [ key, value ] of Object.entries(data.scale)) {
          let scale = {
            key: key,
            value: value,
            name: '',
            color: ''
          }
          this.scales.forEach(v => {
            if (v.nickName === key && value !== '') {
              v.rule.forEach(r => {
                if ((value > r.min || value == r.min) && (value < r.max || value == r.max)) {
                  scale.name = r.name
                  scale.color = r.color
                }
              });
            }
          })
          newList.push(scale)
        }
        this.form.scaleList = newList
      }
      if (data.medProblemsVOList) {
        this.form.medProblemsVOList = data.medProblemsVOList
      }
    },
    saveProblem(type) {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id
      }
      if (type === 'problemsInterventions') {
        param[ type ] = this.obj1.problemsInterventions
        param.id = this.obj1.id
        saveReportProblem(param).then((res) => {
          if (res.code === 200) {
            this.$message.success('保存成功')
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      } else {
        param[ type ] = this.obj2.sequelae
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
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1 && rowIndex === 3) {
        return [ 1, 2 ];
      }
    },
    goNext() {
      this.$emit('update:activeName', 'pglb');
    },
    saveInfo() {
      this.$router.push({name: 'patients'})
    }
  }
}
</script>

<style scoped lang="scss">
.ywp-wrap {
  ::v-deep .col-stripe {
    background: #FAFAFA;
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
    padding: 22px 0;
    text-align: center;
    height: 100%;

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

  // table
  .table-title {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    background: #1e3f7c;
    color: #FFFFFF;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 14px;
    font-weight: bold;
  }

  .table-wrap {
    .el-col {
      margin-bottom: 20px;
    }
  }

  .big-table .el-table {
    border-bottom: 2px solid #1e3f7c;
  }

  .form-wrap {
    .title-item {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #1e3f7c;
      position: relative;
      padding-left: 8px;

      &::before {
        height: 16px;
        width: 2px;
        background: #1E3F7C;
        content: '';
        position: absolute;
        top: 10px;
        left: 0px;
      }
    }

    .el-textarea {
      height: 144px;
    }

    .el-col {
      position: relative;
    }

    .save-btn {
      position: absolute;
      right: 15px;
      bottom: 7px;
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
