<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水运企业信用数据上报</span>
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
          filename="水运企业信用数据上报.xlsx"
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
          label="统一社会信用代码"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.certificateUnitNo }}
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
          label="曾用名"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.formerName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="简称"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.abbreviation }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="单位类型"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.enterpriseType,enterpriseTypeOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="成立日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.setUpTheDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="营业执照注册日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.registrationDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="营业执照有效日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.effectiveDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="登记机关"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.registrationAuthority }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="法定代表人"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.legalRepresentative }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="法定代表人身份证号码"
          width="180"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.legalRepresentativeId }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="法定代表人联系电话"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.legalRepresentativePhone }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="经济类型"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.economicTypeCode,economicTypeOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="注册城市"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.registeredUrban }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="注册地址"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          label="签发日期"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.issueDate }}
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="邮编"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.zipCode }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="营业范围"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.businessScope }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="总公司名称"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.companyName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="总公司统一社会信用代码"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.companyCreditCode }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="资质名称"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.qualificationName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件类型"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.documentTypeCode,qyDocumentTypeCodeOptions) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件编号"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.documentNo }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发证机关"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.licenseIssuingAgencies }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发证日期"
          width="150"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.releaseDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件起始日期"
          width="130"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.certificateStartDate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件终止日期"
          width="130"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.certificateStartEnd || '永久' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件有效期"
          width="130"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ scope.row.validityOfCertificate }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="证件状态"
          width="130"
          :show-overflow-tooltip="true"
        >
          <template v-slot="scope">
            {{ getLabelName(scope.row.state,certificateStatusOptions) }}
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
import { getList, deleteData,pullData,creditData,bulkImport } from '@/api/credit/waterway/data-reporting'
import { mapGetters } from 'vuex'
import pagination from '@/components/Pagination'
import { getEnterpriseTypeOptions,getEconomicTypeOptions,getqyDocumentTypeCodeOptions,getCertificateStatusOptions,getLabelName} from '@/utils/config'
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
      enterpriseTypeOptions: getEnterpriseTypeOptions(),
      economicTypeOptions:getEconomicTypeOptions(),
      qyDocumentTypeCodeOptions:getqyDocumentTypeCodeOptions(),
      certificateStatusOptions:getCertificateStatusOptions(),
      currentPage: 1,
      pageSize: 20,
      total: 0,
      ruleForm: {
        unitName: '',
        certificateUnitNo: ''
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
      this.ruleForm.unitName = ''
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
      this.$router.push({ path: '/credit/waterway/data-reporting/details', query: { type, id: item ? item.id : null }})
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
        certificateUnitNo: '统一社会信用代码',
        unitName:'单位名称',
        formerName:'曾用名',
        abbreviation:'简称',
        enterpriseType:'单位类型',
        setUpTheDate:'成立日期',
        registrationDate:'营业执照注册日期',
        effectiveDate:'营业执照有效日期',
        registrationAuthority:'登记机关',
        legalRepresentative:'法定代表人',
        legalRepresentativeId:'法定代表人身份证号码',
        legalRepresentativePhone:'法定代表人联系电话',
        economicTypeCode:'经济类型',
        registeredUrban:'注册城市',
        address:'注册地址',
        // issueDate:'签发日期',
        zipCode:'邮编',
        businessScope:'营业范围',
        companyName:'总公司名称',
        companyCreditCode:'总公司统一社会信用代码',
        qualificationName:'资质名称',
        documentTypeCode:'证件类型',
        documentNo:'证件编号',
        licenseIssuingAgencies:'发证机关',
        releaseDate:'发证日期',
        certificateStartDate:'证件起始日期',
        certificateStartEnd:'证件终止日期',
        validityOfCertificate:'证件有效期',
        state:'证件状态'
      }
      const arr = []
      this.table.forEach(item=>{
        const obj = {
          certificateUnitNo:item.certificateUnitNo,
          unitName:item.unitName,
          formerName:item.formerName,
          abbreviation:item.abbreviation,
          enterpriseType:getLabelName(item.enterpriseType,this.enterpriseTypeOptions),
          setUpTheDate:item.setUpTheDate,
          registrationDate:item.registrationDate,
          effectiveDate:item.effectiveDate || '永久',
          registrationAuthority:item.registrationAuthority,
          legalRepresentative:item.legalRepresentative,
          legalRepresentativeId:item.legalRepresentativeId,
          legalRepresentativePhone:item.legalRepresentativePhone,
          economicTypeCode:getLabelName(item.economicTypeCode,this.economicTypeOptions),
          registeredUrban:item.registeredUrban,
          address:item.address,
          // issueDate:item.issueDate,
          zipCode:item.zipCode,
          businessScope:item.businessScope,
          companyName:item.companyName,
          companyCreditCode:item.companyCreditCode,
          qualificationName:item.qualificationName,
          documentTypeCode:getLabelName(item.documentTypeCode,this.qyDocumentTypeCodeOptions),
          documentNo:item.documentNo,
          licenseIssuingAgencies:item.licenseIssuingAgencies,
          releaseDate:item.releaseDate,
          certificateStartDate:item.certificateStartDate,
          certificateStartEnd:item.certificateStartEnd || '永久',
          validityOfCertificate:item.validityOfCertificate,
          state:getLabelName(item.state,this.certificateStatusOptions)
        }
        arr.push(obj)
      })
      arr.unshift(header)
      cb({ data: [...arr], title: '水运企业信用数据上报' })
    }
  }
}
</script>
