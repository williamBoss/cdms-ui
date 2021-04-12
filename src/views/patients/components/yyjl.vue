<template>
  <div class="life-style yyjl-wrap">
    <el-card class="info-wrap" style="background: #F2F4F6">
      <el-row>
        <el-col :span="4">
          <div class="name-wrap">
            <div class="label-item">姓名</div>
            <div class="name-item">{{ userInfo.patientName }}</div>
          </div>
        </el-col>
        <el-col :span="20" style="padding: 0 10px">
          <div class="other-wrap">
            <el-row>
              <el-col style="width: 110px;">
                ID : {{ userInfo.patId }}
              </el-col>
              <el-col style="width: 90px;">
                性别 : {{ userInfo.sexName }}
              </el-col>
              <el-col style="width: 90px;">
                年龄 : {{ userInfo.age }}
              </el-col>
              <el-col style="width: 170px;border: 0">
                手机 : {{ userInfo.phone }}
              </el-col>
            </el-row>
          </div>
          <div class="warning-info">
            <span class="waning-name">不良反应药物：</span>
            <el-tooltip v-for="item in medSideList" effect="dark" placement="top-start">
              <div slot="content">
                <p>发生日期：{{ item.occurrenceDatetime }}</p>
                <p>不良反应症状：{{ item.adverseReactionsSymptoms }}</p>
              </div>
              <el-tag size="small">{{ item.medName }}</el-tag>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-button class="add-btn" type="primary" @click="addMed">添加用药记录</el-button>
    <el-table
      :data="tableData"
      min-height="250"
      border
      :header-cell-style="{background:'#1e3f7c',color:'white'}"
      style="width: 100%">
      <el-table-column
        align="center"
        label="用药时间"
        width="200"
        fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.useStartTime }} 至 {{ scope.row.useEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="medName"
        label="药品名称"
        width="200"
        fixed
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="diseaseName"
        label="适应症"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="dosage"
        label="用法"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        align="center"
        prop="dosageMonthly"
        label="月用药量(盒)"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="新增/在用/停用"
        :filters="[{ text: '新增', value: '新增' }, { text: '在用', value: '在用' }, { text: '停用', value: '停用' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="delRecord(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form>
      <el-form-item style="margin-top: 20px;float: right;">
        <el-button class="btn-size" type="primary" style="margin-right: 10px;" @click="saveInfo">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="用药记录" :visible.sync="dialogVisible">
      <div style="width: 73%;margin:0 auto;">
        <el-form :model="form" label-position="right" label-width="145px">
          <el-form-item label="用药时间">
            <el-date-picker
              v-model="form.dateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="药品名称">
            <el-autocomplete
              v-model="form.medName"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="true"
              placeholder="输入药品名"
              @select="handleSelect"
              style="width: 100%">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="适应症">
            <el-autocomplete
              v-model="form.diseaseName"
              :fetch-suggestions="queryDisease"
              :trigger-on-focus="true"
              placeholder="输入适应症"
              @select="handleDisease"
              style="width: 100%">
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="用法">
            <el-input v-model="form.dosage"></el-input>
          </el-form-item>
          <el-form-item label="月用药量(盒)">
            <el-input v-model="form.dosageMonthly"></el-input>
          </el-form-item>
          <el-form-item label="备注(新增/在用/停用)">
            <el-radio-group v-model="form.remark">
              <el-radio v-for="item in options" :label="item" :value="item"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn-size" @click="dialogVisible = false">取 消</el-button>
        <el-button class="btn-size" type="primary" @click="saveRecord(form)">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMed } from '@/api/outpatient'
import { delRecord, getDiseaseList, getMedSideList, getPatientInfo, getRecord, saveRecord } from '@/api/patients'

export default {
  props: {
    activeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      userInfo: {},
      tableData: [],
      diseaseList: [],
      options: [ '新增', '停用', '在用' ],
      page: {
        pageSize: 20,
        pageNum: 1
      },
      searchName: '',
      searchDiseaseName: '',
      curMed: {},
      curDisease: {},
      medSideList: []
    }
  },
  created() {
    this.getPatientInfo()
    this.getRecord()
  },
  methods: {
    getRecord() {
      let param = {
        'assessmentId': this.$route.params.assessmentId,
        'patientId': this.$route.params.id,
        pageNum: this.page.pageNum,
        pageSize: this.page.pageSize
      }
      getRecord(param).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records
        } else {
          this.$message.error(res.errorMessage)
        }
      })
      param.pageNum = 1
      param.pageSize = 10
      param.assessmentId = ''
      getMedSideList(param).then((res) => {
        if (res.code === 200) {
          this.medSideList = res.data.records
        }
      })
    },
    getPatientInfo() {
      getPatientInfo(this.$route.params.id).then((res) => {
        if (res.code) {
          this.userInfo = res.data
          if (res.data.gender === 1) {
            res.data.sexName = '男'
          } else {
            res.data.sexName = res.data.gender === 2 ? '女' : '未知'
          }
        }
      })
    },
    querySearch(queryString, cb) {
      this.searchMed(cb)
    },
    queryDisease(queryString, cb) {
      this.searchDisease(cb)
    },
    async searchMed(cb) {
      let result = []
      const res = await getMed({
        medName: this.form.medName
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
    searchDisease(cb) {
      let param = {
        diseaseName: this.form.diseaseName
      }
      getDiseaseList(param).then((res) => {
        if (res.code === 200) {
          if (res.data && res.data.records) {
            let newList = []
            res.data.records.forEach((vv) => {
              newList.push({
                value: vv.diseaseName,
                diseaseId: vv.diseaseId
              })
            })
            cb(newList)
          }
        }
      })
    },
    handleSelect(item) {
      this.curMed = item
      this.form.medName = item.value
    },
    handleDisease(item) {
      this.curDisease = item
      this.form.diseaseName = item.value
    },
    saveRecord(item) {
      item.assessmentId = this.$route.params.assessmentId
      item.patientId = this.$route.params.id
      item.indication = this.curDisease.diseaseId
      item.medId = this.curMed.medId
      item.diseaseName = this.curDisease.value
      item.useStartTime = item.dateTime[ 0 ]
      item.useEndTime = item.dateTime[ 1 ]
      saveRecord(item).then((res) => {
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.getRecord()
          this.curDisease = {}
          this.curMed = {}
          this.form = {}
          this.dialogVisible = false
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    delRecord(item, index) {
      if (!item.id) {
        this.tableData.splice(index, 1)
      } else {
        this.$confirm('您确定要删除此条记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRecord(item).then((res) => {
            if (res.code === 200) {
              this.tableData.splice(index, 1)
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        })
      }
    },
    handleSelectionChange(val) {
      console.log(val)
    },
    addMed() {
      this.form = {}
      this.dialogVisible = true
    },
    saveInfo() {
      this.$emit('update:activeName', 'jyjc');
    },
    filterTag(value, row) {
      return row.remark === value;
    }
  }
}
</script>

<style scoped lang="scss">
.yyjl-wrap {
  .el-table__header-wrapper {
    display: none;
  }

  .el-button {
    float: none;
  }

  .el-tag {
    background: #1E3F7C;
    color: #FFFFFF;
    padding: 0 10px;
    border-color: #1E3F7C;
  }

  .add-btn {
    float: left;
    margin-bottom: 20px;
  }

  .info-wrap {
    height: 70px;
    min-height: 70px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 20px;
  }

  .warning-info {
    padding-left: 18px;
    font-weight: normal;
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
    height: 100%;
    line-height: 25px;
    padding-top: 8px;
    text-align: center;

    .el-col {
      color: #000;
      border-right: 1px solid #D8D8D8;
      font-weight: 400;
    }

    .time-item {
      text-align: right;
      border-right: 0;
      padding-right: 20px;
    }
  }
}
</style>
<style lang="scss">
.ywp-wrap {
  .el-table__header-wrapper {
    display: none;
  }

  .el-textarea__inner {
    height: 144px;
    padding-bottom: 35px;
  }
}
</style>
