<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>企业组织机构</span>
    </div>
    <div class="content-wrapper">
      <div class="app-container">
        <el-form
          ref="searchForm"
          :model="searchForm"
          :inline="true"
          size="small"
        >
          <el-form-item
            label="部门名称:"
            prop="organizationName"
          >
            <el-input v-model.trim="searchForm.organizationName" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="searchKeyList"
            >
              查询
            </el-button>
            <el-button
              size="small"
              icon="el-icon-refresh-left"
              @click="resetForm('searchForm')"
            >
              重置
            </el-button>
            <el-button
              v-if="button_roles.create"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="handleDetail('add')"
            >
              新增部门
            </el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-loading="listLoading"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :data="list"
          element-loading-text="Loading"
          stripe
          fit
          highlight-current-row
          default-expand-all
          class="table-border"
          style="margin-bottom: 20px; width: 100%;"
          row-key="id"
        >
          <el-table-column
            prop="organizationName"
            label="部门名称"
            align="left"
            show-overflow-tooltip
            width="180"
          />
          <el-table-column
            label="是否启用"
            align="center"
          >
            <template v-slot="{ row }">
              <span>{{ row.isStatus === 1 ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="personNum"
            align="center"
            label="成员数量"
          />
          <el-table-column
            prop="directorName"
            label="负责人姓名"
            align="center"
          />
          <el-table-column
            prop="departmentDuty"
            label="部门职责"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="updateTime"
            label="更新时间"
            align="center"
          />
          <el-table-column
            prop="serialNumber"
            align="center"
            label="排序"
          />
          <el-table-column
            v-if="button_roles.update || button_roles.delete ||button_roles.desc"
            label="操作"
            align="center"
            :width="(button_roles.update ? 95 : 0) + (button_roles.delete ? 95 : 0) + (button_roles.desc ? 95 : 0)"
          >
            <template v-slot="scope">
              <el-button
                v-if="button_roles.update"
                size="mini"
                type="primary"
                plain
                @click="handleDetail('edit', scope.row)"
              >
                <em class="el-icon-edit" /> 编辑
              </el-button>
              <el-button
                v-if="button_roles.desc"
                size="mini"
                type="primary"
                plain
                @click="handleDetail('detail', scope.row)"
              >
                <em class="el-icon-info" /> 详情
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
  </el-card>
</template>

<script>
import { pageEnList, deleteEnterpriseOrganization } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchList: [],
      totalList: [],
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      show: false,
      searchForm: {
        organizationName: ''
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
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      pageEnList().then(res => {
        this.listLoading = false
        this.searchList = res.data ? res.data : []
        // 递归tree
        const treeList = this.toTreeData(this.searchList)
        this.initList(treeList)
      })
    },
    initList(treeList) {
      // 排序
      treeList.sort((a, b) => {
        return a.serialNumber - b.serialNumber
      })
      this.totalList = treeList
      this.total = treeList.length
      // 分页
      this.paging()
    },
    /**
     * 递归树
     */
    toTreeData(data) {
      return this.tree(data, 0) // 第一级节点的父id，是null或者0，视情况传入
    },
    tree(data, id) {
      const arr = []
      data.filter(item => {
        return item.parentId === id
      }).forEach(item => {
        arr.push({
          ...item,
          children: this.tree(data, item.id)
        })
      })
      return arr
    },
    /**
     * 本地分页
     */
    paging() {
      this.list = []
      if (Math.ceil(this.total / this.pageSize) >= this.currentPage) {
        for (let i = this.pageSize * (this.currentPage - 1); i < this.pageSize * (this.currentPage - 1) + this.pageSize; i++) {
          if (this.total > i) {
            this.list.push(this.totalList[i])
          }
        }
      }
    },
    /**
     * 输入框搜索时调用的方法
     */
    searchKeyList() {
      if (!this.searchForm.organizationName) {
        this.fetchData()
        return
      }
      const name = this.searchForm.organizationName
      const wgObj = {
        dwtreeDateAll: this.searchList
      }
      // 先获取与输入框匹配的节点数组
      let titleArr = []
      wgObj.dwtreeDateAll.forEach((o) => {
        if (o.organizationName.lastIndexOf(name) !== -1) titleArr.push(o)
      })
      // 递归检索节点(子节点符合父节点不符合也需要带上父节点)
      let arrTarget = []
      for (let i = 0; i < titleArr.length; i++) {
        let forFn = function(id, name) {
          for (let j = 0; j < wgObj.dwtreeDateAll.length; j++) {
            if (id === wgObj.dwtreeDateAll[j].id) {
              arrTarget.push(wgObj.dwtreeDateAll[j])
              forFn(wgObj.dwtreeDateAll[j].parentId, name)
              break
            }
          }
        }
        forFn(titleArr[i].id, titleArr[i].title)
      }
      // 递归完之后去重取目标树数据
      wgObj.dwtreeDate = []
      for (let i = 0; i < arrTarget.length; i++) {
        let flag = 1
        for (let j = 0; j < wgObj.dwtreeDate.length; j++) {
          if (wgObj.dwtreeDate[j].id === arrTarget[i].id && wgObj.dwtreeDate[j].parentId === arrTarget[i].parentId) {
            flag = 0
          }
        }
        if (flag === 1) {
          wgObj.dwtreeDate.push(arrTarget[i])
        }
      }
      // 递归tree
      const treeList = this.toTreeData(wgObj.dwtreeDate)
      this.initList(treeList)
    },
    /**
     * 重置查询条件
     */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.fetchData()
    },
    /**
     * 详情
     */
    handleDetail(type, item) {
      this.$router.push({ path: '/enterprise/basic/organizeDetail', query: { type, item }})
    },
    /**
     * 删除
     */
    handleDelete(item) {
      if (item.children && item.children.length > 0) {
        this.$message.warning('请先删除子级机构')
        return
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
        deleteEnterpriseOrganization(item.id).then(res => {
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

<style lang="scss" scoped>
.content-wrapper {
    display: flex;
    flex-flow: row;

    .tree {
        width: 200px;
    }

    .app-container {
        flex: 1;
    }
}
</style>
