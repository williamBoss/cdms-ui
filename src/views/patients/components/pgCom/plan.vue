<template>
  <div class="plan">
    <el-row style="margin-bottom: 20px;">
      <el-row style="margin-bottom: 10px;">
        <el-divider direction="vertical"></el-divider>
        <span class="title">该患者的综合控制目标是什么？</span>
      </el-row>
      <el-input
        type="textarea"
        :autosize="{ minRows: 6}"
        placeholder="通过合理的药物治疗及风险因素控制防止卒中再次发生。如：高血压、糖尿病、慢阻肺等相关的急性并发症、慢性并发症。"
        style="padding: 7px">
      </el-input>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-row style="margin-bottom: 10px;">
        <el-divider direction="vertical"></el-divider>
        <span class="title">该患者的风险控制目标是什么？</span>
      </el-row>
      <el-card shadow="never" style="padding: 15px;margin: 7px;min-height: 140px">
        <el-row>
          <el-checkbox-group v-model="check">
            <el-checkbox v-for="item in diseaseList" :label="item.diseaseId"
                         style="width: 210px;display: inline-block;margin-bottom: 10px">
              {{ item.diseaseName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-row style="margin-bottom: 10px;">
        <el-col style="width:155px;line-height: 28px;">
          <el-divider direction="vertical"></el-divider>
          <span class="title" style="vertical-align: middle;">药物治疗方案</span>
        </el-col>
        <el-col :span="14">
          <el-button size="mini" type="primary">添加药品</el-button>
          <el-button size="mini" type="primary">设置提醒</el-button>
        </el-col>
      </el-row>
      <el-table :data="medicalTreatList"
                border
                stripe>
        <el-table-column label="药品名称" align="center" prop="medName" :show-overflow-tooltip="true" />
        <el-table-column label="适应症" align="center" prop="indications" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="用法" align="center" prop="usage" />
        <el-table-column label="起始时间" align="center" prop="date" :show-overflow-tooltip="true" />
        <el-table-column label="新增/在用/停用" align="center" prop="type" width="180"></el-table-column>
        <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      </el-table>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-row style="margin-bottom: 10px;">
        <el-col style="width:155px;line-height: 28px;">
          <el-divider direction="vertical"></el-divider>
          <span class="title" style="vertical-align: middle;">非药物治疗方案</span>
        </el-col>
        <el-col :span="14">
          <el-button size="mini" type="primary">设置提醒</el-button>
        </el-col>
      </el-row>
      <el-card shadow="never" style="padding: 15px;margin: 7px;min-height: 140px">
        <el-form label-position="top" :model="noMedicalTreat">
          <el-row>
            <label class="el-form-item__label" style="padding: 0;line-height: 25px;">
              1.运动方案
            </label>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="运动项目">
                <el-input v-model="noMedicalTreat.patientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="每次运动">
                <el-input v-model="noMedicalTreat.phone">
                  <i slot="suffix">分钟</i>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="每周运动">
                <el-input v-model="noMedicalTreat.phone">
                  <i slot="suffix">分钟</i>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <label class="el-form-item__label" style="padding: 0;line-height: 25px;">
              2.饮食方案
            </label>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="每日主食">
                <el-input v-model="noMedicalTreat.patientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="摄盐量">
                <el-input v-model="noMedicalTreat.phone">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他">
                <el-input v-model="noMedicalTreat.phone">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="2.饮食方案">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="3.吸烟饮酒的控制方案">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="4.其他方面">
            <el-input></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-row style="margin-bottom: 10px;">
        <el-divider direction="vertical"></el-divider>
        <span class="title">随访与干预</span>
      </el-row>
      <el-card shadow="never" style="padding: 15px;margin: 7px;min-height: 140px">
        <el-row>
          <div style="color: #626262;font-size: 13px;margin-bottom: 15px;">
            随访内容包括
          </div>
          <el-checkbox-group v-model="check">
            <el-checkbox v-for="item in diseaseList" :label="item.diseaseId"
                         style="width: 210px;display: inline-block;margin-bottom: 10px">
              {{ item.diseaseName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-card>
      <el-row style="margin: 7px;">
        <el-button class="btn-size" type="info" icon="el-icon-alarm-clock">设置随访时间</el-button>
        <el-button class="btn-size" type="info" icon="el-icon-refresh">同步到该患者随访计划</el-button>
      </el-row>
    </el-row>
    <el-row style="text-align:right;margin: 7px;">
      <el-button class="btn-size" type="primary">发给患者</el-button>
      <el-button class="btn-size" type="primary">生成PDF</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'plan',
  data() {
    return {
      diseaseList: [
        {
          diseaseId: 10,
          diseaseKey: 10,
          diseaseName: '血压'
        }, {
          diseaseId: 1,
          diseaseKey: 1,
          diseaseName: '血糖'
        }, {
          diseaseId: 2,
          diseaseKey: 2,
          diseaseName: '血脂'
        }, {
          diseaseId: 3,
          diseaseKey: 3,
          diseaseName: '房颤'
        }, {
          diseaseId: 4,
          diseaseKey: 4,
          diseaseName: '血尿酸'
        }, {
          diseaseId: 5,
          diseaseKey: 5,
          diseaseName: '肌酸激酶'
        }, {
          diseaseId: 6,
          diseaseKey: 6,
          diseaseName: '哮喘发作'
        }, {
          diseaseId: 7,
          diseaseKey: 7,
          diseaseName: '血沉'
        }, {
          diseaseId: 8,
          diseaseKey: 8,
          diseaseName: '压痛关节数'
        }, {
          diseaseId: 9,
          diseaseKey: 9,
          diseaseName: '肿胀关节数'
        }, {
          diseaseId: 0,
          diseaseKey: 0,
          diseaseName: '其他'
        }
      ],
      check: [],
      medicalTreatList: [],
      noMedicalTreat: {}
    }
  }
}
</script>

<style scoped lang="scss">
.plan {

  ::v-deep .el-divider {
    background: #1E3F7C;
    width: 3px;
  }

  .title {
    color: #1E3F7C;
    font-size: 15px;
    line-height: 15px;
    vertical-align: bottom;
  }

}
</style>
