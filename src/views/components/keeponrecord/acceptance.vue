<template>
  <el-form
    ref="audit"
    :model="audit"
    :rules="rules"
    label-width="0"
    class="base-audit"
  >
    <div class="icon-title" style="margin-top: 20px;">
      <span class="span" /> 备案受理
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="audit-title"
      contentClassName="audit-text"
      border
    >
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />受理状态:</template>
        <el-form-item v-if="isEdit" prop="shipId">
          <el-radio-group v-model="audit.isStatus">
            <el-radio :label="3">
              业务办理
            </el-radio>
            <el-radio :label="2">
              退回
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <span v-else>
           <span v-if="audit.isStatus===1">待受理</span>
           <span v-if="audit.isStatus===2">受理退回</span>
           <span v-else>已受理</span>
        </span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">受理人:</template>
        {{ audit.acceptBy || user_info.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">受理时间:</template>
        {{ audit.acceptDate || moment(new Date()).format('YYYY-MM-DD HH:mm') }}
      </el-descriptions-item>

      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />受理意见:</template>
        <el-form-item v-if="isEdit" prop="acceptOpinion">
          <el-input
            v-model.trim="audit.acceptOpinion"
            type="textarea"
            :rows="6"
            maxlength="500"
            placeholder="请输入受理意见"
          />
        </el-form-item>
        <span v-else>{{ audit.acceptOpinion }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-form>
</template>
<script>
import CommonTable from '@/components/features/FileTable.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    CommonTable
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean ,
      default: false
    },
    isHy:{
      type: Boolean ,
      default: false
    }
  },
  data() {
    return {
      audit: {
        isStatus:'',
        reviewedOpinion:''
      },
      reviewedFile: [],
      rules: {
        isStatus: [
          { required: true, message: '请选择受理状态', trigger: 'change' }
        ],
        acceptOpinion:[
          { required: true, message: '请输入受理意见', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    data:{
      handler(newV){
        this.initIicense(newV)
      },
      deep:true
    },
  },
  mounted() {
    this.initIicense(this.data)
  },
  methods: {
    initIicense(data){
      this.audit = {
        id: data?.id,
        isStatus:data?.isStatus,
        acceptBy:data?.acceptBy,
        acceptDate:data?.acceptDate,
        acceptOpinion:data?.acceptOpinion
      }
      // if (this.isHy){
      //   this.audit.acceptBy = this.user_info.username
      //   this.audit.acceptDate = moment(new Date()).format('YYYY-MM-DD HH:mm')
      // }
    },
    /**
     * 保存
     */
    async submitForm() {
      let res = false
      this.$refs['audit'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.audit))
        } else {
          res = false
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.base-audit {
    .required::after {
        color: rgb(255, 0, 0);
        content: "* ";
    }

    .el-form-item {
        margin: 0;
    }

    .is-error {
        margin-bottom: 10px;
    }

    .el-input-number {
        /deep/ .el-input {
            input {
                text-align: left !important;
            }
        }
    }

    .descriptions {
        margin-bottom: 20px;

        /deep/ .audit-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .audit-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .audit-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .audit-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
