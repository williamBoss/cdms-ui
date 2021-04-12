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
                       @click="addHistory('jzEdit')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-row>
                  <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delFamilyHistory')"
                          v-for="(item, index) in familyHistory">{{ item.diseaseName }}
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
                  <div class="add-btn"
                       @click="addHistory('jwbEdit')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-row>
                  <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delOldHistory')"
                          v-for="(item, index) in oldHistory">{{ item.diseaseName }}
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
                  <div class="add-btn"
                       @click="addHistory('jwssEdit')">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
              </el-col>
              <el-col class="content-item" :span="18">
                <el-tag closable :disable-transitions="false" @close="handleClose(item, index, 'delSurgicalHistory')"
                        v-for="(item, index) in surgicalHistory">{{ item.surgeryName }}
                </el-tag>
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
                <el-button size="mini" @click="editItem('tnbEdit')" style="margin-right: 10px">取消</el-button>
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
                <el-form-item label="" label-width="0">
                  <el-input type="textarea" placeholder="请输入肝损害描述" :rows="5" v-model="form.liverInfo"></el-input>
                  <el-button class="card-btn" size="mini" type="primary" @click="saveHistory('saveLiverInfo')">保存
                  </el-button>
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
                <el-form-item label="" label-width="0">
                  <el-input type="textarea" placeholder="请输入肾损害描述" :rows="5" v-model="form.kidneyInfo"></el-input>
                  <el-button class="card-btn" size="mini" type="primary" @click="saveHistory('saveKidneyInfo')">保存
                  </el-button>
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
                  <div class="add-btn"
                       :style="[{'background':this.gmEdit?'#DCDFE6':''},{'color':this.gmEdit?'#999':''}]"
                       @click="editItem('gmEdit')">
                    <i class="el-icon-plus" v-if="!this.gmEdit"></i>
                    <i class="el-icon-close" v-else></i>
                  </div>
                </div>
                <div v-show="gmEdit" class="add-angle"></div>
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
                  <el-table-column fixed prop="allergen" align="center" label="过敏原">
                  </el-table-column>
                  <el-table-column prop="allergySymptoms" label="过敏症状" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="allergyDatetime" align="center" label="发生日期" width="150">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="editAllergy(scope.row)" type="text">编辑</el-button>
                      <el-popconfirm
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        title="确定删除吗？"
                        @confirm="delAllergy(scope.row)"
                        style="margin-left: 10px"
                      >
                        <el-button slot="reference" type="text">删除</el-button>
                      </el-popconfirm>
                    </template>
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
                <el-button class="card-btn" size="mini" @click="editItem('gmEdit')" style="margin-right: 10px">取消
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
                  <div class="add-btn"
                       :style="[{'background':this.ywfyEdit?'#DCDFE6':''},{'color':this.ywfyEdit?'#999':''}]"
                       @click="editItem('ywfyEdit')">
                    <i class="el-icon-plus" v-if="!this.ywfyEdit"></i>
                    <i class="el-icon-close" v-else></i>
                  </div>
                </div>
                <div v-show="ywfyEdit" class="add-angle"></div>
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
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                      <el-button @click="editMedSide(scope.row)" type="text">编辑</el-button>
                      <el-popconfirm
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        title="确定删除吗？"
                        @confirm="delItem(scope.row, scope.$index)"
                        style="margin-left: 10px"
                      >
                        <el-button slot="reference" type="text">删除</el-button>
                      </el-popconfirm>
                    </template>
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
                <el-button class="card-btn" size="mini" @click="editItem('ywfyEdit')" style="margin-right: 10px">取消
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button class="btn-size" type="primary" @click="goNext">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :width="'70%'">
      <el-row class="disease" v-show="jzEdit">
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
        <el-checkbox-group v-model="form.familyHistoryIds">
          <el-checkbox v-for="item in curDiseaseList" :title="item.diseaseName" :label="item.diseaseId"
                       :key="item.diseaseKey"
                       style="width: 210px;display: inline-block">
            {{ item.diseaseName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-row>
      <el-row class="disease" v-show="jwbEdit">
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
        <el-row :gutter="20" v-for="item in curDiseaseList"
                style="width: 300px;display: inline-block;margin-right: 10px;">
          <el-col :span="17">
            <el-checkbox :label="item.diseaseId" :key="item.diseaseKey" :title="item.diseaseName"
                         v-model="form.oldHistoryIds">
              {{ item.diseaseName }}
            </el-checkbox>
          </el-col>
          <el-col :span="7">
            <el-input class="check-input" size="mini" type="primary" v-model="item.year">
              <i slot="suffix" style="font-style:normal;line-height: 28px">年</i>
            </el-input>
          </el-col>
        </el-row>
      </el-row>
      <el-row v-show="jwssEdit">
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
        <el-checkbox-group v-model="form.surgicalIds">
          <el-checkbox v-for="item in curSurgicalList" :label="item.surgicalId" :key="item.surgicalId"
                       style="width: 210px;display: inline-block">
            {{ item.surgeryName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-size" @click="dialog.visible = false" style="float:none">取 消</el-button>
        <el-button class="btn-size" type="primary" @click="saveHistory(dialog.type)" style="float:none">保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDisease, getSurgical } from '@/api/param'
import { getMed } from '@/api/outpatient'
import {
  delDiabetesHistory,
  deleteAllergyHistory,
  delFamilyHistory,
  delMedSideList,
  delOldHistory,
  delSurgicalHistory,
  getAllergyHistory,
  getDiabetesHistory,
  getFamilyHistory,
  getKidneyInfo,
  getLiverInfo,
  getMedSideList,
  getOldHistory,
  getSurgicalHistory,
  saveAllergyHistory,
  saveDiabetesHistory,
  saveFamilyHistory,
  saveKidneyInfo,
  saveLiverInfo,
  saveMedSideList,
  saveOldHistory,
  saveSurgicalHistory,
  updateAllergyHistory
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
        compSymptom: '',
        allergyId: '',
        allergen: '',
        allergyDatetime: '',
        allergySymptoms: '',
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
      searchName: '',
      dialog: {
        visible: false,
        title: '',
        type: ''
      }
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
      /*getMedList().then((res) => {
        if (res.code === 200 && res.data) {
          this.medList = res.data.records
        }
      })*/
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
          this.gssEdit = !!this.liverInfo.liverDamageDesc
          this.form.liverInfo = res.data.liverDamageDesc
        }
      })
      getKidneyInfo(param).then((res) => {
        if (res.code === 200 && res.data) {
          this.kidneyInfo = res.data
          this.sssEdit = !!this.kidneyInfo.kidneyDamageDesc
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
      param.pageSize = 200
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
      this.form.medSide.medId = item.medId
      this.form.medSide.medName = item.value
    },
    handleClick(item) {
      item.saveVisible = true
      item.assessmentId = this.$route.params.assessmentId
      item.patientId = this.$route.params.id
      if (item.otherAdverseReactionsSymptoms !== '') {
        item.adverseReactionsSymptomsList.push(item.otherAdverseReactionsSymptoms);
      }
      item.adverseReactionsSymptoms = item.adverseReactionsSymptomsList.join(',')
      if (item.medId === '') {
        this.$message.warning('请选择药品')
        return false;
      }
      console.log(item);
      saveMedSideList(item).then((res) => {
        item.saveVisible = false
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.form.medSide = {
            medId: '',
            medName: '',
            occurrenceDatetime: '',
            adverseReactionsSymptomsList: [],
            otherAdverseReactionsSymptoms: '',
            saveVisible: false
          }
          this.ywfyEdit = false
          this.getHistory()
        } else {
          this.$message.error(res.errorMessage)
        }
      });
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
              this.dialog.visible = !this.dialog.visible
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
                this.dialog.visible = !this.dialog.visible
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
              this.dialog.visible = !this.dialog.visible
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
          if (this.form.allergen) {
            this.$message.warning('请输入过敏原')
            return false
          }
          param.allergen = this.form.allergen;
          param.allergyDatetime = this.form.allergyDatetime
          param.allergySymptoms = this.form.allergySymptoms
          if (this.form.allergyId === '') {
            saveAllergyHistory(param).then((res) => {
              if (res.code === 200) {
                this.gmEdit = false;
                this.$message.success('保存成功')
                this.form.allergyId = ''
                this.form.allergen = ''
                this.form.allergyDatetime = ''
                this.form.allergySymptoms = ''
                this.getHistory()
              } else {
                this.$message.error('保存失败')
              }
            });
          } else {
            updateAllergyHistory(param, this.form.allergyId).then(res => {
              if (res.code === 200) {
                this.gmEdit = false;
                this.$message.success('修改成功')
                this.form.allergyId = ''
                this.form.allergen = ''
                this.form.allergyDatetime = ''
                this.form.allergySymptoms = ''
                this.getHistory()
              } else {
                this.$message.error('修改失败')
              }
            })
          }
        }
      }
    },
    delItem(item, index) {
      delMedSideList({id: item.medicationSideEffectId}).then((res) => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.medSideList.splice(index, 1)
        } else {
          this.$message.error(res.errorMessage)
        }
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
                this.form.familyHistoryIds.splice(index, 1)
                this.familyHistory.splice(index, 1);
              }
            })
            break;
          }
          case 'delOldHistory': {
            delOldHistory(item.pastHistoryId).then((res) => {
              if (res.code === 200) {
                this.form.oldHistoryIds.splice(index, 1)
                this.oldHistory.splice(index, 1);
              }
            })
            break;
          }
          case 'delSurgicalHistory': {
            delSurgicalHistory(item.pastSurgicalHistoryId).then((res) => {
              if (res.code === 200) {
                this.form.surgicalIds.splice(index, 1)
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
    addHistory(type) {
      this.jzEdit = false
      this.jwbEdit = false
      this.jwssEdit = false
      this[ type ] = true
      this.dialog.visible = !this.dialog.visible
      this.curDiseaseList = this.diseaseList
      switch (type) {
        case 'jzEdit':
          this.dialog.title = '家族病史'
          this.dialog.type = 'saveFamilyHistory'
          break
        case 'jwbEdit':
          this.dialog.title = '既往病史'
          this.dialog.type = 'saveOldHistory'
          this.oldHistory.forEach((vv) => {
            this.curDiseaseList.forEach((cc) => {
              if (vv.diseaseId === cc.diseaseId) {
                cc.year = vv.durationIllness
              }
            })
          })
          break
        case 'jwssEdit':
          this.dialog.title = '既往手术史'
          this.dialog.type = 'saveSurgicalHistory'
          break
        default:
          break
      }
    },
    editItem(type) {
      this[ type ] = !this[ type ]
      this.curDiseaseList = this.diseaseList
      if (type === 'gmEdit') {
        this.form.allergyId = ''
        this.form.allergen = ''
        this.form.allergyDatetime = ''
        this.form.allergySymptoms = ''
      }
      if (type === 'ywfyEdit') {
        this.form.medSide = {
          medicationSideEffectId: '',
          medId: '',
          medName: '',
          occurrenceDatetime: '',
          adverseReactionsSymptomsList: [],
          otherAdverseReactionsSymptoms: ''
        }
      }
    },
    goNext() {
      this.$emit('update:activeName', 'curSym');
    },
    editAllergy: function(item) {
      this.gmEdit = !this.gmEdit
      this.form.allergyId = item.id
      this.form.allergen = item.allergen
      this.form.allergyDatetime = item.allergyDatetime
      this.form.allergySymptoms = item.allergySymptoms
    },
    delAllergy: function(item) {
      deleteAllergyHistory(item.id).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
        this.getHistory()
      })
    },
    editMedSide: function(item) {
      this.form.medSide = {
        medicationSideEffectId: '',
        medId: '',
        medName: '',
        occurrenceDatetime: '',
        adverseReactionsSymptomsList: [],
        otherAdverseReactionsSymptoms: ''
      }
      this.ywfyEdit = !this.ywfyEdit
      this.form.medSide.medicationSideEffectId = item.medicationSideEffectId
      this.form.medSide.medId = item.medId
      this.form.medSide.medName = item.medName
      this.form.medSide.occurrenceDatetime = item.occurrenceDatetime
      let otherAdverseReactionsSymptoms = []
      item.adverseReactionsSymptomsList.forEach(v => {
        if (this.sicknessList.indexOf(v) < 0) {
          otherAdverseReactionsSymptoms.push(v)
        } else {
          this.form.medSide.adverseReactionsSymptomsList.push(v)
        }
      })
      this.form.medSide.otherAdverseReactionsSymptoms = otherAdverseReactionsSymptoms.join(',')
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
