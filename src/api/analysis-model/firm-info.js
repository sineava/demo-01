import request from '@/utils/request'

/**
 * 新增重点企业信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/analysis-model/v1/firm-info/add`,
    method: 'post',
    data
  })
}

/**
 * 重点企业列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/analysis-model/v1/firm-info/choose-list`,
    method: 'get',
    params
  })
}

/**
 * 删除重点监管企业
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/analysis-model/v1/firm-info/del/${id}`,
    method: 'delete'
  })
}

/**
 * 编辑重点企业信息
 * @param {*} data
 */
export function editData(data) {
  return request({
    url: `/analysis-model/v1/firm-info/edit`,
    method: 'put',
    data
  })
}

/**
 * 查询企业详情
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/firm-info/info/${id}`,
    method: 'get'
  })
}

/**
 * 重点企业分页列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: `/analysis-model/v1/firm-info/list`,
    method: 'get',
    params
  })
}

/**
 * 获取港口企业信息列表
 * @param {*} params
 */
export function getEnList(params) {
  return request({
    url: `/analysis-model/v1/firm-info/port-enterprise-list`,
    method: 'get',
    params
  })
}
