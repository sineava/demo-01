<template>
  <el-form
    ref="situation"
    :model="situation"
    :rules="rules"
    label-width="0"
    class="base-situation"
  >
    <div class="icon-title">
      <span class="span" />培训情况
    </div>
    <el-descriptions
      class="descriptions"
      :column="3"
      :colon="true"
      size="medium"
      labelClassName="situation-title"
      contentClassName="situation-text"
      border
    >
      <el-descriptions-item>
        <template slot="label">
          <!-- <i v-if="isEdit" class="required" /> -->
          企业名称:
        </template>
        <!-- <el-form-item v-if="isEdit" prop="fullName">
          <el-input v-model.trim="situation.enterpriseName" placeholder="请输入企业名称" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ situation.enterpriseName }}</span> -->
        {{ situation.enterpriseName }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />培训计划名称:</template>
        <el-form-item v-if="isEdit" prop="planningId">
          <el-select
            v-model="situation.planningId"
            clearable
            style="width: 100%;"
            placeholder="请选择计划"
            @change="handleChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <span v-else>{{ situation.planningName }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <!-- <i v-if="isEdit" class="required" /> -->
          培训科目:
        </template>
        <!-- <el-form-item v-if="isEdit" prop="trainSubjects">
          <el-input v-model.trim="situation.trainSubjects" placeholder="请输入培训科目" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ situation.trainSubjects }}</span> -->
        {{ situation.trainSubjects }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />培训方式:</template>
        <el-form-item v-if="isEdit" prop="trainModes">
          <el-input v-model.trim="situation.trainModes" placeholder="请输入培训方式" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ situation.trainModes }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />组织人:</template>
        <el-form-item v-if="isEdit" prop="organizerPerson">
          <el-input v-model.trim="situation.organizerPerson" placeholder="请输入组织人" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ situation.organizerPerson }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />开始培训时间:</template>
        <el-form-item v-if="isEdit" prop="trainTime">
          <el-date-picker
            v-model="situation.trainTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择开始培训时间"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ situation.trainTime }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />培训学时:</template>
        <el-form-item v-if="isEdit" prop="trainStudyHours">
          <el-input-number
            v-model="situation.trainStudyHours"
            :precision="2"
            :min="0"
            :max="999999"
            placeholder="请输入培训学时"
            :controls="false"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ situation.trainStudyHours }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />培训对象:</template>
        <el-form-item v-if="isEdit" prop="trainObject">
          <el-input v-model.trim="situation.trainObject" placeholder="请输入培训对象" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ situation.trainObject }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />培训人数:</template>
        <el-form-item v-if="isEdit" prop="personNumber">
          <el-input-number
            v-model="situation.personNumber"
            :min="0"
            :max="99999999"
            placeholder="请输入培训人数"
            :controls="false"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ situation.personNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />填报人:</template>
        <el-form-item v-if="isEdit" prop="filledBy">
          <el-input
            v-model.trim="situation.filledBy"
            placeholder="请输入填报人"
            maxlength="30"
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ situation.filledBy }}</span>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />填报人联系电话:</template>
        <el-form-item v-if="isEdit" prop="contactNumber">
          <el-input v-model.trim="situation.contactNumber" placeholder="请输入填报人联系电话" @change="inputChange" />
        </el-form-item>
        <span v-else>{{ situation.contactNumber }}</span>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"><i v-if="isEdit" class="required" />填报时间:</template>
        <el-form-item v-if="isEdit" prop="fillingTime">
          <el-date-picker
            v-model="situation.fillingTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择填报时间"
            style="width: 100%;"
          />
        </el-form-item>
        <span v-else>{{ situation.fillingTime }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label"><i v-if="isEdit" class="required" />培训详情:</template>
        <el-form-item v-if="isEdit" prop="content">
          <el-input
            v-model.trim="situation.content"
            type="textarea"
            placeholder="请输入培训详情"
            rows="6"
            maxlength="500"
            show-word-limit
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ situation.content }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">培训效果:</template>
        <el-form-item v-if="isEdit" prop="effect">
          <el-input
            v-model.trim="situation.effect"
            type="textarea"
            placeholder="请输入培训效果"
            rows="6"
            maxlength="500"
            show-word-limit
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ situation.effect }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">备注:</template>
        <el-form-item v-if="isEdit" prop="remark">
          <el-input
            v-model.trim="situation.remark"
            type="textarea"
            placeholder="请输入备注"
            rows="6"
            maxlength="500"
            show-word-limit
            @change="inputChange"
          />
        </el-form-item>
        <span v-else>{{ situation.remark }}</span>
      </el-descriptions-item>
      <el-descriptions-item :span="3">
        <template slot="label">培训情况图片(最多5张):</template>
        <el-form-item v-if="isEdit" prop="remark">
          <upload
            :file-list="imgList"
            :limit="5"
            @success="imgUploadSuccess"
            @remove="imgUploadRemove"
          />
        </el-form-item>
        <span v-else>
          <span v-for="(item,index) in imgList" :key="index" style="display: inline-block; margin: 5px 5px 0 0;">
            <Images
              v-if="!isEdit"
              ref="images"
              height="100px"
              fit="contain"
              :url="item.url"
            />
          </span>
        </span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="icon-title">
      <span class="span" />附件信息
    </div>
    <upload
      v-if="isEdit"
      file
      :show-file-list="false"
      :file-list="fileList"
      multiple
      :limit="5"
      @fileSuccess="fileUploadSuccess"
    />
    <FileTable
      :show-download="true"
      :show-delete="isEdit"
      :table-data="fileList"
      @handleDelete="handleDelete"
    />
  </el-form>
