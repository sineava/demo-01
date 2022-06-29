<template>
  <el-card class="body-card">
    <div
      slot="header"
      class="clearfix"
    >
      <em
        class="el-icon-back icon-back"
        @click="back"
      /><span>{{ type === 'add' ? '新增泊位信息' : type === 'detail' ? '泊位详情' : '编辑泊位信息' }}</span>
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
          @click="back"
        >
          返回
        </el-button>
    </div>
  </el-card>
</template>

<script>
import { addBerth,updateBerth } from '@/api/port-services/coastline/berth'
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
      returnUrl:''
    }
  },
  async created() {
    // 查询港口信息
    const { id, url,type,enterpriseId} = this.$route.query
    this.query = {
      id, type, enterpriseId
    }
    this.type = type
    this.returnUrl = decodeURIComponent(url)
    
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
            this.back()
          }
        })
      } else {
        data.infoFrom = false
        addBerth(data).then(res => {
          this.loading = false
          if (res.code==='0'){
            this.back()
          }
        })
      }
    },
    back(){
      if (this.returnUrl){
        this.$router.push({ path: this.returnUrl})
      } else {
        this.returnBack()
      }
    }
  }
}
</script>