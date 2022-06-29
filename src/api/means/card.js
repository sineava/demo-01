import request from '@/utils/request'

/**
 * 获取国标类型
 * @param {*} params
 */
export function queryAssetsType(params) {
  return request({
    url: '/ship-inspection/v1/assets-type/query',
    method: 'get',
    params
  })
}
/**
 * 获取常用分组
 * @param {*} params
 */
export function queryCommonUse(params) {
  return request({
    url: '/ship-inspection/v1/common-use/query',
    method: 'get',
    params
  })
}
/**
 * 新增常用分组
 * @param {*} params
 */
export function addCommonUse(data) {
  return request({
    url: '/ship-inspection/v1/common-use/insert-info',
    method: 'post',
    data
  })
}
/**
 * 修改常用分组
 * @param {*} params
 */
export function putCommonUse(data) {
  return request({
    url: '/ship-inspection/v1/common-use/update-info',
    method: 'put',
    data
  })
}
/**
 * 删除常用分组
 * @param {*} params
 */
export function delCommonUse(id) {
  return request({
    url: `/ship-inspection//v1/common-use/delete-info/${id}`,
    method: 'DELETE',
    data:{id:id}
  })
}
/**
 * 获取卡片列表
 * @param {*} params
 */
export function getCard(params) {
  return request({
    url: '/ship-inspection/v1/assets-card/query-page',
    method: 'get',
    params
  })
}
/**
 * 获取卡片列表-导出数据
 * @param {*} params
 */
export function getCardExcel(params) {
  return request({
    url: '/ship-inspection/v1/assets-card/query-list',
    method: 'get',
    params
  })
}
/**
 * 批量导入-卡片信息
 * @param {*} params
 */
export function excelImport(data) {
  return request({
    url: '/ship-inspection/v1/assets-card/excel-import',
    method: 'POST',
    data
  })
}

/**
 * 获取卡片详情
 * @param {*} params
 */
export function getAssetsCard(params) {
  return request({
    url: '/ship-inspection/v1/assets-card/query-info',
    method: 'get',
    params
  })
}

/**
 * 添加卡片
 * @param {*} params
 */
export function addAssetsCard(data) {
  return request({
    url: '/ship-inspection/v1/assets-card/insert-info',
    method: 'post',
    data
  })
}

/**
 * 修改卡片
 * @param {*} params
 */
export function putAssetsCard(data) {
  return request({
    url: '/ship-inspection/v1/assets-card/update-info',
    method: 'put',
    data
  })
}

/**
 * 删除卡片
 * @param {*} params
 */
export function delAssetsCard(data) {
  return request({
    url: `/ship-inspection/v1/assets-card/delete-info/${data.id}`,
    method: 'DELETE',
    data
  })
}

/**
 * 获取卡片业务
 * @param {*} params
 */
export function getoldCard(params) {
  return request({
    url: '/ship-inspection/v1/card-old/query-page',
    method: 'get',
    params
  })
}

/**
 * 获取卡片业务详情
 * @param {*} params
 */
export function getoldCardinfo(params) {
  return request({
    url: '/ship-inspection/v1/card-old/query-info',
    method: 'get',
    params
  })
}
