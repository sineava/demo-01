<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>焊工证书信息</span>
    </div>
    <div class="app-container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :inline="true"
        size="small"
      >
        <el-form-item
          label="企业名称"
          prop="enterpriseName"
        >
          <el-input
            v-model.trim="ruleForm.enterpriseName"
            placeholder="请输入企业名称"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="证书编号"
          prop="certificateNumber"
        >
          <el-input
            v-model.trim="ruleForm.certificateNumber"
            placeholder="请输入证书编号"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="员工姓名:"
          prop="name"
        >
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入员工姓名"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="是否过期"
          prop="isOverdue"
        >
          <el-select
              v-model="ruleForm.isOverdue"
              prop="isOverdue"
              clearable
              placeholder="请选择是否过期"
            >
              <el-option label="全部" value="0" />
              <el-option label="已过期" value="1" />
              <el-option label="未过期" value="2" />
            </el-select>
        </el-form-item>
        <el-form-item
          label="有效期:"
          prop="screenTime"
        >
          <el-date-picker
            v-model="ruleForm.screenTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
      <el-button
        v-if="button_roles.create"
        type="primary"
        size="small"
        icon="el-icon-plus"
        style="float: left; margin-right: 10px;"
        @click="handleEdit('add')"
      >
        新增焊工证书
      </el-button>
      <div style="display:flex">
        <DownUpload
          size="mini"
          :button_roles="button_roles"
          filename="焊工证书导入模板.xlsx"
          @uploadExcel="uploadExcel"
          @getExportData="getExportData"
        />
        <el-button
          type="primary"
          size="mini"
          @click="setTime"
          style="margin-left: 20px"
        >
          证书有效期预报
      </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :data="list"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        class="table-border"
      >
        <el-table-column
          label="编号"
          width="65"
        >
          <template v-slot="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.inEnterpriseName }}
          </template>
        </el-table-column>
        <el-table-column label="证书编号" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.certificateNumber }}
          </template>
        </el-table-column>
        <el-table-column label="员工姓名" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="移动电话" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.mobilePhone }}
          </template>
        </el-table-column>
        <el-table-column label="证书名称" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.certificateName }}
          </template>
        </el-table-column>
        <el-table-column label="证书类型" :show-overflow-tooltip="true">
          <template v-slot="scope">
            {{ scope.row.certificateType }}
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="有效期至" />
        <el-table-column
          v-if="button_roles.desc ||button_roles.update ||button_roles.delete"
          label="操作"
          align="center"
          :width="(button_roles.desc ? 95 : 0) + (button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.desc"
              size="mini"
              plain
              @click="handleEdit('detail', scope.row)"
            >
              <em class="el-icon-info" /> 详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              :disabled="scope.row.isOverdue === 0"
              @click="handleEdit('edit', scope.row)"
            >
              <em class="el-icon-edit" /> 编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              :disabled="scope.row.isOverdue === 0"
              @click="handleDelete(scope.row)"
            >
              <em class="el-icon-delete" /> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="pageSize"
        background
        @change="paginationChange"
      />
    </div>
    <el-dialog
      title="逾期提醒"
      :visible.sync="dialogVisible"
      width="380px"
      class="dialogTip"
      :before-close="handleClose">
      <div style="min-height:80px">已有{{overdueNum}}条证书逾期信息</div>
      <el-button class="btn" type="primary" @click="setOverdue">查看</el-button>
    </el-dialog>
  </el-card>
</template>
<script>
import DownUpload from '@/components/features/DownUpload'
import { getList, deleteData, bulkImport, exportList, queryOverdue } from '@/api/ship-inspection/welder/welder'
import pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import {getMonthDate,momentDate} from '@/utils/index'
export default {
  components: {
    pagination,
    DownUpload
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      ruleForm: {
        enterpriseName: '',
        certificateNumber: '',
        name: '',
        screenTime: [],
        isOverdue: '0'
      },
      overdueNum: 0,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  async created() {
    this.fetchData()
    this.overdueNum = (await queryOverdue()).data || 0
    this.dialogVisible = this.overdueNum ? true : false
  },
  methods: {
    setTime() {
      this.ruleForm.screenTime = [momentDate(Date.now()), getMonthDate(3)]
      this.fetchData()
    },
    setOverdue() {
      this.dialogVisible = false
      this.ruleForm.isOverdue = '1'
      this.fetchData()
    },
    handleClose() {
      this.dialogVisible = false
    },
    fetchData() {
      this.listLoading = true
      const [screenStartTime, screenEndTime] = this.ruleForm.screenTime || []
      const data = {
        ...this.ruleForm,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        screenStartTime,
        screenEndTime
      }
      delete data.screenTime
      getList(data).then(res => {
        this.list = res.data ? res.data.records : []
        this.total = res.data ? res.data.total : 0
        this.listLoading = false
      })
    },
    search(){
      this.currentPage = 1
      this.fetchData()
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.currentPage = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    handleEdit(type, item) {
      this.$router.push({ path: '/welder/welder/edit', query: { type, id: item ? item.id : null }})
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
    getExportData(cb) {
      exportList({ ...this.searchForm }).then(res => {
        this.table = res.data ? res.data : []
        const header = {
          name: '员工姓名',
          sex: '性别',
          birthday: '出生日期',
          idCard: '身份证号码',
          post: '职务',
          job: '岗位',
          educationBackground: '学历',
          professional: '专业',
          title: '职称',
          majorField: '专业方向',
          phone: '办公电话',
          mobilePhone: '移动电话',
          email: '电子邮箱',
          inEnterpriseName: '所属企业',
          remark: '备注',
          certificateName: '证书名称',
          certificateType: '证书类型',
          certificateIssuingAuthority: '证书颁发机构',
          certificateNumber: '证书编号',
          startDate: '颁发日期',
          endDate: '有效期至'
        }
        const arr = []
        this.table.forEach(x=>{
          const obj = {
            name:x.name,
            sex:x.sex ? ['男', '女', '保密'][x.sex - 1] : '保密',
            birthday: x.birthday,
            idCard: x.idCard,
            post: x.post,
            job: x.job,
            educationBackground: x.educationBackground ? ['初中及以下','中专','高中','大专','本科','硕士','博士','其他'][x.educationBackground - 1] : '',
            professional: x.professional,
            title: x.title,
            majorField: x.majorField,
            phone:x.phone,
            mobilePhone:x.mobilePhone,
            email:x.email,
            inEnterpriseName:x.inEnterpriseName,
            remark:x.remark,
            certificateName:x.certificateName,
            certificateType:x.certificateType,
            certificateIssuingAuthority:x.certificateIssuingAuthority,
            certificateNumber:x.certificateNumber,
            startDate:x.startDate,
            endDate:x.endDate
          }
          arr.push(obj)
        })
        arr.unshift(header)
        cb({ data: [...arr], title: '焊工证书信息表' })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  width: 100%;
  border-radius: 20px;
}
/deep/ .dialogTip {
  .el-dialog__header {
    background: rgba(64, 158, 255, 1);
    height: 123px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-dialog__title {
      color: #fff;
      font-size: 32px;
    }
  }
   .el-dialog__body {
     min-height: 143px;
     padding: 40px 60px;
   }
}
/deep/ .el-upload {
  height: 32px;
}
</style>

