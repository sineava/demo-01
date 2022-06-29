import request from '@/utils/request'

/**
 * 搜索列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/v1/search-engines/search-engines-list',
    method: 'get',
    params
  })
}
