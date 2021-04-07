<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="">
    <Drawer :visible="this.$attrs.visible"
            :modal="this.$attrs.modal"
            :with-header="false"
            v-on="this.$listeners">
      <el-tabs stretch type="border-card" @tab-click="handleClick">
        <el-tab-pane label="患者信息">
          <el-form :model="patientForm" label-position="top" :rules="rules" ref="patientForm">
            <el-form-item label="姓名" prop="patientName">
              <el-input v-model="patientForm.patientName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="patientForm.phone" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="出生日期(年/月/日)" prop="birthday">
              <el-date-picker
                format="yyyy/MM/dd" value-format="yyyy/MM/dd"
                v-model="patientForm.birthday"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="patientForm.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="患者ID" prop="patId">
              <el-input v-model="patientForm.patId" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="身高(cm)" prop="height">
              <el-input v-model="patientForm.height" @change="getBmi" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="体重(kg)" prop="weight">
              <el-input v-model="patientForm.weight" @change="getBmi" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="BMI(正常：18.5~25)" prop="bmi">
              <el-input disabled v-model="patientForm.bmi" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item prop="company" label="工作单位">
              <el-input v-model="patientForm.company"></el-input>
            </el-form-item>
            <el-form-item prop="eduLevel" label="受教育程度">
              <el-radio-group v-model="patientForm.eduLevel">
                <el-row :gutter="20" style="margin-bottom: 10px">
                  <el-col :span="12">
                    <el-radio :label="1">小学及以下</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="2">初高中</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-radio :label="3">大专及本科</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="4">硕士及以上</el-radio>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="medType" label="医保类型">
              <el-radio-group v-model="patientForm.medType">
                <el-row :gutter="20" style="margin-bottom: 10px">
                  <el-col :span="8">
                    <el-radio :label="1">自费</el-radio>
                  </el-col>
                  <el-col :span="8">
                    <el-radio :label="2">医保</el-radio>
                  </el-col>
                  <el-col :span="8">
                    <el-radio :label="3">公费</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-radio :label="4">新农合</el-radio>
                  </el-col>
                  <el-col :span="8">
                    <el-radio :label="5">其他</el-radio>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="patientForm.medType === 5" label="其他医保类型">
              <el-input v-model="patientForm.otherMedType"></el-input>
            </el-form-item>
            <el-form-item prop="emergencyInfusionNum" label="就诊后一年 急诊/输液次数">
              <el-input type="number" v-model="patientForm.emergencyInfusionNum"></el-input>
            </el-form-item>
            <el-form-item prop="hospitalizationNum" label="住院次数">
              <el-input type="number" v-model="patientForm.hospitalizationNum"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button type="infor" @click="clearAll" style="width: 100%">清空</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="savePatient()" style="width: 100%">保存修改</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="评估记录">
          <el-timeline style="padding: 0">
            <el-timeline-item v-for="item in activities" :timestamp="item.fillDate" placement="top">
              <el-row>
                <el-col :span="12">
                  <p>
                    药师：{{ item.recorder }}
                  </p>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" size="mini" @click="goForm(item)"
                             style="float: right;margin-top: 10px;">
                    患者评估
                  </el-button>
                </el-col>
              </el-row>
              <el-row>
                <p>主述: {{ item.mainConsult }}</p>
              </el-row>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </Drawer>
  </div>
</template>

<script>
import {
  getPatientPhone,
  savePatient
} from '@/api/outpatient'
import Drawer from '@/layout/components/Drawer';
import { asseList, getPatientInfo, getPatientsByPhone } from '@/api/patients';

export default {
  components: {Drawer},
  data() {
    return {
      patientId: this.$route.params.id,
      patientForm: {},
      rules: {
        patientName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          } ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          } ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          } ],
        birthday: [
          {
            required: true,
            message: '请选择出生日期',
            trigger: 'blur'
          } ]
      },
      activities: [
        {
          fillDate: '无',
          recorder: '无',
          mainConsult: '无'
        } ]
    };
  },
  created() {
    if (this.$route.query) {
      this.getPatientInfo()
    }
  },
  methods: {
    handleClick: function(e) {
      if (e.label === '评估记录') {
        this.getAsseList()
      }
    },
    getPatientInfo: function() {
      getPatientInfo(this.patientId).then((res) => {
        if (res.code) {
          this.patientForm = res.data
        }
      })
    },
    getAsseList: function() {
      asseList({patientId: this.patientId}).then((res) => {
        if (res.code) {
          this.activities = res.data
        }
      })
    },
    goForm: function(item) {
      if (item.assessmentId) {
        this.$emit('getInfo', {assessmentId: item.assessmentId})
      }
    },
    async savePatient() {
      console.log('修改用户信息!');
      this.$refs.patientForm.validate((valid) => {
        if (valid) {
          this.patientForm.patientId = this.patientId
          savePatient(this.patientForm).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getBmi() {
      if (this.patientForm.weight && this.patientForm.height) {
        this.patientForm.bmi = Number((Number(this.patientForm.weight) /
          ((Number(this.patientForm.height) / 100) * (Number(this.patientForm.height) / 100))).toFixed(2))
      }
    },
    clearAll() {
      this.patientForm = {}
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .drawer-body {
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #1E3F7C;
    color: #fff;
  }
}
</style>
