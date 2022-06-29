import request from '@/utils/request'

/**
 * 船舶检验档案管理分页列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/ship-inspection/v1/inspection-records/list`,
    method: 'get',
    params
  })
}

/**
 * 船舶检验档案管理详情
 * @param {*} inspectionRecords
 */
export function getInfo(inspectionRecords) {
  return request({
    url: `/ship-inspection/v1/inspection-records/info/${inspectionRecords}`,
    method: 'get'
  })
}


/**
 * 更新船舶信息
 * @param {*} params
 */
 export function updateShipInfo(params) {
  return request({
    url: `/water-transportation-services/v1/ship-info-update/update-ship-info`,
    method: 'post',
    params
  })
}

/**
 * 更新船舶检验信息
 * @param {*} params
 */
 export function updateShipInspection(params) {
  return request({
    url: `/water-transportation-services/v1/ship-info-update/update-ship-inspection`,
    method: 'post',
    params
  })
}

/**
 * 船舶检验电子档案 船舶基础信息详情 通过船舶ID 查询船舶船舶检验档案
 * @param {*} shipInfoId
 */
 export function shipInsRegInfo(shipInfoId) {
  return request({
    url: `/water-transportation-services/v1/inspection-records/ship-ins-reg-info/${shipInfoId}`,
    method: 'get'
  })
}