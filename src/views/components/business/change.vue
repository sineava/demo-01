<template>
  <div style="margin-top: 10px;">
    <el-table
      :data="list"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="编号"
        width="65"
        type="index"
        align="center"
      />
      <el-table-column
        label="企业名称"
        prop="name"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="统一社会信用代码"
        prop="certificateNo"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="法定代表人"
        prop="legalPersonName"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="更新时间"
        prop="createTime"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="类型"
        prop="type"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="有效期至"
        prop="expiryDate"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template v-slot="scope">
          {{ scope.row.expiryDate || '永久' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        align="center"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            icon="el-icon-c-scale-to-original"
            @click="handleDetail(scope.row, 'record')"
          >
            变更内容
          </el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-info"
            plain
            @click="handleDetail(scope.row, 'details')"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      list:[]
    }
  },
  watch:{
    data:{
      handler(newV){
        this.list = newV
      },
      deep:true
    },
  },
  mounted() {
    this.list = this.data || []
  },
  methods: {
    /**
     * 详情
     */
    handleDetail(item,type) {
      this.$router.push({ path: '/portenterprise/changeRecord/details', query: { id: item.id ,type:type}})
    }
  }
}
</script>
