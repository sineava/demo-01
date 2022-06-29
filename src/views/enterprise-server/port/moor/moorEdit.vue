<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span class="detail-back">
        <el-page-header @back="returnBack" :content="type === 'add' ? '新增泊位信息' : type === 'detail' ? '泊位详情' : '编辑泊位信息'" />
      </span>
    </div>
    <div class="content"><BerthInfo ref="BerthInfo" :query="query" /></div>
    <div class="backstage-edit-btn">
      <el-button
        v-if="type !== 'detail'"
        type="primary"
        size="medium"
        :loading="loading"
        @click="saveData"
      >
        保存
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
import { addBerth,updateBerth } from '@/api/port-services/coastline/berth'
// import { getEnterpriseByName } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { mapGetters } from 'vuex'
import BerthInfo from '@/views/components/berth/info'
export default {
  components: {
    BerthInfo
  },
  data() {
    return {
      loading:false,
      query:{},
      type:'detail',
      returnUrl:'',
      enterpriseName:''
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  async created() {
    const { id,type} = this.$route.query
    this.query = {
      id, type,
      enterpriseName:this.user_info.orgname
    }
    this.type = type
  },
  methods: {
    async saveData(){
      let data = await this.$refs.BerthInfo.submitForm()
      if(!data){
        return false
      }
      this.loading = true
      if (data.id){
        updateBerth(data).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.returnBack()
          }
        })
      } else {
        data.infoFrom = false
        addBerth(data).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.returnBack()
          }
        })
      }
    },
    // 提交
    handlePost() {
      this.saveData()
    },
    // 返回
    returnBack() {
      this.$router.back(-1)
    },
  }
}
</script>
<style lang="scss" scoped>
.berth {
    //border: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    width: 100%;

    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .el-form-item {
        margin-bottom: 0;
    }

    .is-error {
        margin-bottom: 15px;
    }

    .el-table-border {
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
    }

    th {
        width: 15%;
        line-height: 40px;
        background: #f5f5f5;
    }

    td {
        padding: 0 10px;
    }

    .text-right {
        text-align: right;
    }

    .el-cascader-node > .el-radio, .el-radio:last-child {
        margin-right: 30px;
    }
}
</style>
