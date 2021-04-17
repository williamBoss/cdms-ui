<template>
  <div class="knowledge">
    <el-row v-if="showImg" style="text-align: center;vertical-align: middle;margin-top: 80px;">
      <a @click="add">
        <img src="../../assets/images/temporary/knowledge.png" alt="" />
      </a>
    </el-row>
    <el-row v-else style="margin-left: 75px;margin-bottom: 30px">
      <el-row style="margin-top: 30px;">
        <el-button class="btn-size" @click="add">返回</el-button>
      </el-row>
      <el-row style="vertical-align: middle;">
        <img src="../../assets/images/temporary/knowledge1.png" alt="" />
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'knowledge',
  data() {
    return {
      showImg: true
    }
  },
  methods: {
    add: function() {
      this.showImg = !this.showImg
    }
  }
}
</script>

<style>

</style>
