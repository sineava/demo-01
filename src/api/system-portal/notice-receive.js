import request from '@/utils/request'

/**
 * 接收方删除通知消息
 * @param {*} params
 */
export function deleteNotice(params) {
  return request({
    url: `/v1/notice-receive/delete-info/${params.noticeId}`,
    method: 'delete'
  })
}

/**
 * 接收方根据通知类型查询列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/v1/notice-receive/pageList',
    method: 'get',
    params
  })
}

/**
 * 读取消息
 * @param {*} params
 */
export function readInfo(params) {
  return request({
    url: '/v1/notice-receive/read-info',
    method: 'get',
    params
  })
}

/**
 * 接收方首页公告集
 * @param {*} params
 */
export function readNoticeAll(params) {
  return request({
    url: '/v1/notice-receive/read-notice-all',
    method: 'get',
    params
  })
}

/**
 * 接收方首页未读数量集(除了公告)
 * @param {*} params
 */
export function readUnreadAll(params) {
  return request({
    url: '/v1/notice-receive/read-unread-all',
    method: 'get',
    params
  })
}

/**
 * 接收方首页未读信息集
 * @param {*} params
 */
export function readUnReadAll(params) {
  return request({
    url: '/v1/notice-receive/read-unread-all',
    method: 'get',
    params
  })
}

/**
 * 接收方修改（设置标记类型、设置已读未读）通知消息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/v1/notice-receive/update-info',
    method: 'put',
    data
  })
}
