<template>
  <div class="anticoagulationClinic">
    <PatientDrawer ref="patientDrawer"
                   :visible="visible"
                   :modal="false"
                   @closedDrawer="closedDrawer"></PatientDrawer>
    <el-row>
      <el-button type="primary" @click="anticoagulationClinicDrawer = true" style="margin-bottom: 20px;float: right">
        抗凝门诊咨询记录
      </el-button>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="12">
        <el-card class="card">
          <div slot="header">
            <span>疾病类型</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="add('acDiseaseType')">新增内容</el-button>
          </div>
          <el-row :gutter="20" class="card_body" style="padding: 15px">
            <el-col :span="8" v-for="acDiseaseType in acDiseaseTypeList" style="margin-bottom: 15px">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :disabled="acDiseaseType.operationList.length === 0">
                <div v-for="operation in acDiseaseType.operationList">
                  <p>{{ operation.operationName }}</p>
                  <p>
                    手术时间：{{ operation.operationDate }}
                  </p>
                  <p>
                    手术医院：{{ operation.operationHospital }}
                  </p>
                </div>
                <el-tag slot="reference" style="cursor: pointer">{{ acDiseaseType.diseaseTypeName }}</el-tag>
              </el-popover>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card">
          <div slot="header">
            <span>服用药物</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="add('acMedicine')">新增内容</el-button>
          </div>
          <el-row :gutter="20" class="card_body" style="padding: 15px">
            <el-col :span="8" v-for="acMedicine in acMedicineList" style="margin-bottom: 15px">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover">
                <div v-for="medicine in acMedicine.medicineList">
                  <p>{{ medicine.vendor }}</p>
                  <p>
                    用药量：{{ medicine.dosage.chip }}片 / {{ medicine.dosage.day }}天
                  </p>
                  <p>
                    用药时间：{{ medicine.medicationTime }}
                  </p>
                </div>
                <el-tag slot="reference" style="cursor: pointer">{{ acMedicine.medicineName }}</el-tag>
              </el-popover>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="12">
        <el-card class="card">
          <div slot="header">
            <span>INR</span>
          </div>
          <el-row class="card_body">
            <el-form :model="inrForm" label-width="100px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="INR结果">
                    <el-input v-model="inrForm.inrResult"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="验血时间">
                    <el-date-picker
                      type="date"
                      value-format="yyyy/MM/dd"
                      placeholder="选择日期"
                      v-model="inrForm.inrTestDate"
                      style="width: 100%"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="PT结果">
                    <el-input v-model="inrForm.ptResult"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label="验血时间">
                    <el-date-picker type="date" value-format="yyyy/MM/dd" placeholder="选择日期" style="width: 100%"
                                    v-model="inrForm.ptTestDate"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="监测频率">
                <el-radio-group v-model="inrForm.frequency">
                  <el-radio label="1次/周"></el-radio>
                  <el-radio label="1次/2周"></el-radio>
                  <el-radio label="1次/月"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="INR目标范围">
                <el-col :span="8">
                  <el-input v-model="inrForm.targetCap" placeholder="INR目标上限"></el-input>
                </el-col>
                <el-col :span="2" style="text-align: center;">-</el-col>
                <el-col :span="8">
                  <el-input v-model="inrForm.targetLower" placeholder="INR目标下限"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card">
          <div slot="header">
            <span>身体状况</span>
          </div>
          <el-form ref="physicalConditions" :model="physicalConditions" style="padding: 10px;">
            <el-form-item label="身体状况">
              <el-input v-model="physicalConditions.conditions"></el-input>
            </el-form-item>
            <el-form-item label="饮食习惯">
              <el-input v-model="physicalConditions.eatingHabits"></el-input>
            </el-form-item>
            <el-form-item label="基因亚型">
              <el-input v-model="physicalConditions.genotype"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-card class="card" style="min-height: 260px">
        <div slot="header">
          <span>监护人信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="add('guardianInfo')">新增内容</el-button>
        </div>
        <el-row :gutter="20" class="card_body">
          <el-col :span="6" v-for="guardianInfo in guardianInfoList">
            <div style="padding: 25px 15px;border-right: 1px solid #dcdfe6">
              <el-row class="relationship">关系： {{ guardianInfo.relationship }}</el-row>
              <el-row>姓名： {{ guardianInfo.name }}</el-row>
              <el-row>电话： {{ guardianInfo.phone }}</el-row>
              <el-row>性别： {{ guardianInfo.sex }}</el-row>
              <el-row>年龄： {{ guardianInfo.age }}</el-row>
              <el-row>住址： {{ guardianInfo.address }}</el-row>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row style="margin-bottom: 20px">
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-card>
        <div slot="header">
          <span>指导与建议</span>
        </div>
        <el-input
          class="card_body"
          type="textarea"
          :autosize="{minRows: 6}"
          v-model="guidanceAdvice"
          placeholder="用药方案、验血时间、饮食等...">
        </el-input>
      </el-card>
    </el-row>
    <el-row style="text-align:right;">
      <el-button class="btn-size" type="primary" @click="submit">保存</el-button>
    </el-row>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%">
      <el-tree class="ac" v-if="formContent === 'acDiseaseType'"
               ref="acDiseaseTypeTree"
               :data="diseaseTypeList"
               :props="diseaseTypeProps"
               show-checkbox>
        <div slot-scope="{ node, data }">
          <el-row :gutter="20">
            <el-col style="width: 200px">
              <span>{{ node.label }}</span>
            </el-col>
            <el-col :span="8" v-if="data.key && data.operationDate !== undefined">
              <el-date-picker
                v-model="data.operationDate"
                type="date"
                size="mini"
                placeholder="选择手术日期"
                value-format="yyyy/MM/dd"
                style="width: 100%">
              </el-date-picker>
            </el-col>
            <el-col :span="8" v-if="data.key && data.operationHospital !== undefined">
              <el-input
                v-model="data.operationHospital"
                size="mini"
                placeholder="请输入手术医院">
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-tree>
      <el-tree class="ac" v-if="formContent === 'acMedicine'"
               ref="acMedicineTree"
               :data="medicineList"
               :props="medicineProps"
               show-checkbox>
        <div slot-scope="{ node, data }">
          <el-row :gutter="20">
            <el-col style="width: 200px">
              <span>{{ node.label }}</span>
            </el-col>
            <el-col :span="8" v-if="data.key && data.dosage !== undefined">
              <el-col :span="10">
                <el-input size="mini" v-model="data.dosage.chip">
                  <i slot="suffix" style="font-style:normal;line-height: 28px">片</i>
                </el-input>
              </el-col>
              <el-col :span="2" style="text-align: center;">/</el-col>
              <el-col :span="10">
                <el-input size="mini" v-model="data.dosage.day">
                  <i slot="suffix" style="font-style:normal;line-height: 28px">天</i>
                </el-input>
              </el-col>
            </el-col>
            <el-col :span="8" v-if="data.key && data.medicationTime !== undefined">
              <el-time-picker
                arrow-control
                size="mini"
                v-model="data.medicationTime"
                format='HH:mm'
                value-format="HH:mm"
                placeholder="服药时间">
              </el-time-picker>
            </el-col>
          </el-row>
        </div>
      </el-tree>
      <el-form :model="guardianInfoForm" label-width="80px" v-if="formContent==='guardianInfo'">
        <el-form-item label="关系">
          <el-input v-model="guardianInfoForm.relationship"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="guardianInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="guardianInfoForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="guardianInfoForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="guardianInfoForm.age"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="guardianInfoForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
      title="抗凝门诊咨询记录"
      :visible.sync="anticoagulationClinicDrawer"
      direction="rtl"
      size="80%">
      <el-row style="padding: 20px">
        <el-table :data="anticoagulationClinicList"
                  stripe>
          <el-table-column property="patientName"
                           label="患者姓名"
                           fixed="left"
                           align="center"
                           width="100">
            <template slot-scope="scope">
              {{ scope.row.patientInfo.patientName }}
            </template>
          </el-table-column>
          <el-table-column property="gender"
                           label="性别"
                           fixed="left"
                           align="center"
                           width="100">
            <template slot-scope="scope">
              {{ scope.row.patientInfo.gender === '1' ? '男' : scope.row.patientInfo.gender === '2' ? '女' : '未知' }}
            </template>
          </el-table-column>
          <el-table-column property="birthday"
                           label="出生日期"
                           fixed="left"
                           align="center"
                           width="100">
            <template slot-scope="scope">
              {{ scope.row.patientInfo.birthday }}
            </template>
          </el-table-column>
          <el-table-column property="acDiseaseTypeList"
                           label="疾病类型"
                           width="300"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                :disabled="acDiseaseType.operationList.length === 0"
                v-for="acDiseaseType in scope.row.acDiseaseTypeList">
                <div v-for="operation in acDiseaseType.operationList">
                  <p>{{ operation.operationName }}</p>
                  <p>
                    手术时间：{{ operation.operationDate }}
                  </p>
                  <p>
                    手术医院：{{ operation.operationHospital }}
                  </p>
                </div>
                <el-tag slot="reference" style="cursor: pointer;margin-right: 10px">{{
                    acDiseaseType.diseaseTypeName
                  }}
                </el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="acMedicineList"
                           label="服用药物"
                           width="200"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                v-for="acMedicine in scope.row.acMedicineList">
                <div v-for="medicine in acMedicine.medicineList">
                  <p>{{ medicine.vendor }}</p>
                  <p>
                    用药量：{{ medicine.dosage.chip }}片 / {{ medicine.dosage.day }}天
                  </p>
                  <p>
                    用药时间：{{ medicine.medicationTime }}
                  </p>
                </div>
                <el-tag slot="reference" style="cursor: pointer;margin-right: 10px">{{
                    acMedicine.medicineName
                  }}
                </el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="inrForm"
                           label="INR"
                           width="200"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="300"
                trigger="hover">
                <div>
                  <p>INR检测结果：{{ scope.row.inrForm.inrResult }} 验血时间：{{ scope.row.inrForm.inrTestDate }}</p>
                  <p>PT检测结果：{{ scope.row.inrForm.ptResult }} 验血时间：{{ scope.row.inrForm.ptTestDate }}</p>
                  <p>监测频率：{{ scope.row.inrForm.frequency }}</p>
                  <p>INR目标范围：{{ scope.row.inrForm.targetLower }} - {{ scope.row.inrForm.targetCap }}</p>
                </div>
                <el-tag slot="reference" style="cursor: pointer;margin-right: 10px">
                  INR检测信息
                </el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="physicalConditions"
                           label="身体状况"
                           width="200"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.physicalConditions.conditions }}
              -
              {{ scope.row.physicalConditions.eatingHabits }}
              -
              {{ scope.row.physicalConditions.genotype }}
            </template>
          </el-table-column>
          <el-table-column property="guardianInfoList"
                           label="监护人信息"
                           width="200"
                           show-overflow-tooltip>
            <template slot-scope="scope">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                v-for="guardianInfo in scope.row.guardianInfoList">
                <div>
                  <p>关系： {{ guardianInfo.relationship }}</p>
                  <p>姓名： {{ guardianInfo.name }}</p>
                  <p>电话： {{ guardianInfo.phone }}</p>
                  <p>性别： {{ guardianInfo.sex }}</p>
                  <p>年龄： {{ guardianInfo.age }}</p>
                  <p>住址： {{ guardianInfo.address }}</p>
                </div>
                <el-tag slot="reference" style="cursor: pointer;margin-right: 10px">{{ guardianInfo.name }}</el-tag>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column property="guidanceAdvice"
                           label="指导与建议"
                           width="300"
                           show-overflow-tooltip></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import PatientDrawer from '@/layout/components/PatientDrawer';

