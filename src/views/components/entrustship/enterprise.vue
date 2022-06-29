<template>
  <el-form
    ref="securityData"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-securityData"
  >
    <div class="descriptions">
      <div class="row">
        <span class="label"><i v-if="isEdit" class="required" />企业中文名称</span>
        <span class="content">
            <el-form-item v-if="isEdit" prop="enterpriseId">
                <el-select
                    v-model="securityData.enterpriseId"
                    placeholder="请选择企业中文名称"
                    style="width: 100%;"
                    size="small"
                    @change="enterpriseChange"
                >
                    <el-option
                        v-for="item in shipManageEnList"
                        :key="item.id"
                        :label="item.enterpriseName"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <span v-else>{{ shipManageInfo.enterpriseName }}</span>
        </span>
      </div>
      <div class="row">
        <span class="label">行政区划</span>
        <span class="content">{{shipManageInfo.administrativeDivision || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">国内符合证明编号</span>
        <span class="content">{{shipManageInfo.certificateCode || '-'}}</span>
      </div>
      <div class="row">
          <span class="label">企业类型</span>
        <span class="content">{{shipManageInfo.enterpriseTypeName || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">国内符合证明发证单位</span>
        <span class="content">{{shipManageInfo.certificateUnit || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">经济类型</span>
        <span class="content">{{shipManageInfo.economicType || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">注册地址</span>
        <span class="content">{{shipManageInfo.enterpriseBusinessInfoVo.officeAddress || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">法定代表人</span>
        <span class="content">{{shipManageInfo.enterpriseBusinessInfoVo.legalPersonName || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">身份证号</span>
        <span class="content">{{shipManageInfo.legalPersonCardNo || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">电话号码</span>
        <span class="content">{{shipManageInfo.contactPhone || '-'}}</span>
      </div>
      <div class="row">
        <span class="label">注册资本</span>
        <span class="content">{{shipManageInfo.enterpriseBusinessInfoVo.registeredCapital || '-'}}</span>
      </div>
      <div class="text">
        <span class="label">经营范围</span>
        <span class="content">{{shipManageInfo.enterpriseBusinessInfoVo.allowedBusiness || '-'}}</span>
      </div>
    </div>
  </el-form>
</template>

<script>
import { getHyShipManageInfo, getShipManageEnList } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
export default {
  props: {
    isEdit: {
      type: Boolean ,
      default: false
    },
    enterpriseId:{
        type:[Number,String],
        default:''
    }
  },
  data() {
    return {
      securityData: {},
      shipManageEnList: [], // 企业列表
      shipManageInfo:{
          enterpriseBusinessInfoVo:{}
      },
      rules: {
         enterpriseName: [
          { required: true, message: '请输入无船承运人中文名称', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    enterpriseId:{
      handler(newV){
        this.init(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.init(this.enterpriseId)
    this.getEnlist()
  },
  methods: {
    init(enterpriseId){
      this.securityData = {
        enterpriseId:enterpriseId || ''
      }
      this.getEnInfo(enterpriseId)
    },
    // 查询企业列表
    async getEnlist(){
        if(!this.isEdit){
            return false
        }
        const enList = await getShipManageEnList()
        this.shipManageEnList = enList.data
    },
    //查询企业详情
    getEnInfo(id){
        if(!id){
            this.shipManageInfo = {
                enterpriseBusinessInfoVo:{}
            }
            return false
        }
        getHyShipManageInfo(id).then(res => {
            let enterpriseTypeName = ''
            switch(res.data.enterpriseType){
                case 1:
                    enterpriseTypeName = '港口企业'
                    break;
                case 2:
                    enterpriseTypeName = '港口服务企业'
                    break;
                case 3:
                    enterpriseTypeName = '水路运输企业'
                    break;
                case 4:
                    enterpriseTypeName = '水路运输代理企业'
                    break;
                case 5:
                    enterpriseTypeName = '船舶管理企业'
                    break;
                default:
                    enterpriseTypeName = '其他企业'
                    break;
            }
            this.shipManageInfo = res.data
            this.shipManageInfo.enterpriseTypeName = enterpriseTypeName
        })
    },
    //选择企业
    enterpriseChange(e){
      this.getEnInfo(e)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['securityData'].validate()
      if (valid) {
        res = {
          certificateCode:this.shipManageInfo.certificateCode,
          enterpriseId:this.shipManageInfo.id,
          enterpriseName:this.shipManageInfo.enterpriseName,
          changeOrganizationName:this.shipManageInfo.organizationName
        }
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
    }
  }
}
</script>

<style lang="scss" scoped>
.base-securityData {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }
    .descriptions {
        margin-bottom: 20px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        border-bottom: none;
        .row{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #dcdfe6;
            /deep/ .el-form-item{
                margin-bottom: 0;
                margin-top: 5px;
            }
            .label{
                width: 25%;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                font-weight: 700;
                color: #606266;
                display: block;
                float: left;
                border-right: 1px solid #dcdfe6;
                padding: 0 10px;
            }
            .content{
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
                width: 75%;
                display: block;
                float: left;
                padding: 0 10px;
            }
            &:after{
                content:"";
                display:block;
                visibility:hidden;
                clear:both;
            }
        }
        .text{
            border-bottom: 1px solid #dcdfe6;
            .label{
                line-height: 40px;
                height: 100px;
                width: 25%;
                font-weight: 700;
                color: #606266;
                display: block;
                float: left;
                border-right: 1px solid #dcdfe6;
                padding: 0 10px;
            }
            .content{
                line-height: 40px;
                width: 75%;
                display: block;
                float: left;
                padding: 0 10px;
                height: 100px;
            }
            &:after{
                content:"";
                display:block;
                visibility:hidden;
                clear:both;
            }
        }
    }
}
</style>
