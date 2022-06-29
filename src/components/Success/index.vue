<template>
  <el-card class="body-card">
    <div class="success">
      ✔
    </div>
    <div class="desc">
      <span class="status">操作成功</span>
      <span class="content">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用全局提示反馈即可。</span>
      <span class="content">本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</span>
    </div>
    <div class="order">
      <span
        v-for="(order, index) in info.orders"
        :key="index"
      >
        {{ order.key }}: {{ order.value }}
      </span>
    </div>
    <div class="step">
      <el-steps :active="info.current">
        <el-step
          v-for="(step, index) in info.steps"
          :key="index"
          :title="step.title"
          :description="step.description"
        />
      </el-steps>
    </div>
    <div class="backstage-edit-btn">
      <el-button
        type="primary"
        size="medium"
        @click="$emit('returnBack')"
      >
        返回列表
      </el-button>
      <el-button size="medium">
        查看订单
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentStep: 1
    }
  },
  methods: {
    returnBack() {
      this.$router.push({ path: '/emergency/dutySituation' })
    }
  }
}
</script>

<style lang="scss" scoped>
.success {
    display: flex;
    margin: 100px auto 40px;
    border: 6px solid rgb(126, 217, 109);
    border-radius: 50%;
    width: 72px;
    height: 72px;
    font-size: 48px;
    font-weight: bold;
    color: rgb(126, 217, 109);
    justify-content: center;
    align-items: center;
}

.desc {
    display: flex;
    margin-bottom: 40px;
    height: 80px;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    .status {
        font-size: 20px;
        font-weight: bold;
        color: #666666;
    }

    .content {
        font-size: 14px;
        color: #999999;
    }
}

.order {
    display: flex;
    margin-bottom: 40px;
    font-size: 14px;
    color: #666666;
    justify-content: space-evenly;
}
</style>
