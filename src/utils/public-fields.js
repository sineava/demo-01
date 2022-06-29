/**
 * 前后端约定公共字段
 */

// 港口业务-危险建设项目-建设项目信息
const constructionProject = {
  data() {
    return {
      // 投资来源
      investmentSource: [
        { value: 1, label: '中央投资' },
        { value: 2, label: '中央与地方政府合资' },
        { value: 3, label: '地方政府投资' },
        { value: 4, label: '国内企事业单位投资' },
        { value: 5, label: '港澳台及外商投资' }
      ],
      // 项目等级
      projectLevel: [
        { value: 1, label: '国家重点' },
        { value: 2, label: '省重点' },
        { value: 3, label: '地市' },
        { value: 4, label: '其他' }
      ],
      // 建设类别
      type: [
        { value: 1, label: '码头' },
        { value: 2, label: '库场' },
        { value: 3, label: '堆场' },
        { value: 4, label: '储罐' },
        { value: 5, label: '其它' }
      ],
      // 建设性质
      nature: [
        { value: 1, label: '改建' },
        { value: 2, label: '新建' },
        { value: 3, label: '扩建' },
        { value: 4, label: '迁建' },
        { value: 5, label: '改造' },
        { value: 9, label: '其它' }
      ],
      // 立项部门级别
      departmentLevel: [
        { value: 1, label: '国家级' },
        { value: 2, label: '省级' },
        { value: 3, label: '地市级' },
        { value: 4, label: '县级' }
      ]
    }
  }
}

// 港口业务-危险建设项目-安全设施设计审查
const portSafetyFacilityDesignReview = {
  data() {
    return {
      isPass: [
        { value: 3, label: '通过' },
        { value: 4, label: '退回' }
      ],
      reviewState: [
        { value: 1, label: '已受理' },
        { value: 2, label: '审核中' },
        { value: 3, label: '审核通过' },
        { value: 4, label: '退回' }
      ]
    }
  }
}

// 港口业务-港口企业收费管理
const chargeIndustry = {
  data() {
    return {
      tableType: [
        { value: 'CONVERSION_WEIGHT', label: '特殊货物重量换算表' },
        { value: 'DOMESTIC_TRADE_GOODS', label: '内贸货物港务信息表' },
        { value: 'FACILITY_SECURITY', label: '港口设施安保费信息表' },
        { value: 'FOREIGN_TRADE_GOODS', label: '外贸货物港务信息表' },
        { value: 'PILOT', label: '航行国内航线船舶长江或嘉陵江水系引航费表' },
        { value: 'SHIPS_SAILING_DOMESTIC_ROUTES', label: '航行国内航线船舶港口收费标准' },
        { value: 'SHIP_TUG', label: '航行内河航线船舶拖轮费' }
      ]
    }
  }
}

// 应急业务-应急预案
const emergencyPlan = {
  data() {
    return {
      field_responseLevel: [
        { value: 1, label: '省级' },
        { value: 2, label: '市级' },
        { value: 3, label: '县级' },
        { value: 4, label: '企业级' },
        { value: 9, label: '其他' }
      ],
      field_type: [
        { value: 1, label: '综合预案' },
        { value: 2, label: '专项预案' }
      ],
      field_state: [
        { value: 1, label: '未发布' },
        { value: 2, label: '已发布' }
      ]
    }
  }
}

// 应急业务-应急演练计划
const emergencyTrain = {
  data() {
    return {
      planType: [
        { value: 1, label: '应急演练' },
        { value: 2, label: '综合演练' }
      ],
      postStatus: [
        { value: 1, label: '未发布' },
        { value: 2, label: '已发布' }
      ]
    }
  }
}

