

import { queryDetail as alarmReceivingRegistrationDetail } from '@/api/emergency-services/disposal-record'
import { getAllShips } from '@/api/water-transportation-services/information/enterprise-ship'
import { personsFromDisposal } from '@/api/emergency-services/disposal-respons'
import { queryInfo as renewalRecord } from '@/api/emergency-services/disposal-fill-record'
import { pageResponseTeam } from '@/api/emergency-services/disposal-respons'
import { pageResponseMaterial } from '@/api/emergency-services/disposal-respons'
import { pageResponseExpert } from '@/api/emergency-services/disposal-respons'
/**
 * 查询接警登记详情
 * @param {*} id 
 * @returns 
 */
export function queryAlarmReceivingRegistration(id){
    return new Promise((resolve) => {
        alarmReceivingRegistrationDetail({id}).then(async res=>{
            let accidentType =  [
                { label: '水路运输事件', value: 1 },
                { label: '社会安全事件', value: 2 },
                { label: '公共卫生事件', value: 3 },
                { label: '自然灾害', value: 4 }
            ]
            let ship = await getShipsInfo(res.data.shipNumber)
            let data = {
                enterpriseName:res.data?.enterpriseName || '',//事故发生企业
                name:res.data?.name || '', //事故名称
                waters:res.data?.waters || '', //所属水域
                segment:res.data?.segment || '',//所处航段
                receivingTime:res.data?.receivingTime || '', //接警时间
                alarmPeople:res.data?.alarmPeople || '',//报警人
                alarmCall:res.data?.alarmCall,//接警电话
                occurrenceTime:res.data?.occurrenceTime,//事发时间
                accidentType:res.data.accidentType ? getNumberToName(accidentType,res.data.accidentType,'value','label') : '', //事故类别
                accidentLevel:['特别重大','重大','较大','一般'][Number(res.data.accidentLevel)],
                accidentDescribe:res.data?.accidentDescribe || '', //事故描述
                //船舶信息
                ship:ship,
                goodsName:res.data?.goodsName || '',//货物名称
                goodsNumber:res.data?.goodsNumber || '',//货物数量
                //人员信息
                persons:res.data?.persons || '',//人员总数
                injuredNumber:res.data?.injuredNumber || '',//受伤人数
                deathNumber:res.data?.deathNumber || '',//死亡人数
                missingNumber:res.data?.missingNumber || '',//失踪人数
                //影响范围
                dangerArea:res.data?.dangerArea || '',//危险区域名称
                safeRange:res.data?.safeRange || '',//最低安全范围
                protectedArea:res.data?.protectedArea || '',//重点保护范围
                accidentAfter:res.data?.accidentAfter || '',//事故经过
                address:res.data?.address || '', //详细地址

                //救援
                rescueTime:res.data?.rescueTime || '',//救援结束时间
                evacuationSituation:res.data?.evacuationSituation || '',//人员疏散情况
                rescueDescription:res.data?.rescueDescription || '',//救援结果描述
            }
            resolve(data)
        })
    })
}
/**
 * 查询船舶信息
 * @param {*} shipId 
 * @returns 
 */
export function getShipsInfo(shipId){
    return new Promise((resolve) => {
        getAllShips({
            shipId:shipId,
            isPage:true,
            pageNum:1,
            pageSize:1
        }).then(res => {
            let data = {
                shipName:res.data.records ? res.data.records[0].shipName : '', //船名
                shipType:res.data.records ? res.data.records[0].shipType : '', //船舶类型
                registryPort:res.data.records ? res.data.records[0].registryPort : '', //船籍港
                captain:res.data.records ? res.data.records[0].captain : '', //船长(米)
                width:res.data.records ? res.data.records[0].width : '', //船宽(米)
                netWeightTons:res.data.records ? res.data.records[0].netWeightTons : '', //载重(吨)
            }
            resolve(data)
        })
    })
}
/**
 * 查询应急响应信息
 * @param {*} id 
 * @returns 
 */
export function queryPersonsFromDisposal(id){
    return new Promise((resolve) => {
        personsFromDisposal({ disposalId: id }).then(res=>{
            res.data.map(item=>{
                item.types = ['应急指挥组','现场指挥部','通讯组','后勤保障部','技术专家组','资料收集组','宣传组'][Number(item.type)-1]
                return item
            })
            resolve(res.data || [])
        })
    })
}
/**
 * 查询续报记录
 * @param {*} id 
 * @returns 
 */
export function queryRenewalRecord(id){
    return new Promise((resolve)=>{
        renewalRecord({disposalId: id}).then(res=>{
            resolve(res.data || [])
        })
    })
}
/**
 * 查询应急队伍信息
 * @param {*} id 
 * @returns 
 */
export function queryPageResponseTeam(id){
    return new Promise((resolve)=>{
        pageResponseTeam({
            disposalId: id,
            pageNum: 1,
            pageSize: 200
        }).then(res => {
            let data = res.data && res.data.records ? res.data.records : []
            data.map((item,index)=>{
                item.index = index + 1
                return item
            })
            resolve(data || [])
        })
    })
}
/**
 * 查询应急物资
 * @param {*} id 
 * @returns 
 */
 export function querypageResponseMaterial(id){
    return new Promise((resolve)=>{
        pageResponseMaterial({
            disposalId: id,
            pageNum: 1,
            pageSize: 200
        }).then(res => {
            let data = res.data && res.data.records ? res.data.records : []
            data.map((item,index)=>{
                item.index = index + 1
                item.state = item.state === 1 ? '正常' : '异常'
                return item
            })
            resolve(data || [])
        })
    })
}
/**
 * 查询应急专家
 * @param {*} id 
 * @returns 
 */
 export function querypageResponseExpert(id){
    return new Promise((resolve)=>{
        pageResponseExpert({
            disposalId: id,
            pageNum: 1,
            pageSize: 200
        }).then(res => {
            let data = res.data && res.data.records ? res.data.records : []
            data.map((item,index)=>{
                item.index = index + 1
                return item
            })
            resolve(data || [])
        })
    })
}


/**
 * 编号转名称
 * @param {*} arr 
 * @param {*} Number 
 * @param {*} key 
 * @param {*} label 
 * @returns 
 */
export function getNumberToName(arr,Number,key,label){
    let name = ''
    for(let i=0;i<arr.length;i++){
        if(arr[i][key] === Number){
            name = arr[i][label]
            return name
        }
    }
    return name
}

export async function assemblyData(item) {
    let data = {
        JJDJ:await queryAlarmReceivingRegistration(item.id),
        YJXY:await queryPersonsFromDisposal(item.id),
        XBJL:await queryRenewalRecord(item.id),
        YJDW:await queryPageResponseTeam(item.id),
        YJWZ:await querypageResponseMaterial(item.id),
        YJZJ:await querypageResponseExpert(item.id)
    }
    return data
}