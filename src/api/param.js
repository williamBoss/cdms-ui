import request from '@/utils/request'

// 获取地址
export const getAddress = () => {
  return request({
    url: '/cdms/config/districts/districtsTree',
    method: 'get'
  })
}

// 获取所有病种
export const getDisease = () => {
  return request({
    url: '/cdms/config/disease/all',
    method: 'get'
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