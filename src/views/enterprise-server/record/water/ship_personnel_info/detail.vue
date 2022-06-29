<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" content="船舶管理企业专职管理人员变更备案详情页" />
      </span>
      <span class="detail-header-button">
        <el-button
          v-if="data.isStatus === 1 || data.isStatus === 2"
          :type="isEdit ? 'primary' : 'warning'"
          size="small"
          @click="isEdit=!isEdit"
        >
          {{ isEdit ? '取消编辑' : '重新提交' }}
        </el-button>
      </span>
    </div>
    <KeepProfessional
      ref="KeepProfessional"
      :data="data"
      titleLable="船舶管理企业专职管理人员变更备案"
      :isEdit="isEdit"
    />
    <div style="margin-top: 20px;" />
    <KeepProfessionalAuth
      v-if="data.isStatus > 1"
      ref="keepProfessionalAuth"
      :data="data"
      :isEdit="isEdit"
    />
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        :loading="loading"
        type="primary"
        size="medium"
        @click="save"
      >
        提交
      </el-button>
      <el-button
        size="medium"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </el-card>
</template>

<script>
import { addData, getInfo, updateData } from '@/api/water-transportation-services/keep-on-record/ship-manage-person-filing'
import KeepProfessional from '@/views/components/keep/professionalSip'
import KeepProfessionalAuth from '@/views/components/keep/auth'
export default {
  components: {
    KeepProfessional,
    KeepProfessionalAuth
  },
  data() {
    return {
      data:{},
      isEdit:false,
      loading: false,
      enterpriseInfo: false,
    }
  },
  async mounted() {
    this.enterpriseInfo = this.$store.getters.enterprise
    this.isEdit = this.$route.query.oper !== 'info' ? true : false
    // 查询详情
    if (this.$route.query.id) {
      const res = await getInfo(this.$route.query.id)
      this.data = res.data || {}
    } else {
      this.data = {
        enterpriseId:this.enterpriseInfo.id,
        enterpriseName:this.enterpriseInfo.enterpriseName,
        organizationName:this.enterpriseInfo.organizationName
      }
    }
  },
  methods: {
    /**
     * 保存
     */
    async save() {
      const data = await this.$refs.KeepProfessional.submitForm()
      if (data===false){
        return false
      }
      this.loading = true
      let res = this.$route.query.id ? await updateData(data) : await addData(data)
      this.loading = false
      if (res.code === '0') {
        this.returnBack()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .table-top-column-there {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
        width: 45%;

        .el-select {
            width: 100%;
        }

        .is-disabled {
            .el-input__inner, .el-textarea__inner {
                background-color: #ffffff;
            }
        }
    }
}

/deep/ .el-table__expanded-cell {
    padding: 0;

    td {
        background-color: #f4f4f4;
    }
}

.table-add {
    border: 1px solid #ebeef5;
    border-top: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #666666;
    cursor: pointer;
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
        width: 20%;
        line-height: 30px;
    }
}

.descriptions-bz {
    margin: 20px 0;

    /deep/ .business-title-bz {
        width: 100px;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }
}
</style>