</template>

<script>
import moment from 'moment'
import { telephone } from '@/utils/validate'
import upload from '@/components/upload'
import Images from '@/components/images'
import FileTable from '@/components/features/FileTable'
import { getTrainingPlanningLikePlanName } from '@/api/general-services/educateTrain/educatePlan'
export default {
  components: {
    upload,
    Images,
    FileTable
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
  },
  data() {
    return {
      situation: {
        planningId:'',
      },
      fileList:[],
      imgList: [],
      options:[],
      rules: {
        planningId: [
          { required: true, message: '请选择培训计划', trigger: 'change' }
        ],
        /*
         * trainSubjects: [
         *   { required: true, message: '请选择培训科目', trigger: 'blur' }
         * ],
         */
        trainModes: [
          { required: true, message: '请输入培训方式', trigger: 'blur' }
        ],
        organizerPerson: [
          { required: true, message: '请输入组织人', trigger: 'blur' }
        ],
        trainTime: [
          { required: true, message: '请选择开始培训时间', trigger: 'blur' }
        ],
        trainStudyHours: [
          { required: true, message: '请输入培训学时', trigger: 'blur' }
        ],
        trainObject: [
          { required: true, message: '请输入培训对象', trigger: 'blur' }
        ],
        personNumber: [
          { required: true, message: '请输入培训人数', trigger: 'blur' }
        ],
        filledBy: [
          { required: true, message: '请输入填报人', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入填报人联系电话', trigger: 'blur' },
          { validator: telephone, trigger: 'blur' }
        ],
        fillingTime: [
          { required: true, message: '请输入填报时间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入培训详情', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initSituation(newV)
      },
      deep:true
    }
  },
  async mounted() {
    await this.searchPlanList('')
    this.initSituation(this.data)
  },
  methods: {
    initSituation(data){
      this.situation = {
        id: data?.id,
        enterpriseName:data?.enterpriseName,
        planningId:data?.planningId,
        planningName: data?.planningName,
        trainSubjects:data?.trainSubjects,
        trainModes:data?.trainModes,
        organizerPerson:data?.organizerPerson,
        trainTime:data && data.trainTime ? moment(data.trainTime).format('YYYY-MM-DD') : '',
        trainStudyHours:data?.trainStudyHours,
        trainObject:data?.trainObject,
        personNumber:data?.personNumber,
        filledBy:data?.filledBy,
        contactNumber:data?.contactNumber,
        fillingTime:data && data.fillingTime ? moment(data.fillingTime).format('YYYY-MM-DD') : '',
        content:data?.content,
        effect:data?.effect,
        remark:data?.remark
      }
      this.imgList = data.trainingPicture ? JSON.parse(data.trainingPicture) : []
      this.fileList = data.enclosure ? JSON.parse(data.enclosure) : []
      if (data.planningId){
        for (let i=0;i<this.options.length;i++){
          if (this.options[i].value===data.planningId){
            this.situation.planningName = this.options[i].label
            return false
          }
        }
      }
    },
    // 输入框变更
    inputChange(){
      this.initSituation(this.situation)
      this.$emit('changeSituation',this.situation)
    },
    // 模糊查询计划列表
    async searchPlanList(val) {
      this.options = []
      const res = await getTrainingPlanningLikePlanName({ planName: val })
      res.data.forEach(({ planningName, id, trainSubjects }) => {
        this.options.push({
          label: planningName,
          value: id,
          trainSubjects
        })
      })
    },
    // 下拉框改变
    handleChange(val) {
      if (!val) {
        this.ruleForm.trainSubjects = ''
        this.situation.planningName = ''
      } else {
        for (let i=0;i<this.options.length;i++){
          if (this.options[i].value === val) {
            this.situation.trainSubjects = this.options[i].trainSubjects
            this.situation.planningName = this.options[i].label
            return false
          }
        }
      }
    },
    // 图片上传成功时的钩子
    imgUploadSuccess(res) {
      this.imgList.push({ url: res.data })
    },
    // 图片移除文件时的钩子
    imgUploadRemove(file) {
      this.imgList.forEach((item, index) => {
        const url = item.url || item.filePath
        if ( url === file.ydz) {
          this.imgList.splice(index, 1)
        }
      })
    },
    // 文件上传成功
    fileUploadSuccess(file) {
      this.fileList.push({
        filePath: file.response.data,
        fileName: file.name,
        fileSize: parseInt(file.size / 1024),
        createTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      })
    },
    // 移除表格数据
    handleDelete({ index }) {
      this.fileList.splice(index, 1)
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs['situation'].validate((valid) => {
        if (valid) {
          res = JSON.parse(JSON.stringify(this.situation))
          delete res.planningName
          res.enclosure = JSON.stringify(this.fileList)
          res.trainingPicture = JSON.stringify(this.imgList)
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
.base-situation {
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

        /deep/ .situation-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .situation-text {
            width: 23.33%;
            line-height: 30px;
        }
    }

    .descriptions-one {
        margin-bottom: 20px;

        /deep/ .situation-title {
            width: 10%;
            font-weight: 700;
            line-height: 30px;
            text-align: right;
            color: #606266;
        }

        /deep/ .situation-text {
            width: 90%;
            line-height: 30px;
        }
    }
}
</style>
