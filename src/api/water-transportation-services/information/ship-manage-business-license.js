import request from '@/utils/request'

/**
 * 行业端 分页查询分页查询船舶管理业务经营许可证列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: '/water-transportation-services/v1/ship-manage-business-license/page-hy-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询分页查询船舶管理业务经营许可证列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/water-transportation-services/v1/ship-manage-business-license/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 查询分页查询船舶管理业务经营许可证详情-所有通用
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/ship-manage-business-license/get/${id}`,
    method: 'get'
  })
}

/**
 * 新增经营许可证信息
 * @param {*} params
 */
export function saveLicense(data) {
  return request({
    url: '/water-transportation-services/v1/ship-manage-business-license/save-info',
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
    url: '/water-transportation-services/v1/ship-manage-business-license/update-info',
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
    url: `/water-transportation-services/v1/ship-manage-business-license/delete-info/${id}`,
    method: 'delete'
  })
}
