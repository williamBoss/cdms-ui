<template>
  <div class="life-style cursym-wrap">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col>
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                主述
              </el-col>
              <el-col class="content-item" :span="21">
               <el-form-item label="描述" label-width="40px">
                 <el-input disabled type="textarea" :rows="5" v-model="consult.mainConsult"></el-input>
               </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                <div class="item-wrap">
                  诊断
                </div>
              </el-col>
              <el-col class="content-item" :span="21">
               <el-tag v-for="item in diagnosisList">{{item.diseaseName}}</el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="cur-wrap" :gutter="20">
        <el-col>
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="3">
                当前症状描述
              </el-col>
              <el-col class="content-item no-scroll" :span="21">
                <el-row>
                  <el-col :span="4">
                    <div class="page-item">
                      {{page.curPage}}<span> / {{checkList.length}}</span>
                    </div>
                    <div class="title-item">{{checkList[page.curPage - 1] && checkList[page.curPage -1].nickname}}</div>
                  </el-col>
                  <el-col :span="20">
                    <!-- <el-input
                      placeholder="请输入病种名称"
                      prefix-icon="el-icon-search"
                      class="search-item"
                      size="mini"
                      v-model="form.input2">
                    </el-input> -->
                    <el-checkbox-group class="flex" disabled v-if="checkList[page.curPage - 1]" v-model="curSym.list">
                      <el-checkbox v-for="item in checkList[page.curPage - 1].list" :label="item.value" :key="item.value">{{item.name}}
                        <el-input v-show="item.key" placeholder="" class="check-input" size="mini" type="primary" v-model="curSym[item.key]"></el-input>
                      </el-checkbox>
                      <!-- <el-form-item v-if="item.key" label="其他" label-width="40px">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item> -->
                    </el-checkbox-group>

                  </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row style="margin-top: 10px;height: 30px;">
                  <el-pagination
                    small
                    layout="prev, pager, next"
                    :page-size="1"
                    @current-change="changePage"
                    :total="checkList.length">
                  </el-pagination>
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
 import {
   getDisease,
   getQuestionList
 } from '@/api/param'
 import axios from 'axios'
 import {
   getConsult,
   saveConsult,
   getDiagnosis,
   getSymptom,
 } from '@/api/patients'
  export default {
    props: {
      activeName: {
        type: String,
        default: '',
      },
      assessmentId: {
        type: String,
        default: '',
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
          list: [],
          desc: '',
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
      'assessmentId': function (val) {
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
    created () {
      this.getDisease()
      this.getAssessment() // 获取主述
      this.getDiagnosis() // 获取诊断
      this.getJson() // 获取json数据
      this.getSymptom() // 查询当前症状描述
    },
    methods: {
      getDisease () {
        getDisease ().then((res) => {
          if (res.code === 200) {
            this.diseaseList = res.data
            this.curDiseaseList = res.data
          }
        })
      },
      getAssessment () {
        let param = {
          "assessmentId": this.assessmentId,
          "patientId": this.$route.params.id
        }
        getConsult(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.consult = res.data
          }
        })
      },
      getDiagnosis () {
        let param = {
          "assessmentId": this.assessmentId,
          "patientId": this.$route.params.id
        }
        getDiagnosis(param).then((res) => {
          if (res.code === 200) {
            res.data.forEach((vv) => {
              this.form.diagnosis.push(vv.diagnosisId)
            })
            this.diagnosisList = res.data
          }
        })
      },
      getJson () {
        var _this = this
        axios({
            method: 'get',
            url: '/api/questionList'
        })
        .then(function (response) {
          _this.checkList = response.data.data.diagnose
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      getSymptom () {
        let param = {
          "assessmentId": this.assessmentId,
          "patientId": this.$route.params.id
        }
        getSymptom(param).then((res) => {
          if (res.code === 200 && res.data) {
            this.curSym = res.data
            this.curSym.list = this.curSym[this.checkList[this.page.curPage - 1].name]
          }
        })
      },
      changePage (val) {
        this.curSym[this.checkList[this.page.curPage - 1].name] = this.curSym.list
        this.page.curPage = val
        this.curSym.list = this.curSym[this.checkList[this.page.curPage - 1].name]
      },
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
    .el-checkbox-group.flex{
      flex-direction:column;
      flex-wrap: wrap;
      height: 180px;
      padding-top: 10px;
      align-content: flex-start;
    }
    .content-item.no-scroll{
      overflow: hidden;
    }
    .el-checkbox{
      width: 200px;
    }
    .vertical-checkbox{
      .el-checkbox{
        display: block;
      }
    }
    .el-divider--horizontal{
      margin: 0;
    }
    .add-btn{
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
    .item-wrap{
      line-height: 40px;
      margin-top: 40px;
    }
    .add-angle{
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
    .search-item{
      margin-bottom: 5px;
    }
    .el-checkbox{
      line-height: 30px;
    }
    .check-input{
      margin-left: 10px;
      width: 200px;
    }
    .card-btn{
      margin-top: 5px;
    }
    .el-switch{
      display: block;
    }
    .search-wrap{
      width: 260px;
      margin-bottom: 10px;
    }
    .page-item{
      font-size: 40px;
      color: #1890FF;
      padding-top: 20px;
      font-weight: normal;
      span{
        font-size: 14px;
      }
    }
    .title-item{
      margin-top: 20px;
      color: #1890FF;
      font-weight: normal;
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
    .cur-wrap{
      .el-card{
        height: 240px;
      }
    }
  }

</style>