// 应急业务-应急物资
const emergencyGoods = {
  data() {
    return {
      // 应急物资状态
      field_state: [
        { value: 1, label: '正常' },
        { value: 2, label: '异常' }
      ],
      // 应急物资类型
      field_type: [
        { value: 1, label: '溢油污染清除物资' },
        { value: 2, label: '危化品污染清除物资' },
        { value: 3, label: '水上人命救生应急物资' },
        { value: 4, label: '应急救援个人防护物资' }
      ],
      // 应急物资细类
      field_detailedType: [
        [
          { value: 1, label: '围油栏' },
          { value: 2, label: '吸油毡' },
          { value: 3, label: '吸油拖栏' },
          { value: 4, label: '吸油索' },
          { value: 5, label: '消油剂' },
          { value: 6, label: '凝油剂' },
          { value: 7, label: '收油机' },
          { value: 8, label: '卸载泵' },
          { value: 9, label: '水下抽油设备' },
          { value: 10, label: '存油转驳和储油设备' },
          { value: 11, label: '高压清洗机' },
          { value: 12, label: '起吊设备' },
          { value: 13, label: '作业船/运输车辆' },
          { value: 0, label: '其它' }
        ],
        [
          { value: 14, label: '泄露监测/检测设备' },
          { value: 15, label: '应急围控设备' },
          { value: 16, label: '喷水装置' },
          { value: 17, label: '消防泵' },
          { value: 18, label: '中和物质' },
          { value: 19, label: '惰性物质' },
          { value: 20, label: '吸收材料' },
          { value: 21, label: '卸载泵' },
          { value: 22, label: '过驳船舶' },
          { value: 23, label: '应急信息系统' },
          { value: 24, label: '人员防护装备' },
          { value: 25, label: '疏浚设备' },
          { value: 0, label: '其它' }
        ],
        [
          { value: 26, label: '应急拖缆' },
          { value: 27, label: '撇缆枪' },
          { value: 28, label: '救生攀爬网' },
          { value: 29, label: '救生衣' },
          { value: 30, label: '救生圈' },
          { value: 31, label: '救生绳' },
          { value: 32, label: '救生软梯' },
          { value: 33, label: '气胀式救生筏' },
          { value: 34, label: '充气救生滑梯' },
          { value: 35, label: '捞网、吊篮' },
          { value: 36, label: '监测搜救设备' },
          { value: 37, label: '机动救生艇' },
          { value: 38, label: '药品' },
          { value: 39, label: '衣被' },
          { value: 40, label: '食品、淡水' },
          { value: 41, label: '救生医疗器材' },
          { value: 42, label: '防爆式手持对讲机' },
          { value: 43, label: '海事卫星电话（车载）' },
          { value: 44, label: '海事卫星电话（手持）' },
          { value: 0, label: '其它' }
        ],
        [
          { value: 45, label: '普通防护服' },
          { value: 46, label: '内置式重型防化服' },
          { value: 47, label: '封闭式防化服' },
          { value: 48, label: '全棉防静电外衣' },
          { value: 49, label: '保温工作服' },
          { value: 50, label: '防浸服' },
          { value: 51, label: '正压式空气呼吸器' },
          { value: 52, label: '防毒面具' },
          { value: 53, label: '酸碱手套' },
          { value: 54, label: '护目镜' },
          { value: 0, label: '其它' }
        ]
      ]
    }
  }
}

// 应急业务-事故案例
const emergencyCase = {
  data() {
    return {
      field_category: [
        { value: 1, label: '水路运输事件' },
        { value: 2, label: '社会安全事件' },
        { value: 3, label: '公共卫生事件' },
        { value: 4, label: '自然灾害' }
      ],
      field_level: [
        { value: 1, label: '特别重大' },
        { value: 2, label: '重大' },
        { value: 3, label: '较大' },
        { value: 4, label: '一般' }
      ]
    }
  }
}

// 应急处置-接警登记
const disposalRecord = {
  data() {
    return {
      accidentType: [
        { label: '水路运输事件', value: 1 },
        { label: '社会安全事件', value: 2 },
        { label: '公共卫生事件', value: 3 },
        { label: '自然灾害', value: 4 }
      ],
      accidentLevel: [
        { label: '特别重大', value: 1 },
        { label: '重大', value: 2 },
        { label: '较大', value: 3 },
        { label: '一般', value: 4 }
      ]
    }
  }
}

