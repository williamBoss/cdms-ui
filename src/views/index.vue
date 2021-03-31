<template>
  <div class="home">
    <HearderComp></HearderComp>
    <div class="main">
      <div class="content-view">
        <el-card shadow="always" class="card_one">
          <div @click="gopage('analysis')">
            <p class="title">数据分析</p>
          </div>
        </el-card>
        <el-card shadow="always" class="card_two">
          <div @click="gopage('patients')">
            <p class="title">患者管理</p>
            <div class="img-wrap">
              <div class="img-main patint"></div>
              <div class="right-wrap"></div>
            </div>
          </div>
        </el-card>
        <el-card shadow="always" class="card_three">
          <div @click="gopage('knowledge')">
            <p class="title">知识库</p>
          </div>
        </el-card>
        <el-card shadow="always" class="card_four">
          <div @click="gopage('outpatient')">
            <p class="title" @click="gopage('outpatient')">药学门诊</p>
            <div class="img-wrap">
              <div class="img-main outpatient"></div>
              <div class="right-wrap"></div>
            </div>
          </div>
        </el-card>
        <el-card shadow="always" class="card_five">
          <div @click="gopage('followup')">
            <p class="title">随访管理</p>
            <div class="img-wrap">
              <div class="img-main followup"></div>
              <div class="right-wrap"></div>
            </div>
          </div>
        </el-card>
        <div class="last_card">
          <el-card shadow="always" class="card_small_one">
            <div @click="gopage('diseases')">
              <p class="title">病种管理</p>
              <div class="img-wrap">
                <div class="img-main diseases"></div>
              </div>
            </div>
          </el-card>
          <el-card shadow="always" class="card_small_two">
            <div @click="gopage('system')">
              <p class="title">系统管理</p>
              <div class="img-wrap">
                <div class="img-main system"></div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HearderComp from '@/layout/components/Hearder.vue'
export default {
  name: "index",
  data() {
    return {
    };
  },
  components: {
    HearderComp
  },
  methods: {
    gopage(type) {
      this.$router.push(type)
    }
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/view/index.scss';
.img-wrap{
  margin-top: 30px;
  .img-main{
    height: 60px;
    width: 60px;
    display: inline-block;
    vertical-align: top;
    background: url(../assets/images/patient.png) no-repeat center;
    background-size: 45px;
    &.outpatient{
      background-image: url(../assets/images/med.png);
    }
    &.followup{
      background-image: url(../assets/images/medBox.png);
    }
    &.diseases{
      background-image: url(../assets/images/disease.png);
    }
    &.system{
      background-image: url(../assets/images/setting.png);
    }
  }
  .right-wrap{
    width: 40px;
    height: 8px;
    margin-top: 45px;
    background: url(../assets/images/right.png) no-repeat center;
    display: inline-block;
    vertical-align: bottom;
    float: right;
  }
}
</style>
