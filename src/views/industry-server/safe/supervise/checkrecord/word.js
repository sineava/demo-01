import { getBase64Image } from '@/components/word/exportFile'
import {fileUrlAssemble} from '@/utils/index'

//组装检查项参数
export async function assemblyCheckItemParameters(data){
    let checkItemInfoList = [] //检查项
    await Promise.all(data.map(async (item, index) => {
        let violations = [] //违规行为
        if(item.safetyTargetItemViolationVos){ 
            item.safetyTargetItemViolationVos.forEach((val,key)=>{
                violations.push(`${key+1}、${val.name}`)
            })
        }
        //检查图片
        let picture = item.checkPicture ? JSON.parse(item.checkPicture) : []
        const checkPicture = await Promise.all(picture.map(async (val) => {
            let url = val ? await fileUrlAssemble(val) : ''
            let imgData = await getBase64Image(url)
            return new Promise((resolve) => {
                resolve({src:imgData})
            })
        }))
        //签名照片
        let signature = ''
        if(item.signaturePath){
            signature = await new Promise(async (resolve) => {
                let url = item.signaturePath ? await fileUrlAssemble(item.signaturePath) : ''
                let imgData = await getBase64Image(url)
                resolve(imgData)
            })
        }
        //整改图片
        let improvementPicture = []
        if(item.rectificationVo && item.rectificationVo.improvementPicture){
            let picture = item.rectificationVo.improvementPicture ? JSON.parse(item.rectificationVo.improvementPicture) : []
            improvementPicture = await Promise.all(picture.map(async (val) => {
                let url = val ? await fileUrlAssemble(val) : ''
                let imgData = await getBase64Image(url)
                return new Promise((resolve) => {
                    resolve({src:imgData})
                })
            }))
        }
        //复查图片
        let reviewPicture = []
        if(item.reviewVo && item.reviewVo.reviewPicture){
            let picture = item.reviewVo.reviewPicture ? JSON.parse(item.reviewVo.reviewPicture) : []
            reviewPicture = await Promise.all(picture.map(async (val) => {
                let url = val ? await fileUrlAssemble(val) : ''
                let imgData = await getBase64Image(url)
                return new Promise((resolve) => {
                    resolve({src:imgData})
                })
            }))
        }

        checkItemInfoList.push({
            index:index+1,
            itemName:item.itemName || '',//检查项名称
            categoryName:item.categoryName || '',//检查项类型
            center:item.isProblem===null ? '' : (item.isProblem === 1 ? '存在问题' : (item.isProblem === 0 ? '无' : '存在隐患')), //检查结果
            isRectification:item.isRectification || '', //是否需要整改（0 否 1是）
            isRectification_str:item.isRectification ? '是' : '否', //是否需要整改描述
            isReview:item.isReview || '', //复查信息是否需复查（0 否 1是）
            isReview_str:item.isReview ? '是' : '否', // 复查信息是否需复查描述
            violations:violations.join('；'), //违规行为

            riskLevel:item.riskLevel ? item.riskLevel===1?'一般':'重大' : '', //危险等级
            inspectSituation:item.inspectSituation || '', //检查情况
            checkPicture:checkPicture, //现场照片
            signature:signature, //检查确认单
            remark:item.remark || '', //检查备注
            timeRequirement:item.timeRequirement || '', //整改时间要求
            deadlineDate:item.deadlineDate || '',//整改截止时间
            rectificationRequirement:item.rectificationRequirement || '',//整改要求
            organizationName:item.organizationName || '',//复查机构
            reviewTime:item.reviewTime || '', //复查时间

            rectificationVo:item.rectificationVo ? {
                isRectification:item.rectificationVo ? 1 : '',
                isStatus:item.rectificationVo?.isStatus ? '是' : '否', //是否整改（0否 1是）
                improvedDate:item.rectificationVo?.improvedDate || '',//整改时间
                fund:item.rectificationVo?.fund || '',//整改落实金
                directorName:item.rectificationVo?.directorName || '',//整改负责人
                improvementMeasure:item.rectificationVo?.improvementMeasure || '',//整改措施
                emergencyMeasure:item.rectificationVo?.emergencyMeasure || '',//应急保证措施
                improvementPicture:improvementPicture || [], //整改图片
            } : '',
            reviewVo:item.reviewVo ? {
                isReview:item.reviewVo ? 1 : '',
                isStatus:item.reviewVo?.isStatus ? (item.reviewVo.isStatus===1 ? '已完成' : (item.reviewVo.isStatus===2 ? '未完成' : '整改中')  ) : '', //复查完成情况（1 已完成 2未完成 3整改中）
                reviewDate:item.reviewVo?.reviewDate || '',//复查验收时间
                reviewDesc:item.reviewVo?.reviewDesc || '', //复查情况描述
                reviewer:item.reviewVo?.reviewer || '',//复查人
                reviewPicture:reviewPicture || [], //复查照片
            }: ''
        })
    }))
    return checkItemInfoList
}