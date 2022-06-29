<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    class="base-ruleForm"
  >
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 设施设备基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="ruleForm-title"
      contentClassName="ruleForm-text"
      border
    >
      <el-descriptions-item :span="2">
        <template slot="label">企业名称:</template>
        {{ ruleForm.enterpriseName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />设施/设备名称:</template>
        <el-form-item v-if="isEdit" prop="facilityName">
          <el-input
            v-model.trim="ruleForm.facilityName"
            placeholder="请输入设施/设备名称"
            maxlength="30"
          />
        </el-form-item>
        <span v-else>{{ruleForm.facilityName}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />设施/设备类别:</template>
        <el-form-item v-if="isEdit && !ruleForm.id" prop="facilityCategory">
          <el-select
            v-model="ruleForm.facilityCategory"
            clearable
            placeholder="请选择设施/设备类别"
            style="width: 100%;"
          >
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{getTypeName(ruleForm.facilityCategory)}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />负责人姓名:</template>
        <el-form-item v-if="isEdit" prop="directorName">
          <el-input
            v-model.trim="ruleForm.directorName"
            placeholder="请输入负责人姓名"
            maxlength="20"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.directorName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactNumber">
          <el-input
            v-model.trim="ruleForm.contactNumber"
            maxlength="11"
            placeholder="请输入联系电话"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.contactNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />备注:</template>
        <el-form-item v-if="isEdit" prop="remark">
          <el-input
            v-model.trim="ruleForm.remark"
            type="textarea"
            rows="6"
            maxlength="200"
            show-word-limit
            placeholder="请输入备注"
          />
        </el-form-item>
        <span v-else>{{ ruleForm.remark }}</span>
      </el-descriptions-item>
    </el-descriptions>
    
    <template v-if="ruleForm.facilityCategory">
        <div class="icon-title" style="margin-top: 20px;">
          <span class="span" /> {{getTypeName(ruleForm.facilityCategory)}}信息
        </div>
        <DeviceDetails ref="DeviceDetails" :isEdit="isEdit" :facilityCategory="Number(ruleForm.facilityCategory)" :data="childData"/>
    </template>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import DeviceDetails from './device-details'
import { telephone } from '@/utils/validate'
export default {
  components: {
    DeviceDetails
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    }
  },
  data() {
    return {
      ruleForm: {},
      childData:{},
      childPorp:'',
      type: [
        // { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
      ],
      rules: {
        facilityName: [
          { required: true, message: '请输入设施/设备名称', trigger: 'blur' }
        ],
        facilityCategory:[
          { required: true, message: '请选择设施/设备类别', trigger: 'change' }
        ],
        directorName: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, message: '联系电话格式错误', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    getTypeName(type){
        let name = ''
        for(let i=0;i<this.type.length;i++){
            if(Number(type)===Number(this.type[i].value)){
                name = this.type[i].label
                return name
            }
        }
        return name
    },
    initIicense(data){
      this.ruleForm = {
        id: data?.id,
        enterpriseId:data?.enterpriseId,
        enterpriseName:data?.enterpriseName,
        facilityName:data?.facilityName,
        facilityCategory:data?.facilityCategory,
        directorName:data?.directorName,
        contactNumber:data?.contactNumber,
        remark:data?.remark
      }
      if(data.facilityCategory){
        switch(Number(data.facilityCategory)){
          case 1:// 企业设施设备泊位信息
            this.childData = data?.enterpriseFacilityBerthInfoVo || {}
            this.childPorp = 'enterpriseFacilityBerthInfoDto'
            break;
          case 2://设施设备储罐信息
            this.childData = data?.enterpriseFacilityTankInfoVo || {}
            this.childPorp = 'enterpriseFacilityTankInfoDto'
            break;
          case 3://企业设施设备堆场信息
            this.childData = data?.enterpriseFacilityYardInfoVo || {}
            this.childPorp = 'enterpriseFacilityYardInfoDto'
            break;
          case 4://企业设施设备仓库信息
            this.childData = data?.enterpriseFacilityWarehouseInfoVo || {}
            this.childPorp = 'enterpriseFacilityWarehouseInfoDto'
            break;
          case 5://企业设施设备趸船信息
            this.childData = data?.enterpriseFacilityPontoonInfoVo || {}
            this.childPorp = 'enterpriseFacilityPontoonInfoDto'
            break;
          case 6://企业设施设备环保设信息
            this.childData = data?.enterpriseFacilityEnvironmentInfoVo || {}
            this.childPorp = 'enterpriseFacilityEnvironmentInfoDto'
            break;
          case 7://企业设施设备管线信息
            this.childData = data?.enterpriseFacilityPipelineInfoVo || {}
            this.childPorp = 'enterpriseFacilityPipelineInfoDto'
            break;
        }
      }
    },

    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          let childData = await this.$refs.DeviceDetails.submitForm()
          if(childData === false){
            res = false
          }else{
            res = JSON.parse(JSON.stringify(this.ruleForm))
            res[this.childPorp] = childData
          }
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.base-ruleForm {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .ruleForm-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
