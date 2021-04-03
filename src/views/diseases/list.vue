<template>
  <div class="diseases-wrap">
    <div class="flex-wrap">
      <div class="search-wrap">
        <el-autocomplete
          v-model="searchName"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          placeholder="输入病种名称"
          @select="handleSelect"
        >
          <el-button slot="append" @click="searchMed()">搜索</el-button>
        </el-autocomplete>
      </div>
    </div>
    <el-button class="new-add" type="primary" @click="newAdd">新建</el-button>
    <div class="main-wrap">
      <el-table
          :data="tableData"
          border
          :header-cell-style="{background:'#1e3f7c',color:'white', 'border-raduis': '4px'}"
          style="width: 100%">
          <el-table-column
           label="疾病名称"
           align="center"
            prop="diseaseName">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.diseaseName}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.diseaseName"></el-input>
            </template>
          </el-table-column>
          <el-table-column
           label="编码"
            align="center"
            prop="diseaseKey">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.diseaseKey}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.diseaseKey"></el-input>
            </template>
          </el-table-column>
          <el-table-column
           label="操作"
            align="center"
           width="200px"
            prop="name">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.edit" @click="scope.row.edit = true">编辑</el-button>
              <el-button type="text" v-if="scope.row.edit" @click="saveInfo(scope.row)">保存</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="delDisease(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="Page" :total="total" background layout="prev, pager, next, sizes, total" :page-size="PageSize" :page-sizes="[10, 20, 30]" @size-change="changePageSize" @current-change="changeCurPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getDiseaseList,
  AddDisease,
  delDisease
} from '@/api/param'
export default {
  name: 'diseases', // 药学门诊
  data () {
    return {
      searchName:'',
      tableData: [],
      form: {},
      Page: 1,
      PageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.getProb()
  },
  methods: {
    querySearch(queryString, cb) {
      this.searchMed(cb)
    },
    searchMed (cb) {
      this.getProb(cb)
    },
    handleSelect () {
      this.getProb()
    },
    getProb (cb) {
      let param = {
        diseaseName: this.searchName,
        pageNum: this.Page,
        pageSize: this.PageSize
      }
      getDiseaseList(param).then((res) => {
        if (res.code === 200) {
          if (cb) {
            let newList = []
            res.data.records.forEach((vv) => {
              newList.push({
                value: vv.diseaseName,
                id: vv.diseaseId
              })
            })
            cb(newList)
          } else {
            res.data.records.forEach((vv) => {
              vv.edit = false
            })
            this.tableData = res.data.records
            this.total = parseInt(res.data.total)
          }
        }
      })
    },
    newAdd () {
      this.tableData.unshift({
        diseaseName: '',
        diseaseKey: '',
        remark: '',
        edit: true
      })
    },
    saveInfo (item) {
      AddDisease(item).then((res) => {
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.getProb()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    delDisease (item) {
      this.$confirm('您确定要删除这个病种？', '提示', {
        type: 'warning'
      }).then((data) => {
        console.log(33)
        delDisease(item).then((res) => {
          console.log(res)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.Page = 1
            this.getProb()
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      }).catch(() => {})
    },
    changePageSize (val) {
      this.PageSize = val
      this.Page = 1
      this.getProb()
    },
    changeCurPage (val) {
      this.Page = val
      this.getProb()
    }
  }
}
</script>

<style lang="scss" >
.diseases-wrap{
  padding: 30px 40px 60px 70px;
  .search-wrap{
    // width: 750px;
    // display: inline-block;
    .el-autocomplete{
      width: 100%;
    }
  }
  .new-add{
    margin-top: 20px;
  }
  .el-pagination{
    padding: 20px;
    text-align: right;
  }
  .el-table__body-wrapper{
    min-height: 400px;
  }
  .main-wrap{
    // width: 750px;
    padding-top: 25px;
  }
  .select-wrap{
    padding: 15px 0;
    text-align: right;
    .el-select{
      margin-left: 8px;
    }
  }
  .btn-wrap{
    padding: 20px 0;
    text-align: right;
  }
}

</style>
