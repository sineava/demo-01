<template>
  <el-form
    ref="securityData"
    :model="securityData"
    :rules="rules"
    label-width="0"
    class="base-securityData"
  >
    <div class="icon-title">
      <span class="span" /> 基础资料
    </div>
    <el-descriptions
      class="descriptions"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="securityData-title"
      contentClassName="securityData-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">所在地市管理部门:</template>
        {{securityData.organizationName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">企业名称:</template>
        {{securityData.enterpriseName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />船舶名称:</template>
        <el-form-item v-if="isEdit" prop="shipId">
          <el-select
              v-model="securityData.shipId"
              placeholder="请选择船舶名称"
              style="width: 100%;"
              @change="shipChange"
            >
              <el-option
                v-for="item in shipList"
                :key="item.id"
                :label="`${item.shipName} [${item.shipLicenseNo}]`"
                :value="item.id"
              />
            </el-select>
        </el-form-item>
        <span v-else>{{ securityData.shipName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />备案类型:</template>
        <el-form-item v-if="isEdit" prop="filingType">
          <el-select
              v-model="securityData.filingType"
              placeholder="请选择备案类型"
              style="width: 100%;"
            >
                <el-option :value="1" label="委托船舶管理企业变更" />
                <el-option :value="2" label="委托管理协议变更" />
            </el-select>
        </el-form-item>
        <span v-else>{{ securityData.filingType === 1 ? '委托船舶管理企业变更' : '委托管理协议变更' }}</span>
      </el-descriptions-item>
      
      
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />变更原因:</template>
        <el-form-item v-if="isEdit" prop="changeReason">
          <el-input
            v-model="securityData.changeReason"
            type="textarea"
            :rows="6"
            placeholder="请输入变更原因"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <span v-else>{{ securityData.changeReason }}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" />附件
    </div>
    <upload
      v-if="isEdit"
      file
      :show-file-list="false"
      :limit="5"
      multiple
      :file-list="enclosureInfo"
      @fileSuccess="uploadSuccess($event, 'enclosureInfo')"
      @remove="uploadRemove($event, 'enclosureInfo')"
    />
    <common-table
      :table-data="enclosureInfo"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'enclosureInfo')"
    />
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { telephone, identity, fax } from '@/utils/validate'
import { getWtEnShipList } from '@/api/water-transportation-services/information/enterprise-ship'
export default {
  components: {
    upload,
    CommonTable
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
    enterpriseId:{
        type:[Number,String],
        default:''
    }
  },
  data() {
    return {
      enclosureInfo: [], // 附件
      securityData: {},
      shipList:[], //船舶列表
      rules: {
        shipId: [
          { required: true, message: '请选择船舶名称', trigger: 'change' }
        ],
        changeReason: [
          { required: true, message: '请输入变更原因', trigger: 'blur' }
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.init(newV)
      },
      deep:true
    },
    enterpriseId:{
       handler(newV){
        this.getShip(newV)
       },
       deep:true
    }
  },
  mounted() {
    this.init(this.data)
    this.getShip(this.enterpriseId)
  },
  methods: {
    init(data){
      this.securityData = {
        id:data?.id,
        organizationName:data?.organizationName,
        enterpriseName:data?.enterpriseName,
        shipId:data?.shipId,
        shipName:data?.shipName,
        filingType:data?.filingType,
        changeReason:data?.changeReason,
        enterpriseId:data?.enterpriseId,
        organizationId:data?.organizationId
      }
      this.enclosureInfo = data && data.enclosureInfo ? JSON.parse(data.enclosureInfo) : []// 附件
    },
    // 查询船舶列表
    async getShip(enterpriseId){
        if(!enterpriseId){
            return false
        }
       let res = await getWtEnShipList(enterpriseId)
       this.shipList = res.data
    },
    //选择船舶
    shipChange(e){
      for(let i=0;i<this.shipList.length;i++){
        if(this.shipList[i].id === e){
          this.$emit('changeFrontEnterprise',this.shipList[i].shipEnterpriseId,e)
          return false
        }
      }
    },
    // 文件上传成功钩子
    uploadSuccess(file, listName) {
      this[listName].push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(Date.now())
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file, listName) {
      this[listName].splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    // 移除
    handleDelete(val, itemName) {
      this[itemName].splice(val.index, 1)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['securityData'].validate()
      if (valid) {
        res = JSON.parse(JSON.stringify(this.securityData))
        res.enclosureInfo = JSON.stringify(this.enclosureInfo)
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

        /deep/ .securityData-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .securityData-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
