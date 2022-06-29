<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="oper === 'add' ? '新增应急演练计划' : oper === 'edit' ? '编辑应急演练计划' : '应急演练计划详情'" />
      </span>
      <span v-if="postStatus===2" class="detail-header-button">
        <el-radio-group v-model="qType">
          <el-radio-button label="应急演练信息" />
          <el-radio-button label="变更信息" />
        </el-radio-group>
      </span>
    </div>
    <Basics
      v-if="qType==='应急演练信息'"
      :id="id"
      ref="Basics"
      :oper="oper"
    />
    <Record
      v-if="qType==='变更信息'"
      :id="id"
      ref="Basics"
      :oper="oper"
    />
  </el-card>
</template>

<script>
import Basics from './basics'
import Record from './record'
export default {
  components: {
    Basics,
    Record
  },
  data() {
    return {
      id:'',
      oper:'add',
      qType: '应急演练信息',
      postStatus: ''
    }
  },
  created() {
    const { id, oper,postStatus } = this.$route.query
    this.postStatus = postStatus
    this.oper = oper
    this.id = id
  },
  methods: {
  }
}
</script>
<style lang="scss">
.add-company {
    .el-dialog__body {
        min-height: 100px;
    }
}
</style>
<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}

.descriptions {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 23.33%;
        line-height: 30px;
    }
}

.add-yjyljh {
    .el-form-item {
        margin: 0;
    }

    .input-number {
        width: 100%;

        /deep/ .el-input__inner {
            text-align: left;
        }
    }
}
</style>
