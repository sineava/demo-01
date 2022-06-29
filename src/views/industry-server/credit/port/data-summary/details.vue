<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="港口企业数据上报" />
      </span>
    </div>
    <div class="tips">
      <span class="span">企业数量：{{ total }}</span>
      <span class="span">更新时间：{{ date }}</span>
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
            placeholder="单位名称"
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
  </el-card>
</template>
<script>
import { getInfo } from '@/api/credit/port/data-summary'
import pagination from '@/components/Pagination'
import { getEnterpriseTypeOptions,getEconomicTypeOptions,getqyDocumentTypeCodeOptions,getCertificateStatusOptions,getLabelName} from '@/utils/config'
export default {
  components: {
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
      date:'',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      initData:[],
      ruleForm: {
        unitName: '',
        basicId:''
      }
    }
  },
  created() {
    const { basicId } = this.$route.query
    this.ruleForm.basicId = basicId
    if (basicId){
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getInfo({
        basicId:this.ruleForm.basicId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.list = res.data ? res.data.dataVo.records : []
        this.total = res.data ? res.data.dataVo.total : 0
        this.initData = this.list
        this.date = res.data && res.data.basicVo ? res.data.basicVo.reportTime : ''
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
      if (this.ruleForm.unitName){
        let list = []
        this.initData.forEach(item=>{
          if ((item.unitName.toLowerCase()).indexOf(this.ruleForm.unitName.toLowerCase()) !== -1){
            list.push(item)
          }
        })
        this.list = list
      } else {
        this.list = this.initData
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.search()
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/credit/port/data-reporting/details', query: { type, id: item ? item.id : null }})
    }
  }
}
</script>

<style lang="scss"  scoped>
.body-card {
    .tips {
        margin: 0 0 10px 0;
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