export default {
  name: 'anticoagulationClinic',
  components: {PatientDrawer},
  data() {
    return {
      visible: true,
      anticoagulationClinicDrawer: true,
      dialogVisible: false,
      title: '',
      formContent: '',
      diseaseTypeProps: {
        label: 'label',
        children: 'childList'
      },
      diseaseTypeList: [
        {
          label: '瓣膜病',
          diseaseTypeName: '瓣膜病',
          diseaseId: 1,
          childList: [
            {
              label: '机械瓣主动脉瓣置换',
              operationName: '机械瓣主动脉瓣置换',
              operationDate: '',
              operationHospital: '',
              key: 1
            }, {
              label: '机械瓣二尖瓣瓣置换',
              operationName: '机械瓣二尖瓣瓣置换',
              operationDate: '',
              operationHospital: '',
              key: 1
            }, {
              label: '机械瓣三尖瓣瓣置换',
              operationName: '机械瓣三尖瓣瓣置换',
              operationDate: '',
              operationHospital: '',
              key: 1
            }, {
              label: '生物瓣主动脉瓣置换',
              operationName: '生物瓣主动脉瓣置换',
              operationDate: '',
              operationHospital: '',
              key: 1
            }, {
              label: '生物瓣二尖瓣瓣置换',
              operationName: '生物瓣二尖瓣瓣置换',
              operationDate: '',
              operationHospital: '',
              key: 1
            }, {
              label: '生物瓣三尖瓣瓣置换',
              operationName: '生物瓣三尖瓣瓣置换',
              operationDate: '',
              operationHospital: '',
              key: 1
            }, {
              label: '瓣膜成形术',
              operationName: '瓣膜成形术',
              operationDate: '',
              operationHospital: '',
              key: 1
            } ]
        }, {
          label: '射频消融术',
          diseaseTypeName: '射频消融术',
          diseaseId: 2,
          childList: [
            {
              label: '射频消融术',
              operationName: '射频消融术',
              operationDate: '',
              operationHospital: '',
              key: 2
            } ]
        }, {
          label: '房颤预防卒中',
          diseaseTypeName: '房颤预防卒中',
          diseaseId: 4
        }, {
          label: '冠心病',
          diseaseTypeName: '冠心病',
          diseaseId: 5
        }, {
          label: '肺栓塞',
          diseaseTypeName: '肺栓塞',
          diseaseId: 6
        }, {
          label: '深静脉血栓预防',
          diseaseTypeName: '深静脉血栓预防',
          diseaseId: 7
        }, {
          label: '深静脉血栓治疗',
          diseaseTypeName: '深静脉血栓治疗',
          diseaseId: 8
        }, {
          label: '高血压',
          diseaseTypeName: '高血压',
          diseaseId: 9
        }, {
          label: '糖尿病',
          diseaseTypeName: '糖尿病',
          diseaseId: 10
        }, {
          label: '高血脂',
          diseaseTypeName: '高血脂',
          diseaseId: 11
        }, {
          label: '肝功能异常',
          diseaseTypeName: '肝功能异常',
          diseaseId: 3
        }, {
          label: '肾功能异常',
          diseaseTypeName: '肾功能异常',
          diseaseId: 3
        } ],
      acDiseaseTypeList: [],
      medicineProps: {
        label: 'label',
        children: 'childList'
      },
      medicineList: [
        {
          label: '华法林',
          medicineName: '华法林',
          medicineId: 1,
          childList: [
            {
              label: '芬兰OrionCorporation（3mg）',
              vendor: '芬兰OrionCorporation（3mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 1
            }, {
              label: '河南中杰（2.5mg）',
              vendor: '河南中杰（2.5mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 1
            }, {
              label: '齐鲁制药（2.5mg）',
              vendor: '齐鲁制药（2.5mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 1
            }, {
              label: '上海信谊药厂（2.5mg）',
              vendor: '上海信谊药厂（2.5mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 1
            }
          ]
        },
        {
          label: '达比加群',
          medicineName: '达比加群',
          medicineId: 2,
          childList: [
            {
              label: '泰毕全（110mg）',
              vendor: '泰毕全（110mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 2
            }, {
              label: '泰毕全（150mg）',
              vendor: '泰毕全（150mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 2
            }
          ]
        },
        {
          label: '利伐沙班',
          medicineName: '利伐沙班',
          medicineId: 3,
          childList: [
            {
              label: '拜瑞妥（10mg）',
              vendor: '拜瑞妥（10mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 3
            }, {
              label: '拜瑞妥（15mg）',
              vendor: '拜瑞妥（15mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 3
            }, {
              label: '拜瑞妥（20mg）',
              vendor: '拜瑞妥（20mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 3
            }
          ]
        },
        {
          label: '阿哌沙班',
          medicineName: '阿哌沙班',
          medicineId: 4,
          childList: [
            {
              label: '豪森（2.5mg）',
              vendor: '豪森（2.5mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 4
            }
          ]
        },
        {
          label: '艾多沙班',
          medicineName: '艾多沙班',
          medicineId: 5,
          childList: [
            {
              label: '里先安（60mg）',
              vendor: '里先安（60mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 5
            }, {
              label: '里先安（30mg）',
              vendor: '里先安（30mg）',
              dosage: {
                chip: '',
                day: ''
              },
              medicationTime: '',
              key: 5
            }
          ]
        }
      ],
      acMedicineList: [],
      guardianInfoList: [],
      guardianInfoForm: {
        relationship: '',
        name: '',
        phone: '',
        sex: '',
        age: '',
        address: ''
      },
      inrForm: {},
      physicalConditions: {
        conditions: '',
        eatingHabits: '',
        genotype: ''
      },
      guidanceAdvice: '',
      anticoagulationClinicList: [
        {
          'patientInfo': {
            'patientId': '1383291027832348673',
            'phone': '18980879966',
            'patientName': '张三',
            'birthday': '1975/07/25',
            'age': 45,
            'gender': '1',
            'patId': '224466',
            'height': 176,
            'weight': 80,
            'bmi': 25.83,
            'idCard': '378901197507252345',
            'medType': 2,
            'otherMedType': '',
            'eduLevel': 3,
            'maritalStatus': 0,
            'downtownAddress': [ '37', '3701', '370102' ],
            'homeAddress': '趵突泉北路22号',
            'company': '保密',
            'emergencyInfusionNum': 2,
            'hospitalizationNum': 2
          },
          'acDiseaseTypeList': [
            {
              'label': '瓣膜病',
              'diseaseTypeName': '瓣膜病',
              'diseaseId': 1,
              'operationList': [
                {
                  'label': '机械瓣主动脉瓣置换',
                  'operationName': '机械瓣主动脉瓣置换',
                  'operationDate': '2021/05/03',
                  'operationHospital': '1',
                  'key': 1
                } ],
              'isRootInsert': false,
              'elm': '[object Text]'
            },
            {
              'label': '房颤预防卒中',
              'diseaseTypeName': '房颤预防卒中',
              'diseaseId': 4,
              'operationList': [],
              'isRootInsert': false,
              'elm': '[object Text]'
            },
            {
              'label': '肺栓塞',
              'diseaseTypeName': '肺栓塞',
              'diseaseId': 6,
              'operationList': [],
              'isRootInsert': false,
              'elm': '[object Text]'
            } ],
          'acMedicineList': [
            {
              'label': '华法林',
              'medicineName': '华法林',
              'medicineId': 1,
              'medicineList': [
                {
                  'label': '芬兰OrionCorporation（3mg）',
                  'vendor': '芬兰OrionCorporation（3mg）',
                  'dosage': {'chip': '1', 'day': '2'},
                  'medicationTime': '16:04',
                  'key': 1
                } ],
              'isRootInsert': false,
              'elm': '[object Text]'
            } ],
          'guardianInfoList': [
            {
              'relationship': '11',
              'name': '12',
              'phone': '33',
              'sex': '44',
              'age': '55',
              'address': '66',
              'isRootInsert': false,
              'elm': '[object Text]'
            },
            {
              'relationship': '22',
              'name': '11',
              'phone': '1',
              'sex': '23',
              'age': '123',
              'address': '44',
              'isRootInsert': false,
              'elm': '[object Text]'
            } ],
          'inrForm': {
            'inrResult': '1',
            'ptResult': '1',
            'inrTestDate': '2021/05/03',
            'ptTestDate': '2021/05/02',
            'frequency': '1次/2周',
            'targetCap': '1',
            'targetLower': '2',
            'isRootInsert': false,
            'elm': '[object Text]'
          },
          'physicalConditions': {
            'conditions': '22',
            'eatingHabits': '223',
            'genotype': '3123',
            'isRootInsert': false,
            'elm': '[object Text]'
          },
          'guidanceAdvice': '123123123'
        } ]
    }
  },
  methods: {
    closedDrawer(val) {
      this.visible = val
    },
    add(val) {
      switch (val) {
        case 'acDiseaseType':
          this.title = '疾病类型'
          break;
        case'acMedicine':
          this.title = '服用药物'
          break;
        case 'guardianInfo':
          this.title = '监护人信息'
          break;
        default:
          break;
      }
      this.formContent = val
      this.dialogVisible = true
    },
    cancel() {
      this.dialogVisible = false
      this.guardianInfoForm = {}
    },
    saveDiseaseType: function() {
      let chooseTree = this.$refs.acDiseaseTypeTree.getCheckedNodes(false, true);
      let acDiseaseTypeChooseTree = chooseTree.filter(item => item.diseaseId);
      acDiseaseTypeChooseTree.forEach(v => {
        delete v.childList
        v.operationList = []
        chooseTree.forEach((child) => {
          if (child.key && v.diseaseId === child.key) {
            v.operationList.push(child)
          }
        })
      })
      this.acDiseaseTypeList = acDiseaseTypeChooseTree
      this.dialogVisible = false
      this.$message.success('保存成功')
    },
    saveMedicine: function() {
      let chooseTree = this.$refs.acMedicineTree.getCheckedNodes(false, true);
      let acMedicineChooseTree = chooseTree.filter(item => item.medicineId);
      acMedicineChooseTree.forEach(v => {
        delete v.childList
        v.medicineList = []
        chooseTree.forEach((child) => {
          if (child.key && v.medicineId === child.key) {
            v.medicineList.push(child)
          }
        })
      })
      this.acMedicineList = acMedicineChooseTree
      this.dialogVisible = false
      this.$message.success('保存成功')
    },
    save() {
      let form = this.formContent
      switch (form) {
        case 'acDiseaseType':
          this.saveDiseaseType();
          break;
        case 'acMedicine':
          this.saveMedicine();
          break;
        case 'guardianInfo':
          this.dialogVisible = false
          this.guardianInfoList.push(this.guardianInfoForm)
          this.$message.success('保存成功')
          this.guardianInfoForm = {}
          break;
        default:
          break;
      }
    },
    submit() {
      let anticoagulationClinic = {
        patientInfo: this.$refs.patientDrawer.patientForm,
        acDiseaseTypeList: this.acDiseaseTypeList,
        acMedicineList: this.acMedicineList,
        guardianInfoList: this.guardianInfoList,
        inrForm: this.inrForm,
        physicalConditions: this.physicalConditions,
        guidanceAdvice: this.guidanceAdvice
      }
      this.acDiseaseTypeList = []
      this.acMedicineList = []
      this.inrForm = {}
      this.physicalConditions = {}
      this.guardianInfoList = []
      this.guidanceAdvice = ''
      this.anticoagulationClinicList.push(anticoagulationClinic)
      this.$message.success('保存成功')
    }
  }
}
</script>

<style scoped lang="scss">
.anticoagulationClinic {
  padding: 50px;
  max-width: 1400px;

  ::v-deep .el-card__header {
    background: #1e3f7c;
    color: #FFFFFF;
  }

  .card {
    min-height: 347px;
  }

  .card_body {
    padding: 7px;
  }

  .ac {
    ::v-deep .el-input--mini .el-input__inner {
      height: 20px;
      line-height: 20px;
      border-top: 0;
      border-right: 0;
      border-left: 0;
      border-radius: 0;
    }

    ::v-deep .el-input--mini .el-input__icon {
      line-height: 20px;
    }
  }

  .relationship {
    font-size: 18px;
    font-weight: bold;
    color: #1E3F7C;
    margin-bottom: 10px;
  }

}
</style>
