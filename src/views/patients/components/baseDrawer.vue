<template>
  <div class="drawer-wrap">
    <div class="drawer-btn" @click="showDrawer">
      <i v-show="!drawer" class="el-icon-arrow-left"></i>
      <i v-show="drawer" class="el-icon-arrow-right"></i>
    </div>
    <el-tabs type="border-card" v-if="drawer" @tab-click="handleClick">
      <el-tab-pane label="患者信息">
        <div class="cart-title">电话</div>
        <el-input v-model="form.phone" placeholder="请输入内容"></el-input>
        <div class="cart-title">姓名</div>
        <el-input v-model="form.patientName" placeholder="请输入内容"></el-input>
        <div class="cart-title">出生日期(年/月/日)</div>
        <el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <div class="cart-title">性别</div>
        <el-radio-group v-model="form.gender">
          <el-radio-button label="2">女</el-radio-button>
          <el-radio-button label="1">男</el-radio-button>
          <el-radio-button label="0">未知</el-radio-button>
        </el-radio-group>
        <div class="cart-title">患者ID</div>
        <el-input v-model="form.patId" placeholder="请输入内容"></el-input>
        <div class="cart-title">身高</div>
        <el-input v-model="form.height" placeholder="请输入内容"></el-input>
        <div class="cart-title">体重</div>
        <el-input v-model="form.weight" placeholder="请输入内容"></el-input>
        <div class="cart-title">bmi</div>
        <el-input v-model="form.bmi" placeholder="请输入内容"></el-input>
        <div class="btn-wrap">
          <el-button type="primary">保存</el-button>
          <el-button type="infor">清空</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评估记录">
        <div class="record-wrap">
          <!-- <el-button v-if="activities.length < 1" type="primary" style="margin: 0 auto;" @click="goForm">患者评估</el-button> -->
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
  </div>
</template>

<script>
import { getPatientInfo, asseList, getAssessment } from '@/api/patients'

export default {
  data() {
    return {
      drawer: false,
      form: {},
      activities: [
        {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary'
          // icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46'
          // color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        } ]
    };
  },
  created() {
  },
  methods: {
    handleClick: function(e) {
      if (e.label === '评估记录') {
        this.getAsseList()
      }
    },
    getPatientInfo: function() {
      getPatientInfo(this.$route.params.id).then((res) => {
        if (res.code) {
          this.form = res.data
        }
      })
    },
    getAsseList: function() {
      asseList({patientId: this.$route.params.id}).then((res) => {
        if (res.code) {
          this.activities = res.data
        }
      })
    },
    goForm: function(item) {
      if (item.assessmentId) {
        this.$router.push({name: 'patientsForm', params: {id: this.$route.params.id, assessmentId: item.assessmentId}})
      } else {
        getAssessment({patientId: this.$route.params.id}).then((res) => {
          if (res.code === 200) {
            this.$router.push(
              {name: 'patientsForm', params: {id: this.$route.params.id, assessmentId: res.data.assessmentId}})
          }
        })
      }
      // this.$router.push({name: 'patientsForm', params: {id: this.$route.params.id}})
    },
    showDrawer: function() {
      this.drawer = !this.drawer
      if (this.drawer) {
        this.getPatientInfo()
      }
    }
  }
}
</script>
<style lang="scss">
.drawer-wrap {
  position: fixed;
  top: 20px;
  bottom: 20px;
  right: 0;
  z-index: 100000;
  border-radius: 8px;
  // height: calc(100% - 50px);
  overflow-y: auto;
  padding-left: 20px;

  .cart-title {
    font-size: 12px;
    height: 45px;
    line-height: 45px;
  }

  .drawer-btn {
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

  // .el-tabs{
  //   border-radius: 4px;
  // }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #1E3F7C;
    color: #fff;
    // border-top-left-radius: 8px;
  }

  .el-tabs__item {
    width: 140px;
    text-align: center;
  }

  .record-wrap {
    min-height: 600px;
    padding-top: 20px;

    .el-timeline {
      padding-left: 10px;
    }

    .el-timeline-item__timestamp {
      font-size: 16px;
      color: #1890FF;
      margin-bottom: 10px;
    }

    .time-btn {
      position: absolute;
      top: 0;
      right: 0;
    }

    .time-content {
      padding: 10px 0;
    }

    .time-item {
      font-size: 14px;
      line-height: 25px;
      word-break: break-all;
    }
  }

  .el-tabs__content {
    width: 280px;
  }

  .btn-wrap {
    margin-top: 10px;
  }
}
</style>
