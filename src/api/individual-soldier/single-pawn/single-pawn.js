import request from '@/utils/request'

/**
 * 单兵信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/individual-soldier/v1/single-pawn/list`,
    method: 'get',
    params
  })
}

/**
 * 单兵信息详情
 * @param {*} singlePawnId
 */
export function getInfo(singlePawnId) {
  return request({
    url: `/individual-soldier/v1/single-pawn/info/${singlePawnId}`,
    method: 'get'
  })
}

/**
 * 新增单兵信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/individual-soldier/v1/single-pawn/add`,
    method: 'post',
    data
  })
}

/**
 * 编辑单兵信息
 * @param {*} data
 */
export function redactData(data) {
  return request({
    url: `/individual-soldier/v1/single-pawn/redact`,
    method: 'put',
    data
  })
}

/**
 * 删除单兵信息
 * @param {*} singlePawnId
 */
export function deleteData(data) {
  return request({
    url: `/individual-soldier/v1/single-pawn/del/${data.id}`,
    method: 'DELETE'
  })
}

/**
 * 获取单兵信息点位
 */
export function getPoints(params) {
  return request({
    url: '/individual-soldier/v1/single-pawn/pawn-list',
    method: 'get',
    params
  })
}