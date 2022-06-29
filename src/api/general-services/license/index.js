import request from '@/utils/request'

/**
 * 查询营业执照历史记录列表
 * @param {*} params
 */
export function getLicenseChangeList(params) {
  return request({
    url: '/general-services/v1/water-en-jg/select-list',
    method: 'get',
    params
  })
}
/**
 * 查询营业执照历史记录详情
 * @param {*} params
 */
export function getLicenseChangeInfo(params) {
  return request({
    url: '/general-services/v1/water-en-jg/find-info',
    method: 'get',
    params
  })
}

/**
 * 更新水路运输企业信息（市场监管）
 * @param {*} data
 */
export function refreshData(data) {
  return request({
    url: '/general-services/v1/water-en-jg/refresh-data',
    method: 'post',
    data
  })
}

