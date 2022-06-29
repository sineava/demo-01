import request from '@/utils/request'

/**
 * 通过类型查询 类别列表
 * @param {*} params
 */
export function findByCategoryList(params) {
  return request({
    url: '/general-services/v1/safety-category/findByCategoryList',
    method: 'get',
    params
  })
}

/**
 * 分页查询安全监督检查类别
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/safety-category/pageList',
    method: 'get',
    params
  })
}

/**
 * 删除安全监督检查类别
 * @param {*} id
 */
export function deleteCategory(id) {
  return request({
    url: `/general-services/v1/safety-category/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 查询类别名称是否存在
 * @param {*} params
 */
export function nameExist(params) {
  return request({
    url: '/general-services/v1/safety-category/nameExist',
    method: 'get',
    params
  })
}

/**
 * 添加安全监督检查类别
 * @param {*} params
 */
export function addCategory(data) {
  return request({
    url: '/general-services/v1/safety-category/add',
    method: 'POST',
    data
  })
}

/**
 * 修改安全监督检查类别
 * @param {*} params
 */
export function updateCategory(data) {
  return request({
    url: '/general-services/v1/safety-category/update',
    method: 'PUT',
    data
  })
}
