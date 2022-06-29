/*
 *
 * 判断给出的坐标点是否在多边形内
 *
 */
export function isInPolygon(checkPoint, polygonPoints) {
  let counter = 0
  let i
  let xinters
  let p1; let p2
  let pointCount = polygonPoints.length
  p1 = polygonPoints[0]

  for (i = 1; i <= pointCount; i++) {
    p2 = polygonPoints[i % pointCount]
    if (
      checkPoint[0] > Math.min(p1[0], p2[0]) &&
          checkPoint[0] <= Math.max(p1[0], p2[0])
    ) {
      if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
        if (p1[0] !== p2[0]) {
          xinters =
                      (checkPoint[0] - p1[0]) *
                          (p2[1] - p1[1]) /
                          (p2[0] - p1[0]) +
                      p1[1]
          if (p1[1] === p2[1] || checkPoint[1] <= xinters) {
            counter++
          }
        }
      }
    }
    p1 = p2
  }
  return counter % 2 !== 0
}
/**
 * 获取两点之间的距离
 * @param {*} lat1 坐标点1纬度
 * @param {*} lng1 坐标点1经度
 * @param {*} lat2 坐标点2纬度
 * @param {*} lng2 坐标点2经度
 * @returns 两点之间的距离（米）
 */
export function getDistance(lat1, lng1, lat2, lng2) {
  let radLat1 = lat1 * Math.PI / 180.0
  let radLat2 = lat2 * Math.PI / 180.0
  let a = radLat1 - radLat2
  let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10
  return s
}
