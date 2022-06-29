import request from '@/utils/request'

/**
 * 删除应急队伍记录
 * @param {*} params
 */
export function deleteTeam(params) {
  return request({
    url: `/wyx-emergency-services/v1/team/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 应急队伍行业-企业分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/team/page-list',
    method: 'get',
    params
  })
}

/**
 * 应急队伍-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/team/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 应急队伍详情查询
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/team/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增应急队伍记录
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-emergency-services/v1/team/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改应急队伍记录
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-emergency-services/v1/team/update-info',
    method: 'put',
    data
  })
}