// 港口业务-岸线规划
const shoreLine = {
  data() {
    return {
      channel: [
        { value: 1, label: '长江' },
        { value: 2, label: '嘉陵江' },
        { value: 3, label: '乌江' },
        { value: 4, label: '涪江' },
        { value: 5, label: '渠江' },
        { value: 6, label: '大宁河7' },
        { value: 7, label: '小江' },
        { value: 8, label: '梅溪河' },
        { value: 9, label: '綦江' }
      ]
    }
  }
}

// 港口业务-危险货物存量
const dangerGoods = {
  data() {
    return {
      dangerousGoodsType: [
        { value: 1, label: '爆炸品' },
        { value: 2, label: '气体（压缩、液化或加压溶解的）' },
        { value: 3, label: '易燃液体' },
        { value: 4, label: '易燃固体或物质' },
        { value: 5, label: '氧化物质（氧化剂）与有机过氧化物' },
        { value: 6, label: '有毒的（毒性的）物质和感染性物质' },
        { value: 7, label: '放射性物质' },
        { value: 8, label: '腐蚀性物质' },
        { value: 9, label: '杂类危险物质' }
      ],
      mode: [
        { value: 1, label: '进' },
        { value: 2, label: '出' }
      ]
    }
  }
}

// 节假日
const timePeriod = {
  data() {
    return {
      field_holiday: [
        { value: '元旦节', label: '元旦节' },
        { value: '春节', label: '春节' },
        { value: '清明节', label: '清明节' },
        { value: '劳动节', label: '劳动节' },
        { value: '端午节', label: '端午节' },
        { value: '中秋节', label: '中秋节' },
        { value: '国庆节', label: '国庆节' },
        { value: '其他', label: '其他' }
      ],
      field_approvalStatus: [
        { value: 1, label: '未审核' },
        { value: 2, label: '审核通过' },
        { value: 3, label: '退回' }
      ],
      field_importantStatus: [
        { value: 1, label: '未上报' },
        { value: 2, label: '正常上报' },
        { value: 3, label: '延期未上报' },
        { value: 4, label: '延期上报' }
      ]
    }
  }
}

// 船舶过闸>港口信息
const shipPort = {
  data() {
    return {
      field_upsideType: [
        { value: 2, label: '上行始发港' },
        { value: 1, label: '上行到达港' }
      ],
      field_downsideType: [
        { value: 1, label: '下行始发港' },
        { value: 2, label: '下行到达港' }
      ]
    }
  }
}

// 船舶过闸>船舶分类
const shipCategory = {
  data() {
    return {
      field_isManyTimesDeclare: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      field_isMerchantShip: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      field_kind: [
        { value: 1, label: '工程船' },
        { value: 2, label: '货船' },
        { value: 3, label: '客船' },
        { value: 4, label: '公务船' },
        { value: 5, label: '其他船' }
      ],
      field_priority: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 }
      ]
    }
  }
}

// 消息类型
const newsInfo = {
  data() {
    return {
      noticeType: [
        {label: '内部公告', value: 1},
        {label: '港口公告', value: 2},
        {label: '水路运输公告', value: 3},
        {label: '航道公告', value: 4},
        {label: '应急公告', value: 5},
        {label: '船检公告', value: 6},
        {label: '海事公告', value: 7},
        {label: '综合类公告', value: 8}
      ]
    }
  }
}

export {
  constructionProject,
  portSafetyFacilityDesignReview,
  chargeIndustry,
  emergencyPlan,
  emergencyTrain,
  emergencyGoods,
  emergencyCase,
  disposalRecord,
  shoreLine,
  dangerGoods,
  timePeriod,
  shipPort,
  shipCategory,
  newsInfo
}
