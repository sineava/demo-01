import request from '@/utils/request'

/**
 * 用户菜单列表
 * @param {*} params
 */
export function getMenusList(params) {
  return request({
    url: '/v1/userMenu/menus-list',
    method: 'get',
    params
  })
}
