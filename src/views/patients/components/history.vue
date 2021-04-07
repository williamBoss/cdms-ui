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
                  <div class="add-btn"
                       :style="[{'background':this.jzEdit?'#DCDFE6':''},{'color':this.jzEdit?'#999':''}]"
                       @click="editItem('jzEdit')">
                    <i class="el-icon-plus" v-if="!this.jzEdit"></i>
                    <i class="el-icon-close" v-else></i>
                  </div>
                </div>
                <div v-show="jzEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!jzEdit" :span="18">
                <el-row>
                  <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delFamilyHistory')"
                          v-for="(item, index) in familyHistory">{{ item.diseaseName }}
                  </el-tag>
                </el-row>
              </el-col>
              <el-col class="content-item" v-show="jzEdit" :span="18">
                <el-input
                  placeholder="请输入病种名称"
                  prefix-icon="el-icon-search"
                  class="search-item"
                  size="mini"
                  clearable
                  @clear="clearHistory"
                  @change="searchHistory"
                  v-model="form.familyHistory">
                  <el-button slot="append" icon="el-icon-search" @click="searchHistory"></el-button>
                </el-input>
                <el-scrollbar class="scrollbar" style="height: 105px;margin-bottom: 5px;">
                  <el-checkbox-group v-model="form.familyHistoryIds">
                    <el-checkbox v-for="item in curDiseaseList" :label="item.diseaseId" :key="item.diseaseKey">
                      {{ item.diseaseName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
                <el-button type="primary" size="mini" @click="saveHistory('saveFamilyHistory')">保存</el-button>
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
                  <div class="add-btn"
                       :style="[{'background':this.jwbEdit?'#DCDFE6':''},{'color':this.jwbEdit?'#999':''}]"
                       @click="editItem('jwbEdit')">
                    <i class="el-icon-plus" v-if="!this.jwbEdit"></i>
                    <i class="el-icon-close" v-else></i>
                  </div>
                  <div v-show="jwbEdit" class="add-angle"></div>
                </div>
              </el-col>
              <el-col class="content-item" v-show="!jwbEdit" :span="18">
                <el-row>
                  <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delOldHistory')"
                          v-for="(item, index) in oldHistory">{{ item.diseaseName }}{{ item.durationIllness }}年
                  </el-tag>
                </el-row>
              </el-col>
              <el-col class="content-item" v-show="jwbEdit" :span="18">
                <div class="add-angle"></div>
                <el-input
                  placeholder="请输入病种名称"
                  prefix-icon="el-icon-search"
                  class="search-item"
                  size="mini"
                  clearable
                  @clear="clearHistory"
                  @change="searchHistory"
                  v-model="form.oldHistory">
                  <el-button slot="append" icon="el-icon-search" @click="searchHistory"></el-button>
                </el-input>
                <el-scrollbar class="scrollbar" style="height: 105px;margin-bottom: 5px;">
                  <el-checkbox-group v-model="form.oldHistoryIds">
                    <el-checkbox v-for="item in curDiseaseList" :label="item.diseaseId" :key="item.diseaseKey">
                      {{ item.diseaseName }}
                      <el-input placeholder="请输入年限" class="check-input" size="mini" type="primary" v-model="item.year"
                                @change="changeYear(item)"></el-input>
                    </el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
                <el-button type="primary" size="mini" @click="saveHistory('saveOldHistory')">保存</el-button>
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
                  <div class="add-btn"
                       :style="[{'background':this.jwssEdit?'#DCDFE6':''},{'color':this.jwssEdit?'#999':''}]"
                       @click="editItem('jwssEdit')">
                    <i class="el-icon-plus" v-if="!this.jwssEdit"></i>
                    <i class="el-icon-close" v-else></i>
                  </div>
                </div>
                <div v-show="jwssEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!jwssEdit" :span="18">
                <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delSurgicalHistory')"
                        v-for="(item, index) in surgicalHistory">{{ item.surgeryName }}
                </el-tag>
              </el-col>
              <el-col class="content-item" v-show="jwssEdit" :span="18">
                <div class="add-angle"></div>
                <el-input
                  placeholder="请输入手术名称"
                  prefix-icon="el-icon-search"
                  class="search-item"
                  size="mini"
                  clearable
                  @clear="clearHistory"
                  @change="searchHistory"
                  v-model="form.surgical">
                  <el-button slot="append" icon="el-icon-search" @click="searchHistory"></el-button>
                </el-input>
                <el-scrollbar class="scrollbar" style="height: 105px;margin-bottom: 5px;">
                  <el-checkbox-group v-model="form.surgicalIds">
                    <el-checkbox v-for="item in curSurgicalList" :label="item.surgicalId" :key="item.surgicalId">
                      {{ item.surgeryName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
                <el-button type="primary" size="mini" @click="saveHistory('saveSurgicalHistory')">保存</el-button>
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
                  <div class="add-btn"
                       :style="[{'background':this.tnbEdit?'#DCDFE6':''},{'color':this.tnbEdit?'#999':''}]"
                       @click="editItem('tnbEdit')">
                    <i class="el-icon-plus" v-if="!this.tnbEdit"></i>
                    <i class="el-icon-close" v-else></i>
                  </div>
                </div>
                <div v-show="tnbEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!tnbEdit" :span="18">
                <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delDiabetesHistory')"
                        v-for="(item, index) in diabetesHistory">{{ item.complicationsSymptom }}
                </el-tag>
              </el-col>
              <el-col class="content-item" v-show="tnbEdit" :span="18">
                <div style="height: 140px;">
                  <el-checkbox-group v-model="form.complicationsSymptoms">
                    <el-checkbox v-for="item in diabetesList" :label="item">{{ item }}</el-checkbox>
                  </el-checkbox-group>
                  <el-input placeholder="其他" size="mini" type="primary" v-model="form.compSymptom"></el-input>
                </div>
                <el-button type="primary" size="mini" @click="saveHistory('saveDiabetesHistory')">保存</el-button>
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
                      active-text="有"
                      inactive-text="无"
                      v-model="gssEdit">
                    </el-switch>
                  </div>
                </div>
                <div v-show="gssEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!gssEdit" :span="18">
                {{ liverInfo.liverDamageDesc }}
              </el-col>
              <el-col class="content-item" v-show="gssEdit" :span="18">
                <el-form-item label="描述" label-width="40px">
                  <el-input type="textarea" :rows="5" v-model="form.liverInfo"></el-input>
                  <el-button class="card-btn" type="primary" @click="saveHistory('saveLiverInfo')">保存</el-button>
                </el-form-item>
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
                      active-text="有"
                      inactive-text="无"
                      v-model="sssEdit">
                    </el-switch>
                  </div>
                </div>
                <div v-show="sssEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!sssEdit" :span="18">
                {{ kidneyInfo.kidneyDamageDesc }}
              </el-col>
              <el-col class="content-item" v-show="sssEdit" :span="18">
                <el-form-item label="描述" label-width="40px">
                  <el-input type="textarea" :rows="5" v-model="form.kidneyInfo"></el-input>
                  <el-button class="card-btn" type="primary" @click="saveHistory('saveKidneyInfo')">保存</el-button>
                </el-form-item>
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
                  <div class="add-btn" @click="editItem('gmEdit')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <div v-show="gmEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!gmEdit" :span="21">
                <div class="history-item" v-for="(item, index) in allergenHistory">
                  <div class="history-title">
                    <span class="num">{{ index + 1 }}</span>{{ item.allergen }}
                  </div>
                  <div class="history-desc">{{ item.allergySymptoms }}</div>
                  <div class="history-time">{{ item.allergyDatetime }}</div>
                </div>
              </el-col>
              <el-col class="content-item" v-show="gmEdit" :span="20">
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
          <el-card :style="'overflow:' + (ywfyEdit ? 'inherit' : 'hidden')" style="height: 220px;">
            <el-row>
              <el-col class="left-item" :span="3" style="height: 220px;">
                <div class="item-wrap">
                  药物不良反应
                  <div class="add-btn" @click="editItem('ywfyEdit')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <div v-show="ywfyEdit" class="add-angle"></div>
              </el-col>
              <el-col class="content-item" v-show="!ywfyEdit" :span="21">
                <div class="history-item" v-for="(item, index) in medSideList">
                  <div class="history-title">
                    <span class="num">{{ index + 1 }}</span>{{ item.medName }}
                  </div>
                  <div class="history-desc">{{ item.adverseReactionsSymptoms }}</div>
                  <div class="history-time">{{ item.occurrenceDatetime }}</div>
                </div>
              </el-col>
              <el-col class="content-item table-wrap" style="overflow:inherit;padding: 20px;background: #FFFFFF;"
                      v-show="ywfyEdit"
                      :span="21">
                <div class="search-wrap">
                  <el-autocomplete
                    v-model="searchName"
                    :fetch-suggestions="querySearch"
                    :trigger-on-focus="true"
                    placeholder="输入药品名"
                    size="mini"
                    @select="handleSelect"
                  >
                  </el-autocomplete>
                  <el-button type="primary" size="mini" @click="addMed">添加</el-button>
                </div>
                <el-table
                  :data="medSideList"
                  border
                  :header-cell-style="{background:'#1e3f7c',color:'white'}"
                  style="width: 100%;background: rgb(255, 255, 255);">
                  <el-table-column
                    fixed
                    prop="index"
                    label="序号"
                    width="60">
                    <template slot-scope="scope">
                      {{ scope.$index + 1 }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="medName"
                    label="药品名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="province"
                    label="不良反应症状">
                    <template slot-scope="scope">
                      <el-checkbox-group class="flex" v-model="scope.row.adverseReactionsSymptomsList">
                        <el-col>
                          <el-checkbox v-for="item in scope.row.sicknessList"
                                       v-show="item.name || (!item.name && item.key)" :label="item.name">
                            <span v-show="!item.key">{{ item.name }}</span>
                            <el-input v-show="item.key" size="min" v-model="item.name"
                                      placeholder="其他不良反应症状"></el-input>
                          </el-checkbox>
                        </el-col>
                      </el-checkbox-group>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="city"
                    label="发生时间"
                    width="170">
                    <template slot-scope="scope">
                      <el-date-picker size="mini" format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date"
                                      placeholder="选择日期" v-model="scope.row.occurrenceDatetime"
                                      style="width: 100%;"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                      <el-popover
                        placement="top"
                        title=""
                        width="50"
                        trigger="click"
                        v-model="scope.row.medSideSaveVisible"
                        :content="scope.row.medSideSaveMessage">
                        <el-button :loading="scope.row.saveVisible" @click="handleClick(scope.row)" type="text"
                                   size="small" slot="reference">保存
                        </el-button>
                      </el-popover>
                      <el-button @click="delItem(scope.row, scope.$index)" type="text" size="small"
                                 style="margin-left: 10px;">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="goNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getDisease,
  getSurgical,
  getMedList
} from '@/api/param'
import {
  getMed
} from '@/api/outpatient'
import {
  getFamilyHistory,
  saveFamilyHistory,
  delFamilyHistory,
  getOldHistory,
  saveOldHistory,
  delOldHistory,
  getSurgicalHistory,
  saveSurgicalHistory,
  delSurgicalHistory,
  saveDiabetesHistory,
  getDiabetesHistory,
  delDiabetesHistory,
  getKidneyInfo,
  saveKidneyInfo,
  getLiverInfo,
  saveLiverInfo,
  saveAllergyHistory,
  getAllergyHistory,
  saveMedSideList,
  getMedSideList,
  delMedSideList
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
        value: [],
        familyHistoryIds: [],
        oldHistoryIds: [],
        surgicalIds: [],
        complicationsSymptoms: [],
        compSymptom: ''
      },
      sicknessList: [ {name: '恶心'}, {name: '呕吐'}, {name: '皮疹'}, {name: '便秘'}, {key: 'other', name: ''} ],
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
  created() {
    this.getDisease()
  },
  methods: {
    getDisease() {
      getDisease().then((res) => {
        if (res.code === 200 && res.data) {
          this.diseaseList = res.data
          this.curDiseaseList = res.data
          this.getHistory()
        }
      })
      getSurgical().then((res) => {
        if (res.code === 200 && res.data) {
          this.surgicalList = res.data
          this.curSurgicalList = res.data
        }
      })
      // getMedList().then((res) => {
      //   if (res.code === 200  && res.data) {
      //     this.medList = res.data.records
      //   }
      // })
    },
    getHistory() {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id
      }
      getFamilyHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.familyHistory = res.data
          res.data.forEach((vv) => {
            this.form.familyHistoryIds.push(vv.diseaseId)
          })
        }
      })
      getOldHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          res.data.forEach((vv) => {
            vv.year = vv.durationIllness
            this.form.oldHistoryIds.push(vv.diseaseId)
          })
          this.oldHistory = res.data
        }
      })
      getSurgicalHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.surgicalHistory = res.data
          res.data.forEach((vv) => {
            this.form.surgicalIds.push(vv.pastSurgicalHistoryId)
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
          this.gssEdit = this.liverInfo.liverDamageDesc ? true : false
          this.form.liverInfo = res.data.liverDamageDesc
        }
      })
      getKidneyInfo(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.kidneyInfo = res.data
          this.sssEdit = this.kidneyInfo.kidneyDamageDesc ? true : false
          this.form.kidneyInfo = res.data.kidneyDamageDesc
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
      param.pageSize = 20
      getAllergyHistory(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.allergenHistory = res.data.records
          // this.form.kidneyInfo = res.data.kidneyDamageDesc
        }
      })
    },
    querySearch(queryString, cb) {
      this.searchMed(cb)
    },
    async searchMed(cb) {
      let result = []
      const res = await getMed({
        medName: this.searchName
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
    searchHistory() {
      if (this.jzEdit || this.jwbEdit) {
        if (this.form.familyHistory || this.form.oldHistory) {
          let list = []
          this.diseaseList.forEach((vv) => {
            if (vv.diseaseName.indexOf(this.form.familyHistory) > -1) {
              list.push(vv)
            }
          })
          this.curDiseaseList = list
        } else {
          this.curDiseaseList = this.diseaseList
        }
      }
      if (this.jwssEdit) {
        if (this.form.surgical) {
          let list = []
          this.surgicalList.forEach((vv) => {
            if (vv.surgeryName.indexOf(this.form.surgical) > -1) {
              list.push(vv)
            }
          })
          this.curSurgicalList = list
        } else {
          this.curSurgicalList = surgicalList
        }
      }
    },
    clearHistory() {
      this.curDiseaseList = this.diseaseList
    },
    handleSelect(item) {
      this.form.medId = item.medId
      this.form.medName = item.value
    },
    addMed() {
      if (this.form.medId) {
        this.medSideList.push({
          medId: this.form.medId,
          medName: this.form.medName,
          adverseReactionsSymptomsList: [],
          sicknessList: JSON.parse(JSON.stringify(this.sicknessList))
        })
        this.searchName = ''
        this.form.medId = ''
        this.form.medName = ''
      }
    },
    handleClick(item) {
      item.saveVisible = true
      item.assessmentId = this.$route.params.assessmentId
      item.patientId = this.$route.params.id
      item.adverseReactionsSymptoms = item.adverseReactionsSymptomsList.join(',')
      saveMedSideList(item).then((res) => {
        item.medSideSaveVisible = true
        item.saveVisible = false
        if (res.code === 200) {
          item.medSideSaveMessage = '保存成功'
          this.$message.success('保存成功')
        } else {
          item.medSideSaveMessage = res.errorMessage
          this.$message.error(res.errorMessage)
        }
      })
    },
    saveHistory(type) {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id
      }
      switch (type) {
        case 'saveFamilyHistory': {
          param.familyMedicalHistoryDiseaseIds = this.form.familyHistoryIds
          saveFamilyHistory(param).then((res) => {
            if (res.code === 200) {
              this.jzEdit = false
              this.$message.success('保存成功')
              this.getHistory()
            }
          })
          break;
        }
        case 'saveOldHistory': {
          if (this.form.oldHistoryIds.length < 1) {
            this.$message.error('病种不能为空')
          } else {
            let newList = []
            this.diseaseList.forEach((vv) => {
              this.form.oldHistoryIds.forEach((ii) => {
                if (parseInt(ii) === parseInt(vv.diseaseId)) {
                  let newParam = {
                    diseaseId: vv.diseaseId,
                    diseaseName: vv.diseaseName,
                    durationIllness: vv.year
                  }
                  newList.push(newParam)
                }
              })
            })
            param.list = newList
            saveOldHistory(param).then((res) => {
              if (res.code === 200) {
                this.jwbEdit = false
                this.$message.success('保存成功')
                this.getHistory()
              }
            })
          }
          break;
        }
        case 'saveSurgicalHistory': {
          param.surgicalIds = this.form.surgicalIds
          saveSurgicalHistory(param).then((res) => {
            if (res.code === 200) {
              this.jwssEdit = false
              this.$message.success('保存成功')
              this.getHistory()
            }
          })
          break;
        }
        case 'saveDiabetesHistory': {
          param.complicationsSymptoms = this.form.complicationsSymptoms
          param.complicationsSymptoms.push(this.form.compSymptom)
          saveDiabetesHistory(param).then((res) => {
            if (res.code === 200) {
              this.tnbEdit = false
              this.$message.success('保存成功')
              this.getHistory()
            }
          })
          break;
        }
        case 'saveLiverInfo': {
          param.liverDamageDesc = this.form.liverInfo
          saveLiverInfo(param).then((res) => {
            if (res.code === 200) {
              this.gssEdit = false
              this.$message.success('保存成功')
              this.getHistory()
            }
          })
          break;
        }
        case 'saveKidneyInfo': {
          param.kidneyDamageDesc = this.form.kidneyInfo
          saveKidneyInfo(param).then((res) => {
            if (res.code === 200) {
              this.sssEdit = false
              this.$message.success('保存成功')
              this.getHistory()
            }
          })
          break;
        }
        case 'saveAllergyHistory': {
          param.allergen = this.form.allergen
          param.allergyDatetime = this.form.allergyDatetime
          param.allergySymptoms = this.form.allergySymptoms
          saveAllergyHistory(param).then((res) => {
            this.gmEdit = false
            this.$message.success('保存成功')
            this.getHistory()
          })
        }
      }
    },
    changeYear(item) {
      this.diseaseList.forEach((vv) => {
        if (vv.diseaseId === item.diseaseId) {
          vv.year = item.year
        }
      })
    },
    delItem(item, index) {
      this.$confirm('您确定删除此条记录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMedSideList({id: item.medicationSideEffectId}).then((res) => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.medSideList.splice(index, 1)
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      })
    },
    handleClose(item, index, type) {
      this.$confirm('您确定删除此条病史', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (type) {
          case 'delFamilyHistory': {
            delFamilyHistory(item.familyHistoryId).then((res) => {
              if (res.code === 200) {
                this.familyHistory.splice(index, 1);
              }
            })
            break;
          }
          case 'delOldHistory': {
            delOldHistory(item.pastHistoryId).then((res) => {
              if (res.code === 200) {
                this.oldHistory.splice(index, 1);
              }
            })
            break;
          }
          case 'delSurgicalHistory': {
            delOldHistory(item.pastSurgicalHistoryId).then((res) => {
              if (res.code === 200) {
                this.surgicalHistory.splice(index, 1);
              }
            })
            break;
          }
          case 'delDiabetesHistory': {
            delDiabetesHistory(item.diabetesComplicationsId).then((res) => {
              if (res.code === 200) {
                this.diabetesHistory.splice(index, 1);
              }
            })
            break;
          }
        }
      })
    },
    editItem(type) {
      this[ type ] = !this[ type ]
      this.curDiseaseList = this.diseaseList
      if (type === 'jwbEdit') {
        this.oldHistory.forEach((vv) => {
          this.curDiseaseList.forEach((cc) => {
            if (vv.diseaseId === cc.diseaseId) {
              cc.year = vv.durationIllness
            }
          })
        })
      }
    },
    filterMethod() {

    },
    goNext() {
      this.$emit('update:activeName', 'curSym');
    },
    onSubmit() {

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
</style>
<style scoped lang="scss">
.life-style {
  .cell {
    .el-button {
      float: left;
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

  .history-item {
    display: inline-block;
    vertical-align: top;
    width: 255px;
    margin: 5px;
    border-right: 1px solid #eee;

    .history-title {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      font-weight: normal;
    }

    .num {
      font-size: 24px;
      margin-right: 20px;
      color: #1E3F7C;
      font-weight: bold;
    }

    .history-desc {
      height: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      line-height: 25px;
      font-weight: normal;
      padding: 8px;
    }

    .history-time {
      line-height: 50px;
      font-weight: normal;
      color: #999;
      font-size: 12px;
    }
  }

  .table-wrap {
    display: inline-block;
    padding: 8px 0;
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
}
</style>
