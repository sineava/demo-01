/**
 * 行业端路由
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
  // 监管能力
  {
    path: '1',
    component: 'Layout',
    children: [
      {
        path: '/supervise/newStaff',
        name: 'NewStaff',
        hidden: true,
        component: '/supervise/manager/newStaff'
      },
      {
        path: '/supervise/managerDetail',
        name: 'ManagerDetail',
        hidden: true,
        component: '/supervise/manager/detail'
      },
      {
        path: '/supervise/mdeptDetail',
        name: 'MdeptDetail',
        hidden: true,
        component: '/supervise/mdept/detail'
      },
      {
        path: '/supervise/newSystem',
        name: 'NewSystem',
        hidden: true,
        component: '/supervise/system/newSystem'
      },
      {
        path: '/supervise/systemDetail',
        name: 'SystemDetail',
        hidden: true,
        component: '/supervise/system/detail'
      },
      {
        path: '/supervise/newEducate',
        name: 'NewEducate',
        hidden: true,
        component: '/supervise/educate/newEducate'
      },
      {
        path: '/supervise/educateDetail',
        name: 'EducateDetail',
        hidden: true,
        component: '/supervise/educate/detail'
      },
      {
        path: '/supervise/newEquip',
        name: 'NewEquip',
        hidden: true,
        component: '/supervise/equip/newEquip'
      },
      {
        path: '/supervise/equipDetail',
        name: 'EquipDetail',
        hidden: true,
        component: '/supervise/equip/detail'
      },
      {
        path: '/supervise/equipRecord',
        name: 'EquipRecord',
        hidden: true,
        component: '/supervise/equip/record'
      }]
  },

  // 港口规划/岸线资源
  {
    path: '2',
    component: 'Layout',
    children: [
      {
        path: '/plan/fileEdit',
        name: 'FileEdit',
        hidden: true,
        component: '/plan/file/edit'
      },
      {
        path: '/plan/deepwaterEdit',
        name: 'DeepwaterEdit',
        hidden: true,
        component: '/plan/deepwater/edit'
      },
      {
        path: '/plan/deepwaterMoor',
        name: 'DeepwaterMoor',
        hidden: true,
        component: '/plan/deepwater/moor'
      },
      {
        path: '/plan/deepwaterMoorEdit',
        name: 'DeepwaterMoorEdit',
        hidden: true,
        component: '/plan/deepwater/moorEdit'
      },
      {
        path: '/plan/shorelineDetail',
        name: 'ShorelineDetail',
        hidden: true,
        component: '/plan/shoreline/detail'
      }
    ]
  },

  // 危险货物建设项目
  {
    path: '3',
    component: 'Layout',
    children: [
      {
        path: '/danger/buildDetail',
        name: 'BuildDetail',
        hidden: true,
        component: '/danger/build/detail'
      },
      {
        path: '/danger/buildInfo',
        name: 'BuildDetailTwo',
        hidden: true,
        component: '/danger/build/detailTwo'
      },
      {
        path: '/danger/conditionsDetail',
        name: 'ConditionsDetail',
        hidden: true,
        component: '/danger/conditions/detail'
      },
      {
        path: '/danger/facilitiesAdd',
        name: 'FacilitiesAdd',
        hidden: true,
        component: '/danger/facilities/add'
      },
      {
        path: '/danger/facilitiesDetail',
        name: 'FacilitiesDetail',
        hidden: true,
        component: '/danger/facilities/detail'
      },
      {
        path: '/danger/facilitiesInfo',
        name: 'FacilitiesDetailTwo',
        hidden: true,
        component: '/danger/facilities/detailTwo'
      },
      {
        path: '/danger/checkacceptAdd',
        name: 'CheckacceptAdd',
        hidden: true,
        component: '/danger/checkaccept/add'
      },
      {
        path: '/danger/checkacceptDetail',
        name: 'CheckacceptDetail',
        hidden: true,
        component: '/danger/checkaccept/detail'
      },
      {
        path: '/danger/checkacceptInfo',
        name: 'CheckacceptDetailTwo',
        hidden: true,
        component: '/danger/checkaccept/detailTwo'
      }
    ]
  },

  {
    path: '4',
    component: 'Layout',
    children: [
      {
        path: '/portenterprise/basicDetail',
        name: 'PortenterpriseBasicDetail',
        hidden: true,
        component: '/portenterprise/basic/detail'
      },
      {
        path: '/portenterprise/basicServiceDetail',
        name: 'BasicServiceDetail',
        hidden: true,
        component: '/portenterprise/basicService/detail'
      },
      {
        path: '/portenterprise/educate/trainingplanDetail',
        name: 'TrainingplanDetail',
        hidden: true,
        component: '/portenterprise/educate/trainingplan/detail'
      },
      {
        path: '/portenterprise/educate/trainingsituationDetail',
        name: 'TrainingsituationDetail',
        hidden: true,
        component: '/portenterprise/educate/trainingsituation/detail'
      },
      {
        path: '/portenterprise/waterDetail',
        name: 'WaterDetail',
        hidden: true,
        component: '/portenterprise/waterTrans/detail'
      },
      {
        path: '/portenterprise/investorInfoDetail',
        name: 'InvestorInfoDetail',
        hidden: true,
        component: '/portenterprise/waterTrans/components/investorInfo/detail'
      },
      {
        path: '/portenterprise/changeRecord',
        name: 'PortenterpriseChangeRecord',
        hidden: true,
        component: '/portenterprise/waterTrans/components/changeRecord/index'
      },
      {
        path: '/portenterprise/changeRecord/details',
        name: 'changeRecord',
        hidden: true,
        component: '/portenterprise/waterTrans/components/changeRecord/details'
      },
      {
        path: '/portenterprise/investorInfoEdit',
        name: 'investorInfoEdit',
        hidden: true,
        component: '/portenterprise/waterTrans/components/investorInfo/edit'
      },
      {
        path: '/portenterprise/personnelInfoDetail',
        name: 'PersonnelInfoDetail',
        hidden: true,
        component: '/portenterprise/waterTrans/components/personnelInfo/detail'
      },
      {
        path: '/portenterprise/personnelInfoEdit',
        name: 'personnelInfoEdit',
        hidden: true,
        component: '/portenterprise/waterTrans/components/personnelInfo/edit'
      },
      {
        path: '/portenterprise/licenceInfoDetail',
        name: 'LicenceInfoDetail',
        hidden: true,
        component: '/portenterprise/waterTrans/components/licenceInfo/detail'
      },
      {
        path: '/portenterprise/licenceInfoEdit',
        name: 'licenceInfoEdit',
        hidden: true,
        component: '/portenterprise/waterTrans/components/licenceInfo/edit'
      },
      {
        path: '/portenterprise/accidentInfoDetail',
        name: 'AccidentInfoDetail',
        hidden: true,
        component: '/portenterprise/waterTrans/components/accidentInfo/detail'
      },
      {
        path: '/portenterprise/managementInfoDetail',
        name: 'ManagementInfoDetail',
        hidden: true,
        component: '/portenterprise/waterTrans/components/managementInfo/detail'
      },

      // ship船管
      {
        path: '/portenterprise/shipDetail',
        name: 'ShipDetail',
        hidden: true,
        component: '/portenterprise/ship/detail'
      },
      {
        path: '/portenterprise/ship/investorInfoDetail',
        name: 'ShipInvestorInfoDetail',
        hidden: true,
        component: '/portenterprise/ship/components/investorInfo/detail'
      },
      {
        path: '/portenterprise/ship/investorInfoEdit',
        name: 'ShipInvestorInfoEdit',
        hidden: true,
        component: '/portenterprise/ship/components/investorInfo/edit'
      },
      {
        path: '/portenterprise/ship/personnelInfoDetail',
        name: 'ShipPersonnelInfoDetail',
        hidden: true,
        component: '/portenterprise/ship/components/personnelInfo/detail'
      },
      {
        path: '/portenterprise/ship/personnelInfoEdit',
        name: 'ShipPersonnelInfoEdit',
        hidden: true,
        component: '/portenterprise/ship/components/personnelInfo/edit'
      },
      {
        path: '/portenterprise/ship/licenceInfoDetail',
        name: 'ShipLicenceInfoDetail',
        hidden: true,
        component: '/portenterprise/ship/components/licenceInfo/detail'
      },
      {
        path: '/portenterprise/ship/licenceInfoEdit',
        name: 'ShipLicenceInfoEdit',
        hidden: true,
        component: '/portenterprise/ship/components/licenceInfo/edit'
      },
      {
        path: '/portenterprise/ship/accidentInfoDetail',
        name: 'ShipAccidentInfoDetail',
        hidden: true,
        component: '/portenterprise/ship/components/accidentInfo/detail'
      },
      {
        path: '/portenterprise/ship/managementInfoDetail',
        name: 'ShipManagementInfoDetail',
        hidden: true,
        component: '/portenterprise/ship/components/managementInfo/detail'
      },

      // agent代理
      {
        path: '/portenterprise/agentDetail',
        name: 'AgentDetail',
        hidden: true,
        component: '/portenterprise/agent/detail'
      }
    ]
  },

  {
    path: '5',
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
      }
    ]
  },

  {
    path: '6',
    component: 'Layout',
    children: [
      {
        path: '/enterprisecharges/freightbasisDetail',
        name: 'FreightbasisDetail',
        hidden: true,
        component: '/enterprisecharges/freightbasis/detail'
      },
      {
        path: '/enterprisecharges/chargeDetail',
        name: 'ChargeDetail',
        hidden: true,
        component: '/enterprisecharges/charge/detail'
      },
      {
        path: '/enterprisecharges/analysisDetail',
        name: 'analysisDetail',
        hidden: true,
        component: '/enterprisecharges/analysis/detail'
      }
    ]
  },

  {
    path: '7',
    component: 'Layout',
    children: [
      {
        path: '/pollution/receiveDetail',
        name: 'ReceiveDetail',
        hidden: true,
        component: '/pollution/receive/detail'
      },
      {
        path: '/pollution/transportDetail',
        name: 'transportDetail',
        hidden: true,
        component: '/pollution/transport/detail'
      }
    ]
  },

  {
    path: '8',
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
    path: '9',
    component: 'Layout',
    children: [
      {
        path: '/waterwaycompany/companyPane',
        name: 'waterwaycompanyCompanyPane',
        hidden: true,
        component: '/waterwaycompany/company/pane'
      }
    ]
  },

  {
    path: '10',
    component: 'Layout',
    children: [
      {
        path: '/shipcompany/companyPane',
        name: 'CompanyPane',
        hidden: true,
        component: '/shipcompany/company/pane'
      },
      {
        path: '/shipcompany/companystaffDetail',
        name: 'CompanystaffDetail',
        hidden: true,
        component: '/shipcompany/company/pane/staffDetail'
      },
      {
        path: '/shipcompany/companyshipDetail',
        name: 'CompanyshipDetail',
        hidden: true,
        component: '/shipcompany/company/pane/shipDetail'
      },
      {
        path: '/shipcompany/companycertDetail',
        name: 'CompanycertDetail',
        hidden: true,
        component: '/shipcompany/company/pane/certDetail'
      }
    ]
  },

  {
    path: '11',
    component: 'Layout',
    children: [
      {
        path: '/waterwayship/shipDetail',
        name: 'WaterwayshipShipDetail',
        hidden: true,
        component: '/waterwayship/ship/detail'
      }
    ]
  },

  {
    path: '12',
    component: 'Layout',
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
        path: '/safe/supervise/checkrecordCheck',
        name: 'CheckrecordCheck',
        hidden: true,
        component: '/safe/supervise/checkrecord/checkrecordCheck'
      },
      {
        path: '/safe/supervise/checkrecordCheckAdd',
        name: 'CheckrecordCheckAdd',
        hidden: true,
        component: '/safe/supervise/checkrecord/checkrecordCheckAdd'
      },
      {
        path: '/safe/supervise/checkrecordDetail',
        name: 'CheckrecordDetail',
        hidden: true,
        component: '/safe/supervise/checkrecord/checkrecordDetail'
      },
      {
        path: '/safe/supervise/rectifyDetail',
        name: 'RectifyDetail',
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
        path: '/safe/supervise/reviewRecord',
        name: 'ReviewRecord',
        hidden: true,
        component: '/safe/supervise/review/record'
      },
      {
        path: '/safe/supervise/reviewRecordDetail',
        name: 'ReviewRecordDetail',
        hidden: true,
        component: '/safe/supervise/review/recordDetail'
      },
      {
        path: '/safe/supervise/reviewDetail',
        name: 'SuperviseReviewDetail',
        hidden: true,
        component: '/safe/supervise/review/detail'
      },
      {
        path: '/safe/supervise/transferDetail',
        name: 'TransferDetail',
        hidden: true,
        component: '/safe/supervise/transfer/detail'
      },
      {
        path: '/safe/supervise/publicDetail',
        name: 'PublicDetail',
        hidden: true,
        component: '/safe/supervise/public/detail'
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
        name: 'SelfRectifyDetail',
        hidden: true,
        component: '/safe/self/rectify/detail'
      },
      {
        path: '/safe/ledger/dangertransferDetail',
        name: 'dangertransferDetail',
        hidden: true,
        component: '/safe/ledger/dangertransfer/detail'
      },
      {
        path: '/safe/ledger/dangerrecordDetail',
        name: 'dangerrecordDetail',
        hidden: true,
        component: '/safe/ledger/dangerrecord/detail'
      },
      {
        path: '/safe/ledger/companydangerDetail',
        name: 'CompanydangerDetail',
        hidden: true,
        component: '/safe/ledger/companydanger/detail'
      },
      {
        path: '/safe/data/manageAdd',
        name: 'ManageAdd',
        hidden: true,
        component: '/safe/data/manage/add'
      },
      {
        path: '/safe/data/categoryAdd',
        name: 'CategoryAdd',
        hidden: true,
        component: '/safe/data/category/add'
      },
      {
        path: '/safe/data/violationAdd',
        name: 'ViolationAdd',
        hidden: true,
        component: '/safe/data/violation/add'
      },
      {
        path: '/safe/data/behaviorAdd',
        name: 'BehaviorAdd',
        hidden: true,
        component: '/safe/data/behavior/add'
      }
    ]
  },

  {
    path: '13',
    component: 'Layout',
    children: [
      {
        path: '/archive/basicPrevious',
        name: 'BasicPrevious',
        hidden: true,
        component: '/archive/basic/previous'
      },
      {
        path: '/archive/basicPreviousDetail',
        name: 'BasicPreviousDetail',
        hidden: true,
        component: '/archive/basic/previousDetail'
      },
      {
        path: '/archive/basicArchive',
        name: 'BasicArchive',
        hidden: true,
        component: '/archive/basic/archive'
      },
      {
        path: '/archive/basicDetail',
        name: 'archiveBasicDetail',
        hidden: true,
        component: '/archive/basic/detail'
      },
      {
        path: '/archive/historyDetail',
        name: 'HistoryDetail',
        hidden: true,
        component: '/archive/history/detail'
      }
    ]
  },

  {
    path: '14',
    component: 'Layout',
    children: [
      {
        path: '/welder/welder/edit',
        name: 'Welder',
        hidden: true,
        component: '/welder/welder/edit'
      }
    ]
  },

  {
    path: '15',
    component: 'Layout',
    children: [
      {
        path: '/record/enterprise/acceptDetail',
        name: 'AcceptDetail',
        hidden: true,
        component: '/record/enterprise/accept/detail'
      },
      {
        path: '/record/safe/securityDetail',
        name: 'SecurityDetail',
        hidden: true,
        component: '/record/safe/security/detail'
      },
      {
        path: '/record/safe/addSecurity',
        name: 'AddSecurity',
        hidden: true,
        component: '/record/safe/security/add'
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
        name: 'DangerDetail',
        hidden: true,
        component: '/record/safe/danger/detail'
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
        path: '/record/water/other/noShipInfoDetail',
        name: 'WaterNoShipInfoDetail',
        hidden: true,
        component: '/record/water/no_ship_info/detail'
      },
      {
        path: '/record/water/other/passengerInfoDetail',
        name: 'WaterPassengerInfoDetail',
        hidden: true,
        component: '/record/water/passenger_transport_info/detail'
      },
      {
        path: '/record/water/other/cargoShipInfoDetail',
        name: 'WaterCargoShipInfoDetail',
        hidden: true,
        component: '/record/water/cargo_ship_info/detail'
      },
      {
        path: '/record/water/other/addCargoShip',
        name: 'WaterAddCargoShipInfo',
        hidden: true,
        component: '/record/water/cargo_ship_info/add'
      }
    ]
  },
  {
    path: '16',
    component: 'Layout',
    children: [
      {
        path: '/data/lawAdd',
        name: 'DataLawAdd',
        hidden: true,
        component: '/data/law/add'
      },
      {
        path: '/data/lawInfo',
        name: 'LawAdd',
        hidden: true,
        component: '/data/law/info'
      },
      {
        path: '/data/expertAdd',
        name: 'ExpertAdd',
        hidden: true,
        component: '/data/expert/add'
      }
    ]
  },
  {
    path: '17',
    component: 'Layout',
    children: [
      {
        path: '/emergency/data/planAdd',
        name: 'PlanAdd',
        hidden: true,
        component: '/emergency/data/plan/add'
      },
      {
        path: '/emergency/data/planDetail',
        name: 'EmergencyPlanDetail',
        hidden: true,
        component: '/emergency/data/plan/detail'
      },
      {
        path: '/emergency/data/planPost',
        name: 'PlanPost',
        hidden: true,
        component: '/emergency/data/plan/post'
      },
      {
        path: '/emergency/data/agencyEdit',
        name: 'AgencyEdit',
        hidden: true,
        component: '/emergency/data/agency/edit'
      },
      {
        path: '/emergency/data/teamAdd',
        name: 'TeamAdd',
        hidden: true,
        component: '/emergency/data/team/add'
      },
      {
        path: '/emergency/data/teamAddPost',
        name: 'TeamAddPost',
        hidden: true,
        component: '/emergency/data/team/addPost'
      },
      {
        path: '/emergency/data/teamDetail',
        name: 'TeamDetail',
        hidden: true,
        component: '/emergency/data/team/detail'
      },
      {
        path: '/emergency/data/drillplanAdd',
        name: 'DrillplanAdd',
        hidden: true,
        component: '/emergency/data/drillplan/add'
      },
      {
        path: '/emergency/data/drillplanDetail',
        name: 'DrillplanDetail',
        hidden: true,
        component: '/emergency/data/drillplan/detail'
      },
      {
        path: '/emergency/data/situationDetail',
        name: 'emergencySituationDetail',
        hidden: true,
        component: '/emergency/data/situation/detail'
      },
      {
        path: '/emergency/data/situationEdit',
        name: 'emergencySituationEdit',
        hidden: true,
        component: '/emergency/data/situation/edit'
      },
      {
        path: '/emergency/data/reserveEdit',
        name: 'ReserveEdit',
        hidden: true,
        component: '/emergency/data/reserve/edit'
      },
      {
        path: '/emergency/data/reserveResource',
        name: 'ReserveResource',
        hidden: true,
        component: '/emergency/data/reserve/resource'
      },
      {
        path: '/emergency/data/reserveResourceDetail',
        name: 'ReserveResourceDetail',
        hidden: true,
        component: '/emergency/data/reserve/resourceDetail'
      },
      {
        path: '/emergency/data/reserveResourceAdd',
        name: 'ReserveResourceAdd',
        hidden: true,
        component: '/emergency/data/reserve/resourceAdd'
      },
      {
        path: '/emergency/data/reserveResourceAddSuccess',
        name: 'ReserveResourceAddSuccess',
        hidden: true,
        component: '/emergency/data/reserve/resourceAddSuccess'
      },
      {
        path: '/emergency/data/infoEdit',
        name: 'InfoEdit',
        hidden: true,
        component: '/emergency/data/info/edit'
      },
      {
        path: '/emergency/data/infoDetail',
        name: 'InfoDetail',
        hidden: true,
        component: '/emergency/data/info/detail'
      },
      {
        path: '/emergency/data/dutyEdit',
        name: 'DutyEdit',
        hidden: true,
        component: '/emergency/data/duty/edit'
      },
      {
        path: '/emergency/data/dutyDetail',
        name: 'DutyDetail',
        hidden: true,
        component: '/emergency/data/duty/detail'
      },
      {
        path: '/emergency/data/dutyAdd',
        name: 'DutyAdd',
        hidden: true,
        component: '/emergency/data/duty/add'
      },
      {
        path: '/emergency/data/dutySituationPost',
        name: 'DutySituationPost',
        hidden: true,
        component: '/emergency/data/duty/situationPost'
      },
      {
        path: '/emergency/data/individualDetail',
        name: 'IndividualDetail',
        hidden: true,
        component: '/emergency/data/individual/detail'
      },
      {
        path: '/emergency/data/hydrologyEdit',
        name: 'HydrologyEdit',
        hidden: true,
        component: '/emergency/data/hydrology/edit'
      },
      {
        path: '/emergency/data/hydrologyDetail',
        name: 'HydrologyDetail',
        hidden: true,
        component: '/emergency/data/hydrology/detail'
      },
      {
        path: '/emergency/data/caseEdit',
        name: 'CaseEdit',
        hidden: true,
        component: '/emergency/data/case/edit'
      },
      {
        path: '/emergency/handle/handleEnrolment',
        name: 'HandleEnrolment',
        hidden: true,
        component: '/emergency/handle/handle/enrolment'
      },
      {
        path: '/emergency/handle/handlePane',
        name: 'HandlePane',
        hidden: true,
        component: '/emergency/handle/handle/pane',
        meta: { title: '应急管理 / 应急处置 / 应急处置详情'}
      },
      {
        path: '/emergency/handle/handleReceivePost',
        name: 'HandleReceivePost',
        hidden: true,
        component: '/emergency/handle/handle/pane/receivePost'
      },
      {
        path: '/emergency/data/individual/detail',
        name: 'DataIndividualDetail',
        hidden: true,
        component: '/emergency/data/individual/detail'
      },
      {
        path: '/emergency/data/meteorological/detail',
        name: 'MeteorologicalDetail',
        hidden: true,
        component: '/emergency/data/meteorological/detail'
      }
    ]
  },
  {
    path: '18',
    component: 'Layout',
    children: [
      {
        path: '/digital/transport/settingEdit',
        name: 'settingEdit',
        hidden: true,
        component: '/digital/transport/setting/edit'
      },
      {
        path: '/digital/transport/reportEdit',
        name: 'TransportReportEdit',
        hidden: true,
        component: '/digital/transport/report/edit'
      },
      {
        path: '/digital/transport/departmentEdit',
        name: 'DepartmentEdit',
        hidden: true,
        component: '/digital/transport/department/edit'
      },
      {
        path: '/digital/transport/approveEdit',
        name: 'ApproveEdit',
        hidden: true,
        component: '/digital/transport/approve/edit'
      },
      {
        path: '/digital/ship/passEdit',
        name: 'PassEdit',
        hidden: true,
        component: '/digital/ship/pass/edit'
      },
      {
        path: '/digital/ship/passShip',
        name: 'passShip',
        hidden: true,
        component: '/digital/ship/pass/ship'
      },
      {
        path: '/digital/ship/portEdit',
        name: 'PortEdit',
        hidden: true,
        component: '/digital/ship/port/edit'
      },
      {
        path: '/digital/ship/damEdit',
        name: 'DamEdit',
        hidden: true,
        component: '/digital/ship/dam/edit'
      },
      {
        path: '/digital/ship/categoryEdit',
        name: 'CategoryEdit',
        hidden: true,
        component: '/digital/ship/category/edit'
      },
      {
        path: '/digital/ship/goodsEdit',
        name: 'GoodsEdit',
        hidden: true,
        component: '/digital/ship/goods/edit'
      },
      {
        path: '/digital/ship/situationEdit',
        name: 'SituationEdit',
        hidden: true,
        component: '/digital/ship/situation/edit'
      },
      {
        path: '/digital/ship/situationDetail',
        name: 'SituationDetail',
        hidden: true,
        component: '/digital/ship/situation/detail'
      },
      {
        path: '/digital/month/reportEdit',
        name: 'MonthReportEdit',
        hidden: true,
        component: '/digital/month/report/edit'
      },
      {
        path: '/digital/month/details',
        name: 'ReportEdit',
        hidden: true,
        component: '/digital/month/report/details'
      },
      {
        path: '/digital/month/verifyEdit',
        name: 'VerifyEdit',
        hidden: true,
        component: '/digital/month/verify/edit'
      },
      {
        // 航道月报上传要求
        path: '/digital/channel/claim',
        name: 'ChannelClaim',
        hidden: true,
        component: '/digital/channel/claim/index'
      },
      {
        path: '/digital/channel/claimEdit',
        name: 'ClaimEdit',
        hidden: true,
        component: '/digital/channel/claim/edit'
      },
      {
        path: '/digital/channel/yearEdit',
        name: 'YearEdit',
        hidden: true,
        component: '/digital/channel/year/edit'
      },
      // 港航资源分布
      {
        path: '/digital/resources/dangerousGoodsDetail',
        name: 'DangerousGoodsDetail',
        hidden: true,
        component: '/digital/resources/dangerous-goods/detail'
      },
      {
        path: '/digital/resources/auxiliaryDetail',
        name: 'AuxiliaryDetail',
        hidden: true,
        component: '/digital/resources/auxiliary/detail'
      },
      {
        path: '/digital/resources/videoDetail',
        name: 'videoDetail',
        hidden: true,
        component: '/digital/resources/video/detail'
      },
      {
        path: '/digital/resources/waterwayStructuresDetail',
        name: 'AaterwayStructuresDetail',
        hidden: true,
        component: '/digital/resources/waterway-structures/detail'
      },
      {
        path: '/digital/resources/fireControlDetail',
        name: 'AireControlDetail',
        hidden: true,
        component: '/digital/resources/fire-control/detail'
      },
      {
        path: '/digital/resources/emergencyRescueDetail',
        name: 'EmergencyRescueDetail',
        hidden: true,
        component: '/digital/resources/emergency-rescue/detail'
      },
      {
        path: '/digital/resources/handlingMachineryDetail',
        name: 'HandlingMachineryDetail',
        hidden: true,
        component: '/digital/resources/handling-machinery/detail'
      },
      {
        path: '/digital/channel/monthEdit',
        name: 'MonthEdit',
        hidden: true,
        component: '/digital/channel/month/edit'
      }
    ]
  },
  {
    path: '19',
    component: 'Layout',
    children: [
      {
        path: '/intact/supervision/deptEdit',
        name: 'IntactDeptEdit',
        hidden: true,
        component: '/intact/supervision/dept/edit'
      },
      {
        path: '/intact/supervision/person/detail',
        name: 'IntactPersonDetail',
        hidden: true,
        component: '/intact/supervision/person/detail'
      },
      {
        path: '/intact/supervision/rule/detail',
        name: 'IntactRuleDetail',
        hidden: true,
        component: '/intact/supervision/rule/detail'
      },
      {
        path: '/intact/supervision/train/detail',
        name: 'TrainIntactTrainDetail',
        hidden: true,
        component: '/intact/supervision/train/detail'
      },
      {
        path: '/intact/supervision/train/detail',
        name: 'IntactTrainDetail',
        hidden: true,
        component: '/intact/supervision/train/detail'
      },
      {
        path: '/intact/supervision/equipment/detail',
        name: 'IntactEquipmentDetail',
        hidden: true,
        component: '/intact/supervision/equipment/detail'
      },
      {
        path: '/intact/supervision/equipment/record',
        name: 'IntactEquipmentRecord',
        hidden: true,
        component: '/intact/supervision/equipment/record'
      },
      {
        path: '/intact/emergency/plan/detail',
        name: 'IntactPlanDetail',
        hidden: true,
        component: '/intact/emergency/plan/detail'
      },
      {
        path: '/intact/emergency/organ/edit',
        name: 'IntactOrganDetail',
        hidden: true,
        component: '/intact/emergency/organ/edit'
      },
      {
        path: '/intact/emergency/team/detail',
        name: 'IntactTeamDetail',
        hidden: true,
        component: '/intact/emergency/team/detail'
      },
      {
        path: '/intact/emergency/reserve/edit',
        name: 'IntactReserveEdit',
        hidden: true,
        component: '/intact/emergency/reserve/edit'
      },
      {
        path: '/intact/emergency/reserve/info',
        name: 'IntactReserveInfo',
        hidden: true,
        component: '/intact/emergency/reserve/info'
      },
      {
        path: '/intact/emergency/reserve/info-edit',
        name: 'IntactReserveInfoEdit',
        hidden: true,
        component: '/intact/emergency/reserve/info-edit'
      },
      {
        path: '/intact/emergency/duty/edit',
        name: 'IntactDutyEdit',
        hidden: true,
        component: '/intact/emergency/duty/edit'
      },
      {
        path: '/intact/emergency/hydrology/edit',
        name: 'IntactHydrologyEdit',
        hidden: true,
        component: '/intact/emergency/hydrology/edit'
      },
      {
        path: '/intact/emergency/case/edit',
        name: 'IntactCaseEdit',
        hidden: true,
        component: '/intact/emergency/case/edit'
      },
      {
        path: '/intact/shoreline/file/edit',
        name: 'IntactFileEdit',
        hidden: true,
        component: '/intact/shoreline/file/edit'
      },
      {
        path: '/intact/shoreline/pier/edit',
        name: 'IntactPierEdit',
        hidden: true,
        component: '/intact/shoreline/pier/edit'
      },
      {
        path: '/intact/shoreline/pier/moor',
        name: 'IntactPierMoor',
        hidden: true,
        component: '/intact/shoreline/pier/moor'
      },
      {
        path: '/intact/shoreline/pier/moorEdit',
        name: 'IntactPierMoorEdit',
        hidden: true,
        component: '/intact/shoreline/pier/moorEdit'
      },
      {
        path: '/intact/shoreline/approve/detail',
        name: 'IntactApproveDetail',
        hidden: true,
        component: '/intact/shoreline/approve/detail'
      },
      {
        path: '/intact/danger/build/detail',
        name: 'IntactBuildDetail',
        hidden: true,
        component: '/intact/danger/build/detail'
      },
      {
        path: '/intact/danger/condition/detail',
        name: 'IntactConditionDetail',
        hidden: true,
        component: '/intact/danger/condition/detail'
      },
      {
        path: '/intact/danger/facilities/detail',
        name: 'IntactFacilitiesDetail',
        hidden: true,
        component: '/intact/danger/facilities/detail'
      },
      {
        path: '/intact/danger/checkaccept/detail',
        name: 'IntactCheckacceptDetail',
        hidden: true,
        component: '/intact/danger/checkaccept/detail'
      },
      {
        path: '/intact/portdangerousgoods/operate/detail',
        name: 'IntactOperateDetail',
        hidden: true,
        component: '/intact/portdangerousgoods/operate/detail'
      },
      {
        path: '/intact/portdangerousgoods/situation/detail',
        name: 'IntactPortdangerousgoodsSituationDetail',
        hidden: true,
        component: '/intact/portdangerousgoods/situation/detail'
      },
      {
        path: '/intact/portdangerousgoods/situation/record',
        name: 'IntactSituationRecord',
        hidden: true,
        component: '/intact/portdangerousgoods/situation/record'
      },
      {
        path: '/intact/portdangerousgoods/situation/recordEdit',
        name: 'IntactSituationRecordEdit',
        hidden: true,
        component: '/intact/portdangerousgoods/situation/recordEdit'
      },
      {
        path: '/intact/enterprise/train/situation',
        name: 'IntactSituation',
        hidden: true,
        component: '/intact/enterprise/train/situation'
      },
      {
        path: '/intact/enterprise/train/situation-detail',
        name: 'IntactSituationDetail',
        hidden: true,
        component: '/intact/enterprise/train/situation-detail'
      },
      {
        path: '/intact/enterprise/train/plan-detail',
        name: 'IntactEnterprisePlanDetail',
        hidden: true,
        component: '/intact/enterprise/train/plan-detail'
      },
      {
        path: '/intact/enterprise/practitionersDetail',
        name: 'IntactEnterprisePractitionersDetail',
        hidden: true,
        component: '/intact/enterprise/practitioners/detail'
      },
      {
        path: '/intact/enterprise/equipmentDetail',
        name: 'IntactEnterpriseEquipmentDetail',
        hidden: true,
        component: '/intact/enterprise/equipment/detail'
      },
      {
        path: '/intact/enterprise/equipmentInfo',
        name: 'IntactEnterpriseEquipmentInfo',
        hidden: true,
        component: '/intact/enterprise/equipment/info'
      },
      {
        path: '/intact/enterprise/equipment/info/detail',
        name: 'IntactEnterpriseEquipmentInfoDetail',
        hidden: true,
        component: '/intact/enterprise/equipment/infoDetail'
      },
      {
        path: '/intact/enterprise/staffDetail',
        name: 'IntactEnterpriseStaffDetail',
        hidden: true,
        component: '/intact/enterprise/staff/detail'
      },
      {
        path: '/intact/enterprise/systemDetail',
        name: 'IntactEnterpriseSystemDetail',
        hidden: true,
        component: '/intact/enterprise/system/detail'
      },
      {
        path: '/intact/ship/info/detail',
        name: 'IntactShipInfoDetail',
        hidden: true,
        component: '/intact/ship/info/detail'
      },
      {
        path: '/intact/ship/check/detail',
        name: 'IntactShipCheckDetail',
        hidden: true,
        component: '/intact/ship/check/detail'
      },
      {
        path: '/intact/ship/operating/detail',
        name: 'IntactShipOperatingDetail',
        hidden: true,
        component: '/intact/ship/operating/detail'
      },
    ]
  },
  {
    path: '20',
    component: 'Layout',
    children: [
      {
        path: '/electronic-archives/electronic-archives/detail',
        name: 'electronicArchivesDetail',
        hidden: true,
        component: '/electronic-archives/electronic-archives/detail'
      },
      {
        path: '/electronic-archives/electronic-archives/add',
        name: 'addElectronicArchives',
        hidden: true,
        component: '/electronic-archives/electronic-archives/add'
      },
      {
        path: '/electronic-archives/basic-info/detail',
        name: 'electronicBasicInfoDetail',
        hidden: true,
        component: '/electronic-archives/basic-info/detail'
      },
      {
        path: '/electronic-archives/inspection/detail',
        name: 'electronicInspectionDetail',
        hidden: true,
        component: '/electronic-archives/inspection-file/detail'
      },
      {
        path: '/digital/resources/distribution/detail',
        name: 'DigitalResourcesDistributionDetail',
        hidden: true,
        component: '/digital/resources/distribution/detail'
      },
      {
        path: '/digital/resources/distribution/moor/detail',
        name: 'DigitalDistributionDetail',
        hidden: true,
        component: '/digital/resources/distribution/moor/detail'
      }
    ]
  },
  {
    path: '21',
    component: 'Layout',
    children: [
      {
        path: '/safety-analysis-model/jurisdiction/judge',
        name: 'jurisdictionJudge',
        hidden: true,
        component: '/safety-analysis-model/jurisdiction/judge'
      },
      {
        path: '/safety-analysis-model/jurisdiction/analysis',
        name: 'jurisdictionAnalysis',
        hidden: true,
        component: '/safety-analysis-model/jurisdiction/analysis'
      },
      {
        path: '/safety-analysis-model/industry-develop/judge',
        name: 'industrydevelopJudge',
        hidden: true,
        component: '/safety-analysis-model/industry-develop/judge'
      },
      {
        path: '/safety-analysis-model/industry-develop/analysis',
        name: 'industrydevelopAnalysis',
        hidden: true,
        component: '/safety-analysis-model/industry-develop/analysis'
      },
      {
        path: '/safety-analysis-model/efficacy/judge',
        name: 'efficacyJudge',
        hidden: true,
        component: '/safety-analysis-model/efficacy/judge'
      },
      {
        path: '/safety-analysis-model/efficacy/analysis',
        name: 'efficacyAnalysis',
        hidden: true,
        component: '/safety-analysis-model/efficacy/analysis'
      },
      {
        path: '/safety-analysis-model/concentrated-area/judge',
        name: 'concentratedareaJudge',
        hidden: true,
        component: '/safety-analysis-model/concentrated-area/judge'
      },
      {
        path: '/safety-analysis-model/concentrated-area/analysis',
        name: 'concentratedareaAnalysis',
        hidden: true,
        component: '/safety-analysis-model/concentrated-area/analysis'
      },
      {
        path: '/safety-analysis-model/supervise-enterprise/judge',
        name: 'superviseenterpriseJudge',
        hidden: true,
        component: '/safety-analysis-model/supervise-enterprise/judge'
      },
      {
        path: '/safety-analysis-model/supervise-enterprise/analysis',
        name: 'superviseenterpriseAnalysis',
        hidden: true,
        component: '/safety-analysis-model/supervise-enterprise/analysis'
      },{
        path: '/safety-analysis-model/water-transport/judge',
        name: 'watertransportJudge',
        hidden: true,
        component: '/safety-analysis-model/water-transport/judge'
      },
      {
        path: '/safety-analysis-model/water-transport/analysis',
        name: 'watertransportAnalysis',
        hidden: true,
        component: '/safety-analysis-model/water-transport/analysis'
      },
    ]
  },
  {
    path: '22',
    component: 'Layout',
    children: [
      {
        path: '/means/card/details',
        name: 'CardmeansDetails',
        hidden: true,
        component: '/asset/means/card/details'
      },
      {
        path: '/means/check/details',
        name: 'MeanscheckDetails',
        hidden: true,
        component: '/asset/means/check/details'
      },
      {
        path: '/means/check/inventory',
        name: 'CheckinventoryDetails',
        hidden: true,
        component: '/asset/means/check/inventory'
      },
      {
        path: '/asset/ship/ship/edit',
        name: 'AssetShipEdit',
        hidden: true,
        component: '/asset/ship/ship/edit'
      }
    ]
  },
  {
    path: '23',
    component: 'Layout',
    children: [
      {
        path: '/lightMeans/card/details',
        name: 'meansDetails',
        hidden: true,
        component: '/asset/light-means/card/details'
      },
      {
        path: '/lightMeans/check/details',
        name: 'checkDetails',
        hidden: true,
        component: '/asset/light-means/check/details'
      },
      {
        path: '/lightMeans/check/inventory',
        name: 'inventoryDetails',
        hidden: true,
        component: '/asset/light-means/check/inventory'
      },
    ]
  },
  {
    path: '24',
    component: 'Layout',
    children: [
      {
        path: '/credit/employees/data-reporting/details',
        name: 'reportingDetails',
        hidden: true,
        component: '/credit/employees/data-reporting/details'
      },
      {
        path: '/credit/employees/data-summary/record',
        name: 'summaryRecord',
        hidden: true,
        component: '/credit/employees/data-summary/record'
      },
      {
        path: '/credit/employees/data-summary/details',
        name: 'summaryDetails',
        hidden: true,
        component: '/credit/employees/data-summary/details'
      },
      // 港口企业
      {
        path: '/credit/port/data-reporting/details',
        name: 'portReportingDetails',
        hidden: true,
        component: '/credit/port/data-reporting/details'
      },
      {
        path: '/credit/port/data-summary/record',
        name: 'portSummaryRecord',
        hidden: true,
        component: '/credit/port/data-summary/record'
      },
      {
        path: '/credit/port/data-summary/details',
        name: 'portSummaryDetails',
        hidden: true,
        component: '/credit/port/data-summary/details'
      },
      // 水路运输企业
      {
        path: '/credit/waterway/data-reporting/details',
        name: 'waterwayReportingDetails',
        hidden: true,
        component: '/credit/waterway/data-reporting/details'
      },
      {
        path: '/credit/waterway/data-summary/record',
        name: 'waterwaySummaryRecord',
        hidden: true,
        component: '/credit/waterway/data-summary/record'
      },
      {
        path: '/credit/waterway/data-summary/details',
        name: 'waterwaySummaryDetails',
        hidden: true,
        component: '/credit/waterway/data-summary/details'
      }
    ]
  },
]
