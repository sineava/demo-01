<template>
  <el-form
    ref="ruleForm"
    :model="professional"
    :rules="rules"
    label-width="0"
    class="base-ruleForm"
  >
    <div class="icon-title">
      <span class="span" /> {{ titleLable }}
    </div>
    <el-descriptions
      class="descriptions-one"
      :column="1"
      :colon="true"
      size="medium"
      labelClassName="professional-title"
      contentClassName="professional-text"
      border
    >
      <el-descriptions-item label="企业名称:">{{ professional.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item v-if="professional.createTime" label="提交备案时间:">{{ professional.createTime }}</el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" /> 新聘人员
      <span style="margin-left: 20px;"><el-button
        v-if="isEdit"
        size="mini"
        icon="el-icon-circle-plus"
        type="success"
        @click="addNew"
      >
        添加新聘人员
      </el-button>
      </span>
    </div>
    <el-table
      :data="addTableData"
      border
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item class="bottom-br" label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="身份证号">
              <span>{{ props.row.identificationNumber }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="职务">
              <span>{{ props.row.post }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="所在部门">
              <span>{{ props.row.departmentName }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="适任证书类型">
              <span>{{ props.row.certificateType }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="适任证书编号">
              <span>{{ props.row.certificateCode }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="联系地址">
              <span>{{ props.row.contactAddress }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="电子邮件">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item class="bottom-br" label="聘用合同起止日期">
              <span>{{ props.row.contractStartDate }} ~ {{ props.row.contractEndDate || '永久' }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="人员姓名"
        prop="fullName"
        width="150"
      />
      <el-table-column
        label="备注"
        prop="remark"
      />
      <el-table-column v-if="isEdit" label="操作" width="150">
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handlePerson(scope.$index, scope.row,'new')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 解约人员
      <span style="margin-left: 20px;">
        <el-button
          v-if="isEdit"
          size="mini"
          icon="el-icon-circle-plus"
          type="success"
          @click="addJy"
        >添加解约人员</el-button></span>
    </div>
    <el-table
      :data="delTableData"
      style="width: 100%;"
      border
    >
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="性别">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.identificationNumber }}</span>
            </el-form-item>
            <el-form-item label="职务">
              <span>{{ props.row.post }}</span>
            </el-form-item>
            <el-form-item label="所在部门">
              <span>{{ props.row.departmentName }}</span>
            </el-form-item>
            <el-form-item label="适任证书类型">
              <span>{{ props.row.certificateType }}</span>
            </el-form-item>
            <el-form-item label="适任证书编号">
              <span>{{ props.row.certificateCode }}</span>
            </el-form-item>
            <el-form-item label="联系地址">
              <span>{{ props.row.contactAddress }}</span>
            </el-form-item>
            <el-form-item label="电子邮件">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="聘用合同起止日期">
              <span>{{ props.row.contractStartDate }} ~ {{ props.row.contractEndDate || '永久' }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="人员姓名"
        prop="fullName"
        width="150"
      />
      <el-table-column
        label="备注"
        prop="remark"
      />
      <el-table-column v-if="isEdit" label="操作" width="150">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handlePerson(scope.$index, scope.row,'del')"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 附件
    </div>
    <upload
        file
        v-if="isEdit"
        :show-file-list="false"
        :limit="5"
        multiple
        :file-list="filePath"
        @fileSuccess="uploadSuccess($event, 'filePath')"
        @remove="uploadRemove($event, 'filePath')"
      />
    <common-table
      :table-data="filePath"
      show-download
      :show-delete="isEdit"
      @handleDelete="handleDelete($event, 'filePath')"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="880px"
    >
      <AddNewDialog
        v-if="type==='new'"
        ref="addNewDialog"
      />
      <JyDialog
        v-if="type==='jy'"
        ref="jyDialog"
        @selectJySubmit="selectJySubmit"
      />
      <span v-if="type==='new'" slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="addSubmit"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import AddNewDialog from './newDialog'
import JyDialog from './jyDialog'
import { momentDate } from '@/utils/index'
import upload from '@/components/upload'
import CommonTable from '@/components/features/FileTable'
export default {
  components: {
    AddNewDialog,
    upload,
    CommonTable,
    JyDialog
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
    titleLable:{
      type:String,
      default:'水路运输企业专职管理人员变更备案'
    }
  },
  data() {
    return {
      title:'新增新聘人员',
      type:'',
      filePath:[], //附件
      addTableData:[], // 新聘人员
      delTableData:[], // 解聘人员
      professional:{},
      rules: {},
      enterpriseId:'',
      dialogVisible:false,
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initBusiness(newV)
      },
      deep:true
    }
  },
  mounted() {
    this.initBusiness(this.data)
  },
  methods: {
    initBusiness(data){
      this.professional = {
        enterpriseId:data?.enterpriseId,
        enterpriseName:data?.enterpriseName,
        organizationName:data?.organizationName,
        id:data?.id,
        createTime:data?.createTime,
        remarks:data?.remarks
      }
      this.filePath = data && data.filePath ? JSON.parse(data.filePath) : []
      this.enterpriseId = data.enterpriseId || ''
      if (data.waterTransportManagePersonFilingDetailedInfoVoList && data.waterTransportManagePersonFilingDetailedInfoVoList.length>0){
        data.waterTransportManagePersonFilingDetailedInfoVoList.forEach(item=>{
          if (item.type===1){
            this.addTableData.push(item)
          } else {
            item.id = item.personId
            this.delTableData.push(item)
          }
        })
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
    // 添加解约人员
    addJy(){
      this.title = '新增解约人员'
      this.dialogVisible = true
      this.type = 'jy'
      this.rowIndex = -1
      this.$nextTick(()=>{
        this.$refs.jyDialog.init(this.delTableData,this.enterpriseId)
      })
    },
    // 添加新聘人员
    addNew(){
      this.title = '新增新聘人员'
      this.dialogVisible = true
      this.type = 'new'
      this.$nextTick(()=>{
        this.$refs.addNewDialog.init({},true,this.enterpriseId,this.addTableData,-1)
      })
    },
    // 新聘人员保存
    async addSubmit(){
      const row = await this.$refs.addNewDialog.submitForm()
      if (row!==false){
        const index = row.index
        delete row.index
        if (index===-1){
          this.addTableData.push(row)
        } else {
          this.$set(this.addTableData, index, row)
        }
        this.dialogVisible = false
        this.row = {}
      }
    },
    selectJySubmit(row){
      this.delTableData.push(row)
      this.dialogVisible = false
    },
    // 编辑人员
    handleEdit(index,row){
      this.title = '编辑新聘人员'
      this.type = 'new'
      this.dialogVisible = true
      this.$nextTick(()=>{
        this.$refs.addNewDialog.init(row,true,this.enterpriseId,this.addTableData,index)
      })
    },
    // 删除人员
    handlePerson(index,row,type){
      if (type==='new'){
        this.addTableData.splice(index,1)
      } else {
        this.delTableData.splice(index,1)
      }
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      if (this.addTableData.length===0 && this.delTableData.length===0){
        this.$message.error('请添加新聘人员或解约人员')
        return false
      }
      let dismissalIds = []
      this.delTableData.forEach(item=>{
        dismissalIds.push(item.id)
      })
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.professional))
          res.dismissalIds = dismissalIds.length>0?dismissalIds:null
          res.waterTransportManagePersonFilingDetailedInfoDtoList = this.addTableData.length>0?this.addTableData:null
          res.filePath = JSON.stringify(this.filePath)
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

    .demo-table-expand {
        font-size: 0;

        /deep/ .el-form-item__label {
            display: inline-block;
            float: none;
            border-right: 1px solid #e9e9e9;
            border-left: 1px solid #e9e9e9;
            width: 150px;
            text-align: center;
        }

        /deep/ .el-form-item__content {
            padding: 0 0 0 10px;
        }
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        padding: 0 47px;
        width: 100%;
        background: #f2f2f2;
    }

    .bottom-br {
        border-bottom: 1px solid #e9e9e9;
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .professional-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .professional-text {
            width: 90%;
            line-height: 30px;
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .professional-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .professional-text {
            width: 23.33%;
            line-height: 30px;
        }
    }
}
</style>
