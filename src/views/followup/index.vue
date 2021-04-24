<template>
  <div class="followup">
    <el-form :model="queryParams" ref="queryForm" label-width="0">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item>
            <el-input
              v-model="queryParams.searchName"
              clearable
              placeholder="请输入搜索关键字"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-date-picker
              v-model="queryParams.followupDateTime"
              value-format="yyyy/MM/dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
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
      <el-button class="btn-size" type="primary">新建随访</el-button>
      <el-button class="btn-size" type="primary">新建提醒</el-button>
      <el-button type="text" style="float: right">随访统计</el-button>
    </el-row>

    <el-table :data="followupList"
              border
              stripe
              :header-cell-style="{background:'#1e3f7c',color:'white'}">
      <el-table-column label="随访时间" align="center" prop="date" :show-overflow-tooltip="true" />
      <el-table-column label="随访类型" align="center" prop="type" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="随访内容" align="center" prop="content" />
      <el-table-column label="患者姓名" align="center" prop="patientName" :show-overflow-tooltip="true" />
      <el-table-column label="诊断" align="center" prop="diagnosis" width="180"></el-table-column>
      <el-table-column label="状态" align="center" prop="status" :show-overflow-tooltip="true" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text">
            修改
          </el-button>
          <el-button type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
  name: 'followup',
  data() {
    return {
      // 表格数据
      followupList: [
        {
          date: '2021/04/01',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '良好'
        },
        {
          date: '2021/04/02',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '轻微'
        },
        {
          date: '2021/04/03',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '好转'
        },
        {
          date: '2021/04/04',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '严重'
        },
        {
          date: '2021/04/05',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '良好'
        },
        {
          date: '2021/04/06',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '良好'
        },
        {
          date: '2021/04/10',
          type: '患者轻微擦伤',
          content: '询问患者轻微擦伤情况',
          patientName: '天天',
          diagnosis: '轻伤',
          status: '良好'
        }
      ],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        searchName: '',
        followupDateTime: []
      }
    };
  }
}
</script>

<style scoped lang="scss">
.followup {
  padding: 30px 60px 30px 70px;
}
</style>
