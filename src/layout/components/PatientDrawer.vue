<template>
  <div>
    <Drawer :visible="this.$attrs.visible"
            :modal="this.$attrs.modal"
            :title="'患者信息'"
            :header-style="`background: #1E3F7C;text-align: center;`"
            :title-style="`color:#ffffff;`"
            v-on="this.$listeners">
      <el-autocomplete v-model="phone"
                       :fetch-suggestions="searchPatientList"
                       :trigger-on-focus="false"
                       :clearable="true"
                       @select="handleSelect"
                       placeholder="请输入手机号搜索患者信息"
                       style="margin-bottom: 20px;">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-autocomplete>
      <el-form :model="patientForm" label-position="top" :rules="rules" ref="patientForm">
        <el-form-item label="姓名" prop="patientName">
          <el-input v-model="patientForm.patientName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="patientForm.phone" @change="searchUser()" placeholder="请输入电话"></el-input>
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
    </Drawer>
  </div>
</template>

<script>
import { getPatientPhone, savePatient } from '@/api/outpatient'
import Drawer from '@/layout/components/Drawer';
import { getPatientInfo, getPatientsByPhone } from '@/api/patients';

export default {
  components: {Drawer},
  data() {
    return {
      patientForm: {bmi: 0},
      phone: '',
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
      patientInfoVO: {
        patientId: ''
      }
    };
  },
  created() {

  },
  methods: {
    async searchPatientList(phone, patients) {
      let res_arr = [];
      await getPatientsByPhone(phone).then(res => {
        let {data} = res
        if (data) {
          data.forEach(v => {
            res_arr.push({
              value: `${ v.patientName }-${ v.phone }`,
              patientId: v.patientId
            })
          });
          if (data.length === 0) {
            this.$message({
              message: '该手机号未搜索到患者信息，请直接输入建立患者档案',
              type: 'warning'
            });
          }
        }
      });
      patients(res_arr);
    },
    fillPatientInfo: function(data) {
      data.gender = data.gender.toString()
      this.patientForm = data
      this.patientInfoVO = data
    },
    handleSelect(item) {
      getPatientInfo(item.patientId).then(res => {
        let {data} = res
        if (data) {
          this.fillPatientInfo(data);
        }
        this.$emit('setPatientInfo', this.patientInfoVO)
      });
    },
    async searchUser() {
      if (/^1[34578]\d{9}$/.test(this.patientForm.phone)) {
        let res = await getPatientPhone(this.patientForm.phone);
        console.log('用户信息：', res);
        let {data} = res;
        if (data) {
          this.fillPatientInfo(data);
        }
      }
      this.$emit('setPatientInfo', this.patientInfoVO)
    },
    isGetPatientInfo: function() {
      this.$refs.patientForm.validate();
    },
    async savePatient() {
      console.log('保存用户信息!');
      await this.$refs.patientForm.validate((valid) => {
        if (valid) {
          savePatient(this.patientForm).then(res => {
            let {data} = res
            if (data) {
              this.$message.success('保存成功');
              getPatientInfo(data).then(res => {
                console.log('用户信息：', res);
                let {data} = res;
                if (data) {
                  this.fillPatientInfo(data);
                }
              })
            } else {
              this.patientForm = {bmi: 0}
              this.patientInfoVO = {
                patientId: ''
              }
            }
          })
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
<style lang="scss" scoped>
::v-deep .drawer-body {
  padding: 24px;

  .el-autocomplete {
    .el-input__inner {
      width: 243px;
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-bottom-width: 1px;
      border-radius: 0;
    }
  }
}

.cart-title {
  font-size: 12px;
  height: 45px;
  line-height: 45px;
}
</style>
