import request from '@/utils/request'

/**
 * 分页查询安全监督检查违规行为列表
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/safety-violation/pageList',
    method: 'get',
    params
  })
}

/**
 * 删除安全监督检查违规行为
 * @param {*} id
 */
export function deleteViolation(id) {
  return request({
    url: `/general-services/v1/safety-violation/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 查询所有的安全监督检查违规行为列表
 * @param {*} params
 */
export function findBySafetyViolationList(params) {
  return request({
    url: '/general-services/v1/safety-violation/findBySafetyViolationList',
    method: 'get',
    params
  })
}

/**
 * 查询安全监督检查违规行为名称是否存在
 * @param {*} params
 */
export function nameExist(params) {
  return request({
    url: '/general-services/v1/safety-violation/nameExist',
    method: 'get',
    params
  })
}

/**
 * 添加安全监督检查违规行为
 * @param {*} data
 */
export function addViolation(data) {
  return request({
    url: '/general-services/v1/safety-violation/add',
    method: 'post',
    data
  })
}

/**
 * 修改安全监督检查违规行为
 * @param {*} data
 */
export function updateViolation(data) {
  return request({
    url: '/general-services/v1/safety-violation/update',
    method: 'PUT',
    data
  })
}
