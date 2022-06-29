<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>新增普通货船运力备案</span>
      <span v-if="oper!=='add'" style="float: right;">
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="备案信息" />
          <el-radio-button label="流转痕迹" />
        </el-radio-group>
      </span>
    </div>
    <Basics
      v-show="type==='备案信息'"
      ref="Basics"
      :fid="fid"
      :oper="oper"
    />
    <Other
      v-show="type==='流转痕迹'"
      ref="Other"
      :fid="fid"
      :data="other"
    />
  </el-card>
</template>

<script>
import Basics from './basics'
import Other from './other'
export default {
  components: {
    Basics,
    Other
  },
  data() {
    return {
      isEdit:true,
      data:{},
      other:[],
      type:'备案信息',
      oper:'add',
      fid: ''
    }
  },
  async mounted() {
    this.oper = this.$route.query.oper || 'add'
    this.fid = this.$route.query.id || ''
  },
  methods: {
    returnBack() {
      this.$router.push({ path: '/record/water/cargo_ship_info' })
    }
  }
}
</script>

<style lang="scss" scoped>
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
        width: 40%;
        line-height: 30px;
    }
}

.descriptions-one {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        width: 90%;
        line-height: 30px;
    }
}

.descriptions-one-table {
    margin-bottom: 20px;

    /deep/ .business-title {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text {
        padding: 0 10px;
        width: 90%;
        line-height: 30px;
    }
}

.add-ylba {
    .el-form-item {
        margin: 0;
    }

    .input-number {
        width: 100%;

        /deep/ .el-input__inner {
            text-align: left;
        }
    }

    .table {
        /deep/ .el-input__inner {
            text-align: left;
        }
    }

    .line-row {
        display: inline-block;
        width: 80%;
    }

    .unit {
        display: inline-block;
        width: 20%;
        text-align: center;
    }

    .row-title {
        display: inline-block;
        padding: 0;
        width: 20%;
        line-height: 50px;
        text-align: center;
    }

    .bg {
        background: #fafafa;
    }

    .table-number {
        width: 100%;
    }

    .el-radio {
        margin: 10px 10px 10px 0;
    }

    .br {
        border-right: 1px solid #f2f2f2;
    }
}
</style>
