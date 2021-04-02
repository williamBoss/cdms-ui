<template>
  <div class="life-style pglb-wrap">
    <div class="table-all">
      <el-tag v-for="item in questionList" :effect="curTag.questionnaireName === item.questionnaireName ? 'dark' : 'light'" @click="getTable(item)">{{item.questionnaireName}}</el-tag>
    </div>
    <div class="form-wrap" v-if="curList.type === 'form'">
      <div class="question-item" v-for="(item, index) in curList.list">
        <div class="title">{{index + 1}}.{{item.question}}</div>
        <div class="optins-item">
          <el-radio-group disabled v-model="form[item.value]">
              <el-radio v-for="ii in item.options" :label="ii.value">{{ii.label}}</el-radio>
            </el-radio-group>
        </div>
      </div>
      <!-- <div class="result-wrap" v-show="form.eq5d3lScore">
        {{curList.nickName}}得分：{{form.eq5d3lScore}}
        <span v-for="rr in curList.rule" v-show="(form.eq5d3lScore > rr.min || form.eq5d3lScore === rr.min) && (form.eq5d3lScore < rr.max || form.eq5d3lScore === rr.max)">{{rr.name}}</span>
      </div>
      <div class="result-wrap" v-show="form.eq5d5lScore">
        {{curList.nickName}}得分：{{form.eq5d5lScore}}
        <span v-for="rr in curList.rule" v-show="(form.eq5d5lScore > rr.min || form.eq5d5lScore === rr.min) && (form.eq5d5lScore < rr.max || form.eq5d5lScore === rr.max)">{{rr.name}}</span>
      </div>
      <div class="result-wrap" v-show="form.vasScore">
        {{curList.nickName}}得分：{{form.vasScore}}
        <span v-for="rr in curList.rule" v-show="(form.vasScore > rr.min || form.vasScore === rr.min) && (form.vasScore < rr.max || form.vasScore === rr.max)">{{rr.name}}</span>
      </div> -->
    </div>
    <div class="table-wrap" v-if="curList.type === 'table' && curList.obj1">
      <div class="table-title">{{curList.obj1.name}}</div>
      <el-table
        :data="curList.obj1.list"
        stripe
        style="width: 100%">
        <el-table-column
          label="Date"
          prop="name">
        </el-table-column>
        <el-table-column
          label="Name">
          <template slot-scope="scope">
            <el-select disabled v-if="scope.row.type === 'select'" v-model="form[scope.row.value]">
              <el-option v-for="item in scope.row.options" :label="item.name" :value="item.value"></el-option>
            </el-select>
            <el-input disabled v-if="scope.row.type === 'input'" type="primary" v-model="form[scope.row.value]"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="desc-item">注：{{curList.obj1.desc}}</div>
      <div class="table-title">{{curList.obj2.name}}<span class="small">{{curList.obj2.tips}}</span></div>
      <el-table
        :data="curList.obj2.list"
        stripe
        style="width: 100%">
        <el-table-column
          label="Date"
          prop="name">
        </el-table-column>
        <el-table-column
          label="Name">
          <template slot-scope="scope">
            <el-select disabled v-if="scope.row.type === 'select'" v-model="form[scope.row.value]">
              <el-option v-for="item in scope.row.options" :label="item.name" :value="item.value"></el-option>
            </el-select>
            <el-input disabled v-if="scope.row.type === 'input'" type="primary" v-model="form[scope.row.value]"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="curList.type === 'ruler' && curList.name !== 'cat'">
      <div class="slider-wrap">
        <div class="icon-wrap">
          <!-- <div class="icon-item"  v-for="item in ((curList.list[0].max / curList.list[0].step) + 1)">
            {{item}}
            <img :src="'../../../assets/icons/svg/vas1.svg'" />
          </div> -->
          <div class="el-slider__marks img-marks">
            <div class="el-slider__marks-text" style="left: 0%;">
              <img src="../../../../assets/icons/vas1.png" />
            </div>
            <div class="el-slider__marks-text" style="left: 20%;">
              <img src="../../../../assets/icons/vas2.png" />
            </div>
            <div class="el-slider__marks-text" style="left: 40%;">
              <img src="../../../../assets/icons/vas3.png" />
            </div>
            <div class="el-slider__marks-text" style="left: 60%;">
              <img src="../../../../assets/icons/vas4.png" />
            </div>
            <div class="el-slider__marks-text" style="left: 80%;">
              <img src="../../../../assets/icons/vas5.png" />
            </div>
            <div class="el-slider__marks-text" style="left: 100%;">
              <img src="../../../../assets/icons/vas6.png" />
            </div>
          </div>
        </div>
        <el-slider
              v-model="form.vasScore"
              show-stops
              disabled
              :show-tooltip="showTooltip"
              :step="curList.list[0].step"
              :min="curList.list[0].min"
              :max="curList.list[0].max"
              :marks="marks">
            </el-slider>
      </div>
    </div>
    <div class="has-heard" v-if="curList.type === 'table' && (curList.name === 'chads'|| curList.name === 'acr' || curList.name === 'essen')">
      <el-table
          :data="curList.list"
          :header-cell-style="{background:'#1e3f7c',color:'white', 'border-raduis': '4px'}"
          style="width: 100%">
          <el-table-column
          v-if="curList.name === 'chads'"
           label="危险因素"
            prop="name">
          </el-table-column>
          <el-table-column
          v-if="curList.name === 'essen'"
           label="危险因素"
            prop="question">
          </el-table-column>
          <el-table-column
          v-if="curList.name === 'acr'"
           label="因素"
            prop="question">
          </el-table-column>
          <el-table-column
           v-if="curList.name === 'chads'"
            prop="question">
          </el-table-column>
          <el-table-column
            prop="name"
            label="选项"
            width="300">
            <template slot-scope="scope">
              <el-radio-group disabled v-model="form[scope.row.value]">
                <el-radio v-for="item in scope.row.options" :label="item.value" :value="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
            label="计分"
            width="80">
            <template slot-scope="scope">
              {{form[scope.row.value]}}
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="table-wrap" v-if="curList.type === 'table' && curList.name === 'af'">
      <el-table
            :data="curList.list"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px">
            <el-table-column
              prop="type"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="question">
              <template slot-scope="scope">
                <span v-if="!scope.row.input">{{scope.row.question}}</span>
                <el-input disabled v-if="scope.row.input" v-model="form[scope.row.value]"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="amount1">
              <template slot-scope="scope">
                <el-radio-group disabled v-model="form[scope.row.value]">
                  <el-radio v-for="item in scope.row.options" :label="item.value" :value="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-date-picker disabled value-format="yyyy/MM/dd" format="yyyy/MM/dd" v-model="form[scope.row.date]"></el-date-picker>
              </template>
            </el-table-column>
          </el-table>
    </div>
    <div class="ruler-wrap" v-if="curList.type === 'ruler' && curList.name === 'cat'">
      <div class="slider-wrap">
          <div class="flex" v-for="(item, index) in curList.list">
            <div class="time-item">{{index}}</div>
            <div class="flex-one">
              <div class="text-wrap">
                <span>{{item.startName}}</span>
                <span style="float: right;">{{item.endName}}</span>
              </div>
              <el-slider
                  v-model="form[item.value]"
                  show-stops
                  disabled
                  :show-tooltip="showTooltip"
                  :step="item.step"
                  :min="item.min"
                  :max="item.max"
                  :marks="marksRuler">
                </el-slider>
            </div>
          </div>
        </div>
    </div>
    <div class="checkbox-wrap" v-if="curList.name === 'caprini'">

      <div class="quest-item" v-for="(item, index) in curList.list">
        <div class="title">{{item.title}}</div>
        <el-checkbox-group disabled v-model="capriniChoose">
          <el-checkbox v-for="ll in item.list" :label="ll.value" :key="ll.value">{{ll.question}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="result-wrap" v-show="scord">
      {{curList.nickName}}得分：{{scord}}
      <span v-for="rr in curList.rule" v-show="(scord > rr.min || scord === rr.min) && (scord < rr.max || scord === rr.max)">{{rr.name}}</span>
    </div>
  </div>
</template>

<script>
  import {
    getAssessmentTable,
    getMorisky,
    getQuestionRisk,
    getEq5d3l,
    getEq5d5l,
    getVas,
    getHaq,
    getEssen,
    getSas,
    getSds,
    getChads,
    getAcr,
    getAf,
    getCat,
    getCaprini
  } from '@/api/patients'
  import axios from 'axios'
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
        canEdit: true,
        form: {
          vasId: 0
        },
        capriniChoose: [],
        questionList: [],
        allQuestion: [],
        curTag: {},
        curList: [],
        scord:  0,
        tableData: [],
        marks: {0:"0",2:"2",4:"4",6:"6",8:"8",10:"10"},
        marksRuler: {1:"1",2:"2",3:"3",4:"4",5:"5"},
        showTooltip: false
      }
    },
    watch: {
      'assessmentId': function (val) {
        if (val) {
          this.assessmentId = val
          this.getQuestionList()
        }
      }
    },
    created () {
      this.getQuestionList()
    },
    mounted() {
      // this.$nextTick(function(){
      //   this.setColSpan();
      // })
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        // if (rowIndex % 2 === 0) {
        //           if (columnIndex === 0) {
        //             return [1, 2];
        //           } else if (columnIndex === 1) {
        //             return [0, 0];
        //           }
        //         }
        if (columnIndex === 0) {
          console.log(rowIndex)
          if (rowIndex % 6 === 0) {
            return {
              rowspan: 6, // 行
              colspan: 1 //  列
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
          if (columnIndex === 1 && rowIndex === 5) {
            return [1, 2];
          }
          if (columnIndex === 2 && rowIndex === 5) {
            return [0, 0];
          }
          if (columnIndex === 1 && rowIndex === 7) {
            return [1, 2];
          }
          if (columnIndex === 2 && rowIndex === 7) {
            return [0, 0];
          }
      },
      setColSpan () {
        var x = document.getElementsByClassName("el-table__header")[0].rows[0].cells;
              x[1].colSpan = 2;
      },
      getQuestionList () {
        var _this = this
        let param = {
          "assessmentId":this.$route.params.assessmentId || this.assessmentId,
          "patientId": this.$route.params.id
        }
        getAssessmentTable (param).then((res) => {
          if (res.code === 200) {
            this.questionList = res.data
          }
        })
        axios({
            method: 'get',
            url: '/api/questionList'
        })
        .then(function (response) {
          _this.allQuestion = response.data.data.data
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      getList () {
        let param = {
          "assessmentId":this.$route.params.assessmentId || this.assessmentId,
          "patientId": this.$route.params.id
        }
        if (this.curList.name === 'yyycx') {
          getMorisky(param).then((res) => {
            if (res.code === 200) {
              this.form = res.data
              this.scord = parseFloat(res.data.morCountScore)
            }
          })
        }
        if (this.curList.name === 'xnxg') {
          getQuestionRisk(param).then((res) => {
            if (res.code === 200) {
              this.form = res.data
              // this.scord = parseFloat(res.data.morCountScore)
              // console.log(res.data)
            }
          })
        }
        if (this.curList.name === 'eq5d3l') {
          getEq5d3l(param).then((res) => {
            if (res.code === 200 && res.data) {
              this.form = res.data
              this.scord = parseFloat(res.data.eq5d3lScore)
              // console.log(res.data)
            }
          })
        }
        if (this.curList.name === 'eq5d5l') {
          getEq5d5l(param).then((res) => {
            if (res.code === 200 && res.data) {
              this.form = res.data
              this.scord = parseFloat(res.data.eq5d5lScore)
            }
          })
        }
        if (this.curList.name === 'vas') {
          getVas(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.vasScore = parseInt(res.data.vasScore)
              this.form = res.data
              this.scord = parseFloat(res.data.vasScore)
            }
          })
        }
        if (this.curList.name === 'haq') {
          getHaq(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.easyHaqScore = parseInt(res.data.easyHaqScore)
              this.form = res.data
              this.scord = parseFloat(res.data.easyHaqScore)
            }
          })
        }
        if (this.curList.name === 'essen') {
          getEssen(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.essenScore = parseInt(res.data.essenScore)
              this.form = res.data
              this.scord = parseFloat(res.data.essenScore)
            }
          })
        }
        if (this.curList.name === 'sas') {
          getSas(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.sasScore = parseInt(res.data.sasScore)
              this.form = res.data
              this.scord = parseFloat(res.data.sasScore)
            }
          })
        }
        if (this.curList.name === 'sds') {
          getSds(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.sdsScore = parseInt(res.data.sdsScore)
              this.form = res.data
              this.scord = parseFloat(res.data.sdsScore)
            }
          })
        }
        if (this.curList.name === 'chads') {
          getChads(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.chadsScore = parseInt(res.data.chadsScore)
              this.form = res.data
              this.scord = parseFloat(res.data.chadsScore)
              console.log(this.scord)
            }
          })
        }
        if (this.curList.name === 'acr') {
          getAcr(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.acrScore = parseInt(res.data.acrScore)
              this.form = res.data
              this.scord = parseFloat(res.data.acrScore)
            }
          })
        }
        if (this.curList.name === 'af') {
          getAf(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.afScore = parseInt(res.data.afScore)
              this.form = res.data
              this.scord = parseFloat(res.data.afScore)
            }
          })
        }
        if (this.curList.name === 'cat') {
          getCat(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.catScore = parseInt(res.data.catScore)
              this.form = res.data
              this.scord = parseFloat(res.data.catScore)
            }
          })
        }
        if (this.curList.name === 'caprini') {
          getCaprini(param).then((res) => {
            if (res.code === 200 && res.data) {
              res.data.capriniScore = parseInt(res.data.capriniScore)
              this.capriniChoose = []
              res.data.capriniChoose.forEach((vv) => {
                vv = parseInt(vv)
                this.capriniChoose .push(vv)
              })
              this.form = res.data
              this.scord = parseFloat(res.data.capriniScore)
            }
          })
        }
      },
      getTable (item) {
        this.curTag = item
        this.form = {}
        this.scord = 0
        this.allQuestion.forEach((vv) => {
          if (vv.nickName.indexOf(item.questionnaireName) > -1 || item.questionnaireName.indexOf(vv.nickName) > -1) {
            this.curList = vv
          }
        })
        this.getList()
      }
    }
  }
