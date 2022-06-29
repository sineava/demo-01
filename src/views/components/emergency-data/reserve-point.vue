<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" /> 储备点基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="ruleForm-title"
      contentClassName="ruleForm-text"
      border
    >
      <el-descriptions-item :span="2">
        <template slot="label"><i v-if="isEdit" class="required" />应急物资储备点名称:</template>
        <el-form-item v-if="isEdit" prop="name">
          <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入应急物资储备点名称" />
        </el-form-item>
        <span v-else>{{ruleForm.name}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">所属管理部门:</template>
        {{ ruleForm.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contact">
          <el-input v-model.trim="ruleForm.contact" maxlength="20" placeholder="请输入联系人" />
        </el-form-item>
        <span v-else>{{ruleForm.contact}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactPhone">
          <el-input v-model.trim="ruleForm.contactPhone" maxlength="20" placeholder="请输入联系电话" />
        </el-form-item>
        <span v-else>{{ruleForm.contactPhone}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />储备点详细地址:</template>
        <el-form-item v-if="isEdit" prop="address">
          <el-input v-model.trim="ruleForm.address" maxlength="150" placeholder="请输入储备点详细地址" />
        </el-form-item>
        <span v-else>{{ruleForm.address}}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
        <span class="span" /><i class="required" style="margin-right: 10px;" /> 储备点位置信息
    </div>
    <Maptable
        ref="berthMap"
        :is-edit="isEdit"
        :is-table="isEdit"
        :is-manual="false"
        :tool="['spot']"
        @change="confirmMap"
    />
  </el-form>
</template>

<script>
import PersonGroupTable from '@/components/features/PersonGroupTable'
import Maptable from '@/components/Maptable/index'
import { telephone } from '@/utils/validate'
export default {
  components: {
    PersonGroupTable,
    Maptable
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
  },
  data() {
    return {
      ruleForm: {},
      geographyInfos:[],
      rules: {
        address: [
          { required: true, message: '请输入储备点详细地址', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        enterpriseName: [
          { required: true, message: '请选择单位名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入应急物资储备点名称', trigger: 'blur' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initruleForm(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.initruleForm(this.data)
  },
  methods: {
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    // 初始化
    initruleForm(data){
      this.ruleForm = {
        id:data?.id,
        enterpriseName:data?.enterpriseName,
        name:data?.name,
        contact:data?.contact,
        contactPhone:data?.contactPhone,
        address:data?.address
      }
      this.geographyInfos = []
      if (data.longitude && data.latitude){
        this.geographyInfos = [{
            longitude:data.longitude,
            latitude:data.latitude
        }]
      }
      console.log(this.geographyInfos)
      this.$nextTick(() => {
        this.$refs.berthMap.init(this.geographyInfos)
      })
    },

    /**
     * 保存
     */
    async submitForm() {
      if (!this.geographyInfos || this.geographyInfos.length===0){
        this.loading = false
        this.$message.error('请标注位置坐标信息')
        return false
      }
      let res = false
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.ruleForm))
        res.longitude = this.geographyInfos[0].longitude
        res.latitude = this.geographyInfos[0].latitude
      } else {
        res = false
      }
      return new Promise(resolve => resolve(res))
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
            width: 12%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 36%;
            line-height: 30px;
        }
    }
}
</style>
