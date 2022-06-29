<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" /> 基础信息
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
        <template slot="label"><i v-if="isEdit" class="required" />应急机构名称:</template>
        <el-form-item v-if="isEdit" prop="name">
          <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入应急机构名称" />
        </el-form-item>
        <span v-else>{{ruleForm.name}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">所属管理部门:</template>
        {{ ruleForm.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />单位负责人:</template>
        <el-form-item v-if="isEdit" prop="unitLeader">
          <el-input v-model.trim="ruleForm.unitLeader" maxlength="20" placeholder="请输入单位负责人" />
        </el-form-item>
        <span v-else>{{ruleForm.unitLeader}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />负责人电话:</template>
        <el-form-item v-if="isEdit" prop="unitLeaderPhone">
          <el-input v-model.trim="ruleForm.unitLeaderPhone" maxlength="20" placeholder="请输入负责人电话" />
        </el-form-item>
        <span v-else>{{ruleForm.unitLeaderPhone}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />负责人职务:</template>
        <el-form-item v-if="isEdit" prop="unitLeaderPosition">
          <el-input v-model.trim="ruleForm.unitLeaderPosition" maxlength="50" placeholder="请输入负责人职务" />
        </el-form-item>
        <span v-else>{{ruleForm.unitLeaderPosition}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />机构联系人:</template>
        <el-form-item v-if="isEdit" prop="contact">
          <el-input v-model.trim="ruleForm.contact" maxlength="20" placeholder="请输入机构联系人" />
        </el-form-item>
        <span v-else>{{ruleForm.contact}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="phone">
          <el-input v-model.trim="ruleForm.phone" maxlength="11" placeholder="请输入联系电话" />
        </el-form-item>
        <span v-else>{{ruleForm.phone}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人职务:</template>
        <el-form-item v-if="isEdit" prop="contactPosition">
          <el-input v-model.trim="ruleForm.contactPosition" maxlength="20" placeholder="请输入联系人职务" />
        </el-form-item>
        <span v-else>{{ruleForm.contactPosition}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">办公室电话:</template>
        <el-form-item v-if="isEdit" prop="officeTelephone">
          <el-input v-model.trim="ruleForm.officeTelephone" maxlength="20" placeholder="请输入办公室电话" />
        </el-form-item>
        <span v-else>{{ruleForm.officeTelephone}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />值班电话:</template>
        <el-form-item v-if="isEdit" prop="dutyCalls">
          <el-input v-model.trim="ruleForm.dutyCalls" maxlength="20" placeholder="请输入值班电话" />
        </el-form-item>
        <span v-else>{{ruleForm.dutyCalls}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />通讯地址:</template>
        <el-form-item v-if="isEdit" prop="address">
          <el-input v-model.trim="ruleForm.address" maxlength="150" placeholder="请输入通讯地址" />
        </el-form-item>
        <span v-else>{{ruleForm.address}}</span>
      </el-descriptions-item>
      <!-- <el-descriptions-item v-if="ruleForm.id">
        <template slot="label">更新时间:</template>
        {{ruleForm.updateTime}}
      </el-descriptions-item> -->
      <el-descriptions-item :span="2">
        <template slot="label">应急职责:</template>
        <el-form-item v-if="isEdit" prop="emergencyDuty">
          <el-input
              v-model="ruleForm.emergencyDuty"
              type="textarea"
              rows="6"
              maxlength="2000"
              show-word-limit
              placeholder="请输入应急职责"
            />
        </el-form-item>
        <span v-else>{{ruleForm.emergencyDuty}}</span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" /> 附件
    </div>
    <Upload
      v-if="isEdit"
      style="width: 100%;"
      file
      :show-file-list="false"
      :limit="9"
      multiple
      :file-list="filePath"
      @fileSuccess="uploadSuccess"
    />
    <CommonTable
      :table-data="filePath"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete"
    />
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /><i class="required" style="margin-right: 10px;" /> 机构人员
    </div>
    <PersonGroupTable
      title="添加机构人员"
      :persons="ruleForm.personList"
      :options="options"
      :show-option="isEdit"
      :show-add="isEdit"
      @handleAddPerson="handleAddPerson"
      @removePerson="removePerson"
      @editPerson="editPerson"
      @savePerson="savePerson"
    />
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /><i class="required" style="margin-right: 10px;" /> 位置信息
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
import moment from 'moment'
import Upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable'
import PersonGroupTable from '@/components/features/PersonGroupTable'
import Maptable from '@/components/Maptable/index'
import { telephone } from '@/utils/validate'
export default {
  components: {
    Upload,
    CommonTable,
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
      filePath: [],
      ruleForm: {},
      geographyInfos:[],
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '人员姓名',maxlength:20 },
        { id: 2, value: 'phone', label: '联系电话',maxlength:11 },
        { id: 3, value: 'position', label: '职务',maxlength:50 }
      ],
      rules: {
        name: [
          { required: true, message: '请输入应急机构名称', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入机构联系人', trigger: 'blur' }
        ],
        phone: [
          { validator: telephone, trigger: 'blur', message: '电话号码格式错误' },
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        unitLeader:[
          { required: true, message: '请输入单位负责人', trigger: 'blur' }
        ],
        unitLeaderPhone: [
          { validator: telephone, trigger: 'blur', message: '电话号码格式错误' },
          { required: true, message: '请输入负责人电话', trigger: 'blur' }
        ],
        unitLeaderPosition:[
          { required: true, message: '请输入负责人职务', trigger: 'blur' }
        ],
        contactPosition:[
          { required: true, message: '请输入联系人职务', trigger: 'blur' }
        ],
        officeTelephone:[
          { validator: telephone, trigger: 'blur', message: '电话号码格式错误' },
        ],
        dutyCalls:[
          { validator: telephone, trigger: 'blur', message: '电话号码格式错误' },
          { required: true, message: '请输入值班电话', trigger: 'blur' }
        ],
        address:[
          { required: true, message: '请输入通讯地址', trigger: 'blur' }
        ]
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
    handleAddPerson() {
      this.ruleForm.personList.push({
        id: 0,
        name: '',
        phone: '',
        saved: false
      })
    },
    editPerson({ index }) {
      this.ruleForm.personList[index].saved = false
    },
    savePerson({ index }) {
      this.ruleForm.personList[index].saved = true
    },
    removePerson({ index }) {
      this.ruleForm.personList.splice(index, 1)
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.filePath.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(file.raw.lastModifiedDate || file.raw.uid).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除
    handleDelete(val) {
      this.filePath.splice(val.index, 1)
    },
    // 初始化
    initruleForm(data){
      this.ruleForm = {
        id:data?.id,
        name:data?.name,
        enterpriseName:data?.enterpriseName,
        unitLeader:data?.unitLeader,
        unitLeaderPhone:data?.unitLeaderPhone,
        unitLeaderPosition:data?.unitLeaderPosition,
        contact:data?.contact,
        phone:data?.phone,
        contactPosition:data?.contactPosition,
        officeTelephone:data?.officeTelephone,
        dutyCalls:data?.dutyCalls,
        address:data?.address,
        // updateTime:data?.updateTime,
        emergencyDuty:data?.emergencyDuty,
        personList: data && data.personList ? data.personList.map(person => ({ ...person, saved: true })) : []
      }
      this.filePath = JSON.parse(data?.filePath || '[]')
      this.geographyInfos = []
      if (data.longitude && data.latitude){
        this.geographyInfos = [{
          longitude:data.longitude,
          latitude:data.latitude
        }]
      }
      this.$nextTick(() => {
        this.$refs.berthMap.init(this.geographyInfos)
      })
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const personList = this.ruleForm.personList.filter(person => person.saved).map(({ id, name, phone,position }) => ({ id, name, phone,position }))
      const valid = await this.$refs['ruleForm'].validate()
      
      if (valid && personList.length>0 && this.geographyInfos && this.geographyInfos.length>0) {
        res = JSON.parse(JSON.stringify(this.ruleForm))
        res.personList = personList
        res.longitude = this.geographyInfos[0].longitude
        res.latitude = this.geographyInfos[0].latitude
        res.filePath = JSON.stringify(this.filePath || '')
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
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .ruleForm-text {
            width: 40%;
            line-height: 30px;
        }
    }
}
</style>
