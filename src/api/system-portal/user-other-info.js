import request from '@/utils/request'

/**
 * 获取用户其他信息
 * @param {*} params
 */
export function getUserOtherInfo(params) {
  return request({
    url: `/v1/user-other-info/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 修改用户其他信息
 * @param {*} data
 */
export function updateUserOtherInfo(data) {
  return request({
    url: '/v1/user-other-info/update',
    method: 'put',
    data
  })
}
