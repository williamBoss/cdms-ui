import request from '@/utils/request'

const client_id = 'web'
const client_secret = '123456'
const scope = 'server'

// 获取患者列表
export function getPatients(param) {
  console.log(param)
  return request({
    url: '/cdms/patient/patient/list',
    method: 'get',
    params: param
  })
}

// 添加患者
export function savePatient(param) {
  return request({
    url: '/cdms/patient/patient/',
    method: 'post',
    data: param
  })
}

// 删除患者
export function delPatient(id) {
  return request({
    url: '/cdms/patient/patient/' + id,
    method: 'delete',
  })
}

// 获取患者信息
export function getPatientInfo(id) {
  return request({
    url: '/cdms/patient/patient/id/' + id,
    method: 'get',
  })
}

// 获取评估记录
export function asseList(param) {
  return request({
    url: '/cdms/assessment/assessment/list',
    method: 'get',
    params: param
  })
}

// 获取评估Id和就诊评估时间
export function getAssessment(param) {
  return request({
    url: '/cdms/assessment/assessment/start/assessment',
    method: 'get',
    params: param
  })
}

// 获取主诉
export function getConsult(param) {
  return request({
    url: '/cdms/assessment/existing-symptoms/main-consult',
    method: 'get',
    params: param
  })
}

// 保存主诉
export function saveConsult(param) {
  return request({
    url: '/cdms/assessment/existing-symptoms/add-main-consult',
    method: 'post',
    data: param
  })
}

// 查询患者诊断信息
export function getDiagnosis(param) {
  return request({
    url: '/cdms/assessment/existing-symptoms/diagnosis',
    method: 'get',
    params: param
  })
}

// 保存评估诊断
export function saveDiagnosis(param) {
  return request({
    url: '/cdms/assessment/existing-symptoms/add-assessment-diagnosis',
    method: 'post',
    data: param
  })
}

// 查询当前症状描述
export function getSymptom(param) {
  return request({
    url: '/cdms/assessment/existing-symptoms/symptom-description',
    method: 'get',
    params: param
  })
}

// 保存当前症状描述
export function saveSymptom(param) {
  return request({
    url: '/cdms/assessment/existing-symptoms/add-symptom-description',
    method: 'post',
    data: param
  })
}

// 获取药物不良反应记录列表
export function getMedSideList(param) {
  return request({
    url: '/cdms/assessment/med-side-effect/list',
    method: 'get',
    params: param
  })
}

// 新增药物不良反应记录
export function saveMedSideList(param) {
  if (param.medicationSideEffectId) {
    return request({
      url: '/cdms/assessment/med-side-effect/' + param.medicationSideEffectId,
      method: 'PUT',
      data: param
    })
  } else {
    return request({
      url: '/cdms/assessment/med-side-effect/',
      method: 'post',
      data: param
    })
  }
}

// 根据id删除药物不良反应记录
export function delMedSideList(param) {
  return request({
    url: '/cdms/assessment/med-side-effect/' + param.id,
    method: 'DELETE',
  })
}

// 药物治疗问题列表
export function getMedProblems(param) {
  return request({
    url: '/cdms/assessment/med-problems/list',
    method: 'get',
    params: param
  })
}

// 保存药物治疗问题
export function saveMedProblems(param) {
  if (param.id) {
    return request({
      url: '/cdms/assessment/med-problems/' + param.id,
      method: 'PUT',
      data: param
    })
  } else {
    return request({
      url: '/cdms/assessment/med-problems/',
      method: 'post',
      data: param
    })
  }
}

// 获取家族史列表
export function getFamilyHistory(param) {
  return request({
    url: '/cdms/assessment/family-medical-history/list',
    method: 'get',
    params: param
  })
}

// 保存家族史
export function saveFamilyHistory(param) {
  return request({
    url: '/cdms/assessment/family-medical-history/',
    method: 'post',
    data: param
  })
}

// 删除家族史记录
export function delFamilyHistory(id) {
  return request({
    url: '/cdms/assessment/family-medical-history/' + id,
    method: 'DELETE'
  })
}

