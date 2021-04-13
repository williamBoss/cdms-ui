<template>
  <div class="life-style history">
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  家族病史
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-row>
                  <el-tag :disable-transitions="false" v-for="(item, index) in familyHistory">{{ item.diseaseName }}
                  </el-tag>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  既往病史
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-row>
                  <el-tag :disable-transitions="false" v-for="(item, index) in oldHistory">{{ item.diseaseName }}
                    <span v-if="item.durationIllness">{{ item.durationIllness }}年</span>
                  </el-tag>
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
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  既往手术史
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-tag v-for="(item, index) in surgicalHistory">{{ item.surgeryName }}</el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  糖尿病并发症
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-tag v-for="(item, index) in diabetesHistory">{{ item.complicationsSymptom }}</el-tag>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  肝损害
                  <div class="switch-wrap">
                    <el-switch
                      disabled
                      active-text="有"
                      active-value="1"
                      inactive-text="无"
                      inactive-value="0"
                      v-model="gssEdit">
                    </el-switch>
                  </div>
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                {{ liverInfo.liverDamageDesc }}
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-row type="flex">
              <el-col class="left-item" :span="6">
                <div class="item-wrap">
                  肾损害
                  <div class="switch-wrap">
                    <el-switch
                      disabled
                      active-text="有"
                      active-value="1"
                      inactive-text="无"
                      inactive-value="0"
                      v-model="sssEdit">
                    </el-switch>
                  </div>
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                {{ kidneyInfo.kidneyDamageDesc }}
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-card style="height: 220px;">
            <el-row type="flex">
              <el-col class="left-item" :span="3" style="height: 220px;">
                <div class="item-wrap">
                  过敏史
                </div>
              </el-col>
              <el-col class="content-item" v-if="!gmEdit" :span="21" style="margin:0 auto;">
                <el-table :data="allergenHistory"
                          :height="210"
                          :header-cell-style="{background:'#1e3f7c',color:'white'}"
                          style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="70"
                    align="center"
                    fixed>
                    <template slot-scope="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column fixed prop="allergen" align="center" label="过敏源">
                  </el-table-column>
                  <el-table-column prop="allergySymptoms" label="过敏症状" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="allergyDatetime" align="center" label="发生日期" width="150">
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col class="content-item" v-if="gmEdit" :span="20">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="过敏源">
                      <el-input size="mini" v-model="form.allergen"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发生日期">
                      <el-date-picker size="mini" format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date"
                                      placeholder="选择日期" v-model="form.allergyDatetime"
                                      style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="过敏症状">
                  <el-input type="textarea" :rows="6" size="mini" v-model="form.allergySymptoms"></el-input>
                </el-form-item>
                <el-button class="card-btn" size="mini" type="primary" @click="saveHistory('saveAllergyHistory')">保存
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col>
          <el-card style="height: 220px;">
            <el-row type="flex">
              <el-col class="left-item" :span="3" style="height: 220px;">
                <div class="item-wrap">
                  药物不良反应
                </div>
              </el-col>
              <el-col class="content-item" v-if="!ywfyEdit" :span="21" style="margin:0 auto;">
                <el-table :data="medSideList"
                          :height="210"
                          :header-cell-style="{background:'#1e3f7c',color:'white'}">
                  <el-table-column
                    prop="index"
                    label="序号"
                    width="70"
                    align="center"
                    fixed>
                    <template slot-scope="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column fixed prop="medName" align="center" label="药品名称" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="adverseReactionsSymptoms" label="不良反应症状" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="occurrenceDatetime" align="center" label="发生日期" width="150">
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col class="content-item" v-if="ywfyEdit" :span="20">
                <el-form-item label="药品名称" label-width="100px">
                  <el-autocomplete
                    v-model="form.medSide.medName"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="true"
                    placeholder="输入药品名称，进行搜索"
                    size="mini"
                    @select="handleSelect"
                    style="width: 220px"
                  >
                  </el-autocomplete>
                </el-form-item>
                <el-form-item label="发生日期" label-width="100px">
                  <el-date-picker size="mini" format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date"
                                  placeholder="选择日期" v-model="form.medSide.occurrenceDatetime"></el-date-picker>
                </el-form-item>
                <el-form-item label="不良反应症状" label-width="100px">
                  <el-checkbox-group v-model="form.medSide.adverseReactionsSymptomsList">
                    <el-col :span="4" v-for="item in sicknessList">
                      <el-checkbox :label="item" style="line-height: inherit">
                      </el-checkbox>
                    </el-col>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label-width="100px">
                  <el-input size="small" v-model="form.medSide.otherAdverseReactionsSymptoms"
                            placeholder="其他不良反应症状"></el-input>
                </el-form-item>
                <el-button class="card-btn" size="mini" type="primary" :loading="form.medSide.saveVisible"
                           @click="handleClick(form.medSide)">保存
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getDisease, getSurgical } from '@/api/param'
import {
  getAllergyHistory,
  getDiabetesHistory,
  getFamilyHistory,
  getKidneyInfo,
  getLiverInfo,
  getMedSideList,
  getOldHistory,
  getSurgicalHistory
} from '@/api/patients'

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
        familyHistoryIds: [],
        oldHistoryIds: [],
        surgicalIds: [],
        complicationsSymptoms: [],
        compSymptom: '',
        allergyId: '',
        allergen: '',
        allergyDatetime: '',
        allergySymptoms: '',
        liverInfo: '',
        kidneyInfo: '',
        medSide: {
          medicationSideEffectId: '',
          medId: '',
          medName: '',
          occurrenceDatetime: '',
          adverseReactionsSymptomsList: [],
          otherAdverseReactionsSymptoms: '',
          saveVisible: false
        }
      },
      sicknessList: [ '恶心', '呕吐', '皮疹', '便秘' ],
      value: '',
      jzEdit: false,
      jwbEdit: false,
      jwssEdit: false,
      tnbEdit: false,
      gssEdit: false,
      sssEdit: false,
      gmEdit: false,
      ywfyEdit: false,
      diseaseList: [],
      curDiseaseList: [],
      surgicalList: [],
      curSurgicalList: [],
      familyHistory: [],
      oldHistory: [],
      surgicalHistory: [],
      tableData: [],
      options: [],
      oldInput: [],
      curDisease: {},
      diabetesHistory: [],
      diabetesList: [ '糖尿病眼病', '糖尿病肾病', '糖尿病神经病变' ],
      liverInfo: {},
      kidneyInfo: {},
      allergenHistory: [],
      medList: [],
      medSideList: [],
      searchName: ''
    }
  },
  watch: {
    'assessmentId': function(val) {
      if (val) {
        this.assessmentId = val
        this.getDisease()
        this.getHistory()
      }
    }
  },
  created() {
    this.getDisease()
    this.getHistory()
  },
  methods: {
    getDisease() {
      getDisease().then((res) => {
        if (res.code === 200 && res.data) {
          this.diseaseList = res.data
          this.curDiseaseList = res.data
          this.curDiseaseList.forEach(v => {
            this.$set(v, 'year', '')
          })
          this.getHistory()
        }
      })
      getSurgical().then((res) => {
        if (res.code === 200 && res.data) {
          this.surgicalList = res.data
          this.curSurgicalList = res.data
        }
      })
    },
    getHistory() {
      let param = {
        // 'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id
      }
      getFamilyHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.form.familyHistoryIds = []
          this.familyHistory = res.data
          res.data.forEach((vv) => {
            this.form.familyHistoryIds.push(vv.diseaseId)
          })
        }
      })
      getOldHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.form.oldHistoryIds = []
          res.data.forEach((vv) => {
            vv.year = vv.durationIllness
            this.form.oldHistoryIds.push(vv.diseaseId)
          })
          this.oldHistory = res.data
        }
      })
      getSurgicalHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.form.surgicalIds = []
          this.surgicalHistory = res.data
          res.data.forEach((vv) => {
            this.form.surgicalIds.push(vv.surgicalId)
          })
        }
      })
      getDiabetesHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.diabetesHistory = res.data
          let compSymptom = []
          res.data.forEach((vv) => {
            if (this.diabetesList.indexOf(vv.complicationsSymptom) < 0) {
              compSymptom.push(vv.complicationsSymptom)
            } else {
              this.form.complicationsSymptoms.push(vv.complicationsSymptom)
            }
          })
          this.form.compSymptom = compSymptom.join(',')
        }
      })
      getLiverInfo(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.liverInfo = res.data
          this.form.liverInfo = res.data.liverDamageDesc;
          if (this.liverInfo.liverDamageDesc) {
            this.gssEdit = '1'
          } else {
            this.gssEdit = '0'
          }
        }
      })
      getKidneyInfo(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.kidneyInfo = res.data
          this.form.kidneyInfo = res.data.kidneyDamageDesc
          if (this.kidneyInfo.kidneyDamageDesc) {
            this.sssEdit = '1'
          } else {
            this.sssEdit = '0'
          }
        }
      })
      param.pageNum = 1
      param.pageSize = 1000
      getMedSideList(param).then((res) => {
        if (res.code === 200) {
          res.data.records.forEach((vv) => {
            vv.adverseReactionsSymptomsList = vv.adverseReactionsSymptoms.split(',')
            vv.sicknessList = JSON.parse(JSON.stringify(this.sicknessList))
          })
          this.medSideList = res.data.records
        }
      })
      param.pageNum = 1
      param.pageSize = 200
      getAllergyHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.allergenHistory = res.data.records
          // this.form.kidneyInfo = res.data.kidneyDamageDesc
        }
      })
    }
  }
}
</script>
<style lang="scss">
.history {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-switch__label * {
    font-size: 12px;
  }

  .el-switch__label {
    display: none;

    &.is-active {
      display: inline-block;
      position: absolute;
      z-index: 100;
      left: 20px;
      font-size: 10px;
      top: 1px;
      color: #999;

      &.el-switch__label--right {
        left: 6px;
        margin: 0;
        top: 0;
        color: #fff;
      }
    }
  }
}

.el-tooltip__popper {
  max-width: 700px;
}
</style>
<style scoped lang="scss">
.life-style {
  .cell {
    .el-button {
      float: none;
    }
  }

  .el-card {
    height: 190px;
  }

  .left-item {
    position: relative;
    text-align: center;
    background: #1e3f7c;
    color: #fff;
    font-size: 14px;
    height: 190px;
    width: 100px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
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
    margin-top: 50px;
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

  .search-item {
    margin-bottom: 5px;
  }

  .el-checkbox {
    display: block;
    line-height: 30px;
  }

  .card-btn {
    margin-top: 5px;
  }

  .search-wrap {
    width: 260px;
    margin-bottom: 10px;
  }

  .switch-wrap {
    width: 40px;
    margin: 0 auto;
    position: relative;
  }

  .el-checkbox-group.flex {
    flex-direction: column;
    flex-wrap: wrap;
    height: 75px;
    padding-top: 10px;
    align-content: flex-start;
  }
}

::v-deep .check-input {
  .el-input__inner {
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-radius: 0;
  }
}

::v-deep .disease .el-checkbox__label {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