</script>
<style lang="scss">
.pglb-wrap{
  margin-bottom: 20px;
  .el-table thead{
    display: none;
  }
}
.has-heard{
  margin-top: 40px;
  .el-table thead{
    display: contents;
  }
}
.slider-wrap{
    .el-slider__runway,.el-slider__bar{
      height: 30px;
      border-radius: 25px;
    }
    .el-slider__stop{
      display: none;
    }
    .el-slider__button-wrapper{
      top: -6px;
    }
    .el-slider__button{
      height: 40px;
      width: 40px;
    }
    .el-slider__marks-text{
      margin-top: 45px;
    }
    .img-marks {
      .el-slider__marks-text{
        left: 20%;
        margin-top: -40px;
        margin-left: 5px;
      }
    }
  }
</style>
<style scoped lang="scss">
  .table-all{
    padding: 20px;
    margin-bottom: 40px;
    background: #e8e8e8;
    .el-tag{
      cursor: pointer;
    }
  }
  .btn-wrap{
    margin: 10px 0;
    clear: both;
    height: 40px;
  }
  .flex-one{
    flex: 1;
    -webkit-flex: 1;
    -o-flex: 1;
  }
  .time-item{
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background: #e1eaf9;
    color: #1890FF;
    margin-right: 40px;
    position: relative;
    &::before{
      height: 41px;
      width: 1px;
      border-left: 1px dotted #1890FF;
      content: '';
      display: block;
      position: absolute;
      top: -41px;
      left:20px
    }
    &::after{
      height: 41px;
      width: 1px;
      border-left: 1px dotted #1890FF;
      content: '';
      display: block;
      position: absolute;
      bottom: -41px;
      left:20px
    }
  }
  .form-wrap{
    padding: 20px 0;
    margin-bottom: 20px;
    .title{
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
    }
  }
  .table-title{
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    background: #1e3f7c;
    color: #dde3eb;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 14px;
    margin-top: 20px;
    .small{
      font-size: 12px;
    }
  }
  .desc-item{
    padding: 20px 0;
    font-size: 12px;
    color: #1890FF;
  }
  .result-wrap{
    margin-top: 40px;
    display: inline-block;
    vertical-align: top;
    line-height: 40px;
    padding: 0 10px;
    background: #eaf1fd;
    color: #1890FF;
    &.warning{
      background-color: #fde299;
      color: #FFBA00;
    }
    &.danger{
      background-color: #fcc2c2;
      color: #FF4949;
    }
  }
  .slider-wrap{
    width: 60%;
    margin: 80px auto;
    .flex{
      margin-bottom: 40px;
      &:first-child{
        .time-item::before{
          height: 0;
        }
      }
      &:last-child{
        .time-item::after{
          height: 0;
        }
      }
    }
    .el-slider__runway{
      height: 30px;
      border-radius: 25px;
    }
    .icon-item{
      display: inline-block;
      vertical-align: top;
      flex: 1;
      -webkit-flex: 1;
    }
    .icon-wrap{
      position: relative;
    }
  }
  .quest-item{
    .el-checkbox{
      margin-bottom: 8px;
    }
    .title{
      height: 40px;
      line-height: 40px;
      color: #1890FF;
      position: relative;
      padding-left: 10px;
      &::before{
        height: 20px;
        width: 4px;
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
        background-color: #1890FF;
      }
    }
  }


</style>
