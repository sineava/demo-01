import request from '@/utils/request'

/**
 * 行业端端 隐患移交记录
 * @param {*} params
 */
export function getHyList(params) {
  return request({
    url: '/general-services/v1/hidden-danger-account/transfer-record-list',
    method: 'get',
    params
  })
}

/**
 * 安全监督检查隐患台账记录详情（通用）
 * @param {*} id
 */
export function getDetails(id) {
  return request({
    url: `/general-services/v1/hidden-danger-account/transfer-record-details//${id}`,
    method: 'get'
  })
}
