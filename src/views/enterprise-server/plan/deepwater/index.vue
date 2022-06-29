<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>生产码头列表</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="24" class="left" :style="`height: ${ clientHeight - 260}px;`">
        <div class="app-container">
          <div class="container">
            <div>
              <el-button
                  v-if="button_roles.create"
                  type="success"
                  size="small"
                  icon="el-icon-plus"
                  @click="handleEdit('add')"
                >
                  新增生产码头
                </el-button>
            </div>
            <el-table
              v-loading="listLoading"
              :data="list"
              element-loading-text="Loading"
              stripe
              fit
              highlight-current-row
              class="table-border"
            >
              <el-table-column
                label="编号"
                width="55"
                align="center"
              >
                <template v-slot="scope">
                  {{ pageSize * (currentPage - 1) + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="码头名称" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.wharfName }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="所在区域" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  <span>{{ scope.row.coastlineName }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="所在航道" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.channel && channel.filter(item => (item.value === scope.row.channel))[0].label }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="投产年份" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.productionYear }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="岸线长度（米）" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.shorelineLength }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="泊位数（个）" :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.berthNum }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="设计靠泊能力（吨） " :show-overflow-tooltip="true">
                <template v-slot="scope">
                  {{ scope.row.berthingCapacity }}
                </template>
              </el-table-column>
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
                    plain
                    @click="handleEdit('edit', scope.row)"
                  >
                    <em class="el-icon-edit-outline" /> 编辑
                  </el-button>
                  <el-button
                    v-if="button_roles.delete"
                    size="mini"
                    type="danger"
                    plain
                    @click="handleDelete(scope.row)"
                  >
                    <em class="el-icon-delete" /> 删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <loading ref="load" />
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import { shoreLine } from '@/utils/public-fields'
 import { getArea, deleteWharf } from '@/api/port-services/coastline/wharf'
import { getWharf } from '@/api/port-services/coastline/berth'
import pagination from '@/components/Pagination'
import loading from '@/components/loading'
import { mapGetters } from 'vuex'
export default {
  components: {
    pagination,
    loading
  },
  mixins: [shoreLine],
  data() {
    return {
      current: 2,
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      openeds:['m_1'],
      clientHeight:document.body.clientHeight,
      row: '',
      areaList: [], // 区域列表
      searchForm: {
        portAreaId: '',
        coastlineId: '',
        wharfName: '',
        channel: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'button_roles'
    ])
  },
  created() {
    this.fetchPortArea()
    this.fetchData()
  },
  methods: {
    /**
     * 查询区域列表
     */
    async fetchPortArea() {
      getArea().then(res => {
        this.areaList = res.data ? res.data : []
      })
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      getWharf({}).then(res => {
        this.list = res.data || []
        this.ysj = this.list
        this.listLoading = false
      })
    },
    /**
     * 新增/编辑/详情
     */
    handleEdit(type, item) {
      this.$router.push({ path: '/plan/deepwaterEdit', query: { type, id: item?.id, channel: item?.channel }})
    },
    /**
     * 删除
     */
    handleDelete({ id }) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteWharf({ id }).then(res => {
          if (res.code === '0') {
            this.$message.success('删除成功!')
            this.fetchData()
          }
        })
      }).catch()
    }
  }
}
</script>

<style  lang="scss" scoped>
.left::-webkit-scrollbar {
    display: none;
}

.left {
    overflow-y: auto;

    .el-menu-item {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

.el-menu {
    border-top: solid 1px #e6e6e6;
    border-left: solid 1px #e6e6e6;
}

.menu {
    .el-menu-item.is-active {
        color: #ffffff;
        background: #409eff;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }

    /deep/ .el-submenu__title {
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>
