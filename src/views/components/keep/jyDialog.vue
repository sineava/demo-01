<template>
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
        <span>{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="fullName"
    />
    <el-table-column
      label="身份证"
      prop="identificationNumber"
    />
    <el-table-column
      label="职务"
      prop="post"
    />
    <el-table-column
      label="性别"
      prop="sex"
    />
    <el-table-column
      label="所在部门"
      prop="departmentName"
    />
    <el-table-column
      label="操作"
      align="center"
    >
      <template v-slot="scope">
        <el-button
          size="mini"
          :type="scope.row.isDisabled ? 'info':'success'"
          :disabled="scope.row.isDisabled"
          plain
          @click="handleAdd(scope.row)"
        >
          {{ scope.row.isDisabled ? '已选择':'选择' }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { managePersonList } from '@/api/water-transportation-services/information/manage-person'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      data:[],
      enterpriseId:''
    }
  },
  methods: {
    init(data,enterpriseId){
      this.data = data
      this.enterpriseId = enterpriseId
      this.fetchData()
    },
    isDisabled(id){
      let res = false
      for (let i=0;i<this.data.length;i++){
        if (this.data[i].id===id){
          res = true
          return res
        }
      }
      return res
    },
    /**
     * 查询列表数据
     */
    fetchData() {
      this.listLoading = true
      managePersonList({
        enterpriseId:this.enterpriseId
      }).then(res => {
        this.listLoading = false
        this.list = res.data || []
        this.list.map(item=>{
          item.isDisabled = this.isDisabled(item.id)
          return item
        })
      })
    },
    handleAdd(row){
      const item = JSON.parse(JSON.stringify(row))
      delete item.isDisabled
      this.$emit('selectJySubmit',item)
    }
  }
}
</script>
