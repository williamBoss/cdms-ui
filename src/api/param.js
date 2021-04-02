import request from '@/utils/request'

// 获取地址
export const getAddress = () => {
  return request({
    url: '/cdms/config/districts/districtsTree',
    method: 'get'
  })
}

// 获取所有病种
export const getDisease = (param) => {
  return request({
    url: '/cdms/config/disease/all',
    method: 'get',
    params: param
  })
}

// 新增病种
export const AddDisease = (param) => {
  if (param.diseaseId) {
    return request({
      url: '/cdms/config/disease/' + param.diseaseId,
      method: 'PUT',
      data: param
    })
  } else {
    return request({
      url: '/cdms/config/disease/',
      method: 'post',
      data: param
    })
  }
}

//删除病种
export const delDisease = (param) => {
  return request({
    url: '/cdms/config/disease/' + param.diseaseId,
    method: 'DELETE'
  })
}

// 获取病种列表
export const getDiseaseList = (param) => {
  return request({
    url: '/cdms/config/disease/list',
    method: 'get',
    params: param
  })
}

// 获取问卷列表
export const getQuestionList = () => {
  return request({
    url: '/cdms/config/questionnaire-dict/list',
    method: 'get'
  })
}

// 获取所有手术史字典
export const getSurgical = () => {
  return request({
    url: '/cdms/config/surgical/all',
    method: 'get'
  })
}

// 获取所有药品列表
export const getMedList = () => {
  return request({
    url: '/cdms/config/med-info/list',
    method: 'get'
  })
}

//获取所有药品
export const getAllMedList = () => {
  return request({
    url: '/cdms/config/med-info/all-med',
    method: 'get'
  })
}
