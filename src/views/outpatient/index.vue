<template>
  <div>
    <PatientDrawer ref="patientDrawer"
                   :visible="visible"
                   :modal="false"
                   @closedDrawer="closedDrawer"
                   @setPatientInfo="setPatientInfo"></PatientDrawer>
    <div class="outpatient main">
      <div class="flex-wrap">
        <div class="search-wrap">
          <el-autocomplete
            v-model="searchName"
            :fetch-suggestions="querySearch"
            :trigger-on-focus="true"
            placeholder="输入咨询的药品名"
            @select="handleSelect"
          >
          </el-autocomplete>
        </div>
        <el-button class="btn-item btn-size" type="primary" @click="goList">咨询记录</el-button>
      </div>
      <div class="main-wrap">
        <el-tag
          class="tag-wrap"
          v-for="(tag, index) in tags"
          :key="tag.value"
          closable
          @close="handleClose(index)"
          :type="tag.type">
          {{ tag.value }}
        </el-tag>
        <div class="text-wrap">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6}"
            placeholder="请描述患者的问题"
            v-model="consultContext">
          </el-input>
        </div>
        <div class="select-wrap">
          <el-cascader
            v-model="problems"
            :options="options"
            :props="props"
            placeholder="请选择问题类型"
            collapse-tags
            clearable></el-cascader>
        </div>
        <div class="text-wrap">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6}"
            placeholder="请输入回复"
            v-model="consultReply">
          </el-input>
        </div>
        <div class="btn-wrap">
          <el-button class="btn-size" type="default" @click="clearDate">清空</el-button>
          <el-button class="btn-size" type="primary" size="medium" @click="saveData()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMed, getProb, saveOut } from '@/api/outpatient'
import PatientDrawer from '@/layout/components/PatientDrawer';

export default {
  name: 'outpatient', // 药学门诊
  components: {PatientDrawer},
  data() {
    return {
      visible: true,
      patientId: '',
      searchName: '',
      tags: [],
      restaurants: [],
      options: [],
      problems: [],
      consultContext: '',
      consultReply: '',
      props: {multiple: true, value: 'id', label: 'medicationProblems', children: 'childList'}
    }
  },
  mounted() {
    this.getProb()
  },
  methods: {
    closedDrawer(val) {
      this.visible = val
    },
    goList() {
      this.$router.push({name: 'outpatientList'})
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
            value: `${ el.medName } - ${ el.medSpec } -${ el.vendor }`,
            medId: el.medId
          })
        });
      }
      this.restaurants = result
      if (cb) {
        cb(this.restaurants)
      }
    },

    async getProb() {
      const res = await getProb()
      let {data} = res
      if (data) {
        this.options = data
      }
    },

    handleSelect(item) {
      this.searchName = ''
      this.tags.push(item)
    },

    handleClose(index) {
      this.tags.splice(index, 1)
    },

    setPatientInfo(data) {
      this.patientId = data.patientId
    },

    async saveData() {
      if (!this.patientId) {
        this.visible = true
        this.$refs.patientDrawer.isGetPatientInfo()
        this.$message({showClose: true, message: '请先输入患者信息，创建或获取患者信息', type: 'error'});
        return false;
      }
      if (this.tags.length < 1) {
        return false;
      }
      let medList = []
      this.tags.forEach(tag => {
        medList.push({
          medId: tag.medId,
          medName: tag.value
        })
      })

      const res = await saveOut({
        clinicConsultMedicines: medList,
        consultContext: this.consultContext,
        consultReply: this.consultReply,
        patientId: this.patientId,
        clinicConsultQuestionTypeIds: this.problems
      })

      if (res.code === 200 && res.success === true) {
        this.$message({showClose: true, message: '保存成功', type: 'success'});
        this.tags = []
        this.consultContext = ''
        this.problems = []
        this.consultReply = ''
      }

    },
    clearDate() {
      this.searchName = ''
      this.tags = []
      this.problems = []
      this.consultContext = ''
      this.consultReply = ''
    }
  }
}
</script>

<style lang="scss">
.outpatient {
  padding: 30px 40px 60px 70px;

  .search-wrap {
    flex: 1;
    -webkit-flex: 1;
    padding-right: 10px;

    .el-autocomplete {
      width: 100%;
    }
  }

  .main-wrap {
    // width: 750px;
    padding-top: 25px;

    .tag-wrap {
      margin-bottom: 13px;
      margin: 0 11px 33px;
      border-radius: 25px;
    }
  }

  .flex-wrap {
    display: flex;
    display: -webkit-flex;
  }

  .select-wrap {
    padding: 15px 0;
    text-align: right;

    .el-select {
      margin-left: 8px;
    }
  }

  .btn-wrap {
    padding: 20px 0;
    text-align: right;
  }

  .btn-item {
    display: inline-block;
  }
}
</style>