// 查询问题及干预
export function getReportProblem(param) {
  return request({
    url: '/cdms/assessment/assessment-report/assessment-report-problem-info',
    method: 'get',
    params: param
  })
}

// 保存问题及干预
export function saveReportProblem(param) {
  return request({
    url: '/cdms/assessment/assessment-report/add-assessment-report-problem',
    method: 'post',
    data: param
  })
}
// 查询转归
export function getReportSequelae(param) {
  return request({
    url: '/cdms/assessment/assessment-report/assessment-report-sequelae-info',
    method: 'get',
    params: param
  })
}

// 保存既往史
export function saveReportSequelae(param) {
  return request({
    url: '/cdms/assessment/assessment-report/add-assessment-report-sequelae',
    method: 'post',
    data: param
  })
}

// 获取既往史列表
export function getOldHistory(param) {
  return request({
    url: '/cdms/assessment/past-medical-history/list',
    method: 'get',
    params: param
  })
}

// 保存既往史
export function saveOldHistory(param) {
  return request({
    url: '/cdms/assessment/past-medical-history/',
    method: 'post',
    data: param
  })
}

// 删除既往史
export function delOldHistory(id) {
  return request({
    url: '/cdms/assessment/past-medical-history/' + id,
    method: 'DELETE'
  })
}

// 获取既往手术史列表
export function getSurgicalHistory(param) {
  return request({
    url: '/cdms/assessment/past-surgical-history/list',
    method: 'get',
    params: param
  })
}

// 保存既往手术史
export function saveSurgicalHistory(param) {
  return request({
    url: '/cdms/assessment/past-surgical-history/',
    method: 'post',
    data: param
  })
}

// 删除既往手术史
export function delSurgicalHistory(id) {
  return request({
    url: '/cdms/assessment/past-surgical-history/' + id,
    method: 'DELETE'
  })
}

// 根据患者id查询糖尿病并发症列表
export function getDiabetesHistory(param) {
  return request({
    url: '/cdms/assessment/diabetes-complications/list',
    method: 'get',
    params: param
  })
}

// 保存患者糖尿病并发症
export function saveDiabetesHistory(param) {
  return request({
    url: '/cdms/assessment/diabetes-complications/',
    method: 'post',
    data: param
  })
}

// 删除患者糖尿病并发症
export function delDiabetesHistory(id) {
  return request({
    url: '/cdms/assessment/diabetes-complications/' + id,
    method: 'DELETE'
  })
}

// 添加肾损害
export function getKidneyInfo(param) {
  return request({
    url: '/cdms/assessment/patient-condition/kidney-info',
    method: 'get',
    params: param
  })
}

// 添加肾损害
export function saveKidneyInfo(param) {
  return request({
    url: '/cdms/assessment/patient-condition/add-kidney-damage',
    method: 'post',
    data: param
  })
}

// 获取肝损害
export function getLiverInfo(param) {
  return request({
    url: '/cdms/assessment/patient-condition/liver-info',
    method: 'get',
    params: param
  })
}

// 添加肝损害
export function saveLiverInfo(param) {
  return request({
    url: '/cdms/assessment/patient-condition/add-liver-damage',
    method: 'post',
    data: param
  })
}

// 新增患者过敏史
export function saveAllergyHistory(param) {
  return request({
    url: '/cdms/assessment/allergy-history/',
    method: 'post',
    data: param
  })
}

// 患者过敏史列表
export function getAllergyHistory(param) {
  return request({
    url: '/cdms/assessment/allergy-history/list',
    method: 'get',
    params: param
  })
}

// 获取生活方式信息
export function getLifestyle(param) {
  return request({
    url: '/cdms/assessment/lifestyle/',
    method: 'get',
    params: param
  })
}

// 新增生活方式记录
export function saveLifestyle(param) {
  return request({
    url: '/cdms/assessment/lifestyle/',
    method: 'post',
    data: param
  })
}

//新增用药记录
export function saveRecord(param) {
  return request({
    url: '/cdms/assessment/use-med-record/',
    method: 'post',
    data: param
  })
}

//获取用药记录列表
export function getRecord(param) {
  return request({
    url: '/cdms/assessment/use-med-record/list',
    method: 'get',
    params: param
  })
}

