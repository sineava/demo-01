import request from '@/utils/request'

/**
 * 添加移交记录
 * @param {*} data
 */
export function addTransferRecord(data) {
  return request({
    url: '/general-services/v1/transfer-record/addTransferRecord',
    method: 'post',
    data
  })
}

/**
 * 分页查询移交记录列表
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/transfer-record/pageList',
    method: 'get',
    params
  })
}

/**
 * 移交记录详情
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/transfer-record/findById/${id}`,
    method: 'get'
  })
}

/**
 * 数据分析-隐患治理主题数据-隐患信息移交
 * @param {*} params
 */
export function dataAnalysisList(params) {
  return request({
    url: '/general-services/v1/transfer-record/data-analysis-list',
    method: 'get',
    params
  })
}
