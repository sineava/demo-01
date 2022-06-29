<template>
  <el-form
    ref="accident"
    :model="accident"
    :rules="rules"
    label-width="0"
    class="base-accident"
  >
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="accident-title"
      contentClassName="accident-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />船舶名称:</template>
        <el-form-item v-if="isEdit" prop="shipId">
          <el-select
            v-model="accident.shipId"
            placeholder="请选择船舶名称"
            @change="shipChange"
          >
            <el-option
              v-for="item in shipList"
              :key="item.id"
              :label="item.shipName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{ accident.shipName }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">船舶营运证编号:</template>
        {{ accident.shipLicenseNo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">事故等级:</template>
        <el-form-item v-if="isEdit" prop="accidentLevel">
          <el-select
            v-model="accident.accidentLevel"
            placeholder="请选择事故等级"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{ accident.accidentLevel && accident.accidentLevel>0 ? ['特别重大','重大','较大','一般'][accident.accidentLevel-1] : '' }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">事故描述:</template>
        <el-form-item v-if="isEdit" prop="accidentDesc">
          <el-input
            v-model.trim="accident.accidentDesc"
            type="textarea"
            :rows="6"
            maxlength="500"
            placeholder="请输入事故描述"
          />
        </el-form-item>
        <span v-else>{{ accident.accidentDesc }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">事故原因:</template>
        <el-form-item v-if="isEdit" prop="accidentReason">
          <el-input
            v-model.trim="accident.accidentReason"
            type="textarea"
            :rows="6"
            maxlength="500"
            placeholder="请输入事故原因"
          />
        </el-form-item>
        <span v-else>{{ accident.accidentReason }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">备注:</template>
        <el-form-item v-if="isEdit" prop="remarks">
          <el-input
            v-model.trim="accident.remarks"
            type="textarea"
            :rows="6"
            maxlength="500"
            placeholder="请输入备注"
          />
        </el-form-item>
        <span v-else>{{ accident.remarks }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 附件信息
    </div>
    <upload
      v-if="isEdit"
      style="width: 100%;"
      file
      :show-file-list="false"
      :limit="9"
      multiple
      @fileSuccess="uploadSuccess"
    />
    <common-table
      :table-data="appendix"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete"
    />
  </el-form>
</template>

<script>
import { getWtEnShipList } from '@/api/water-transportation-services/information/enterprise-ship'
import CommonTable from '@/components/features/FileTable.vue'
import upload from '@/components/upload'
import moment from 'moment'
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
      accident: {
        shipId:'',
        accidentLevel:''
      },
      options: [{
        value: 1,
        label: '特别重大'
      }, {
        value: 2,
        label: '重大'
      }, {
        value: 3,
        label: '较大'
      }, {
        value: 4,
        label: '一般'
      }],
      shipList: [],
      appendix: [],
      rules: {
        shipId: [
          { required: true, message: '请选择船舶名称', trigger: 'change' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
    enterpriseId(newV){
      this.initShipList(newV)
    }
  },
  mounted() {
    this.initIicense(this.data)
    this.initShipList(this.enterpriseId)
  },
  methods: {
    async initShipList(id){
      if (!id){
        return false
      }
      // 通过id查询船舶
      const ship = await getWtEnShipList(id)
      this.shipList = ship.data
    },
    // 获取编号
    shipChange(id) {
      if (!id){
        return false
      }
      for (let i=0;i<this.shipList.length;i++){
        if (this.shipList[i].id === id){
          this.accident.shipLicenseNo = this.shipList[i].shipLicenseNo
        }
      }
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.appendix.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(file.raw.lastModifiedDate || file.raw.uid).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除
    handleDelete(val) {
      this.appendix.splice(val.index, 1)
    },
    initIicense(data){
      this.accident = {
        id: data?.id,
        shipId:data?.shipId,
        shipName:data?.shipName,
        shipLicenseNo:data?.shipLicenseNo,
        accidentLevel:data?.accidentLevel,
        accidentDesc:data?.accidentDesc,
        accidentReason:data?.accidentReason,
        remarks:data?.remarks,
        enclosureInfo:''
      }
      this.appendix = data && data.enclosureInfo ? JSON.parse(data.enclosureInfo) : []

    },
    // 输入框变更
    inputChange(){
      this.initIicense(this.accident)
      this.$emit('changeIicense',this.accident)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs['accident'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.accident))
          res.enclosureInfo = JSON.stringify(this.appendix)
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
.base-accident {
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

        /deep/ .accident-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .accident-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .accident-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .accident-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