//删除用药记录
export function delRecord(param) {
  return request({
    url: '/cdms/assessment/use-med-record/' + param.id,
    method: 'DELETE'
  })
}

//用药依从性查询
export function getMorisky(param) {
  return request({
    url: '/cdms/assessment/questionnaire-morisky/',
    method: 'get',
    params: param
  })
}

//保存用药依从性
export function saveMorisky(param) {
  return request({
    url: '/cdms/assessment/questionnaire-morisky/',
    method: 'post',
    data: param
  })
}

//心脑血管查询
export function getQuestionRisk(param) {
  return request({
    url: '/cdms/assessment/questionnaire-risk/',
    method: 'get',
    params: param
  })
}

//保存心脑血管
export function saveQuestionRisk(param) {
  return request({
    url: '/cdms/assessment/questionnaire-risk/',
    method: 'post',
    data: param
  })
}

//Eq5d3l查询
export function getEq5d3l(param) {
  return request({
    url: '/cdms/assessment/questionnaire-eq5d3l/',
    method: 'get',
    params: param
  })
}

//保存Eq5d3l
export function saveEq5d3l(param) {
  return request({
    url: '/cdms/assessment/questionnaire-eq5d3l/',
    method: 'post',
    data: param
  })
}

//eq5d5l查询
export function getEq5d5l(param) {
  return request({
    url: '/cdms/assessment/questionnaire-eq5d5l/',
    method: 'get',
    params: param
  })
}

//保存Eq5d5l
export function saveEq5d5l(param) {
  return request({
    url: '/cdms/assessment/questionnaire-eq5d5l/',
    method: 'post',
    data: param
  })
}

//VAS查询
export function getVas(param) {
  return request({
    url: '/cdms/assessment/questionnaire-vas/',
    method: 'get',
    params: param
  })
}

//保存VAS量表
export function saveVas(param) {
  return request({
    url: '/cdms/assessment/questionnaire-vas/',
    method: 'post',
    data: param
  })
}

//查询风湿病简易HAQ评分
export function getHaq(param) {
  return request({
    url: '/cdms/assessment/questionnaire-easy-haq/',
    method: 'get',
    params: param
  })
}

//保存风湿病简易HAQ评分
export function saveHaq(param) {
  return request({
    url: '/cdms/assessment/questionnaire-easy-haq/',
    method: 'post',
    data: param
  })
}

//查询患者Essen卒中风险
export function getEssen(param) {
  return request({
    url: '/cdms/assessment/questionnaire-essen/',
    method: 'get',
    params: param
  })
}

//保存患者Essen卒中风险
export function saveEssen(param) {
  return request({
    url: '/cdms/assessment/questionnaire-essen/',
    method: 'post',
    data: param
  })
}

//sas查询
export function getSas(param) {
  return request({
    url: '/cdms/assessment/questionnaire-sas/',
    method: 'get',
    params: param
  })
}

//保存Sas
export function saveSas(param) {
  return request({
    url: '/cdms/assessment/questionnaire-sas/',
    method: 'post',
    data: param
  })
}

//查询CHADS 2房颤患者卒中危险分层
export function getChads(param) {
  return request({
    url: '/cdms/assessment/questionnaire-chads/',
    method: 'get',
    params: param
  })
}

//保存CHADS 2房颤患者卒中危险分层
export function saveChads(param) {
  return request({
    url: '/cdms/assessment/questionnaire-chads/',
    method: 'post',
    data: param
  })
}

//Acr查询
export function getAcr(param) {
  return request({
    url: '/cdms/assessment/questionnaire-acr/',
    method: 'get',
    params: param
  })
}

//保存Acr
export function saveAcr(param) {
  return request({
    url: '/cdms/assessment/questionnaire-acr/',
    method: 'post',
    data: param
  })
}

//查询患者房颤评估
export function getAf(param) {
  return request({
    url: '/cdms/assessment/questionnaire-af/',
    method: 'get',
    params: param
  })
}

//保存患者房颤评估
export function saveAf(param) {
  return request({
    url: '/cdms/assessment/questionnaire-af/',
    method: 'post',
    data: param
  })
}

