<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 设备基础信息
    </div>
    <el-descriptions
      class="descriptions"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="ruleForm-title"
      contentClassName="ruleForm-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">设备名称:</template>
        {{ ruleForm.facilityName || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">设备类型:</template>
        {{ getTypeName(ruleForm.facilityCategory) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">填报时间:</template>
        {{ ruleForm.fillingTime || '-' }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 维修/检测信息填写
    </div>
    <el-descriptions
      class="descriptions"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="ruleForm-title"
      contentClassName="ruleForm-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />作业类型:</template>
        <el-form-item v-if="isEdit" prop="jobType">
          <el-radio-group v-model="ruleForm.jobType">
            <el-radio :label="1">维修</el-radio>
            <el-radio :label="2">检测</el-radio>
          </el-radio-group>
        </el-form-item>
        <span v-else>
          <span v-if="ruleForm.jobType===1">维修</span>
          <span v-else>检测</span>
        </span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />{{ruleForm.jobType === 1 ? '维修' : (ruleForm.jobType === 2 ? '检测' : '维修/检测')}}人:</template>
        <el-form-item v-if="isEdit" prop="repair">
          <el-input
            v-model.trim="ruleForm.repair"
            :placeholder="`请输入${ruleForm.jobType === 1 ? '维修' : (ruleForm.jobType === 2 ? '检测' : '维修/检测')}人`"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <span v-else>{{ruleForm.repair}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />{{ruleForm.jobType === 1 ? '维修' : (ruleForm.jobType === 2 ? '检测' : '维修/检测')}}时间:</template>
        <el-form-item v-if="isEdit" prop="repairTime">
          <el-date-picker
            v-model="ruleForm.repairTime"
            value-format="yyyy-MM-dd"
            type="date"
            :placeholder="`请选择${ruleForm.jobType === 1 ? '维修' : (ruleForm.jobType === 2 ? '检测' : '维修/检测')}时间`"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ruleForm.repairTime}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />{{ruleForm.jobType === 1 ? '维修' : (ruleForm.jobType === 2 ? '检测' : '维修/检测')}}内容:</template>
        <el-form-item v-if="isEdit" prop="repairContent">
          <el-input
            v-model="ruleForm.repairContent"
            type="textarea"
            rows="6"
            :placeholder="`请填写${ruleForm.jobType === 1 ? '维修' : (ruleForm.jobType === 2 ? '检测' : '维修/检测')}内容`"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <span v-else>{{ruleForm.repairContent}}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 附件
    </div>
    <upload
      v-if="isEdit"
      style="width: 100%;"
      file
      :show-file-list="false"
      :file-list="reviewedFile"
      :limit="9"
      multiple
      @fileSuccess="uploadSuccess"
    />
    <common-table
      :table-data="reviewedFile"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete"
    />
  </el-form>
</template>

<script>
import CommonTable from '@/components/features/FileTable.vue'
import upload from '@/components/upload'
import moment from 'moment'
import { mapGetters } from 'vuex'
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
    }
  },
  data() {
    return {
      ruleForm: {
        isStatus:'',
        reviewedOpinion:''
      },
      reviewedFile: [],
      type: [
        { value: '1', label: '泊位' },
        { value: '2', label: '储罐' },
        { value: '3', label: '堆场' },
        { value: '4', label: '仓库' },
        { value: '5', label: '趸船' },
        { value: '6', label: '环保设施' },
        { value: '7', label: '管线' }
      ],
      rules: {
        jobType: [
          { required: true, message: '请选择作业类型', trigger: 'change' }
        ],
        repair: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        repairTime: [
          { required: true, message: '请选择有效日期', trigger: 'change' }
        ],
        repairContent: [
          { required: true, message: '请输入维修/检测内容', trigger: 'blur' }
        ]
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
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.reviewedFile.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(file.raw.lastModifiedDate || file.raw.uid).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除
    handleDelete(val) {
      this.reviewedFile.splice(val.index, 1)
    },
    initIicense(data){
      this.ruleForm = {
        id: data?.id,
        facilityId:data?.facilityId,
        facilityName:data?.facilityName,
        facilityCategory:data?.facilityCategory,
        fillingTime:data?.fillingTime,
        jobType:data?.jobType,
        repair:data?.repair,
        repairTime:data?.repairTime,
        repairContent:data?.repairContent,
      }
      this.reviewedFile = data?.enterpriseFacilityMaintainEnclosureVoList || []
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.ruleForm))
          delete res.reviewedDate
          delete res.facilityName
          let enterpriseFacilityMaintainEnclosureDtoList = []
          this.reviewedFile.forEach(item => {
              enterpriseFacilityMaintainEnclosureDtoList.push({
                fileName: item.fileName,
                filePath: item.filePath,
                fileSize: item.fileSize
              })
          });
          res.enterpriseFacilityMaintainEnclosureDtoList = enterpriseFacilityMaintainEnclosureDtoList
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
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
