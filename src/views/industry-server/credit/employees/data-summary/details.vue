<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="从业人员数据上报" />
      </span>
    </div>
    <div class="tips">
      <span class="span">人员数量：{{ total }}</span>
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
import { getInfo } from '@/api/credit/employees/data-summary'
import pagination from '@/components/Pagination'
import { getDocumentTypeOptions,getCertificateStatusOptions,getPostOptions,getGradeOptions,getwaterOptions,getCertificateTypeOptions,getChemistryOptions,getLabelName} from '@/utils/config'
export default {
  components: {
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
      typeOptions:getCertificateTypeOptions(),
      chemistryOptions:getChemistryOptions(),
      date:'',
      currentPage: 1,
      pageSize: 20,
      total: 0,
      initData:[],
      ruleForm: {
        name: '',
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
      if (this.ruleForm.name){
        let list = []
        this.initData.forEach(item=>{
          if ((item.name.toLowerCase()).indexOf(this.ruleForm.name.toLowerCase()) !== -1){
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
      this.$router.push({ path: '/credit/employees/data-reporting/details', query: { type, id: item ? item.id : null }})
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
