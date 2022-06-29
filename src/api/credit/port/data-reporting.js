import request from '@/utils/request'

/**
 * 查询-临时数据列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets-port/current-data',
    method: 'get',
    params
  })
}

/**
 * 删除-从业人员信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/wyx-channel-services/v1/credit-assets-port/delete-info/${id}`,
    method: 'delete'
  })
}

/**
 * 新增-从业人员信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/wyx-channel-services/v1/credit-assets-port/save-info`,
    method: 'post',
    data
  })
}

/**
 * 详情-从业人员信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/wyx-channel-services/v1/credit-assets-port/get-info`,
    method: 'get',
    params: {id}
  })
}

/**
 * 修改-从业人员信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets-port/update-info',
    method: 'put',
    data
  })
}

/**
 * 拉取-上一次推送数据
 * @param {*} data
 */
export function pullData(data) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets-port/pull',
    method: 'POST',
    data
  })
}

/**
 * 提交数据-立即上报
 * @param {*} data
 */
export function creditData(data) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets-port/report-info',
    method: 'POST',
    data
  })
}

/**
 * 批量导入专家列表
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/wyx-channel-services/v1/credit-assets-port/bulk-import',
    method: 'post',
    data
  })
}
