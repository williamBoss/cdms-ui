<template>
  <div class="patients">
    <el-button type="primary" size="small" @click="back">返回</el-button>
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="phone">
        <label>电话</label>
        <el-input v-model="form.phone" placeholder="*建议填写患者手机号"></el-input>
      </el-form-item>
      <el-form-item prop="patientName">
        <label>姓名</label>
        <el-input v-model="form.patientName"></el-input>
      </el-form-item>
      <el-form-item prop="birthday">
        <label>出生日期</label>
        <el-date-picker format="yyyy/MM/dd" value-format="yyyy/MM/dd" type="date" placeholder="选择日期" v-model="form.birthday"
          style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item prop="gender">
        <label>性别</label>
        <el-radio-group v-model="form.gender">
          <el-row type="flex">
            <el-radio label="1" border>男</el-radio>
            <el-radio label="2" border>女</el-radio>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="patId">
        <label>患者ID</label>
        <el-input type="number" v-model="form.patId"></el-input>
      </el-form-item>
      <el-form-item prop="height">
        <label>身高(cm)</label>
        <el-input type="number" v-model="form.height"></el-input>
      </el-form-item>
      <el-form-item prop="weight">
        <label>体重(kg)</label>
        <el-input type="number" v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item prop="bmi">
        <label>bim</label>
        <el-input type="number" v-model="form.bmi"></el-input>
      </el-form-item>
      <el-form-item prop="idCard">
        <label>身份证号</label>
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item prop="medType">
        <label>医保类型</label>
        <el-radio-group v-model="form.medType">
          <el-row type="flex">
            <el-radio label="1" border>自费</el-radio>
            <el-radio label="2" border>医保</el-radio>
            <el-radio label="3" border>公费</el-radio>
            <el-radio label="4" border>新农合</el-radio>
            <el-radio label="5" border>其他</el-radio>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.medType === '5'">
        <label>其他医保类型</label>
        <el-input v-model="form.otherMedType"></el-input>
      </el-form-item>
      <el-form-item prop="eduLevel">
        <label>受教育程度</label>
        <el-radio-group v-model="form.eduLevel">
          <el-row type="flex">
            <el-radio label="1" border>小学及以下</el-radio>
            <el-radio label="2" border>初高中</el-radio>
            <el-radio label="3" border>大专及本科</el-radio>
            <el-radio label="4" border>硕士及以上</el-radio>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="downtownAddress">
        <label>家庭住址</label>
        <!-- <el-select v-model="form.downtownAddress" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select> -->
        <el-cascader :options="options" v-model="form.downtownAddress" filterable></el-cascader>
      </el-form-item>
      <el-form-item prop="homeAddress">
        <label>详细地址</label>
        <el-input v-model="form.homeAddress"></el-input>
      </el-form-item>
      <el-form-item prop="company">
        <label>工作单位</label>
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item prop="emergencyInfusionNum">
        <label>就诊后一年 急诊/输液次数</label>
        <el-input type="number" v-model="form.emergencyInfusionNum"></el-input>
      </el-form-item>
      <el-form-item prop="hospitalizationNum">
        <label>住院次数</label>
        <el-input type="number" v-model="form.hospitalizationNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goNext">开始评估</el-button>
        <el-button type="primary" @click="saveInfo">保存信息</el-button>
        <el-button @click="clearDate">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    savePatient
  } from '@/api/patients'
  import {
    getAddress
  } from '@/api/param'
  export default {
    name: 'patientsEdit', // 患者管理详情
    data() {
      return {
        form: {},
        options: [],
        rules: {
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }],
          birthday: [{
            required: true,
            message: '请选择出生日期',
            trigger: 'blur'
          }],
          bmi: [{
            required: true,
            message: '请输入bmi',
            trigger: 'blur'
          }],
          company: [{
            required: true,
            message: '请输入工作单位',
            trigger: 'blur'
          }],
          downtownAddress: [{
            required: true,
            message: '请选择入家庭住址',
            trigger: 'blur'
          }],
          eduLevel: [{
            required: true,
            message: '请选择受教育程度',
            trigger: 'blur'
          }],
          emergencyInfusionNum: [{
            required: true,
            message: '请输入就诊后一年急诊/输液次数',
            trigger: 'blur'
          }],
          gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }],
          height: [{
            required: true,
            message: '请输入身高',
            trigger: 'blur'
          }],
          homeAddress: [{
            required: true,
            message: '请输入家庭详细地址',
            trigger: 'blur'
          }],
          hospitalizationNum: [{
            required: true,
            message: '请输入就诊后一年住院次数',
            trigger: 'blur'
          }],
          idCard: [{
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          }],
          medType: [{
            required: true,
            message: '请选择医保类型',
            trigger: 'blur'
          }],
          patId: [{
            required: true,
            message: '请输入患者ID',
            trigger: 'blur'
          }],
          patientName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          weight: [{
            required: true,
            message: '请输入体重',
            trigger: 'blur'
          }]
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
        // 循环遍历json数据
        for (var i = 0; i < data.length; i++) {
          if (data[i].children.length < 1) {
            data[i].children = undefined;
          } else {
            this.getTreeData(data[i].children);
          }
        }
        return data;
      },
      saveInfo() {
        this.form.downtownAddress = JSON.stringify(this.form.downtownAddress)
        this.$refs.form.validate((valid) => {
          if (valid) {
            savePatient(this.form).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.$router.push({name: 'patients'})
                }, 1000)
              }
            })
          } else {
            this.$message({
              message: res.errorMessage,
              type: 'error'
            });
          }
        });
      },
      clearDate() {
        this.form = {}
        this.$refs.form.resetFields();
      },
      back() {
        this.$router.push({
          name: 'patients'
        })
      },
      goNext() {

      },
      handleClick() {

      }
    }
  }
</script>

<style lang="scss">
  .patients {
    padding: 28px 20px 0 40px;

    .el-form {
      margin-top: 10px;
    }

    label {
      height: 40px;
      line-height: 40px;
      display: block;
      font-weight: normal;
      color: #1e3f7c;
    }

    .el-input--medium .el-input__inner {
      background: #f0f0f0;
      border-radius: 0;
      border: 0;
    }

    .el-radio--medium.is-bordered {
      line-height: inherit;
      background: #f0f0f0;
      border: 0;
    }

    .el-radio.is-bordered.is-checked {
      background: #1890FF;
    }

    .el-radio__input.is-checked+.el-radio__label {
      color: #fff;
    }

    .el-radio__input {
      display: none;
    }
  }
</style>
