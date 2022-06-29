<template>
  <el-table
    ref="shipAnalysis"
    :data="table"
    class="shipss"
    height="615"
    border
    show-summary
  >
    <el-table-column
      v-for="(item,index) in options"
      :key="index"
      :prop="item.value"
      :label="item.label"
      :min-width="item.minWidth || ''"
      :show-overflow-tooltip="true"
      align="center"
    >
      <el-table-column
        v-for="x in item.children"
        :key="x.id"
        :prop="x.value"
        :label="x.label"
        :show-overflow-tooltip="true"
        :min-width="x.minWidth || ''"
        align="center"
      >
        <el-table-column
          v-for="y in x.children"
          :key="y.id"
          :prop="y.value"
          :label="y.label"
          align="center"
          :min-width="y.minWidth || ''"
          :show-overflow-tooltip="true"
          fixed="left"
        />
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    table: {
      type: Array,
      required: true
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.shipss {
    .is-hidden.is-leaf.el-table__cell div {
        visibility: visible !important;
    }

    .el-table__body-wrapper::-webkit-scrollbar {
        /* 滚动条整体样式 */
        width: 10px;  /* 高宽分别对应横竖滚动条的尺寸 */
        height: 1px;
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb {
        /* 滚动条里面小方块 */
        border-radius: 10px;
        background-color: skyblue;
        background-image:
            -webkit-linear-gradient(
                45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent
            );
    }

    .el-table__body-wrapper::-webkit-scrollbar-track {
        border-radius: 10px;
        background: #ededed;

        /* 滚动条里面轨道 */
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    }
}
</style>
