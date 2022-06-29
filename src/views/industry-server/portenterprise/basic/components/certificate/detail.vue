<template>
  <div class="basic-detail">
    <Workpermit ref="Workpermit" :data="ruleForm" :isEdit="isEdit" />
    <!-- <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="business-title"
      contentClassName="business-text"
      border
    >
      <el-descriptions-item label="港口经营人:">{{ ruleForm.operator }}</el-descriptions-item>
      <el-descriptions-item label="发证机关:">{{ ruleForm.departmentName }}</el-descriptions-item>
      <el-descriptions-item label="发证日期:">{{ ruleForm.releaseDate }}</el-descriptions-item>
      <el-descriptions-item label="证书编号:">{{ ruleForm.certificateNumber }}</el-descriptions-item>
      <el-descriptions-item label="有效期至:">{{ ruleForm.maturityDate }}</el-descriptions-item>
      <el-descriptions-item label="作业区域范围:">{{ ruleForm.areaScope }}</el-descriptions-item>
      <el-descriptions-item label="作业方式:">{{ ruleForm.jobType }}</el-descriptions-item>
      <el-descriptions-item label="作业危险货物品名:">{{ ruleForm.goodsName }}</el-descriptions-item>
      <el-descriptions-item label="证书图片:">
        <Images
          v-for="(img, index) in ruleForm.filePath"
          :key="index"
          ref="images"
          height="100px"
          fit="contain"
          :url="img"
        />
      </el-descriptions-item>
    </el-descriptions> -->
    <div class="backstage-edit-btn">
      <el-button
        v-if="isEdit"
        v-loading="loading"
        type="primary"
        size="small"
        @click="submitForm"
      >
        修改保存
      </el-button>
      <el-button
        size="small"
        @click="returnBack"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { findGoods,postLicense,putLicense } from '@/api/general-services/enterprise-qualification/business-license'
// import Images from '@/components/images'
import Workpermit from '@/views/components/license/workpermit'
export default {
  components: {
    // Images,
    Workpermit
  },
  props: {
    objData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ruleForm: {},
      isEdit:false,
      loading:false,
    }
  },
  created() {
    const id = this.objData.id
    this.isEdit = this.objData.type==='details' ? false : true
    if (id){
      this.fetchData(id)
    } else {
      this.ruleForm = {
        enterpriseName:this.objData.enterpriseName,
        enterpriseId:this.objData.enterpriseId
      }
    }
  },
  methods: {
    async fetchData(id) {
      findGoods({ id }).then(res => {
        this.ruleForm = res.data || {}
        /*
         * this.ruleForm = {
         *   ...res.data,
         *   filePath: res.data.filePath ? JSON.parse(res.data.filePath) : []
         * }
         */
      })
    },
    async submitForm(){
      if (this.loading){
        return false
      }
      this.loading = true
      let data = await this.$refs.Workpermit.submitForm()
      this.loading = false
      if (data !== false){
        let res = data.id ? await putLicense(data) : await postLicense(data)
        if (res.code==='0'){
          this.$message.success(data.id ? '修改成功' : '添加成功')
          this.returnBack()
        }
      }
    },
    returnBack() {
      this.$emit('join', { name: '港口危险货物作业附证' })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-image {
    width: 100px;
}

.el-input.is-disabled /deep/ .el-input__inner {
    border: none;
}
</style>
