<template>
  <div class="life-style">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                生活方式
              </el-col>
              <el-col class="content-item" :span="20">
                <el-row style="top: 10%;">
                  <el-col class="life-item" :span="12">
                    <div>身高：{{ userInfo.height }}cm</div>
                    <div>体重：{{ userInfo.weight }}kg</div>
                    <div>BMI：{{ userInfo.bmi }}</div>
                  </el-col>
                  <el-col class="set-item" :span="12">
                    <div>1年内体重(kg)</div>
                    <el-form-item label="减少" label-width="40px">
                      <el-input clearable :disabled="weightLossVisible" size="mini" v-model="form.weightLossValue">
                        <i slot="suffix" class="unit_suffix">kg</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="增加" label-width="40px">
                      <el-input clearable :disabled="weightGainVisible" size="mini" v-model="form.weightGainValue">
                        <i slot="suffix" class="unit_suffix">kg</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                饮食
              </el-col>
              <el-col class="content-item" :span="20" style="padding-right: 0">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="每日主食量约" label-width="96px">
                      <el-input size="mini" v-model="form.dailyBasicFoodAmount">
                        <i slot="suffix" class="unit_suffix">两</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="food-item" :span="12">
                    <el-form-item label="摄盐量:" label-width="60px">
                      <el-radio-group v-model="form.dailySaltAmount">
                        <el-radio label="1">少</el-radio>
                        <el-radio label="2">中</el-radio>
                        <el-radio label="3">多</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="food-item" :span="12">
                    <el-form-item label="油脂:" label-width="46px">
                      <el-radio-group v-model="form.dailyFatAmount">
                        <el-radio label="1">少</el-radio>
                        <el-radio label="2">中</el-radio>
                        <el-radio label="3">多</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col class="food-item" :span="12">
                    <el-form-item label="蔬/果:" label-width="60px">
                      <el-radio-group v-model="form.dailyVegetableFruitAmount">
                        <el-radio label="1">少</el-radio>
                        <el-radio label="2">中</el-radio>
                        <el-radio label="3">多</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="food-item" :span="10">
                    <el-form-item label="吸烟:" label-width="46px">
                      <el-radio-group v-model="form.isSmoke">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                        <el-radio label="3">已戒</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="form.isSmoke === '1'" class="food-item" :span="7">
                    <el-form-item label="吸烟量:" label-width="60px">
                      <el-input size="mini" v-model="form.smokingNum">
                        <i slot="suffix" class="unit_suffix">支/天</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="form.isSmoke === '1'" class="food-item" :span="7">
                    <el-form-item label="年限:" label-width="45px">
                      <el-input size="mini" v-model="form.smokingYear">
                        <i slot="suffix" class="unit_suffix">年</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="form.isSmoke === '3'" class="food-item" :span="8">
                    <el-form-item label="戒烟年限:" label-width="83px">
                      <el-input size="mini" v-model="form.quitSmokingTime">
                        <i slot="suffix" class="unit_suffix">年</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col class="food-item" :span="9">
                    <el-form-item label="饮酒:" label-width="46px">
                      <el-radio-group v-model="form.isDrinking">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="form.isDrinking === '1'" class="food-item" :span="8">
                    <el-form-item label="饮酒量:" label-width="60px">
                      <el-input size="mini" v-model="form.drinkingNum">
                        <i slot="suffix" class="unit_suffix">两/天</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col v-show="form.isDrinking === '1'" class="food-item" :span="7">
                    <el-form-item label="年限:" label-width="45px">
                      <el-input size="mini" v-model="form.drinkingYear">
                        <i slot="suffix" class="unit_suffix">年</i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                运动
              </el-col>
              <el-col class="content-item" :span="20">
                <el-form-item label="通常运动项目" label-width="98px">
                  <el-checkbox-group v-model="form.usualSportsArr">
                    <el-checkbox label="跑步"></el-checkbox>
                    <el-checkbox label="走路"></el-checkbox>
                    <el-checkbox label="跳舞"></el-checkbox>
                    <el-checkbox label="骑车"></el-checkbox>
                    <el-checkbox label="其他"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="每次的运动时间约" label-width="125px">
                  <el-input size="mini" v-model="form.eachExerciseTime" style="width: 50%">
                    <i slot="suffix" class="unit_suffix">分</i>
                  </el-input>
                </el-form-item>
                <el-form-item label="每周的运动频率是" label-width="125px">
                  <el-input size="mini" v-model="form.weeklyExerciseFrequency" style="width: 50%">
                    <i slot="suffix" class="unit_suffix">次/周</i>
                  </el-input>
                </el-form-item>
                <el-form-item label="每周的运动时间是" label-width="125px">
                  <el-input size="mini" v-model="form.weeklyExerciseTime" style="width: 50%">
                    <i slot="suffix" class="unit_suffix">小时</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                睡眠
              </el-col>
              <el-col class="content-item" :span="20">
                <el-form-item label="有睡眠障碍吗？" label-width="110px">
                  <el-radio-group v-model="form.isSleepDisorder">
                    <el-radio label="1">没有</el-radio>
                    <el-radio label="2">入睡困难</el-radio>
                    <el-radio label="3">早醒</el-radio>
                    <el-radio label="4">多梦</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="睡眠障碍发生的频率？(次/周)" label-width="194px">
                  <el-input size="mini" v-model="form.sleepDisorderAmount"></el-input>
                </el-form-item>
                <el-form-item label="有过跌倒么？" label-width="96px">
                  <el-radio-group v-model="form.isFall">
                    <el-radio label="2">否</el-radio>
                    <el-radio label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="跌倒原因是" label-width="82px">
                  <el-input v-model="form.fallReason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" style="line-height: 10.5">
                <p style="height: 15px;margin-top: 0">费用</p>
                <p style="height: 15px;margin-top: 0;">（元/月）</p>
              </el-col>
              <el-col class="content-item" :span="21">
                <el-row>
                  <el-col :span="4" style="width: 45px">
                    <label class="name-item">就诊前</label>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="医疗费" label-width="82px">
                      <el-input size="mini" v-model="form.beforeTotal"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="药费" label-width="60px">
                      <el-input size="mini" v-model="form.beforeMedicalExpenses"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" style="width: 45px">
                    <label class="name-item">3月后</label>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="医疗费" label-width="82px">
                      <el-input size="mini" v-model="form.afterThreeTotal"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="药费" label-width="60px">
                      <el-input size="mini" v-model="form.afterThreeMedicalExpenses"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" style="width: 45px">
                    <label class="name-item">6月后</label>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="医疗费" label-width="82px">
                      <el-input size="mini" v-model="form.afterSixTotal"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="药费" label-width="60px">
                      <el-input size="mini" v-model="form.afterSixMedicalExpenses"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3" style="width: 45px">
                    <label class="name-item">1年后</label>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="医疗费" label-width="82px">
                      <el-input size="mini" v-model="form.afterTwelveTotal"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="药费" label-width="60px">
                      <el-input size="mini" v-model="form.afterTwelveMedicalExpenses"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                总结
              </el-col>
              <el-col class="content-item" :span="20">
                <el-form-item label="" label-width="0">
                  <el-input type="textarea" placeholder="请输入总结描述" :rows="7" v-model="form.lifestyleSummary"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button class="btn-size" type="primary" @click="goNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLifestyle, getPatientInfo, saveLifestyle } from '@/api/patients'

