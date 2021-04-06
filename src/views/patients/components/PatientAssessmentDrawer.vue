<template>
  <div>
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
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
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
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button type="infor" @click="clearAll" style="width: 100%">清空</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="savePatient()" style="width: 100%">保存</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="评估记录">
          <div class="record-wrap">
            <el-timeline>
              <el-timeline-item v-for="item in activities" :timestamp="item.fillDate" placement="top">
                <el-button class="time-btn" type="primary" size="mini" @click="goForm(item)">患者评估</el-button>
                <div class="time-content">
                  <div class="time-item">药师：{{ item.recorder }}</div>
                  <div class="time-item">主述: {{ item.mainConsult }}</div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
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
import { getPatientInfo, getPatientsByPhone } from '@/api/patients';

export default {
  components: {Drawer},
  data() {
    return {
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
      this.drawer = true
      this.getPatientInfo()
    }
  },
  methods: {
    handleClick: function(e) {
      if (e.label === '评估记录') {
        this.getAsseList()
      }
    },
    fillPatientInfo: function(data) {
      data.gender = data.gender.toString()
      this.patientForm = data
      this.patientInfoVO = data
    },
    async savePatient() {
      console.log('保存用户信息!');
      this.$refs.patientForm.validate((valid) => {
        if (valid) {
          let res = savePatient(this.patientForm);
          let {data} = res
          if (data) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.fillPatientInfo(data);
          } else {
            this.patientForm = {bmi: 0}
            this.patientInfoVO = {
              patientId: ''
            }
          }
          this.$emit('setPatientInfo', this.patientInfoVO)
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
      this.patientForm = {bmi: 0}
      this.patientInfoVO = {
        patientId: ''
      }
      this.$emit('setPatientInfo', this.patientInfoVO)
    }
  }
}
</script>
<style lang="scss">
.drawer-body {
  padding: 0;

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #1E3F7C;
    color: #fff;
  }
}
</style>
