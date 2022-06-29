import request from '@/utils/request'

/**
 * 辅助设施设备信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/auxiliary-facilities/list`,
    method: 'get',
    params
  })
}

/**
 * 辅助设施设备详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/auxiliary-facilities/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增辅助设施设备信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/auxiliary-facilities/add`,
    method: 'post',
    data
  })
}

/**
 * 修改危险货物设备信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/auxiliary-facilities/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除辅助设施设备信息
 * @param {*} id
 */
export function removeData(id) {
  return request({
    url: `/data-management/v1/auxiliary-facilities/remove/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取视频设备列表
 * @param {*} params
 */
export function getVideslist(params) {
  return request({
    url: `/data-management/v1/auxiliary-facilities/cameras`,
    method: 'get',
    params
  })
}

/**
 * 获取视频区位信息
 * @param {*} params
 */
export function getVidesAuxiliary(params) {
  return request({
    url: `/data-management/v1/regions/regions-list`,
    method: 'get',
    params
  })
}

/**
 * 获取视频区位信息
 * @param {*} params
 */
export function getVides(regionIndexCode) {
  return request({
    url: `/data-management/v1/regions/camera-list/${regionIndexCode}`,
    method: 'get',
  })
}

/**
 * 更新视频监控区域信息
 * @param {*} params
 */
export function updateRegions() {
  return request({
    url: `/data-management/v1/regions/update-regions`,
    method: 'get',
  })
}
