import request from '@/utils/request'

/**
 * 添加用户快捷菜单
 * @param {*} data
 */
export function addMenu(data) {
  return request({
    url: '/v1/shortcutMenu/add',
    method: 'post',
    data
  })
}

/**
 * 查询用户快捷菜单列表
 * @param {*} params
 */
export function findMenu(params) {
  return request({
    url: '/v1/shortcutMenu/findByList',
    method: 'get',
    params
  })
}
