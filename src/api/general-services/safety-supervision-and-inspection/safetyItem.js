import request from '@/utils/request'

/**
 * 分页查询安全监督检查列表
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/safety-item/pageList',
    method: 'get',
    params
  })
}

/**
 * 删除安全监督检查项信息
 * @param {*} id
 */
export function deleteItem(id) {
  return request({
    url: `/general-services/v1/safety-item/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 查询安全监督检查项名称是否存在
 * @param {*} params
 */
export function nameExist(params) {
  return request({
    url: '/general-services/v1/safety-item/nameExist',
    method: 'get',
    params
  })
}

/**
 * 查询所有的安全监督检查项 列表
 * @param {*} params
 */
export function findBySafetyItemList(params) {
  return request({
    url: '/general-services/v1/safety-item/findBySafetyItemList',
    method: 'get',
    params
  })
}

/**
 * 添加安全监督检查项信息
 * @param {*} data
 */
export function addItem(data) {
  return request({
    url: '/general-services/v1/safety-item/add',
    method: 'POST',
    data
  })
}

/**
 * 修改安全监督检查项信息
 * @param {*} data
 */
export function updateItem(data) {
  return request({
    url: '/general-services/v1/safety-item/update',
    method: 'PUT',
    data
  })
}
