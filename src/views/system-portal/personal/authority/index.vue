<template>
  <el-row class="dataForm">
    <el-col :span="24">
      <el-col :span="12">
        <div class="form-title">
          角色信息
        </div>
      </el-col>
    </el-col>
    <el-table
      :data="tableData"
      border
      style="width: 98%;"
      :header-cell-style="{'text-align':'center','background-color': '#FAFAFA'}"
      :cell-style="{'text-align':'center'}"
    >
      <el-table-column
        label="序号"
        align="center"
        width="100"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="describe"
        label="角色描述"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="state"
        label="状态"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          <span
            :class="[scope.row.state === 1 ? '' : 'red', 'circle']"
          />{{ scope.row.state === 1 ? '启用' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="更新时间"
        align="center"
        :show-overflow-tooltip="true"
        width="150"
      />
    </el-table>
    <div class="form-title">
      操作权限
    </div>
    <div>
      <el-tree
        :data="data"
        show-checkbox
        node-key="func_ID"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
      />
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'func_NAME',
        isLeaf: 'isLeaf'
      }
    }
  },
  created() {
    this.tableData = this.$store.state.user.role_info.map(item => ({ roleid: item.roleid, name: item.rolename, state: 1, date: '2016-05-02', describe: item.rolename }))
    const data = this.$store.state.user.results.map(item => ({ ...item, func_ID: Number(item.func_ID), parent_FUNC_ID: item.parent_FUNC_CODE === 'CQGHHSSWZX_ZQGHHSSWZXYWXT_QGHHSSWZXYWXT-NW' ? 0 : Number(item.parent_FUNC_ID) })).filter(x => x.func_CODE !== 'CQGHHSSWZX_ZQGHHSSWZXYWXT_QGHHSSWZXYWXT-NW')
    this.data = this.tree(data, 0)
  },
  methods: {
    // 递归组装树
    tree(data, id) {
      const arr = []
      data.filter(item => {
        return item.parent_FUNC_ID === id
      }).forEach(item => {
        arr.push({
          ...item,
          children: this.tree(data, item.func_ID).length > 0 ? this.tree(data, item.func_ID) : ''
        })
      })
      return arr
    }
  }
}
</script>
<style lang="scss" scoped>
.dataForm {
    padding-left: 20px;

    .form-title {
        margin: 36px 0 18px 0;
        font-size: 16px;
        font-weight: 600;
        color: #5b5b5b;
    }

    .circle {
        display: inline-block;
        margin-right: 6px;
        border-radius: 50%;
        width: 11px;
        height: 11px;
        background: #00c500;

        &.red {
            background-color: #e00000;
        }
    }
}

/deep/ .el-checkbox__input {
    display: none;
}

/deep/ .el-tree-node__content {
    padding-left: 0 !important;
}

/deep/ .el-tree-node__expand-icon.expanded {
    display: none;
}

/deep/ .el-tree-node__expand-icon.is-leaf {
    display: none;
    padding: 0;
}
// 一级树
/deep/ .el-tree > div > .el-tree-node__content {
    display: flex;
    float: left;
    position: relative;
    border-bottom: 1px solid #dddddd;
    padding: 20px 0 20px 0;
    width: 120px;
}
// 二级树
/deep/ .el-tree > div > div[role="group"] > div > .el-tree-node__content {
    margin-left: 40px;
    border-bottom: 1px solid #dddddd;
    padding: 20px 0 20px 40px;
}
// 三级树容器
/deep/ .el-tree > div > div[role="group"] > div > div[role="group"] {
    display: flex;
    margin-left: 80px;
    padding: 20px 0;
    flex-wrap: wrap;
}

/deep/ .el-tree > div > div[role="group"] > div > div[role="group"] > div {
    padding: 10px;
    min-width: 200px;
}
// 四级树容器
/deep/ .el-tree > div > div[role="group"] > div > div[role="group"] > div > div[role="group"] {
    padding: 5px 0 5px 40px;
}

/deep/ .el-checkbox__inner {
    visibility: hidden;
    border-radius: 50%;
}
</style>
