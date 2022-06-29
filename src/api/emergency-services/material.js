import request from '@/utils/request'

/**
 * 删除应急物资记录
 * @param {*} params
 */
export function deleteMaterial(params) {
  return request({
    url: `/wyx-emergency-services/v1/material/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询应急物资列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material/page-list',
    method: 'get',
    params
  })
}

/**
 * 应急物资-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 新增应急物资记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/material/save-info',
    method: 'post',
    data
  })
}

/**
 * 物资详情（关联储备点信息查询）
 * @param {*} params
 */
export function selectInfo(params) {
  return request({
    url: '/wyx-emergency-services/v1/material/select-info',
    method: 'get',
    params
  })
}

/**
 * 修改应急物资记录
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-emergency-services/v1/material/update-info',
    method: 'put',
    data
  })
}

/**
 * 物资类型列表查询
 * @param {*} params
 */
export function getMaterialType(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-type/query-list',
    method: 'get',
    params
  })
}

/**
 * 批量导入应急物质
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/wyx-emergency-services/v1/material/bulk-import',
    method: 'post',
    data
  })
}

/**
 * 物资类型添加
 * @param {*} params
 */
export function savaMaterialType(data) {
  return request({
    url: '/wyx-emergency-services/v1/material-type/sava-info',
    method: 'post',
    data
  })
}

/**
 * 物资类型修改
 * @param {*} params
 */
export function putMaterialType(data) {
  return request({
    url: '/wyx-emergency-services/v1/material-type/update-info',
    method: 'put',
    data
  })
}

/**
 * 物资类型删除
 * @param {*} params
 */
export function deleteMaterialType(id) {
  return request({
    url: `/wyx-emergency-services/v1/material-type/delete/${id}`,
    method: 'DELETE',
    data:{id}
  })
}
