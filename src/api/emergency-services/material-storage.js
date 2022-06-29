import request from '@/utils/request'

/**
 * 删除应急物资储备点记录
 * @param {*} params
 */
export function deleteMaterial(params) {
  return request({
    url: `/wyx-emergency-services/v1/material-storage/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询应急物资储备点列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-storage/page-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询应急物资储备点列表-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-storage/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 根据储备点编号查询储备点详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-storage/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增应急物资储备点记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/material-storage/save-info',
    method: 'post',
    data
  })
}

/**
 * 应急物资储备点模糊查询
 * @param {*} params
 */
export function selectList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-storage/select-list',
    method: 'get',
    params
  })
}

/**
 * 修改应急物资储备点记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/material-storage/update-info',
    method: 'put',
    data
  })
}
