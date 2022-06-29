import request from '@/utils/request'

/**
 * 行业端 分页查询水路运输经营许可证列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-business-license/page-hy-list',
    method: 'get',
    params
  })
}
/**
 * 新增经营许可证信息
 * @param {*} params
 */
export function saveLicense(data) {
  return request({
    url: '/water-transportation-services/v1/water-transport-business-license/save-info',
    method: 'post',
    data
  })
}
/**
 * 修改经营许可证信息
 * @param {*} params
 */
export function updateLicense(data) {
  return request({
    url: '/water-transportation-services/v1/water-transport-business-license/update-info',
    method: 'PUT',
    data
  })
}

/**
 * 删除经营许可证信息
 * @param {*} id
 */
export function deleteLicense(id) {
  return request({
    url: `/water-transportation-services/v1/water-transport-business-license/delete-info/${id}`,
    method: 'delete'
  })
}

/**
 * 企业端 分页查询水路运输经营许可证列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-business-license/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 查询水路运输经营许可证详情-所有通用
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/water-transport-business-license/get/${id}`,
    method: 'get'
  })
}
