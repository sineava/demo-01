<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title" style="margin-top: 20px;">
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
      <el-descriptions-item  :span="ruleForm.id ? 2 : 1">
        <template slot="label"><i v-if="isEdit" class="required" />预案名称:</template>
        <el-form-item v-if="isEdit" prop="name">
          <el-input v-model.trim="ruleForm.name" maxlength="100" placeholder="请输入预案名称" />
        </el-form-item>
        <span v-else>{{ruleForm.name}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />预案类型:</template>
        <el-form-item v-if="isEdit" prop="type">
          <el-select
            v-model="ruleForm.type"
            clearable
            placeholder="请选择预案类型"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in field_type"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{getTypeName(ruleForm.type)}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">编制单位:</template>
        {{ ruleForm.enterpriseName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />响应级别:</template>
        <el-form-item v-if="isEdit" prop="responseLevel">
          <el-select
            v-model="ruleForm.responseLevel"
            clearable
            placeholder="请选择响应级别"
            style="width: 100%;"
          >
            <el-option
              v-for="(item,index) in field_responseLevel"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{getResponseLevelName(ruleForm.responseLevel)}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />应急通讯对象:</template>
        <el-form-item v-if="isEdit" prop="emergencyCommunicationObject">
          <el-input v-model.trim="ruleForm.emergencyCommunicationObject" maxlength="100" placeholder="请输入应急通讯对象" />
        </el-form-item>
        <span v-else>{{ruleForm.emergencyCommunicationObject}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系人:</template>
        <el-form-item v-if="isEdit" prop="contact">
          <el-input v-model.trim="ruleForm.contact" maxlength="100" placeholder="请输入联系人" />
        </el-form-item>
        <span v-else>{{ruleForm.contact}}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactPhone">
          <el-input v-model.trim="ruleForm.contactPhone" maxlength="100" placeholder="请输入联系电话" />
        </el-form-item>
        <span v-else>{{ruleForm.contactPhone}}</span>
      </el-descriptions-item>
      <el-descriptions-item v-if="ruleForm.id">
        <template slot="label">发布状态:</template>
        <el-tag v-if="ruleForm.state===1">未发布</el-tag>
        <el-tag v-else type="success">已发布</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> <i v-if="isEdit" class="required"  style="margin-right: 10px;" /> 应急处置策略
    </div>

    <div v-for="(item,index) in personGroupTable" :key="index">
        <h1 class="emergency">{{item.title}}人员信息</h1>
        <PersonGroupTable
            :payload="item.payload"
            :title="`添加${item.title}人员`"
            :persons="item.data"
            :options="options"
            :show-option="isEdit"
            :show-add="isEdit"
            @handleAddPerson="handleAddPerson"
            @removePerson="removePerson"
            @editPerson="editPerson"
            @savePerson="savePerson"
        />
    </div>

    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 基础信息
    </div>
    <el-descriptions
      class="descriptions-one"
      :column="2"
      :colon="true"
      size="medium"
      labelClassName="ruleForm-title"
      contentClassName="ruleForm-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">应急处置流程:</template>
        <el-form-item v-if="isEdit" prop="emergencyDisposalProcess">
          <el-input
            v-model.trim="ruleForm.emergencyDisposalProcess"
            type="textarea"
            rows="6"
            maxlength="200"
            placeholder="请输入应急处置流程"
            show-word-limit
          />
        </el-form-item>
        <span v-else>{{ruleForm.emergencyDisposalProcess}}</span>
      </el-descriptions-item>
    </el-descriptions>

    <div class="icon-title">
      <span class="span" />审核附件
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
      :table-data="filePath"
      show-download
      :show-delete="isEdit?true:false"
      @handleDelete="handleDelete"
    />
  </el-form>
</template>

<script>
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable.vue'
import { emergencyPlan } from '@/utils/public-fields'
import PersonGroupTable from '@/components/features/PersonGroupTable'
import { telephone } from '@/utils/validate'
export default {
  components: {
    upload,
    PersonGroupTable,
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
  mixins: [emergencyPlan],
  data() {
    return {
      filePath:[],
      ruleForm: {
        isStatus:'',// 姓名
      },
      personGroupTable:[
        {title:'通讯组',payload:'0',prop:'communications',type:1,data:[]},
        {title:'资料收集组',payload:'1',prop:'dataCollection',type:2,data:[]},
        {title:'应急指挥组',payload:'2',prop:'emergencyCommandGroup',type:3,data:[]},
        {title:'现场指挥部',payload:'3',prop:'fieldCommand',type:4,data:[]},
        {title:'后勤保障部',payload:'4',prop:'logisticsDepartment',type:5,data:[]},
        {title:'宣传组',payload:'5',prop:'propagandaTeam',type:6,data:[]},
        {title:'技术专家组',payload:'6',prop:'technicalExpertGroup',type:7,data:[]},
      ],
      options: [ // 人员列表表头选项
        { id: 1, value: 'name', label: '姓名',maxlength:20 },
        { id: 2, value: 'departmentName', label: '所属部门',maxlength:100 },
        { id: 3, value: 'job', label: '职务',maxlength:50 },
        { id: 4, value: 'phone', label: '手机' ,maxlength:11}
      ],
      rules: {
        name: [
          { required: true, message: '请输入预案名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        responseLevel: [
          { required: true, message: '请选择响应级别', trigger: 'blur' }
        ],
        emergencyCommunicationObject: [
          { required: true, message: '请输入应急通讯对象', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
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
    getTypeName(type){
        let name = ''
        for(let i=0;i<this.field_type.length;i++){
            if(type===this.field_type[i].value){
                name = this.field_type[i].label
                return name
            }
        }
        return name
    },
    getResponseLevelName(level){
        let name = ''
        for(let i=0;i<this.field_responseLevel.length;i++){
            if(level===this.field_responseLevel[i].value){
                name = this.field_responseLevel[i].label
                return name
            }
        }
        return name
    },
    // 添加人员
    handleAddPerson({ payload }) {
      this.personGroupTable[Number(payload)].data.push({
        name: '',
        departmentName: '',
        job: '',
        phone: '',
        saved: false
      })
    },
    // 编辑人员
    editPerson({ payload, index }) {
      this.personGroupTable[Number(payload)].data[index].saved = false
    },
    // 保存人员
    savePerson({ payload, index }) {
      this.personGroupTable[Number(payload)].data[index].saved = true
    },
    // 移除人员
    removePerson({ payload, index }) {
      this.personGroupTable[Number(payload)].data.splice(index, 1)
    },
    //初始化
    initruleForm(data){
      this.ruleForm = {
        id:data?.id,
        name:data?.name,
        type:data?.type,
        enterpriseName:data?.enterpriseName,
        responseLevel:data?.responseLevel,
        emergencyCommunicationObject:data?.emergencyCommunicationObject,
        contact:data?.contact,
        contactPhone:data?.contactPhone,
        state:data?.state,
        emergencyDisposalProcess:data?.emergencyDisposalProcess,
      }
      if(data.personList && data.personList.length>0){
          data.personList.forEach(item=>{
              let key = Number(item.type) - 1
              if(-1< key < 7){
                this.personGroupTable[key].data.push({ ...item, saved: true })
              }
          })
      }
      this.filePath = data && data.filePath ? JSON.parse(data.filePath) : []
    },
    // 文件上传成功钩子
    uploadSuccess(file) {
      this.filePath.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: momentDate(file.raw.lastModifiedDate || file.raw.uid)
      })
    },
    // 移除
    handleDelete(val) {
      this.filePath.splice(val.index, 1)
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      const valid = await this.$refs['ruleForm'].validate()
      if (valid) {
        const communications = this.personGroupTable[0].data.map(({ saved, ...other }) => ({ ...other, type: 1 }))
        const dataCollection = this.personGroupTable[1].data.map(({ saved, ...other }) => ({ ...other, type: 2 }))
        const emergencyCommandGroup = this.personGroupTable[2].data.map(({ saved, ...other }) => ({ ...other, type: 3 }))
        const fieldCommand = this.personGroupTable[3].data.map(({ saved, ...other }) => ({ ...other, type: 4 }))
        const logisticsDepartment = this.personGroupTable[4].data.map(({ saved, ...other }) => ({ ...other, type: 5 }))
        const propagandaTeam = this.personGroupTable[5].data.map(({ saved, ...other }) => ({ ...other, type: 6 }))
        const technicalExpertGroup = this.personGroupTable[6].data.map(({ saved, ...other }) => ({ ...other, type: 7 }))
        const personList = [
            ...communications,
            ...dataCollection,
            ...emergencyCommandGroup,
            ...fieldCommand,
            ...logisticsDepartment,
            ...propagandaTeam,
            ...technicalExpertGroup
        ]
        if(!personList || personList.length === 0){
            res = false
        }else{
            res = {
            ...this.ruleForm,
                personList,
                filePath:JSON.stringify(this.filePath)
            }
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
.base-ruleForm {
    .emergency{
        font-size: 14px;
        border: 1px solid #ebeef5;
        border-bottom: none;
        margin: 20px 0 0 0;
        line-height: 40px;
        background: #f5f5f5;
        padding: 0 10px;
    }
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
