<template>
  <div class="hierarchicCare">
    <el-form :model="queryParams" ref="queryForm" label-width="0">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item>
            <el-input
              v-model="queryParams.searchName"
              clearable
              placeholder="请输入分组名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button class="btn-size" type="primary">查询</el-button>
            <el-button class="btn-size">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row style="margin-bottom: 20px">
      <el-button class="btn-size" type="primary">新建</el-button>
      <el-button class="btn-size" type="primary">向上转诊</el-button>
      <el-button class="btn-size" type="primary">向下转诊</el-button>
    </el-row>

    <div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="hierarchicCare in hierarchicCareList">
          <el-card class="hierarchicCareCard" shadow="hover">
            <el-row class="title">
              {{ hierarchicCare.hierarchicName }}
            </el-row>
            <el-row>
              <span class="desc">
                {{ hierarchicCare.desc }}
              </span>
              <span class="num">
                {{ hierarchicCare.num }}
              </span>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>


    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />
  </div>
</template>

<script>
export default {
  name: 'hierarchicCare',
  data() {
    return {
      // 列表数据
      hierarchicCareList: [
        {
          hierarchicName: '高血压',
          desc: '高血压危象',
          num: 50
        },
        {
          hierarchicName: '脑梗死',
          desc: 'NIHSS评分＞5',
          num: 50
        },
        {
          hierarchicName: '冠心病',
          desc: '急性ST段',
          num: 2333
        },
        {
          hierarchicName: '1型糖尿病',
          desc: '随机血糖>16.7mmol/L',
          num: 332
        },
        {
          hierarchicName: '单纯2型糖尿病',
          desc: '随机血糖>16.7mmol/L',
          num: 2
        },
        {
          hierarchicName: '肝和肝内胆管恶性肿瘤',
          desc: '需肺移植',
          num: 50
        },
        {
          hierarchicName: '慢性支气管炎',
          desc: '需肺移植',
          num: 22
        },
        {
          hierarchicName: '慢性肾病，肾功能不全',
          desc: '需肺移植',
          num: 84
        },
        {
          hierarchicName: '类风湿性关节炎',
          desc: '需肺移植',
          num: 99
        },
        {
          hierarchicName: '系统性红斑狼疮',
          desc: '急性ST段',
          num: 79
        },
        {
          hierarchicName: '癫痫',
          desc: '随机血糖>16.7mmol/L',
          num: 99
        },
        {
          hierarchicName: '乳腺良性肿瘤',
          desc: '需肺移植',
          num: 99
        },
        {
          hierarchicName: '肠梗阻',
          desc: '胆结石胆感染',
          num: 30
        }
      ],
      // 总条数
      total: 13,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        searchName: ''
      }
    };
  }
}
</script>

<style scoped lang="scss">
.hierarchicCare {
  padding: 30px 60px 30px 70px;

  .hierarchicCareCard {
    min-height: 95px;
    margin-bottom: 20px;
    padding: 15px;

    .title {
      color: #07265D;
      font-size: 18px;
      margin-bottom: 20px;
    }

    .desc {
      color: #A0A0A0;
      font-size: 15px;
    }

    .num {
      color: #07265D;
      font-size: 20px;
      float: right;
    }

  }

}
</style>
