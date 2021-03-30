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
          </div>
        </el-card>
        <el-card shadow="always" class="card_five">
          <div @click="gopage('followup')">
            <p class="title">随访管理</p>
          </div>
        </el-card>
        <div class="last_card">
          <el-card shadow="always" class="card_small_one">
            <div @click="gopage('diseases')">
              <p class="title">病种管理</p>
            </div>
          </el-card>
          <el-card shadow="always" class="card_small_two">
            <div @click="gopage('system')">
              <p class="title">系统管理</p>
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
      console.log(type)
      this.$router.push(type)
    }
  },
};
</script>

<style scoped lang="scss">
@import '~@/scss/view/index.scss'
</style>
