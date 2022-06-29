/**
 * 企业端路由
 */
export default [
  {
    path: '0',
    component: 'Layout',
    children: [
      {
        path: '/iframes',
        name: 'iframes',
        hidden: true,
        component: '/iframe'
      }]
  },
  {
    path: '1',
    component: 'Layout',
    children: [
      {
        path: '/enterprise/basic/staffDetail',
        name: 'StaffDetail',
        hidden: true,
        component: '/port/staff/detail'
      },
      {
        path: '/enterprise/basic/staffAdd',
        name: 'staffAdd',
        hidden: true,
        component: '/port/staff/add'
      },
      {
        path: '/enterprise/basic/staffUnloadDetail',
        name: 'StaffUnloadDetail',
        hidden: true,
        component: '/port/staff/unload/detail'
      },
      {
        path: '/enterprise/basic/systemDetail',
        name: 'SystemDetail',
        hidden: true,
        component: '/port/system/detail'
      },
      {
        path: '/enterprise/basic/equipmentDetail',
        name: 'EquipmentDetail',
        hidden: true,
        component: '/port/equipment/detail'
      },
      {
        path: '/enterprise/basic/equipmentInfo',
        name: 'EquipmentInfo',
        hidden: true,
        component: '/port/equipment/info'
      },
      {
        path: '/enterprise/basic/equipmentInfoDetail',
        name: 'EquipmentInfoDetail',
        hidden: true,
        component: '/port/equipment/infoDetail'
      },
      {
        path: '/enterprise/qualification/licenseDetail',
        name: 'LicenseDetail',
        hidden: true,
        component: '/port/license/detail'
      },
      {
        path: '/enterprise/qualification/licenseHistory',
        name: 'LicenseHistory',
        hidden: true,
        component: '/port/license/history'
      },
      {
        path: '/enterprise/qualification/goodsDetail',
        name: 'GoodsDetail',
        hidden: true,
        component: '/port/goods/detail'
      },
      {
        path: '/enterprise/qualification/goodsHistory',
        name: 'GoodsHistory',
        hidden: true,
        component: '/port/goods/history'
      },
      {
        path: '/enterprise/goods/basicDetail',
        name: 'BasicDetail',
        hidden: true,
        component: '/enterprise/goods/basic/detail'
      },
      {
        path: '/enterprise/goods/reviewDetail',
        name: 'GoodsReviewDetail',
        hidden: true,
        component: '/enterprise/goods/review/detail'
      },
      {
        path: '/enterprise/goods/facilityDetail',
        name: 'FacilityDetail',
        hidden: true,
        component: '/enterprise/goods/facility/detail'
      },
      {
        path: '/enterprise/goods/acceptDetail',
        name: 'AacceptDetail',
        hidden: true,
        component: '/enterprise/goods/accept/detailTwo'
      },
      {
        path: '/enterprise/goods/facilityInfo',
        name: 'facilityInfo',
        hidden: true,
        component: '/enterprise/goods/facility/detailTwo'
      },
      {
        path: '/enterprise/goods/checkacceptAdd',
        name: 'CheckacceptAdd',
        hidden: true,
        component: '/enterprise/goods/accept/add'
      },
      {
        path: '/enterprise/deepwaterMoorEdit',
        name: 'DeepwaterMoorEdit',
        hidden: true,
        component: '/port/moor/moorEdit'
      },
      {
        path: '/enterprise/basic/organizeDetail',
        name: 'organizeDetail',
        hidden: true,
        component: '/enterprise/basic/organize/detail'
      },
    ]
  },
  {
    path: 'water',
    component: 'Layout',
    children: [
      {
        path: '/waterTrans/accidentInfoDetail',
        name: 'AccidentInfoDetail',
        hidden: true,
        component: '/waterTrans/accidentInfo/detail'
      },
      {
        path: '/waterTrans/investorInfoDetail',
        name: 'InvestorInfoDetail',
        hidden: true,
        component: '/waterTrans/investorInfo/detail'
      },
      {
        path: '/waterTrans/investorInfoEdit',
        name: 'investorInfoEdit',
        hidden: true,
        component: '/waterTrans/investorInfo/edit'
      },
      {
        path: '/waterTrans/managementInfoDetail',
        name: 'managementInfoDetail',
        hidden: true,
        component: '/waterTrans/managementInfo/detail'
      },
      {
        path: '/waterTrans/personnelInfoDetail',
        name: 'personnelInfoDetail',
        hidden: true,
        component: '/waterTrans/personnelInfo/detail'
      },
      {
        path: '/waterTrans/personnelInfoEdit',
        name: 'WaterTransPersonnelInfoEdit',
        hidden: true,
        component: '/waterTrans/personnelInfo/edit'
      },
      {
        path: '/waterTrans/licenceInfoDetail',
        name: 'licenceInfoDetail',
        hidden: true,
        component: '/waterTrans/licenceInfo/detail'
      },
      {
        path: '/waterTrans/licenceInfoEdit',
        name: 'waterTransLicenceInfoEdit',
        hidden: true,
        component: '/waterTrans/licenceInfo/edit'
      },
      {
        path: '/portenterprise/changeRecord',
        name: 'changeRecord',
        hidden: true,
        component: '/waterTrans/changeRecord/index'
      },
      {
        path: '/portenterprise/changeRecord/details',
        name: 'changeRecord',
        hidden: true,
        component: '/waterTrans/changeRecord/details'
      },
      // ship船管
      {
        path: '/ship/accidentInfoDetail',
        name: 'ShipAccidentInfoDetail',
        hidden: true,
        component: '/ship/accidentInfo/detail'
      },
      {
        path: '/ship/investorInfoDetail',
        name: 'ShipInvestorInfoDetail',
        hidden: true,
        component: '/ship/investorInfo/detail'
      },
      {
        path: '/ship/investorInfoEdit',
        name: 'ShipInvestorInfoEdit',
        hidden: true,
        component: '/ship/investorInfo/edit'
      },
      {
        path: '/ship/licenceInfoDetail',
        name: 'ShipLicenceInfoDetail',
        hidden: true,
        component: '/ship/licenceInfo/detail'
      },
      {
        path: '/ship/licenceInfoEdit',
        name: 'ShipLicenceInfoEdit',
        hidden: true,
        component: '/ship/licenceInfo/edit'
      },
      {
        path: '/ship/managementInfoDetail',
        name: 'ShipManagementInfoDetail',
        hidden: true,
        component: '/ship/managementInfo/detail'
      },
      {
        path: '/ship/personnelInfoDetail',
        name: 'shipPersonnelInfoDetail',
        hidden: true,
        component: '/ship/personnelInfo/detail'
      },
      {
        path: '/ship/personnelInfoEdit',
        name: 'shipPersonnelInfoEdit',
        hidden: true,
        component: '/ship/personnelInfo/edit'
      }
    ]
  },
  {
    path: '2',
    component: 'Layout',
    children: [
      {
        path: '/portdangerousgoods/operateDetail',
        name: 'OperateDetail',
        hidden: true,
        component: '/portdangerousgoods/operate/detail'
      },
      {
        path: '/portdangerousgoods/situationDetail',
        name: 'PortdangerousgoodsSituationDetail',
        hidden: true,
        component: '/portdangerousgoods/situation/detail'
      },
      {
        path: '/portdangerousgoods/situationRecord',
        name: 'SituationRecord',
        hidden: true,
        component: '/portdangerousgoods/situation/record'
      },
      {
        path: '/portdangerousgoods/situationRecordEdit',
        name: 'SituationRecordEdit',
        hidden: true,
        component: '/portdangerousgoods/situation/recordEdit'
      },
      {
        path: '/portdangerousgoods/workDetail',
        name: 'WorkDetail',
        hidden: true,
        component: '/portdangerousgoods/work/detail'
      }
    ]
  },
  {
    path: '3',
    component: 'Layout',
    children: [
      {
        path: '/enterprisecharge/freightbasisDetail',
        name: 'FreightbasisDetail',
        hidden: true,
        component: '/enterprisecharge/freightbasis/detail'
      },
      {
        path: '/enterprisecharge/manageAdd',
        name: 'ManageAdd',
        hidden: true,
        component: '/enterprisecharge/manage/add'
      },
      {
        path: '/enterprisecharge/manageDetail',
        name: 'ManageDetail',
        hidden: true,
        component: '/enterprisecharge/manage/detail'
      },
      {
        path: '/enterprisecharge/analysisDetail',
        name: 'AnalysisDetail',
        hidden: true,
        component: '/enterprisecharge/analysis/detail'
      }
    ]
  },
  {
    path: '4',
    component: 'Layout',
    name: 'Safe',
    redirect: '/safe/plan',
    meta: { title: '安全监督检查', icon: 'el-icon-s-help' },
    hidden: true,
    children: [
      {
        path: '/safe/supervise/planDetail',
        name: 'PlanDetail',
        hidden: true,
        component: '/safe/supervise/plan/detail'
      },
      {
        path: '/safe/supervise/noticeDetail',
        name: 'NoticeDetail',
        hidden: true,
        component: '/safe/supervise/notice/detail'
      },
      {
        path: '/safe/supervise/rectificationNoticeDetail',
        name: 'RectificationNoticeDetail',
        hidden: true,
        component: '/safe/supervise/rectification-notice/detail'
      },
      {
        path: '/safe/supervise/checkrecordDetail',
        name: 'CheckrecordDetail',
        hidden: true,
        component: '/safe/supervise/checkrecord/detail'
      },
      {
        path: '/safe/supervise/checkrecordCheckAdd',
        name: 'CheckrecordCheckAdd',
        hidden: true,
        component: '/safe/supervise/checkrecord/checkrecordCheckAdd'
      },
      {
        path: '/safe/supervise/checkrecordCheck',
        name: 'CheckrecordCheck',
        hidden: true,
        component: '/safe/supervise/checkrecord/checkrecordCheck'
      },
      {
        path: '/safe/supervise/rectifyDetail',
        name: 'SafeRectifyDetail',
        hidden: true,
        component: '/safe/supervise/rectify/detail'
      },
      {
        path: '/safe/supervise/addRectify',
        name: 'AddRectify',
        hidden: true,
        component: '/safe/supervise/rectify/addRectify'
      },
      {
        path: '/safe/supervise/reviewDetail',
        name: 'ReviewDetail',
        hidden: true,
        component: '/safe/supervise/review/detail'
      },
      {
        path: '/safe/self/itemAdd',
        name: 'ItemAdd',
        hidden: true,
        component: '/safe/self/item/add'
      },
      {
        path: '/safe/self/situationDetail',
        name: 'selfSituationDetail',
        hidden: true,
        component: '/safe/self/situation/detail'
      },
      {
        path: '/safe/self/rectifyDetail',
        name: 'RectifyDetail',
        hidden: true,
        component: '/safe/self/rectify/detail'
      },
      {
        path: '/safe/ledger/companydangerDetail',
        name: 'CompanydangerDetail',
        hidden: true,
        component: '/safe/ledger/companydanger/detail'
      },
      {
        path: '/safe/ledger/dangerrecordDetail',
        name: 'dangerrecordDetail',
        hidden: true,
        component: '/safe/ledger/dangerrecord/detail'
      }
    ]
  },
  {
    path: '5',
    component: 'Layout',
    children: [
      {
        path: '/educate/planDetail',
        name: 'EducatePlanDetail',
        hidden: true,
        component: '/educate/plan/detail'
      },
      {
        path: '/educate/situationDetail',
        name: 'SituationDetail',
        hidden: true,
        component: '/educate/situation/detail'
      }
    ]
  },
  {
    path: '6',
    component: 'Layout',
    children: [
      {
        path: '/record/enterprise/acceptDetail',
        name: 'AcceptDetail',
        hidden: true,
        component: '/record/enterprise/accept/detail'
      },
      {
        path: '/record/enterprise/addAccept',
        name: 'AddAccept',
        hidden: true,
        component: '/record/enterprise/accept/add'
      },
      {
        path: '/record/safe/securityDetail',
        name: 'SecurityDetail',
        hidden: true,
        component: '/record/safe/security/detail'
      },
      {
        path: '/record/safe/majorDetail',
        name: 'MajorDetail',
        hidden: true,
        component: '/record/safe/major/detail'
      },
      {
        path: '/record/safe/emergencyDetail',
        name: 'EmergencyDetail',
        hidden: true,
        component: '/record/safe/emergency/detail'
      },
      {
        path: '/record/safe/dangerDetail',
        name: 'SafeDangerDetail',
        hidden: true,
        component: '/record/safe/danger/detail'
      },
      {
        path: '/record/safe/addSecurity',
        name: 'AddSecurity',
        hidden: true,
        component: '/record/safe/security/add'
      },
      {
        path: '/record/safe/addMajor',
        name: 'AddMajor',
        hidden: true,
        component: '/record/safe/major/add'
      },
      {
        path: '/record/safe/addEmergency',
        name: 'AddEmergency',
        hidden: true,
        component: '/record/safe/emergency/add'
      },
      {
        path: '/record/safe/addDanger',
        name: 'AddDanger',
        hidden: true,
        component: '/record/safe/danger/add'
      },

      // 备案
      {
        path: '/record/water/waterway/accidentInfoDetail',
        name: 'WaterwayAccidentInfoDetail',
        hidden: true,
        component: '/record/water/waterway_accident_info/detail'
      },
      {
        path: '/record/water/ship/accidentInfoDetail',
        name: 'WaterShipAccidentInfoDetail',
        hidden: true,
        component: '/record/water/ship_accident_info/detail'
      },
      {
        path: '/record/water/waterway/personnelInfoDetail',
        name: 'WaterwayPersonnelInfoDetail',
        hidden: true,
        component: '/record/water/waterway_personnel_info/detail'
      },
      {
        path: '/record/water/ship/personnelInfoDetail',
        name: 'WaterShipPersonnelInfoDetail',
        hidden: true,
        component: '/record/water/ship_personnel_info/detail'
      },
      {
        path: '/record/water/waterway/entrustShipDetail',
        name: 'WaterwayEntrustShipDetail',
        hidden: true,
        component: '/record/water/waterway_entrust_ship/detail'
      },
      {
        path: '/record/water/ship/entrustShipDetail',
        name: 'WaterShipEntrustShipDetail',
        hidden: true,
        component: '/record/water/ship_entrust_ship/detail'
      },
      {
        path: '/record/water/waterway/basicInfoDetail',
        name: 'WaterwayBasicInfoDetail',
        hidden: true,
        component: '/record/water/waterway_basic_info/detail'
      },
      {
        path: '/record/water/waterway/cargoShipInfoDetail',
        name: 'WaterwayCargoShipInfoDetail',
        hidden: true,
        component: '/record/water/cargo_ship_info/add'
      },
      {
        path: '/record/water/ship/basicInfoDetail',
        name: 'WaterShipBasicInfoDetail',
        hidden: true,
        component: '/record/water/ship_basic_info/detail'
      },
      {
        path: '/record/water/other/agentInfoDetail',
        name: 'WaterAgentInfoDetail',
        hidden: true,
        component: '/record/water/water_agent_info/detail'
      },
      {
        path: '/record/water/other/addAgentInfo',
        name: 'WaterAddAgentInfo',
        hidden: true,
        component: '/record/water/water_agent_info/add'
      },
      {
        path: '/record/water/other/noShipInfoDetail',
        name: 'WaterNoShipInfoDetail',
        hidden: true,
        component: '/record/water/no_ship_info/detail'
      },
      {
        path: '/record/water/other/addNoShipInfo',
        name: 'WaterAddNoShipInfo',
        hidden: true,
        component: '/record/water/no_ship_info/add'
      },
      {
        path: '/record/water/other/passengerInfoDetail',
        name: 'WaterPassengerInfoDetail',
        hidden: true,
        component: '/record/water/passenger_transport_info/detail'
      },
      {
        path: '/record/water/other/addPassengerInfo',
        name: 'WaterAddPassengerInfo',
        hidden: true,
        component: '/record/water/passenger_transport_info/add'
      }
    ]
  },
  {
    path: '7',
    component: 'Layout',
    children: [
      {
        path: '/material/supervision/agencyDetail',
        name: 'AgencyDetail',
        hidden: true,
        component: '/material/supervision/agency/detail'
      },
      {
        path: '/material/supervision/deptDetail',
        name: 'DeptDetail',
        hidden: true,
        component: '/material/supervision/dept/detail'
      },
      {
        path: '/material/legal/legalDetail',
        name: 'LegalDetail',
        hidden: true,
        component: '/material/legal/legal/detail'
      },
      {
        path: '/material/data/itemDetail',
        name: 'ItemDetail',
        hidden: true,
        component: '/material/data/item/detail'
      },
      {
        path: '/material/data/infoDetail',
        name: 'InfoDetail',
        hidden: true,
        component: '/material/data/info/detail'
      },
      {
        path: '/material/expert/expertDetail',
        name: 'ExpertDetail',
        hidden: true,
        component: '/material/expert/expert/detail'
      },
      {
        path: '/material/danger/dangerDetail',
        name: 'DangerDetail',
        hidden: true,
        component: '/material/danger/detail'
      }
    ]
  },
  {
    path: '8',
    component: 'Layout',
    children: [
      {
        path: '/emergency/info',
        name: 'PlanInfo',
        hidden: true,
        component: '/emergency/info'
      },
      {
        path: '/emergency/planAdd',
        name: 'PlanAdd',
        hidden: true,
        component: '/emergency/plan/add'
      },
      {
        path: '/emergency/planDetail',
        name: 'EmergencyPlanDetail',
        hidden: true,
        component: '/emergency/plan/detail'
      },
      {
        path: '/emergency/planPost',
        name: 'PlanPost',
        hidden: true,
        component: '/emergency/plan/post'
      },
      {
        path: '/emergency/agencyEdit',
        name: 'AgencyEdit',
        hidden: true,
        component: '/emergency/agency/edit'
      },
      {
        path: '/emergency/teamAdd',
        name: 'TeamAdd',
        hidden: true,
        component: '/emergency/team/add'
      },
      {
        path: '/emergency/teamAddPost',
        name: 'TeamAddPost',
        hidden: true,
        component: '/emergency/team/addPost'
      },
      {
        path: '/emergency/teamDetail',
        name: 'TeamDetail',
        hidden: true,
        component: '/emergency/team/detail'
      },
      {
        path: '/emergency/drillplanAdd',
        name: 'DrillplanAdd',
        hidden: true,
        component: '/emergency/drillplan/add'
      },
      {
        path: '/emergency/drillplanDetail',
        name: 'DrillplanDetail',
        hidden: true,
        component: '/emergency/drillplan/detail'
      },
      {
        path: '/emergency/situationDetail',
        name: 'emergencySituationDetail',
        hidden: true,
        component: '/emergency/situation/detail'
      },
      {
        path: '/emergency/situationEdit',
        name: 'emergencySituationEdit',
        hidden: true,
        component: '/emergency/situation/edit'
      },
      {
        path: '/emergency/reserveEdit',
        name: 'ReserveEdit',
        hidden: true,
        component: '/emergency/reserve/edit'
      },
      {
        path: '/emergency/reserveResource',
        name: 'ReserveResource',
        hidden: true,
        component: '/emergency/reserve/resource'
      },
      {
        path: '/emergency/reserveResourceDetail',
        name: 'ReserveResourceDetail',
        hidden: true,
        component: '/emergency/reserve/resourceDetail'
      },
      {
        path: '/emergency/reserveResourceAdd',
        name: 'ReserveResourceAdd',
        hidden: true,
        component: '/emergency/reserve/resourceAdd'
      },
      {
        path: '/emergency/reserveResourceAddSuccess',
        name: 'ReserveResourceAddSuccess',
        hidden: true,
        component: '/emergency/reserve/resourceAddSuccess'
      },
      {
        path: '/emergency/infoEdit',
        name: 'InfoEdit',
        hidden: true,
        component: '/emergency/info/edit'
      },
      {
        path: '/emergency/infoDetail',
        name: 'EmergencyInfoDetail',
        hidden: true,
        component: '/emergency/info/detail'
      },
      {
        path: '/emergency/dutyEdit',
        name: 'DutyEdit',
        hidden: true,
        component: '/emergency/duty/edit'
      },
      {
        path: '/emergency/dutyAdd',
        name: 'DutyAdd',
        hidden: true,
        component: '/emergency/duty/add'
      },
      {
        path: '/emergency/dutyDetail',
        name: 'DutyDetail',
        hidden: true,
        component: '/emergency/duty/detail'
      },
      {
        path: '/emergency/dutySituationPost',
        name: 'DutySituationPost',
        hidden: true,
        component: '/emergency/duty/situationPost'
      },
      {
        path: '/emergency/individualDetail',
        name: 'IndividualDetail',
        hidden: true,
        component: '/emergency/individual/detail'
      },
      {
        path: '/emergency/hydrologyEdit',
        name: 'HydrologyEdit',
        hidden: true,
        component: '/emergency/hydrology/edit'
      },
      {
        path: '/emergency/hydrologyDetail',
        name: 'HydrologyDetail',
        hidden: true,
        component: '/emergency/hydrology/detail'
      },
      {
        path: '/emergency/caseEdit',
        name: 'CaseEdit',
        hidden: true,
        component: '/emergency/case/edit'
      }
    ]
  },
  {
    path: '9',
    component: 'Layout',
    children: [
      {
        path: '/risk/activityDetail',
        name: 'riskActivityDetail',
        hidden: true,
        component: '/risk/risk-activity/detail'
      },
      {
        path: '/risk/eventList',
        name: 'riskEventList',
        hidden: true,
        component: '/risk/risk-event/list'
      },
      {
        path: '/risk/eventListDetail',
        name: 'riskEventListDetail',
        hidden: true,
        component: '/risk/risk-event/detail'
      },
      {
        path: '/risk/gradeAssessment',
        name: 'riskGradeAssessment',
        hidden: true,
        component: '/risk/risk-grade/assessment'
      },
      {
        path: '/risk/gradeResoult',
        name: 'riskGradeResoult',
        hidden: true,
        component: '/risk/risk-grade/resoult'
      },
      {
        path: '/risk/controlList',
        name: 'riskControlList',
        hidden: true,
        component: '/risk/risk-control/record-list'
      },
      {
        path: '/risk/controlDetail',
        name: 'riskControlDetail',
        hidden: true,
        component: '/risk/risk-control/record-detail'
      },
      {
        path: '/risk/registerDetail',
        name: 'riskRegisterDetail',
        hidden: true,
        component: '/risk/risk-register/detail'
      },
      {
        path: '/risk/reportDetail',
        name: 'riskReportDetail',
        hidden: true,
        component: '/risk/risk-report/detail'
      }
    ]
  },
  {
    path: '10',
    component: 'Layout',
    children: [
      {
        path: '/plan/deepwaterEdit',
        name: 'DeepwaterEdit',
        hidden: true,
        component: '/plan/deepwater/edit'
      }
    ]
  },
  {
    path: '11',
    component: 'Layout',
    children: [
      {
        path: '/safety-analysis-model/supervise-enterprise/judge',
        name: 'efficacyJudge',
        hidden: true,
        component: '/topic/safety-analysis-model/supervise-enterprise/judge'
      },
      {
        path: '/safety-analysis-model/supervise-enterprise/analysis',
        name: 'efficacyAnalysis',
        hidden: true,
        component: '/topic/safety-analysis-model/supervise-enterprise/analysis'
      }
    ]
  }
]
