<template>
  <div class="depreciation">
    <el-descriptions
      :column="2"
      class="descriptions"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="折旧方法">
        <el-select v-model="depreciation.type" style="width: 100%;" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-descriptions-item>
      <el-descriptions-item label="原值（元）">{{ depreciation.cost }}</el-descriptions-item>
      <el-descriptions-item label="折旧年限（月）">{{ depreciation.depreciationLife }}</el-descriptions-item>
      <el-descriptions-item label="月折旧额（元/月）">{{ depreciation.depreciationLife!==0 ? (depreciation.cost/depreciation.depreciationLife).toFixed(2) : 0 }}</el-descriptions-item>
      <el-descriptions-item label="折旧年限范围">折旧年限 ≥ {{ depreciation.depreciationLife }}（月）</el-descriptions-item>
      <el-descriptions-item label="累计折旧（元）">{{ depreciation.zjPrice }}</el-descriptions-item>
      <el-descriptions-item label="以提折旧月数">{{ depreciation.zjMonth }}</el-descriptions-item>
      <el-descriptions-item label="净值（元）">{{ depreciation.cost - depreciation.zjMonth }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  components: {
  },
  props:{
    depreciation:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      options:[
        { value:1, label:'平均年限法' }
      ]
    }
  },
  async mounted() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.depreciation {
    .descriptions {
        margin-bottom: 20px;

        /deep/ .business-title {
            width: 13%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .business-text {
            width: 37%;
            line-height: 30px;
        }
    }
}
</style>
