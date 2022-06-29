import request from '@/utils/request'

/**
 * 行业端 分页查询企业自查项列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: '/general-services/v1/examine-item/page-hy-list',
    method: 'get',
    params
  })
}
/**
 * 企业端 分页查询企业自查项列表
 * @returns params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/examine-item/page-en-list',
    method: 'get',
    params
  })
}
/**
 * 删除企业自查项信息(通用)
 * @param {*} id
 */
export function deleteItem(id) {
  return request({
    url: `/general-services/v1/examine-item/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 企业自查项详情（通用）
 * @param {*} id
 */
export function getItem(id) {
  return request({
    url: `/general-services/v1/examine-item/get/${id}`,
    method: 'get'
  })
}

/**
 * 行业端 修改企业自查项信息
 * @param {*} data
 */
export function hyUpdateExamineItem(data) {
  return request({
    url: '/general-services/v1/examine-item/hy-update-examine-item',
    method: 'PUT',
    data
  })
}
/**
 * 企业端 修改企业自查项信息
 * @param {*} data
 */
export function updateExamineItem(data) {
  return request({
    url: '/general-services/v1/examine-item/en-update-examine-item',
    method: 'PUT',
    data
  })
}

/**
 * 行业端 添加企业自查项信息
 * @param {*} data
 */
export function hyAddExamineItem(data) {
  return request({
    url: '/general-services/v1/examine-item/hy-add-examine-item',
    method: 'POST',
    data
  })
}
/**
 * 企业端 添加企业自查项信息
 * @param {*} data
 */
export function addExamineItem(data) {
  return request({
    url: '/general-services/v1/examine-item/en-add-examine-item',
    method: 'POST',
    data
  })
}

/**
 * 企业端 分页查询企业自查项列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/examine-item/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 添加企业自查项信息
 * @param {*} data
 */
export function enAddExamineItem(data) {
  return request({
    url: '/general-services/v1/examine-item/en-add-examine-item',
    method: 'POST',
    data
  })
}

/**
 * 企业端 修改企业自查项信息
 * @param {*} data
 */
export function enUpdateExamineItem(data) {
  return request({
    url: '/general-services/v1/examine-item/en-update-examine-item',
    method: 'PUT',
    data
  })
}
