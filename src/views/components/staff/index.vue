<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="staff"
      :rules="rules"
      label-width="0"
      class="base-ruleForm"
    >
      <div class="icon-title">
        <span class="span" />人员基础信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item label="人员照片:" :span="3">
          <Images
            v-if="!isEdit && staff.personImg"
            ref="images"
            height="100px"
            fit="contain"
            :url="staff.personImg"
          />
          <upload
            v-if="isEdit"
            :file-list="photoList"
            :limit="1"
            multiple
            @fileSuccess="uploadPhotoSuccess"
            @remove="uploadPhotoRemove"
          />
        </el-descriptions-item>
        <el-descriptions-item :span="2">
          <template slot="label">企业名称</template>
          <span>{{ staff.enterpriseName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />员工姓名</template>
          <el-form-item v-if="isEdit" prop="fullName">
            <el-input v-model.trim="staff.fullName" placeholder="请输入员工姓名" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.fullName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />人员类型</template>
          <el-form-item v-if="isEdit" prop="personType">
            <el-select
              v-model="staff.personType"
              clearable
              style="width: 100%;"
              placeholder="请选择人员类型"
              @change="inputChange"
            >
              <el-option label="一般人员" :value="1" />
              <el-option label="安全管理人员" :value="2" />
              <el-option label="装卸管理人员" :value="3" />
              <el-option label="其他管理人员" :value="4" />
              <el-option label="环保管理人员" :value="5" />
              <el-option label="经营管理人员" :value="6" />
            </el-select>
          </el-form-item>
          <span v-else>{{ getPersonType(staff.personType) }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />性别</template>
          <el-form-item v-if="isEdit" prop="sex">
            <el-select
              v-model="staff.sex"
              clearable
              style="width: 100%;"
              placeholder="请选择人员类型"
              @change="inputChange"
            >
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
          <span v-else>{{ staff.sex ? '男' : '女' }}</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />出生年月日</template>
          <el-form-item v-if="isEdit" prop="birthDate">
            <el-date-picker
              v-model="staff.birthDate"
              type="date"
              clearable
              style="width: 100%;"
              placeholder="选择出生年月日"
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ staff.birthDate }}</span>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />请选择所在机构</template>
          <el-form-item v-if="isEdit" prop="organizationId">
            <el-cascader
              v-model="staff.organizationId"
              style="width: 100%;"
              :options="departmentList"
              clearable
              :props="{'label': 'organizationName', 'value': 'id', 'checkStrictly': true}"
              :show-all-levels="false"
              placeholder="请选择所在机构"
            />
          </el-form-item>
          <span v-else>{{ staff.organizationName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i v-if="isEdit" class="required" />职务</template>
          <el-form-item v-if="isEdit" prop="post">
            <el-input v-model.trim="staff.post" placeholder="请输入职务" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.post }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">专业</template>
          <el-form-item v-if="isEdit" prop="majorDirection">
            <el-input v-model.trim="staff.majorDirection" placeholder="请输入专业" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.majorDirection }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">办公电话</template>
          <el-form-item v-if="isEdit" prop="officeTelephone">
            <el-input v-model.trim="staff.officeTelephone" placeholder="请输入办公电话" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.officeTelephone }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">移动电话</template>
          <el-form-item v-if="isEdit" prop="phone">
            <el-input v-model.trim="staff.phone" placeholder="请输入移动电话" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.phone }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">电子邮箱</template>
          <el-form-item v-if="isEdit" prop="email">
            <el-input v-model.trim="staff.email" placeholder="请输入电子邮箱" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.email }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">备注:</template>
          <el-form-item v-if="isEdit" prop="remark">
            <el-input
              v-model="staff.remark"
              type="textarea"
              placeholder="请输入备注"
              :autosize="{ minRows: 4, maxRows: 6 }"
              @change="inputChange"
            />
          </el-form-item>
          <span v-else>{{ staff.remark }}</span>
        </el-descriptions-item>
      </el-descriptions>
      <div class="icon-title">
        <span class="span" />人员持证信息
      </div>
      <el-descriptions
        class="descriptions"
        :column="3"
        :colon="true"
        size="medium"
        labelClassName="business-title"
        contentClassName="business-text"
        border
      >
        <el-descriptions-item :span="2">
          <template slot="label">证书名称</template>
          <el-form-item v-if="isEdit" prop="certificateName">
            <el-input v-model.trim="staff.certificateName" placeholder="请输入证书名称" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.certificateName }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">证书颁发机构</template>
          <el-form-item v-if="isEdit" prop="certificateAuthority">
            <el-input v-model.trim="staff.certificateAuthority" placeholder="请输入证书颁发机构" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.certificateAuthority }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">证书编号</template>
          <el-form-item v-if="isEdit" prop="certificateCode">
            <el-input v-model.trim="staff.certificateCode" placeholder="请输入证书编号" @change="inputChange" />
          </el-form-item>
          <span v-else>{{ staff.certificateCode }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">证书颁发日期</template>
          <el-form-item v-if="isEdit" prop="certificateIssueDate">
            <el-date-picker
              v-model="staff.certificateIssueDate"
              type="date"
              clearable
              style="width: 100%;"
              placeholder="选择证书颁发日期"
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ staff.certificateIssueDate }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">有效期至</template>
          <el-form-item v-if="isEdit" prop="validityDate">
            <el-date-picker
              v-model="staff.validityDate"
              type="date"
              clearable
              style="width: 100%;"
              placeholder="选择有效期至"
              @change="inputChange"
              @clear="inputChange"
            />
          </el-form-item>
          <span v-else>{{ staff.validityDate }}</span>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">证书图片</template>
          <el-form-item v-if="isEdit" prop="certificateImg">
            <upload
              :file-list="certificateImg"
              :limit="5"
              multiple
              @success="uploadSuccess"
              @remove="uploadRemove"
            />
          </el-form-item>
          <span v-else>
            {{ }}
            <Images
              v-for="(item,index) in certificateImg"
              :key="index"
              ref="images"
              height="100px"
              fit="contain"
              :url="item.url"
            />
          </span>
        </el-descriptions-item>
      </el-descriptions>

      <template v-if="staff.personType===2">
        <div class="icon-title">
          <span class="span" />安全管理人员能力考核情况
        </div>
        <el-descriptions
          class="descriptions"
          :column="3"
          :colon="true"
          size="medium"
          labelClassName="business-title-two"
          contentClassName="business-text-two"
          border
        >
          <el-descriptions-item>
            <template slot="label">是否通过</template>
            <el-form-item v-if="isEdit" prop="isAdopt">
              <el-select
                v-model="staff.isAdopt"
                clearable
                placeholder="请选择是否通过"
                @change="inputChange"
              >
                <el-option label="通过" :value="1" />
                <el-option label="未通过" :value="0" />
              </el-select>
            </el-form-item>
            <span v-else>{{ staff.isAdopt ? '通过' : '未通过' }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">通过日期</template>
            <el-form-item v-if="isEdit" prop="adoptDate">
              <el-date-picker
                v-model="staff.adoptDate"
                type="date"
                clearable
                style="width: 100%;"
                placeholder="请选择通过日期"
                @change="inputChange"
                @clear="inputChange"
              />
            </el-form-item>
            <span v-else>{{ staff.adoptDate }}</span>
          </el-descriptions-item>
          <el-descriptions-item v-if="isEdit" :span="3">
            <template slot="label">考核附件</template>
            <upload
              v-if="isEdit"
              file
              :show-file-list="false"
              multiple
              :limit="5"
              :file-list="enterprisePersonEnclosureInfoDtoList"
              @fileSuccess="fileSuccess"
            />
          </el-descriptions-item>
        </el-descriptions>
        <FileTable
          :show-download="true"
          :show-delete="isEdit"
          :table-data="enterprisePersonEnclosureInfoDtoList"
          @handleDelete="handleDelete"
        />
      </template>
    </el-form>
  </div>
</template>

<script>
import { phone } from '@/utils/validate'
import moment from 'moment'
import upload from '@/components/upload'
import FileTable from '@/components/features/FileTable'
import Images from '@/components/images'
import { findByEnOrganizationList } from '@/api/general-services/enterpriseInfo/enterpriseOrganization'
export default {
  components: {
    FileTable,
    upload,
    Images
  },
  props: {
    data: {
      type: Object,
      default:()=>{}
    },
    isEdit:{
      type:[Boolean,String],
      default:false
    },
    enterpriseId:{
      type:[Number,String],
      default:''
    }
  },
  data() {
    return {
      basic: {},
      staff:{},
      photoList:[], // 人员照片
      departmentList:[], // 组织机构
      enterprisePersonEnclosureInfoDtoList:[],// 考核附件
      certificateImg:[],
      rules: {
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2~10个字符姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        organizationId: [
          { required: true, message: '请选择所在机构', trigger: 'change' }
        ],
        personType:[
          { required: true, message: '请选择人员类型', trigger: 'change' }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        officeTelephone: [
          { message: '请输入办公电话', trigger: 'blur' }
        ],
        phone: [
          // { required: true, message: '请输入移动电话', trigger: 'blur' },
          { validator: phone, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
    }
  },
  watch:{
    data:{
      handler(newV){
        this.initLicense(newV)
      },
      deep:true
    },
  },
  async mounted() {
    let obj
    if (this.enterpriseId){
      obj = await findByEnOrganizationList({enterpriseId:this.enterpriseId})
    } else {
      obj = await findByEnOrganizationList()
    }
    this.departmentList = obj.data || []
    this.initLicense(this.data)
  },
  methods: {
    moments(date){
      return date ? moment(date).format('YYYY-MM-DD') : ''
    },
    initLicense(data){
      this.staff = {
        id:data?.id,
        enterpriseId:data?.enterpriseId,
        personImg:data?.personImg,
        enterpriseName:data?.enterpriseName,
        fullName:data?.fullName,
        personType:data?.personType,
        sex:data?.sex,
        birthDate:data?.birthDate,
        organizationId:data?.organizationId,
        organizationName:data?.organizationName,
        post:data?.post,
        majorDirection:data?.majorDirection,
        officeTelephone:data?.officeTelephone,
        phone:data?.phone,
        email:data?.email,
        remark:data?.remark,
        certificateName:data?.certificateName,
        certificateAuthority:data?.certificateAuthority,
        certificateCode:data?.certificateCode,
        certificateIssueDate:data?.certificateIssueDate,
        validityDate:data?.validityDate,
        isAdopt:data?.isAdopt,
        adoptDate:data?.adoptDate
      }
      if (data && data.certificateImg){
        let certificateImg = JSON.parse(data.certificateImg)
        this.certificateImg = certificateImg.length===0 ? [] : certificateImg
      }
      this.enterprisePersonEnclosureInfoDtoList = data?.enterprisePersonEnclosureInfoVoList || []
      if (data && data.personImg){
        this.photoList = [{
          url: data.personImg,
          name: data.personImg
        }]
      }
    },
    getPersonType(type){
      let name = ''
      switch (Number(type)){
      case 1:
        name = '一般人员'
        break
      case 2:
        name = '安全管理人员'
        break
      case 3:
        name = '装卸管理人员'
        break
      case 4:
        name = '其他管理人员'
        break
      case 5:
        name = '环保管理人员'
        break
      default:
        name = '经营管理人员'
        break
      }
      return name
    },
    // 输入框变更
    inputChange(){
    },
    /**
     * 保存
     */
    async submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          res = this.staff
          res.certificateIssueDate = this.staff.certificateIssueDate ? moment(this.staff.certificateIssueDate).format('YYYY-MM-DD') : null
          res.validityDate = this.staff.validityDate ? moment(this.staff.validityDate).format('YYYY-MM-DD') : null
          res.birthDate = this.staff.birthDate ? moment(this.staff.birthDate).format('YYYY-MM-DD') : null
          res.adoptDate = this.staff.adoptDate ? moment(this.staff.adoptDate).format('YYYY-MM-DD') : null
          res.certificateImg = JSON.stringify(this.certificateImg)
          res.organizationId = this.staff.organizationId ? this.staff.organizationId[this.staff.organizationId.length-1] : ''
          res.enterpriseId = Number(res.enterpriseId)
          let dto = []
          if (this.enterprisePersonEnclosureInfoDtoList.length>0){
            this.enterprisePersonEnclosureInfoDtoList.forEach(item=>{
              dto.push({
                fileName: item.fileName,
                path: item.path,
                size: item.size
              })
            })
          }
          res.enterprisePersonEnclosureInfoDtoList = dto
        } else {
          res = false
        }
      })
      return res
    },
    // 头像上传成功钩子
    uploadPhotoSuccess(file) {
      this.staff.personImg = file.response.data
      this.photoList.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 头像列表移除图片时的钩子
    uploadPhotoRemove() {
      this.photoList = []
      this.staff.personImg = ''
    },
    // 证书上传
    uploadSuccess(file) {
      this.certificateImg.push({ url: file.data })
    },
    // 证书移除
    uploadRemove(file) {
      this.certificateImg.forEach((item, index) => {
        if (item.url === file.response.data) {
          this.certificateImg.splice(index, 1)
        }
      })
    },
    // 附件上传成功
    fileSuccess(file) {
      this.enterprisePersonEnclosureInfoDtoList.push({
        path: file.response.data,
        fileName: file.name,
        size: parseInt(file.size / 1024),
        date: moment(Date.now())
      })
    },
    // 附件删除
    handleDelete(index) {
      this.enterprisePersonEnclosureInfoDtoList.splice(index, 1)
    },
  }
}
</script>

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

    /deep/ .business-title-two {
        width: 10%;
        font-weight: 700;
        line-height: 30px;
        text-align: right;
        color: #606266;
    }

    /deep/ .business-text-two {
        width: 40%;
        line-height: 30px;
    }
}

.base-ruleForm {
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
}
</style>
