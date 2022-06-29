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

/**
 * 添加用户快捷菜单
 */
export function addMenu(data) {
  return request({
    url: '/v1/shortcutMenu/add',
    method: 'POST',
    data
  })
}

/**
 * 查询用户快捷菜单列表
 */
export function findByList(params) {
  return request({
    url: '/v1/shortcutMenu/findByList',
    method: 'get',
    params
  })
}

/**
 * 用户个性化设置
 */
export function setPersonalization(data) {
  return request({
    url: '/v1/personalization/set',
    method: 'POST',
    data
  })
}

/**
 * 查询用户个性化设置
 */
export function getPersonalization(params) {
  return request({
    url: '/v1/personalization/getPersonalization',
    method: 'get',
    params
  })
}

/**
 * 综合门户首页 查询栏目列表
 */
export function getColumnList(params) {
  return request({
    url: '/v1/column/column-lists',
    method: 'get',
    params
  })
}

/**
 * 综合门户首页 查询栏目列表
 */
export function getChineseDate(params) {
  return request({
    url: '/v1/search-engines/chinese-date',
    method: 'get',
    params
  })
}

/**
 * 查询门户权限
 */
export function getGatewayRole(params) {
  return request({
    url: '/v1/user-info/mh-menu-account',
    method: 'get',
    params
  })
}

/**
 * 门户首页 查询消息个数
 */
export function getMessageNum(params) {
  return request({
    url: '/v1/notice-message/getMessageNum',
    method: 'get',
    params
  })
}

/**
 * 门户首页 查询公告消息列表
 */
export function getNoticeList(params) {
  return request({
    url: '/v1/notice-message/notice-list',
    method: 'get',
    params
  })
}

/**
 * 获取OA 登录跳转链接
 */
export function getOaLink(params) {
  return request({
    url: '/v1/oa-info/oa-login-link',
    method: 'get',
    params
  })
}

/**
 * 获取OA 发文代办链接
 */
export function getDispatchAgentLink(params) {
  return request({
    url: '/v1/oa-info/dispatch-agent-link',
    method: 'get',
    params
  })
}

/**
 * 获取OA 收文代办链接
 */
export function getReceiptAgentLink(params) {
  return request({
    url: '/v1/oa-info/receipt-agent-link',
    method: 'get',
    params
  })
}

/**
 * 获取OA 会议通知跳转链接
 */
export function getNoticeLink(params) {
  return request({
    url: '/v1/oa-info/meeting-notice-link',
    method: 'get',
    params
  })
}

