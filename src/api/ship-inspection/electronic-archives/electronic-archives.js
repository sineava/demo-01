import request from '@/utils/request'

/**
 * 船舶电子档案-船舶列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/ship-inspection/v1/electronic-archives/ship-list`,
    method: 'get',
    params
  })
}

/**
 * 船舶检验-移除船舶电子档案
 * @param {*} electronicArchivesId
 */
export function removeData(electronicArchivesId) {
  return request({
    url: `/ship-inspection/v1/electronic-archives/remove/${electronicArchivesId}`,
    method: 'DELETE'
  })
}

/**
 * 编辑电子档案信息
 * @param {*} data
 */
export function editData(data) {
  return request({
    url: `/ship-inspection/v1/electronic-archives/redact`,
    method: 'PUT',
    data
  })
}

/**
 * 船舶检验-船舶电子档案管理列表
 * @param {*} shipInfoId
 */
export function getInfo(shipInfoId) {
  return request({
    url: `/ship-inspection/v1/electronic-archives/info/${shipInfoId}`,
    method: 'get'
  })
}

/**
 * 新增电子档案信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/ship-inspection/v1/electronic-archives/add`,
    method: 'POST',
    data
  })
}
