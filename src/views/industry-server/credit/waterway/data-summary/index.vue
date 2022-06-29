<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>水运企业数据汇总</span>
    </div>
    <el-row :gutter="10">
      <el-col
        v-if="user_info.orgcategory==='1'"
        :span="4"
        class="left"
      >
        <OrgAssembly res="OrgAssembly" @clickOrgMenu="clickOrgMenu" />
      </el-col>
      <el-col :span="user_info.orgcategory==='1' ? 20 : 24" class="left" style="overflow: auto;">
        <div class="tips">
          <span class="span">企业数量：{{ total }}</span>
          <span v-if="org" class="span">更新时间：{{ date }}</span>
          <span v-if="org" class="record">
            <el-button type="warning" size="small" @click="reportRecord">上报记录</el-button>
          </span>
        </div>
        <div class="app-container">
          <el-form
            ref="searchForm"
            :model="searchForm"
            :inline="true"
            class="search"
            size="small"
          >
            <el-form-item
              label="单位名称"
              prop="unitName"
            >
              <el-input
                v-model.trim="searchForm.unitName"
                placeholder="请输入单位名称"
                clearable
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                style="float: left;"
                @click="search"
              >
                查询
              </el-button>
              <el-button
                style="float: left; margin-right: 10px;"
                icon="el-icon-refresh-left"
                @click="resetForm"
              >
                重置
              </el-button>
              <span style="float: left;">
                <DownUpload
                  :button_roles="{export:true}"
                  filename="港口企业信用数据上报.xlsx"
                  @getExportData="getExportData"
                />
              </span>
            </el-form-item>
          </el-form>
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
                {{ scope.row.effectiveDate || '永久' }}
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
                {{ scope.row.validityOfCertificate || '永久' }}
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
              label="操作"
              align="center"
              :width="100"
              fixed="right"
            >
              <template v-slot="scope">
                <el-button
                  icon="el-icon-info"
                  size="mini"
                  type="primary"
                  @click="handleEdit('detail', scope.row)"
                >
                  详情
                </el-button>
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getList } from '@/api/credit/waterway/data-summary'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
import DownUpload from '@/components/features/DownUpload'
import pagination from '@/components/Pagination'
import { getEnterpriseTypeOptions,getEconomicTypeOptions,getqyDocumentTypeCodeOptions,getCertificateStatusOptions,getLabelName} from '@/utils/config'
export default {
  components: {
    OrgAssembly,
    DownUpload,
    pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      currentPage: 1,
      pageSize: 20,
      date: '',
      clientHeight:document.body.clientHeight,
      org:'',
      enterpriseTypeOptions: getEnterpriseTypeOptions(),
      economicTypeOptions:getEconomicTypeOptions(),
      certificateStatusOptions:getCertificateStatusOptions(),
      qyDocumentTypeCodeOptions:getqyDocumentTypeCodeOptions(),
      searchForm: {
        unitName: '',
        enterpriseId:''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  async mounted() {
    if (this.user_info.orgcategory==='2'){
      this.searchForm.enterpriseId = this.user_info.orgcode
      this.org = {
        orgCode:this.user_info.orgcode,
        orgName:this.user_info.orgname
      }
    }
    this.fetchData()
  },
  methods: {
    getLabelName,
    clickOrgMenu(org){
      this.org = org
      this.searchForm.enterpriseId = org?.orgCode || ''
      this.currentPage = 1
      this.fetchData()
    },
    reportRecord(){
      this.$router.push({ path: '/credit/waterway/data-summary/record', query: { orgCode:this.org.orgCode,orgName:this.org.orgName }})
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      const data = {
        ...this.searchForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      getList(data).then(res => {
        this.listLoading = false
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.date = res.data && res.data.records && res.data.records[0] ? res.data.records[0].updateTime : '暂未上报'
      })
    },
    search(){
      this.fetchData()
    },
    // 重置查询条件
    resetForm(formName) {
      this.searchForm.unitName = ''
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/credit/waterway/data-reporting/details', query: { type, id: item ? item.id : null }})
    },
    // 获取导出数据
    async getExportData(cb) {
      let res = await getList({
        ...this.ruleForm,
        queryType:false
      })
      this.table = res.data ? res.data.records : []
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
          validityOfCertificate:item.validityOfCertificate || '永久',
          state:getLabelName(item.state,this.certificateStatusOptions)
        }
        arr.push(obj)
      })
      arr.unshift(header)
      cb({ data: [...arr], title: '水运企业信用数据上报汇总' })
    }
  }
}
</script>

<style lang="scss" scoped>
.body-card {
    /deep/ .el-card__body {
        padding: 0 10px;
    }

    /deep/ .el-form-item {
        margin-bottom: 0;
    }

    .search {
        margin-bottom: 5px;
    }

    .tips {
        margin: 5px 0;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 16px;
        font-weight: 600;
        line-height: 50px;
        background: #e4e3e3;

        .span {
            margin-right: 20px;
        }

        .record {
            float: right;
        }
    }
}
</style>
