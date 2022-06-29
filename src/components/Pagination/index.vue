<template>
  <div class="pagination">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout"
      :total="total"
      :background="background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

export default {
  name: 'Pagintaion',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 400
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('change', { currentPage: this.currentPage, pageSize: val })
    },
    handleCurrentChange(val) {
      this.$emit('change', { currentPage: val, pageSize: this.pageSize })
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>>
