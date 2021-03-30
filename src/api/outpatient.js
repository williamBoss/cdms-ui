import request from '@/utils/request'

export function getMed(param) {
  return request({
    url: '/cdms/config/med-info/all-med',
    method: 'get',
    params: param
  })
}

export function getProb(param) {
  return request({
    url: '/cdms/config/med-problem/med_problems_dict',
    method: 'get',
    params: param
  })
}

export function saveOut(param) {
  return request({
    url: '/cdms/clinic-consult/clinic-consult/',
    method: 'post',
    data: param
  })
}

export function getOutList(param) {
  return request({
    url: '/cdms/clinic-consult/clinic-consult/list',
    method: 'get',
    params: param
  })
}

export function getPatientPhone(phone) {
  return request({
    url: '/cdms/patient/patient/phone/'+ phone,
    method: 'get'
  })
}

export function savePatient(params) {
  return request({
    url: '/cdms/patient/patient/',
    method: 'post',
    data: params
  })
}

export function deleteData(id) {
  return request({
    url: '/cdms/clinic-consult/clinic-consult/'+id,
    method: 'delete'
  })
}
