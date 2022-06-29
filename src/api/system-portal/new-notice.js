import request from '@/utils/request'

/**
 * 分页查询公告消息列表
 * @param {*} params
 */
export function getNoticeList(params) {
  return request({
    url: '/v1/notice-message/page-list',
    method: 'get',
    params
  })
}

/**
 * 通过ID查询公告详情
 * @param {*} id
 */
export function getNoticeDetail(id) {
  return request({
    url: `/v1/notice-message/get/${id}`,
    method: 'get',
  })
}

/**
 * 门户 接收/发布公告消息
 * @param {*} data
 */
export function setNoticeData(data) {
  return request({
    url: '/v1/notice-message/add-notice-message',
    method: 'post',
    data
  })
}

/**
 * 获取常用联系人
 * @param {*} data
 */
export function getCommonUsed() {
  return request({
    url: '/v1/common-use/query',
    method: 'get',
  })
}

/**
 * 添加常用联系人分组
 * @param {*} data
 */
export function addCommonUsed(data) {
  return request({
    url: '/v1/common-use/insert-info',
    method: 'post',
    data
  })
}

/**
 * 修改常用联系人分组
 * @param {*} data
 */
export function putCommonUsed(data) {
  return request({
    url: '/v1/common-use/update-info',
    method: 'put',
    data
  })
}
/**
 * 删除常用联系人分组
 * @param {*} data
 */
export function delCommonUsed(data) {
  return request({
    url: `/v1/common-use/delete-info/${data.id}`,
    method: 'DELETE',
    data
  })
}

/**
 * 获取组织机构部门列表
 * @param {*} data
 */
export function getOrgList(params) {
  return request({
    url: '/general-services/v1/external/org-list',
    method: 'get',
    params
  })
}

/**
 * 发文待办分页列表
 * @param {*} params
 */
export function getDispatchList(params) {
  return request({
    url: '/v1/dispatch-backlog/list',
    method: 'get',
    params
  })
}

/**
 * 发文待办数据详情
 * @param {*} dispatchBacklogId
 */
export function getDispatchInfo(dispatchBacklogId) {
  return request({
    url: `/v1/dispatch-backlog/info/${dispatchBacklogId}`,
    method: 'get',
  })
}

/**
 * 收文待办分页列表
 * @param {*} params
 */
export function getIncomingList(params) {
  return request({
    url: '/v1/incoming-dispatches-backlog/list',
    method: 'get',
    params
  })
}

/**
 * 收文待办详情
 * @param {*} incomingDispatchesBacklogId
 */
export function getIncomingInfo(incomingDispatchesBacklogId) {
  return request({
    url: `/v1/incoming-dispatches-backlog/info/${incomingDispatchesBacklogId}`,
    method: 'get'
  })
}

/**
 * 分页查询特批消息列表
 * @param {*} params
 */
export function getExamineList(params) {
  return request({
    url: '/v1/examine-message/page-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询会议消息列表
 * @param {*} params
 */
export function getMeetingList(params) {
  return request({
    url: '/v1/meeting-message/page-list',
    method: 'get',
    params
  })
}

/**
 * 通过ID查询会议通知详情
 * @param {*} id
 */
export function getMeetingInfo(id) {
  return request({
    url: `/v1/meeting-message/get/${id}`,
    method: 'get',
  })
}

/**
 * 分页查询通知消息列表（收信息）
 * @param {*} params
 */
export function getAdviseList(params) {
  return request({
    url: '/v1/advise-message/page-list',
    method: 'get',
    params
  })
}

/**
 * 查询已发送消息列表(已发送)
 * @param {*} params
 */
export function getAdviseSendList(params) {
  return request({
    url: '/v1/advise-message/sent-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询通知消息列表（已删除）
 * @param {*} params
 */
export function getAdviseDelList(params) {
  return request({
    url: '/v1/advise-message/del-page-list',
    method: 'get',
    params
  })
}

/**
 * 发布/接收消息信息
 * @param {*} data
 */
export function setMessageData(data) {
  return request({
    url: '/v1/advise-message/add-advise-message',
    method: 'post',
    data
  })
}

/**
 * 通过ID查询通知详情（收信息/已删除）
 * @param {*} id
 */
export function getAdviseInfo(id) {
  return request({
    url: `/v1/advise-message/get/${id}`,
    method: 'get'
  })
}

/**
 * 已发送消息详情
 * @param {*} id
 */
export function getAdviseSentInfo(id) {
  return request({
    url: `/v1/advise-message/sent-message-info/${id}`,
    method: 'get'
  })
}

/**
 * 标记消息
 * @param {*} data
 */
export function setSignMessage(data) {
  return request({
    url: `/v1/advise-message/sign-message`,
    method: 'put',
    data
  })
}
