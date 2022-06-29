<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>从业人员数据上报</span>
      <span style="float: right;">
        <el-button
          v-if="button_roles.report"
          type="success"
          size="small"
          icon="el-icon-circle-check"
          @click="handleReport"
        >
          数据上报
        </el-button>
      </span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="单位名称"
          prop="unitName"
        >
          <el-input
            v-model.trim="ruleForm.unitName"
            placeholder="请输入单位名称"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入人员姓名"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
          >
            查询
          </el-button>
          <el-button
            icon="el-icon-refresh-left"
            @click="resetForm"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 10px;">
        <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          icon="el-icon-plus"
          style="float: left;"
          @click="handleEdit('add')"
        >
          新增
        </el-button>
        <el-button
          v-if="button_roles.create"
          type="primary"
          size="small"
          icon="el-icon-download"
          style="float: left; margin-right: 10px;"
          @click="handlePull"
        >
          获取当前数据
        </el-button>
        <DownUpload
          :button_roles="button_roles"
          filename="从业人员数据上报.xlsx"
          @uploadExcel="uploadExcel"
          @getExportData="getExportData"
        />
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        fit
        border
        highlight-current-row
        :height="600"
      >
        <el-table-column
          label="编号"
          width="65"
          align="center"
        >
          <template v-slot="scope">
            {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="性别"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.sex === '1' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件类型"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.idCardType,documentTypeOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件号码"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.idCardNo }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="出生日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.birthDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="国籍"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.nationality }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单位名称"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.unitName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单位统一社会信用代码"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.certificateUnitNo }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="职务"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.job }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="从事本专业起始日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.startDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="联系电话"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.state === '1' ? '有效' : '失效' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证书名称"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.certificateName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证书编号"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.certificateNo }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发证单位"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.issueUnit }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="签发日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.issueDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证书有效期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.validityOfCertificate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证照状态"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.certificationStatus,certificateStatusOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="从业范围"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.workingRange }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="船员职务"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.crewDutyCode,postOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="船员适任证书等级"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.seamanCertificateCode,gradeOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="船员适任证书种类"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.typeCodeOfCrewCertificate,typeOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="危险化学品水路运输从业资格类型"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.waterTransportQualificationTypeCode,chemistryOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="危险化学品水路运输作业类型"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.waterTransportOperationTypeCode,waterOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
          label="操作"
          align="center"
          :width="120"
          fixed="right"
        >
          <template v-slot="scope">
            <el-dropdown>
              <el-button size="mini" type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="button_roles.desc" @click.native="handleEdit('detail', scope.row)">详情</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.update" @click.native="handleEdit('edit', scope.row)">编辑</el-dropdown-item>
                <el-dropdown-item v-if="button_roles.delete" @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="total"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      background
      @change="paginationChange"
    />
  </el-card>
</template>
<script>
import DownUpload from '@/components/features/DownUpload'
import { getList, deleteData,pullData,creditData,bulkImport } from '@/api/credit/employees/data-reporting'
import { mapGetters } from 'vuex'
import pagination from '@/components/Pagination'
import { getDocumentTypeOptions,getCertificateStatusOptions,getPostOptions,getGradeOptions,getwaterOptions,getTypeOptions,getChemistryOptions,getLabelName} from '@/utils/config'
export default {
  components: {
    DownUpload,
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      showAfterRenderClass: false,
      documentTypeOptions: getDocumentTypeOptions(),
      certificateStatusOptions:getCertificateStatusOptions(),
      postOptions:getPostOptions(),
      gradeOptions:getGradeOptions(),
      waterOptions:getwaterOptions(),
      typeOptions:getTypeOptions(),
      chemistryOptions:getChemistryOptions(),
      currentPage: 1,
      pageSize: 20,
      total: 0,
      ruleForm: {
        unitName: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({
        ...this.ruleForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.dataVo.records : []
        this.total = res.data ? res.data.dataVo.total : 0
        this.listLoading = false
      })
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    getLabelName,
    search(){
      this.fetchData()
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    // 数据上报
    handleReport(){
      creditData({}).then(res=>{
        if (res.code==='0'){
          this.fetchData()
        }
      })
    },
    handlePull(){
      pullData({}).then(res=>{
        if (res.code==='0'){
          this.fetchData()
        }
      })
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/credit/employees/data-reporting/details', query: { type, id: item ? item.id : null }})
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteData(item.id).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch(err => err)
    },
    // 导入焊工证书
    async uploadExcel(formData, end) {
      let res = await bulkImport(formData)
      if (res.code === '0') {
        this.fetchData()
        this.$message.success('导入成功')
      }
      end() // 结束loading
    },
    // 获取导出数据
    async getExportData(cb) {
      let res = await getList({
        ...this.ruleForm,
        queryType:false
      })
      this.table = res.data ? res.data.dataVo.records : []
      const header = {
        name: '姓名',
        sex:'性别',
        idCardType:'证件类型',
        idCardNo:'证件号码',
        birthDate:'出生日期',
        nationality:'国籍',
        unitName:'单位名称',
        certificateUnitNo:'单位统一社会信用代码',
        job:'职务',
        startDate:'从事本专业起始日期',
        phone:'联系电话',
        state:'状态',
        certificateName:'证书名称',
        certificateNo:'证书编号',
        issueUnit:'发证单位',
        issueDate:'签发日期',
        validityOfCertificate:'证书有效期',
        certificationStatus:'证照状态',
        workingRange:'从业范围',
        crewDutyCode:'船员职务',
        seamanCertificateCode:'船员适任证书等级',
        typeCodeOfCrewCertificate:'船员适任证书种类',
        waterTransportQualificationTypeCode:'危险化学品水路运输从业资格类型',
        waterTransportOperationTypeCode:'危险化学品水路运输作业类型'
      }
      const arr = []
      this.table.forEach(item=>{
        const obj = {
          name:item.name,
          sex:item.sex === '1' ? '男' : '女',
          idCardType:getLabelName(item.idCardType,this.documentTypeOptions),
          idCardNo:item.idCardNo,
          birthDate:item.birthDate,
          nationality:item.nationality,
          unitName:item.unitName,
          certificateUnitNo:item.certificateUnitNo,
          job:item.job,
          startDate:item.startDate,
          phone:item.phone,
          state:item.state === '1' ? '有效' : '失效',
          certificateName:item.certificateName,
          certificateNo:item.certificateNo,
          issueUnit:item.issueUnit,
          issueDate:item.issueDate,
          validityOfCertificate:item.validityOfCertificate,
          certificationStatus:getLabelName(item.certificationStatus,this.certificateStatusOptions),
          workingRange:item.workingRange,
          crewDutyCode:getLabelName(item.crewDutyCode,this.postOptions),
          seamanCertificateCode:getLabelName(item.seamanCertificateCode,this.gradeOptions),
          typeCodeOfCrewCertificate:getLabelName(item.typeCodeOfCrewCertificate,this.typeOptions),
          waterTransportQualificationTypeCode:getLabelName(item.waterTransportQualificationTypeCode,this.chemistryOptions),
          waterTransportOperationTypeCode:getLabelName(item.waterTransportOperationTypeCode,this.waterOptions)
        }
        arr.push(obj)
      })
      arr.unshift(header)
      cb({ data: [...arr], title: '从业人员数据上报' })
    }
  }
}
</script>
