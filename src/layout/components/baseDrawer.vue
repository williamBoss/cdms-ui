<template>
  <div class="drawer-wrap">
    <div class="drawer-btn" @click="showDrawer">
      <i v-show="!drawer" class="el-icon-arrow-left"></i>
      <i v-show="drawer" class="el-icon-arrow-right"></i>
    </div>
    <el-tabs type="border-card" v-if="drawer">
      <el-tab-pane label="患者信息">
        <div class="cart-title">电话</div>
        <el-input v-model="patientInfoVO.phone" @input="searchUser()" placeholder="请输入内容"></el-input>
        <div class="cart-title">姓名</div>
        <el-input v-model="patientInfoVO.patientName" placeholder="请输入内容"></el-input>
        <div class="cart-title">出生日期(年/月/日)</div>
        <el-date-picker
          v-model="patientInfoVO.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <div class="cart-title">性别</div>
        <el-radio-group v-model="patientInfoVO.gender">
          <el-radio-button label="男"></el-radio-button>
          <el-radio-button label="女"></el-radio-button>
        </el-radio-group>
        <div class="cart-title">患者ID</div>
        <el-input v-model="patientInfoVO.patientId" placeholder="请输入内容"></el-input>
        <div class="cart-title">身高</div>
        <el-input v-model="patientInfoVO.height" placeholder="请输入内容"></el-input>
        <div class="cart-title">体重</div>
        <el-input v-model="patientInfoVO.weight" placeholder="请输入内容"></el-input>
        <div class="cart-title">bim</div>
        <el-input v-model="patientInfoVO.bmi" placeholder="请输入内容"></el-input>
        <div class="btn-wrap">
          <el-button type="infor" @click="clearAll">清空</el-button>
          <el-button type="primary" @click="savePatient()">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getPatientPhone,
  savePatient
} from '@/api/outpatient'

export default {
  data() {
    return {
      drawer: false,
      patientInfoVO: {
        phone: '',
        patientName: '',
        birthday: '',
        patientId: ''
      }
    };
  },
  created () {
    console.log(this.drawer)
  },
  methods: {
    showDrawer: function () {
      this.drawer = !this.drawer
    },
    async searchUser () {
      
      if (/^1[34578]\d{9}$/.test(this.patientInfoVO.phone)) {
        let res = await getPatientPhone(this.patientInfoVO.phone);
        console.log('用户信息：', res);
        let {data} = res;
        if (data) {
          this.patientInfoVO = data
        }
      } else {
        this.patientInfoVO = {
          phone: '',
          patientName: '',
          birthday: '',
          patientId: ''
        }
      }
      this.$emit('setPatientInfo', this.patientInfoVO)
    },
    async savePatient () {
      console.log('保存用户信息!');
      let res = await savePatient(this.patientInfoVO);
      console.log('保存结果', res);
      let {data} = res
      if (data) {
        this.patientInfoVO.patientId = data
      } else {
        this.patientInfoVO = {
          phone: '',
          patientName: '',
          birthday: '',
          patientId: ''
        }
      }
      this.$emit('setPatientInfo', this.patientInfoVO)
    },
    clearAll(){
      this.patientInfoVO = {
          phone: '',
          patientName: '',
          birthday: '',
          patientId: ''
      }
      this.$emit('setPatientInfo', this.patientInfoVO)
    }

  }
}
</script>
<style lang="scss">
.drawer-wrap{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  border-radius: 8px;
  height: calc(100% - 50px);
  overflow-y: auto;
  padding-left: 20px;
  box-shadow: 4px 0px 4px #ccc;
  .cart-title{
    font-size: 12px;
    height: 45px;
    line-height: 45px;
  }
  .drawer-btn{
    height: 40px;
    width: 20px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    background: #666666;
    position: absolute;
    top: calc(50% - 20px);
    left: 0;
    cursor: pointer;
  }
  .el-tabs{
    border-radius: 4px;
  }
}
</style>
