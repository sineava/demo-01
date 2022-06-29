<template>
  <el-card id="zckp" class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>轻资产盘点</span>
    </div>
    <div class="app-container">
      <div>
        <el-form
          ref="searchForm"
          :inline="true"
          size="small"
          :model="search"
          class="demo-form-inline"
        >
          <el-form-item label="盘点标题">
            <el-input v-model.trim="search.title" clearable placeholder="盘点标题" />
          </el-form-item>
          <el-form-item label="盘点状态">
            <el-select v-model="search.state" clearable placeholder="资产分类">
              <el-option label="已盘" :value="1" />
              <el-option label="未盘" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="user_info.orgid==='1375'" label="所属部门" prop="deptIds">
            <el-select
              v-model="search.deptIds"
              clearable
              filterable
              collapse-tags
              multiple
              style="width: 240px;"
              placeholder="请选择管理部门"
            >
              <el-option
                v-for="(item,index) in orgList"
                :key="index"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="计划盘点时间">
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择计划盘点时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
            <el-button
              size="small"
              icon="el-icon-refresh-left"
              @click="resetForm('searchForm')"
            >
              重置
            </el-button>
            <AddButton :button_roles="button_roles" />
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="loading"
        :data="data"
        element-loading-text="Loading"
        stripe
        fit
        highlight-current-row
        max-height="600"
        class="table-border"
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
          prop="title"
          label="盘点标题"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="deptName"
          label="盘点部门名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="principal"
          label="盘点人"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="cardCount"
          label="资产总数量"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="billingDate"
          label="记账时间"
          align="center"
          :show-overflow-tooltip="true"
          width="110"
        />
        <el-table-column
          prop="planDate"
          label="计划盘点时间"
          :show-overflow-tooltip="true"
          width="110"
        />
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          label="盘点状态"
          width="100"
        >
          <template v-slot="scope">
            <el-tag :type="scope.row.state ? 'success':'danger'">{{ scope.row.state ? '已盘':'未盘' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="说明"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          :width="(button_roles.update ? 75 : 0) + (button_roles.inventory ? 75 : 0) + (button_roles.delete ? 75 : 0) + (button_roles.desc ? 75 : 0)"
        >
          <template v-slot="scope">
            <el-button
              v-if="button_roles.inventory"
              size="mini"
              @click="handleInventory(scope.row)"
            >
              盘点
            </el-button>
            <el-button
              v-if="button_roles.desc"
              size="mini"
              @click="handleEdit(scope.row,'info')"
            >
              详情
            </el-button>
            <el-button
              v-if="button_roles.update"
              size="mini"
              type="primary"
              :disabled="scope.row.state?true:false"
              @click="handleEdit(scope.row,'edit')"
            >
              编辑
            </el-button>
            <el-button
              v-if="button_roles.delete"
              size="mini"
              type="danger"
              :disabled="scope.row.state?true:false"
              @click="handleDelete(scope.row)"
            >
              删除
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
  </el-card>
</template>

<script>
import { getList,delinventory } from '@/api/light-means/check'
import pagination from '@/components/Pagination'
import AddButton from './components/tool-add'
import { mapGetters } from 'vuex'
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
import moment from 'moment'
export default {
  components: {
    pagination,
    AddButton
  },
  data() {
    return {
      loading:false, // 加载动画
      currentPage:1,// 当前页码
      pageSize:20,// 每页大小
      total:0,// 数据总数
      data:[], // 数据集
      date:'',
      talbeTitle:[],
      orgList:[],
      search:{
        title:'',
        state:'',
        deptIds:[]
      },
    }
  },
  computed: {
    ...mapGetters([
      'button_roles',
      'user_info'
    ])
  },
  created() {
    this.fetchData()
    if (this.user_info.orgid==='1375'){
      this.fetchOrgs()
    } else {
      this.search.deptIds = [this.user_info.orgid]
    }
  },
  methods: {
    // 查询列表数据
    fetchData() {
      getList({
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        state:this.search.state,
        title:this.search.title,
        deptIds:this.search.deptIds ? this.search.deptIds.join(',') : '',
        planDate:this.date ? moment(this.date).format('YYYY-MM-DD') : ''
      }).then(res=>{
        if (res.code==='0'){
          this.data = res.data.records || [{title:11}]
          this.total = res.data.total || 0
        }
      })
    },
    // 重置查询条件
    resetForm(formName) {
      this.search = {
        title:'',
        state:'',
        deptIds:[]
      }
      this.date = ''
      this.currentPage = 1
      this.fetchData()
    },
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getAllOrgList().then(res => {
        this.orgList = res.data || []
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
    // 搜索按钮点击
    onSubmit() {
      this.currentPage = 1
      this.fetchData()
    },
    // 编辑
    handleEdit(item,oper){
      this.$router.push({ path: '/lightMeans/check/details', query: { id: item.id ,oper: oper}})
    },
    handleInventory(item){
      this.$router.push({ path: '/lightMeans/check/inventory', query: { id: item.id}})
    },
    // 删除
    handleDelete(item){
      delinventory({id:item.id}).then(res=>{
        if (res.code==='0'){
          this.fetchData()
        }
      })
    }
  }
}
</script>
<style lang="scss">
#zckp {
    .el-select__tags-text {
        max-width: 130px;
    }

    .el-select {
        .el-select__input {
            margin-left: 5px;
        }
    }
}

.popper-tools {
    overflow-y: auto;
    height: 300px;
}
</style>
