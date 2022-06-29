import request from '@/utils/request'

/**
 * 企业端填写企业自查整改情况
 * @param {*} data
 */
export function addRectificationSituation(data) {
  return request({
    url: '/general-services/v1/rectification-situation/add-rectification-situation',
    method: 'put',
    data
  })
}

/**
 * 查询企业自查整改情况详情（通用）
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/general-services/v1/rectification-situation/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询企业自查整改情况列表
 * @param {*} params
 */
export function getPageEnList(params) {
  return request({
    url: '/general-services/v1/rectification-situation/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 行业端 分页查询企业自查整改情况列表
 * @param {*} params
 */
export function getPageHyList(params) {
  return request({
    url: '/general-services/v1/rectification-situation/page-hy-list',
    method: 'get',
    params
  })
}