export default {
  props: {
    activeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      weightLossVisible: false,
      weightGainVisible: false,
      form: {
        weightLossValue: '',
        weightGainValue: '',
        usualSportsArr: []
      },
      checkList: [],
      userInfo: {}
    }
  },
  created() {
    this.getPatientInfo()
    this.getLifestyle()
  },
  watch: {
    'form.weightLossValue': function(val) {
      if (val !== '') {
        this.weightGainVisible = true
      } else {
        this.weightLossVisible = false
        this.weightGainVisible = false
      }
    },
    'form.weightGainValue': function(val) {
      if (val !== '') {
        this.weightLossVisible = true
      } else {
        this.weightGainVisible = false
        this.weightLossVisible = false
      }
    }
  },
  methods: {
    goNext() {
      this.form.assessmentId = this.$route.params.assessmentId
      this.form.patientId = this.$route.params.id
      this.form.usualSports = this.form.usualSportsArr.toString()
      saveLifestyle(this.form).then((res) => {
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.$emit('update:activeName', 'yyjl');
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    getLifestyle() {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id
      }
      getLifestyle(param).then((res) => {
        if (res.code === 200) {
          if (res.data) {
            res.data.dailyFatAmount = res.data.dailyFatAmount.toString()
            res.data.dailySaltAmount = res.data.dailySaltAmount.toString()
            res.data.dailyVegetableFruitAmount = res.data.dailyVegetableFruitAmount.toString()
            res.data.isDrinking = res.data.isDrinking.toString()
            res.data.isExercise = res.data.isExercise.toString()
            res.data.isFall = res.data.isFall.toString()
            res.data.isSleepDisorder = res.data.isSleepDisorder.toString()
            res.data.isSmoke = res.data.isSmoke.toString()
            this.form = res.data
            this.form.usualSportsArr = res.data.usualSports.split(',')
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    getPatientInfo() {
      getPatientInfo(this.$route.params.id).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
          if (res.data.gender === 1) {
            res.data.sexName = '男'
          } else {
            res.data.sexName = res.data.gender === 2 ? '女' : '未知'
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.life-style {
  .left-item {
    width: 80px;
    text-align: center;
    background: #1e3f7c;
    color: #fff;
    font-size: 14px;
    line-height: 13;
  }

  .el-card {
    min-height: 180px;
    font-size: 14px;
    font-weight: 700;
    color: #606266;
  }

  .life-item {
    line-height: 44px;
    border-right: 1px solid #e1e1e1;
  }

  .el-form > .el-row {
    margin-bottom: 20px;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .content-item {
    padding: 8px 20px;

    .el-form-item {
      margin-bottom: 5px;
    }

    .el-checkbox {
      margin-right: 12px;
    }

    .food-item {
      line-height: 35px;
    }

    .name-item {
      width: 185px;
      line-height: 36px;
    }

    .el-textarea, .el-textarea__inner {
      min-height: 160px;
      background: #f0f0f0;
      border: 0;
    }
  }

  .el-button {
    float: right;
  }

  .el-radio {
    margin-right: 10px;
  }

  .el-radio__label {
    padding-left: 5px;
  }
}

.set-item {
  line-height: 44px;
  padding: 0 20px;
}

.unit_suffix {
  font-style: normal;
}
</style>
<style lang="scss">
.content-item {
  .el-textarea, .el-textarea__inner {
    min-height: 160px;
    background: #f0f0f0;
    border: 0;
  }
}
</style>
