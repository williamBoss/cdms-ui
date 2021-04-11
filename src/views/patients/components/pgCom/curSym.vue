<template>
  <div class="life-style cursym-wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card style="height: 210px;">
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                主述
              </el-col>
              <el-col class="content-item" :span="18">
                <el-form-item label="描述" label-width="40px">
                  <el-input disabled type="textarea" :rows="5" v-model="consult.mainConsult"
                            style="height: 150px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height: 210px;">
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  诊断
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-tag closable :disable-transitions="false" v-for="item in diagnosisList">{{ item.diseaseName }}
                </el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="cur-wrap" :gutter="20">
        <el-col>
          <el-card style="height:100%">
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                当前症状描述
              </el-col>
              <el-col class="content-item no-scroll" :span="21">
                <el-row v-for="(item,index) in checkList">
                  <el-row style="padding: 10px">
                    <el-col :class="[curSym[ item.name ].length > 0?'diagnosis_choose':'diagnosis']" :span="4">
                      <div class="page-item">
                        {{ index + 1 }}<span> / {{ checkList.length }}</span>
                      </div>
                      <div class="title-item">{{ item && item.nickname }}</div>
                      <div class="title-item" style="font-size: 14px" v-if="curSym[ item.name ].length > 0">已选择：{{
                          curSym[ item.name ].length
                        }}
                      </div>
                    </el-col>
                    <el-col :span="20" style="min-height: 90px">
                      <el-checkbox-group v-model="curSym[item.name]">
                        <el-checkbox disabled v-if="!v.key" v-for="v in item.list" :label="v.value" :key="v.value">{{
                            v.name
                          }}
                        </el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col>
                      <div v-for="v in item.list" v-if="v.key" style="float:right;display: inline-flex">
                        <div style="width: 40px;line-height: 28px;">{{ v.name }}</div>
                        <el-input disabled class="check-input" size="mini" type="primary" v-model="curSym[v.key]"
                                  placeholder="请输入其他症状">
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-divider></el-divider>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getDisease } from '@/api/param'
import axios from 'axios'
import { getConsult, getDiagnosis, getSymptom } from '@/api/patients'

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
      form: {
        value: [],
        diagnosis: [],
        diagnosisKey: ''
      },
      curSym: {
        cardiovascular: [],
        digestiveSystem: [],
        endocrine: [],
        facialFeatures: [],
        hemolymphSystem: [],
        immuneSystem: [],
        musculoskeletalSystem: [],
        nervousSystem: [],
        physique: [],
        psychological: [],
        respiratorySystem: [],
        urogenitalSystem: [],
        cardiovascularOtherDesc: '',
        digestiveSystemOtherDesc: '',
        endocrineOtherDesc: '',
        facialFeaturesOtherDesc: '',
        hemolymphSystemOtherDesc: '',
        immuneSystemOtherDesc: '',
        musculoskeletalSystemOtherDesc: '',
        nervousSystemOtherDesc: '',
        physiqueOtherDesc: '',
        psychologicalOtherDesc: '',
        respiratorySystemOtherDesc: '',
        urogenitalSystemOtherDesc: ''
      },
      consult: {},
      zdEdit: false,
      diseaseList: [],
      diagnosis: {},
      diagnosisList: [],
      curDiseaseList: [],
      checkList: [],
      page: {
        curPage: 1
      }
    }
  },
  watch: {
    'assessmentId': function(val) {
      if (val) {
        this.assessmentId = val
        this.getDisease()
        this.getAssessment() // 获取主述
        this.getDiagnosis() // 获取诊断
        this.getJson() // 获取json数据
        this.getSymptom() // 查询当前症状描述
      }
    }
  },
  created() {
    this.getDisease()
    this.getAssessment() // 获取主述
    this.getDiagnosis() // 获取诊断
    this.getJson() // 获取json数据
    this.getSymptom() // 查询当前症状描述
  },
  methods: {
    getDisease() {
      getDisease().then((res) => {
        if (res.code === 200) {
          this.diseaseList = res.data
          this.curDiseaseList = res.data
        }
      })
    },
    getAssessment() {
      let param = {
        'assessmentId': this.assessmentId,
        'patientId': this.$route.params.id
      }
      getConsult(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.consult = res.data
        }
      })
    },
    getDiagnosis() {
      let param = {
        'assessmentId': this.assessmentId,
        'patientId': this.$route.params.id
      }
      getDiagnosis(param).then((res) => {
        if (res.code === 200) {
          res.data.forEach((vv) => {
            this.form.diagnosis.push(vv.diseaseId)
          })
          this.diagnosisList = res.data
        }
      })
    },
    getJson() {
      var _this = this
      axios({
        method: 'get',
        url: '/question.json'
      }).then(function(response) {
        _this.checkList = response.data.diagnose
      }).catch(function(error) {
        console.log(error);
      });
    },
    getSymptom() {
      let param = {
        'assessmentId': this.assessmentId,
        'patientId': this.$route.params.id
      }
      getSymptom(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.curSym = res.data
          this.curSym.list = this.curSym[ this.checkList[ this.page.curPage - 1 ].name ]
        }
      })
    },
    changePage(val) {
      this.curSym[ this.checkList[ this.page.curPage - 1 ].name ] = this.curSym.list
      this.page.curPage = val
      this.curSym.list = this.curSym[ this.checkList[ this.page.curPage - 1 ].name ]
    }
  }
}
</script>

<style scoped lang="scss">
.life-style.cursym-wrap {
  .left-item {
    text-align: center;
    background: #1e3f7c;
    color: #fff;
    font-size: 14px;
    position: relative;
  }

  .el-checkbox-group.flex {
    flex-direction: column;
    flex-wrap: wrap;
    height: 180px;
    padding-top: 10px;
    align-content: flex-start;
  }

  .content-item.no-scroll {
    overflow: hidden;
  }

  .el-checkbox {
    width: 150px;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  ::v-deep .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  .vertical-checkbox {
    .el-checkbox {
      display: block;
    }
  }

  .el-divider--horizontal {
    margin: 0;
  }

  .add-btn {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #081f49;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    margin: 0 auto;
    cursor: pointer;
  }

  .item-wrap {
    line-height: 40px;
    margin-top: 40px;
  }

  .add-angle {
    height: 8px;
    width: 8px;
    border-right: 8px solid #fff;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 0;
    position: absolute;
    right: 0;
    bottom: 50%;
    margin-bottom: -4px;
    z-index: 1;
  }

  .content-item {
    overflow: auto;
  }

  .search-item {
    margin-bottom: 5px;
  }

  .el-checkbox {
    line-height: 30px;
  }

  ::v-deep .check-input .el-input__inner {
    width: 243px;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-radius: 0;
  }

  .card-btn {
    margin-top: 5px;
  }

  .el-switch {
    display: block;
  }

  .search-wrap {
    width: 260px;
    margin-bottom: 10px;
  }

  .diagnosis {
    color: #1890FF;
  }

  .diagnosis_choose {
    color: #ff4949;
  }

  .page-item {
    font-size: 40px;
    padding-top: 1px;
    font-weight: normal;

    span {
      font-size: 14px;
    }
  }

  .title-item {
    margin-top: 20px;
    font-size: 18px;
  }

  .el-pagination {
    height: 40px;
    line-height: 40px;
    position: absolute;
    width: 200px;
    bottom: 0;
    left: 50%;
    margin-left: -100px;
    text-align: center;
    padding-top: 15px;
    margin-top: 10px;
    z-index: 0;
  }

  .cur-wrap {
    .el-card {
      height: 240px;
    }
  }
}

</style>
