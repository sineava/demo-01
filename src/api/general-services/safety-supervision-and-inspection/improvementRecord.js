import request from '@/utils/request'

/**
 * 行业端 分页查询整改记录列表
 * @param {*} params
 */
export function hyPageList(params) {
  return request({
    url: '/general-services/v1/improvement-record/hyPageList',
    method: 'get',
    params
  })
}

/**
 * 查询整改记录详情
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/improvement-record/findById/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 分页查询整改记录列表
 * @param {*} params
 */
export function enPageList(params) {
  return request({
    url: '/general-services/v1/improvement-record/enPageList',
    method: 'get',
    params
  })
}

/**
 * 企业端填写整改记录
 * @param {*} data
 */
export function updateRecord(data) {
  return request({
    url: '/general-services/v1/improvement-record/update',
    method: 'PUT',
    data
  })
}
