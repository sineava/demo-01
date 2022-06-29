<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>从业人员数据汇总</span>
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
          <span class="span">人员数量：{{ total }}</span>
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
            <el-form-item
              label="姓名"
              prop="name"
            >
              <el-input
                v-model.trim="searchForm.name"
                placeholder="请输入人员姓名"
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
            :height="clientHeight - 220 - 120"
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
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getList } from '@/api/credit/employees/data-summary'
import { mapGetters } from 'vuex'
import OrgAssembly from '../components/index'
import DownUpload from '@/components/features/DownUpload'
import pagination from '@/components/Pagination'
import { getDocumentTypeOptions,getCertificateStatusOptions,getPostOptions,getGradeOptions,getwaterOptions,getCertificateTypeOptions,getChemistryOptions,getLabelName} from '@/utils/config'
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
      documentTypeOptions: getDocumentTypeOptions(),
      certificateStatusOptions:getCertificateStatusOptions(),
      postOptions:getPostOptions(),
      gradeOptions:getGradeOptions(),
      waterOptions:getwaterOptions(),
      typeOptions:getCertificateTypeOptions(),
      chemistryOptions:getChemistryOptions(),
      searchForm: {
        unitName: '',
        name: '',
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
      this.$router.push({ path: '/credit/employees/data-summary/record', query: { orgCode:this.org.orgCode,orgName:this.org.orgName }})
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
    search(){
      this.fetchData()
    },
    // 重置查询条件
    resetForm() {
      this.searchForm.unitName = ''
      this.searchForm.name = ''
      this.currentPage = 1
      this.fetchData()
    },
    /**
     * 详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/credit/employees/data-reporting/details', query: { type, id: item ? item.id : null }})
    },
    // 获取导出数据
    async getExportData(cb) {
      let res = await getList({
        ...this.ruleForm,
        queryType:false,
        enterpriseId: this.searchForm.enterpriseId
      })
      this.table = res.data ? res.data.records : []
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
      cb({ data: [...arr], title: '从业人员数据上报汇总' })
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