//查询cat
export function getCat(param) {
  return request({
    url: '/cdms/assessment/questionnaire-cat/',
    method: 'get',
    params: param
  })
}

//保存Cat
export function saveCat(param) {
  return request({
    url: '/cdms/assessment/questionnaire-cat/',
    method: 'post',
    data: param
  })
}

//caprini查询
export function getCaprini(param) {
  return request({
    url: '/cdms/assessment/questionnaire-caprini/',
    method: 'get',
    params: param
  })
}

//保存caprini
export function saveCaprini(param) {
  return request({
    url: '/cdms/assessment/questionnaire-caprini/',
    method: 'post',
    data: param
  })
}

//查询已选量表
export function getAssessmentTable(param) {
  return request({
    url: '/cdms/assessment/questionnaire-assessment/',
    method: 'get',
    params: param
  })
}

//保存caprini
export function saveAssessmentTable(param) {
  return request({
    url: '/cdms/assessment/questionnaire-assessment/',
    method: 'post',
    data: param
  })
}

//根据评估id或者患者id sds查询
export function getSds(param) {
  return request({
    url: '/cdms/assessment/questionnaire-sds/',
    method: 'get',
    params: param
  })
}

//保存caprini
export function saveSds(param) {
  return request({
    url: '/cdms/assessment/questionnaire-sds/',
    method: 'post',
    data: param
  })
}


//用药数量统计图
export function getUseMedicine(param) {
  return request({
    url: '/cdms/assessment/charts/use-medicine-num',
    method: 'get',
    params: param
  })
}

//药物治疗统计图
export function getUseMedicalTreatment(param) {
  return request({
    url: '/cdms/assessment/charts/medical-treatment',
    method: 'get',
    params: param
  })
}

//费用统计图
export function getMedicalFee(param) {
  return request({
    url: '/cdms/assessment/charts/medical-fee',
    method: 'get',
    params: param
  })
}

//用药数量统计图
export function getMedicalScale(param) {
  return request({
    url: '/cdms/assessment/charts/scale',
    method: 'get',
    params: param
  })
}

//血压图表
export function getBloodPressure(param) {
  return request({
    url: '/cdms/assessment/detect-charts/blood-pressure',
    method: 'get',
    params: param
  })
}

//血糖图表
export function getBloodSugar(param) {
  return request({
    url: '/cdms/assessment/detect-charts/blood-sugar',
    method: 'get',
    params: param
  })
}

//电解质图表
export function getElectrolyte(param) {
  return request({
    url: '/cdms/assessment/detect-charts/electrolyte',
    method: 'get',
    params: param
  })
}

//心率图表
export function getHeartRate(param) {
  return request({
    url: '/cdms/assessment/detect-charts/heart-rate',
    method: 'get',
    params: param
  })
}

//同型半胱氨酸图表
export function getHomocysteine(param) {
  return request({
    url: '/cdms/assessment/detect-charts/homocysteine',
    method: 'get',
    params: param
  })
}

//肾功能图表
export function getKidneyFunction(param) {
  return request({
    url: '/cdms/assessment/detect-charts/kidney-function',
    method: 'get',
    params: param
  })
}

//血脂尿酸图表
export function getLipidsUricAcid(param) {
  return request({
    url: '/cdms/assessment/detect-charts/lipids-uric-acid',
    method: 'get',
    params: param
  })
}

//肝功能图表
export function getLiverFunction(param) {
  return request({
    url: '/cdms/assessment/detect-charts/liver-function',
    method: 'get',
    params: param
  })
}

//问题
export function getProblemsDict(param) {
  return request({
    url: '/cdms/config/med-problem/med_problems_dict',
    method: 'get',
    params: param
  })
}

// 查询报告页面信息
export function getReportInfo(param) {
  return request({
    url: '/cdms/assessment/assessment-report/info',
    method: 'get',
    params: param
  })
}

// 获取所有病种
export const getDiseaseList = (param) => {
  return request({
    url: '/cdms/config/disease/list',
    method: 'get',
    params: param
  })
}
