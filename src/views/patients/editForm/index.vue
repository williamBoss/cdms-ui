<template>
  <div class="patients new-patients">
    <el-button class="btn-size" type="primary" size="medium" @click="back">返回</el-button>
    <el-form ref="form" label-position="top" :rules="rules" :model="form">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item prop="patientName" label="姓名">
            <el-input v-model="form.patientName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="phone" label="电话">
            <el-input v-model="form.phone" @change="searchUser()" placeholder="*建议填写患者手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="birthday" label="出生日期">
            <el-date-picker format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date" placeholder="选择日期"
                            v-model="form.birthday"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio-button label="1">男</el-radio-button>
              <el-radio-button label="2">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item prop="patId" label="患者ID">
            <el-input v-model="form.patId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="idCard" label="身份证号">
            <el-input v-model="form.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="downtownAddress" label="家庭住址">
            <el-cascader :options="options" v-model="form.downtownAddress" filterable style="width: 100%"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="homeAddress" label="详细地址">
            <el-input v-model="form.homeAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item prop="height" label="身高(cm)">
            <el-input type="number" v-model="form.height" @change="getBmi"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="weight" label="体重(kg)">
            <el-input type="number" v-model="form.weight" @change="getBmi"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="bmi" label="BMI(正常：18.5~25)">
            <label></label>
            <el-input type="number" disabled v-model="form.bmi"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="company" label="工作单位">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="eduLevel" label="受教育程度">
            <el-radio-group v-model="form.eduLevel">
              <el-row type="flex">
                <el-radio-button label="1" border>小学及以下</el-radio-button>
                <el-radio-button label="2" border>初高中</el-radio-button>
                <el-radio-button label="3" border>大专及本科</el-radio-button>
                <el-radio-button label="4" border>硕士及以上</el-radio-button>
              </el-row>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="emergencyInfusionNum" label="就诊后一年 急诊/输液次数">
            <el-input type="number" v-model="form.emergencyInfusionNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="hospitalizationNum" label="住院次数">
            <el-input type="number" v-model="form.hospitalizationNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="medType" label="医保类型">
            <el-radio-group v-model="form.medType">
              <el-row type="flex">
                <el-radio-button label="1" border>自费</el-radio-button>
                <el-radio-button label="2" border>医保</el-radio-button>
                <el-radio-button label="3" border>公费</el-radio-button>
                <el-radio-button label="4" border>新农合</el-radio-button>
                <el-radio-button label="5" border>其他</el-radio-button>
              </el-row>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item v-if="form.medType === '5'" label="其他医保类型">
            <el-input v-model="form.otherMedType"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="btn-wrap">
          <el-button class="btn-size" size="medium" @click="clearDate" style="float: right;margin: 0 5px;">清空
          </el-button>
          <el-button class="btn-size" type="primary" size="medium" @click="saveInfo" :loading="loading"
                     style="float: right;margin: 0 5px;">保存信息
          </el-button>
          <el-tooltip class="item" effect="dark" content="请先输入并保存用户信息" :disabled="this.form.patientId !== ''"
                      placement="top-start">
            <div style="width: 98px; float: right;margin: 0 10px;">
              <el-button class="btn-size" type="primary" :disabled="this.form.patientId === ''" @click="goNext">MTM评估
              </el-button>
            </div>
          </el-tooltip>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  savePatient,
  getAssessment
} from '@/api/patients'
import {
  getAddress
} from '@/api/param'
import {
  getPatientPhone
} from '@/api/outpatient'

export default {
  name: 'patientsEdit',
  data() {
    return {
      loading: false,
      form: {
        patientId: '',
        bmi: 0
      },
      options: [],
      rules: {
        patientName: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          } ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          } ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          } ],
        birthday: [
          {
            required: true,
            message: '请选择出生日期',
            trigger: 'blur'
          } ]
        // bmi: [{
        //   required: true,
        //   message: '请输入bmi',
        //   trigger: 'blur'
        // }],
        // company: [{
        //   required: true,
        //   message: '请输入工作单位',
        //   trigger: 'blur'
        // }],
        // downtownAddress: [{
        //   required: true,
        //   message: '请选择入家庭住址',
        //   trigger: 'blur'
        // }],
        // eduLevel: [{
        //   required: true,
        //   message: '请选择受教育程度',
        //   trigger: 'blur'
        // }],
        // emergencyInfusionNum: [{
        //   required: true,
        //   message: '请输入就诊后一年急诊/输液次数',
        //   trigger: 'blur'
        // }],
        // height: [
        //   {
        //     required: true,
        //     message: '请输入身高',
        //     trigger: 'blur'
        //   } ],
        // homeAddress: [{
        //   required: true,
        //   message: '请输入家庭详细地址',
        //   trigger: 'blur'
        // }],
        // hospitalizationNum: [{
        //   required: true,
        //   message: '请输入就诊后一年住院次数',
        //   trigger: 'blur'
        // }],
        // idCard: [
        //   {
        //     required: true,
        //     message: '请输入身份证号码',
        //     trigger: 'blur'
        //   } ],
        // medType: [{
        //   required: true,
        //   message: '请选择医保类型',
        //   trigger: 'blur'
        // }],
        // patId: [
        //   {
        //     required: true,
        //     message: '请输入患者ID',
        //     trigger: 'blur'
        //   } ],
        // weight: [
        //   {
        //     required: true,
        //     message: '请输入体重',
        //     trigger: 'blur'
        //   } ]
      }
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    getAddress() {
      getAddress().then((res) => {
        if (res.code === 200) {
          this.options = this.getTreeData(res.data)
        }
      })
    },
    getTreeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[ i ].children.length < 1) {
          data[ i ].children = undefined;
        } else {
          this.getTreeData(data[ i ].children);
        }
      }
      return data;
    },
    async searchUser() {
      let res = await getPatientPhone(this.form.phone);
      let {data} = res;
      if (data) {
        data.gender = data.gender.toString()
        data.medType = data.medType.toString()
        data.eduLevel = data.eduLevel.toString()
        if (data.downtownAddress.length > 0) {
          let newList = []
          data.downtownAddress.forEach((vv) => {
            newList.push(parseInt(vv))
          })
          data.downtownAddress = newList
        }
        this.form = data
      }
    },
    saveInfo() {
      this.loading = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          savePatient(this.form).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.form.patientId = res.data
            } else {
              this.$message({
                message: res.errorMessage,
                type: 'error'
              });
            }
          })
        }
      });
      this.loading = false
    },
    clearDate() {
      this.form = {patientId: '', bmi: 0}
      this.$refs.form.resetFields();
    },
    back() {
      this.$router.push({
        name: 'patients'
      })
    },
    getBmi() {
      if (this.form.weight && this.form.height) {
        this.form.bmi = Number(
          (Number(this.form.weight) / ((Number(this.form.height) / 100) * (Number(this.form.height) / 100))).toFixed(2))
      }
    },
    goNext() {
      if (!this.form.patientId) {
        this.$message.error('请先输入并保存用户信息')
        return false
      }
      getAssessment({patientId: this.form.patientId}).then((res) => {
        if (res.code === 200) {
          this.$router.push({
            name: 'patientsForm',
            params: {id: this.form.patientId, assessmentId: res.data.assessmentId},
            query: {type: 'newAssessment'}
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.new-patients {
  padding: 30px 100px 30px 70px;

  .el-form {
    margin-top: 10px;
  }
}
</style>
