<template>
  <div class="body-card">
    <el-form
      ref="ruleForm"
      :model="basicRuleForm"
      :rules="rules"
      label-width="0"
      class="base-ruleForm"
    >
      <div class="company_basic_detail">
        <div class="icon-title">
          <span class="span" />港口基础信息
          <span v-if="type!=='details'" class="oper-button" style="margin-left: 20px;">
            <el-button
              v-if="isEdit"
              type="primary"
              size="mini"
              @click="isEdit=!isEdit"
            >取消编辑</el-button>
            <el-button
              v-if="!isEdit"
              type="primary"
              size="mini"
              @click="isEdit=!isEdit"
            >编辑</el-button>
          </span>
        </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item :span="2" label="码头名称:">
            <div v-if="orgs.length>0">
              <el-tag v-for="(item,index) in orgs" :key="index">{{item.wharfName}}</el-tag>
            </div>
            <el-button v-else type="success" @click="handleDetail" size="mini" icon="el-icon-plus">添加码头</el-button>
          </el-descriptions-item>
          <el-descriptions-item label="经营企业名称:">{{ basicRuleForm.enterpriseName }}</el-descriptions-item>
          <el-descriptions-item label="所在地市港口管理部门:">{{ basicRuleForm.organizationName }}</el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />港口种类:</template>
            <el-form-item v-if="isEdit" prop="portType">
              <el-select
                v-model="basicRuleForm.portType"
                clearable
                multiple
                style="width: 100%;"
                placeholder="请选择港口种类"
              >
                <el-option label="件杂" :value="1" />
                <el-option label="散货" :value="2" />
                <el-option label="滚装" :value="3" />
                <el-option label="集装箱" :value="4" />
                <el-option label="危险货物" :value="5" />
                <el-option label="客运" :value="6" />
              </el-select>
            </el-form-item>
            <span v-else>
              {{ basicRuleForm.portType&&basicRuleForm.portType.map(x => ['','件杂','散货','滚装','集装箱','危险货物','客运'][x]).join(",")}}
            </span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label"><i v-if="isEdit" class="required" />安全生产标准达标等级:</template>
            <el-form-item v-if="isEdit" prop="securityLevel">
              <el-form-item v-if="isEdit" prop="securityLevel">
                <el-select
                  v-model="basicRuleForm.securityLevel"
                  clearable
                  style="width: 100%;"
                  placeholder="请选择安全生产标准达标等级"
                >
                  <el-option label="一级" value="一级" />
                  <el-option label="二级" value="二级" />
                  <el-option label="三级" value="三级" />
                </el-select>
              </el-form-item>
            </el-form-item>
            <span v-else>{{ basicRuleForm.securityLevel }}</span>
          </el-descriptions-item>
        </el-descriptions>

        <div class="icon-title">
          <span class="span" />人员组成基本情况
        </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />从事港口生产经营人员总数（人）:</template>
            <el-form-item v-if="isEdit" prop="production">
              <el-input-number
                v-model="basicRuleForm.production"
                :min="0"
                :max="1000000000"
                placeholder="请输入从事港口生产经营人员总数（人）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.production }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />签订劳动合同人员数量（人）:</template>
            <el-form-item v-if="isEdit" prop="laborContractNumber">
              <el-input-number
                v-model="basicRuleForm.laborContractNumber"
                :min="0"
                :max="1000000000"
                placeholder="请输入签订劳动合同人员数量（人）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.laborContractNumber }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />签订劳动合同特种作业人员数量（人）:</template>
            <el-form-item v-if="isEdit" prop="specialOperation">
              <el-input-number
                v-model="basicRuleForm.specialOperation"
                :min="0"
                :max="1000000000"
                placeholder="请输入签订劳动合同特种作业人员数量（人）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.specialOperation }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />劳务外包人员数量（人）:</template>
            <el-form-item v-if="isEdit" prop="outsourcingNumber">
              <el-input-number
                v-model="basicRuleForm.outsourcingNumber"
                :min="0"
                :max="1000000000"
                placeholder="请输入劳务外包人员数量（人）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.outsourcingNumber }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="company_basic_detail">
        <div class="icon-title">
          <span class="span" />陆域岸线和水域基本情况
        </div>
        <el-descriptions
          class="descriptions"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />使用陆域土地面积（万平方米）:</template>
            <el-form-item v-if="isEdit" prop="landArea">
              <el-input-number
                v-model="basicRuleForm.landArea"
                :min="0"
                :max="1000000000"
                :precision="4"
                placeholder="请输入使用陆域土地面积（万平方米）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.landArea }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i v-if="isEdit" class="required" />使用陆域土地相关批文及文号:
              <el-alert
                title="老码头确实无相关文件的则填“无”"
                type="warning"
                :closable="false"
                style="margin-bottom: 5px; padding: 0; line-height: 20px;"
              />
            </template>
            <el-form-item v-if="isEdit" prop="landTitanic">
              <el-input v-model.trim="basicRuleForm.landTitanic" placeholder="请输入使用陆域土地相关批文及文号" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.landTitanic }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">使用水域面积（万平方米）:</template>
            <el-form-item v-if="isEdit" prop="waterArea">
              <el-input-number
                v-model="basicRuleForm.waterArea"
                :min="0"
                :max="1000000000"
                :precision="4"
                placeholder="请输入使用水域面积（万平方米）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.waterArea }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">使用水域相关批文及文号:</template>
            <el-form-item v-if="isEdit" prop="waterTitanic">
              <el-input v-model.trim="basicRuleForm.waterTitanic" placeholder="请输入使用水域相关批文及文号" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.waterTitanic }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"><i v-if="isEdit" class="required" />使用自然岸线长度（米）:</template>
            <el-form-item v-if="isEdit" prop="coastlineLength">
              <el-input-number
                v-model="basicRuleForm.coastlineLength"
                :min="0"
                :max="1000000000"
                :precision="2"
                placeholder="请输入使用自然岸线长度（米）"
                :controls="false"
                style="width: 100%;"
              />
            </el-form-item>
            <span v-else>{{ basicRuleForm.coastlineLength }}</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i v-if="isEdit" class="required" />使用自然岸线相关批文及文号:
              <el-alert
                title="老码头确实无相关文件的则填“无”"
                type="warning"
                :closable="false"
                style="margin-bottom: 5px; padding: 0; line-height: 20px;"
              />
            </template>
            <el-form-item v-if="isEdit" prop="coastlineTitanic">
              <el-input v-model.trim="basicRuleForm.coastlineTitanic" placeholder="请输入使用自然岸线相关批文及文号" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.coastlineTitanic }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">备注</template>
            <el-form-item v-if="isEdit" prop="remark">
              <el-input
                v-model="remark"
                type="textarea"
                placeholder="请输入备注"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 6 }"
              />
            </el-form-item>
            <span v-else>{{ remark }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <div class="company_basic_detail">
        <div class="icon-title">
          <span class="span" />岸线历史变更情况说明
          <el-button
            v-if="isEdit"
            type="success"
            style="margin-left: 10px;"
            icon="el-icon-circle-plus-outline"
            size="mini"
            @click="addChange"
          >
            添加
          </el-button>
        </div>
        <Change
          v-for="(item,index) in changeSituationVos"
          :key="index"
          ref="change"
          :item="item"
          :index="index"
          :isEdit="isEdit"
          @delete="deleteChange"
        />
        <el-empty v-if="changeSituationVos.length===0" :image-size="80" description="暂无岸线变更记录" />
      </div>

      <div class="company_basic_detail">
        <div class="icon-title">
          <span class="span" /><i v-if="isEdit" class="required" style="margin-right: 10px;" />港区陆域边界信息
        </div>
        <el-descriptions
          class="descriptions-one"
          :column="2"
          :colon="true"
          size="medium"
          labelClassName="business-title"
          contentClassName="business-text"
          border
        >
          <el-descriptions-item :span="2">
            <template slot="label"><i v-if="isEdit" class="required" />详情地址:</template>
            <el-form-item v-if="isEdit" prop="portAddress">
              <el-input v-model.trim="basicRuleForm.portAddress" placeholder="请输入详情地址" />
            </el-form-item>
            <span v-else>{{ basicRuleForm.portAddress }}</span>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label">码头全景照片:</template>
            <Images
              v-if="!isEdit && basicRuleForm.portPhone"
              ref="images"
              height="100px"
              fit="contain"
              :url="basicRuleForm.portPhone"
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
        </el-descriptions>
        <Maptable
          ref="businessBaseMap"
          :is-edit="isEdit"
          @change="confirmMap"
        />
      </div>
      <el-descriptions
        class="descriptions-bz"
        :column="1"
        :colon="true"
        size="medium"
        labelClassName="business-title-bz"
        contentClassName="business-text-bz"
        border
      >
      </el-descriptions>
      <div v-if="isEdit" class="backstage-edit-btn">
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { findByHyBasicInfo, findByToBasicInfo,addOrModifyOtherInfo } from '@/api/general-services/enterpriseInfo/enterpriseInfo'
import { getWharf } from '@/api/port-services/coastline/berth'
import Maptable from '@/components/Maptable/index'
import Change from '@/views/components/port'
import upload from '@/components/upload'
import Images from '@/components/images'
export default {
  components: {
    Maptable,
    Change,
    upload,
    Images
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      type:'',
      enterpriseInfo: {},
      changeSituationVos:[],
      remark:'',
      isEdit:false,
      basicRuleForm: {},
      tableData:[],
      orgs:[],
      geographyInfos: [],
      photoList: [], // 码头全景照
      rules: {
        coastlineLength: [
          { required: true, message: '请输入使用自然岸线长度（米）', trigger: 'blur' }
        ],
        coastlineTitanic: [
          { required: true, message: '请输入使用自然岸线相关批文及文号', trigger: 'blur' }
        ],
        economicType: [
          { required: true, message: '请输入经济性质', trigger: 'blur' }
        ],
        laborContractNumber: [
          { required: true, message: '请输入签订劳动合同人员数量（人）', trigger: 'blur' }
        ],
        landArea: [
          { required: true, message: '请输入使用陆域土地面积（万平方米）', trigger: 'blur' }
        ],
        landTitanic: [
          { required: true, message: '请输入使用陆域土地相关批文及文号', trigger: 'blur' }
        ],
        outsourcingNumber: [
          { required: true, message: '请输入劳务外包人员数量（人）', trigger: 'blur' }
        ],
        portType: [
          { required: true, message: '请选择港口种类', trigger: 'change' }
        ],
        production: [
          { required: true, message: '请输入从事港口生产经营人员总数（人）', trigger: 'blur' }
        ],
        securityLevel: [
          { required: true, message: '请选择安全生产标准达标等级', trigger: 'change' }
        ],
        specialOperation: [
          { required: true, message: '请输入签订劳动合同特种作业人员数量（人）', trigger: 'blur' }
        ],
        portAddress:[
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  async mounted() {
    let { type , id ,name} = this.$route.query
    this.type = type
    this.enterpriseId = id
    this.findByBasicInfo(id)
    this.fetchOrgs()
  },
  methods: {
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getWharf({enterpriseId:this.enterpriseId}).then(res => {
        this.orgs = res.data || []
      })
    },
    async addChange(){
      let isAdd = -1
      for (let i=0;i<this.changeSituationVos.length;i++){
        let res = await this.$refs.change[i].submitForm()
        if (res === false){
          isAdd = i
          this.$message.error(`请先完善第${isAdd+1}历史变更情况说明后再添加`)
          return false
        }
      }
      if (isAdd===-1){
        this.changeSituationVos.push({
          id:'',
          title:'',
          remark:'',
          filePath:'',
          changeTime:''
        })
      }
    },
    handleDetail() {
      this.$emit('join', { name: '泊位信息'})
    },
    deleteChange(index){
      this.changeSituationVos.splice(index,1)
    },
     // 图片上传成功钩子
    uploadPhotoSuccess(file) {
      this.basicRuleForm.portPhone = file.response.data
      this.photoList.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 图片列表移除图片时的钩子
    uploadPhotoRemove() {
      this.photoList = []
      this.basicRuleForm.portPhone = ''
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      this.geographyInfos = val
    },
    /**
     * 查询
     */
    async findByBasicInfo(id) {
      if (!id){
        return false
      }
      const res = await findByHyBasicInfo(id)
      const base = await findByToBasicInfo({enterpriseId:id})
      this.enterpriseInfo = res.data
      this.basicRuleForm = base.data.basicInfo
      this.basicRuleForm.portType = (this.basicRuleForm.portType ? this.basicRuleForm.portType.split(',') : []).map(x => Number(x))
      this.tableData = base.data.geographyInfoVoList
      this.remark = res.data.remark || ''
      this.changeSituationVos = res.data.changeSituationVos || []
      this.$nextTick(() => {
        if (this.$refs.businessBaseMap){
          this.$refs.businessBaseMap.init(this.tableData)
        }
      })
      if (res.data.portPhone){
        this.photoList = [{
          url: res.data.portPhone,
          name: '码头全景照'
        }]
      }
      if (res.data.enterpriseOtherInfoVo) {
        for (let key in res.data.enterpriseOtherInfoVo) {
          if (res.data.enterpriseOtherInfoVo.hasOwnProperty(key)) {
            res.data.enterpriseOtherInfoVo[key] = res.data.enterpriseOtherInfoVo[key] ? res.data.enterpriseOtherInfoVo[key] : undefined
          }
        }
      }
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          if (!this.geographyInfos || this.geographyInfos.length===0){
            this.$message.error('请标记港区陆域边界信息')
            return false
          }
          let situationDtoList = []
          let error = ''
          if (this.$refs.change){
            this.$refs.change.forEach((item,index) => {
              let res = item.submitForm()
              if (res===false){
                error = `请先完善第${index+1}历史变更情况说明后再添加`
              }
              situationDtoList.push(res)
            })
          }
          if (error){
            this.$message.error(error)
            return false
          }
          const postData = {
            enterpriseId:this.basicRuleForm.id,
            portEnterpriseDataDto:{
              geographyInfos:this.geographyInfos, // 港口企业地理信息
              id:this.basicRuleForm.id
            },
            portType:this.basicRuleForm.portType.join(','),
            securityLevel:this.basicRuleForm.securityLevel,
            production:this.basicRuleForm.production,
            laborContractNumber:this.basicRuleForm.laborContractNumber,
            specialOperation:this.basicRuleForm.specialOperation,
            outsourcingNumber:this.basicRuleForm.outsourcingNumber,
            landArea:this.basicRuleForm.landArea,
            landTitanic:this.basicRuleForm.landTitanic,
            waterArea:this.basicRuleForm.waterArea,
            waterTitanic:this.basicRuleForm.waterTitanic,
            coastlineLength:this.basicRuleForm.coastlineLength,
            coastlineTitanic:this.basicRuleForm.coastlineTitanic,
            zoneId:this.basicRuleForm.zoneId, // 该字段未确定
            situationDtoList:situationDtoList,
            portPhone:this.basicRuleForm.portPhone, //码头全景照
            portAddress:this.basicRuleForm.portAddress, //详细地址
            remark:this.remark
          }
          addOrModifyOtherInfo(postData).then(res=>{
            if (res.code==='0'){
              this.$message.success('修改成功')
              this.isEdit = false
            }
          })
        } else {
          return false
        }
      })
    },
    // 更新tableData
    updateTableData(data) {
      this.tableData = data.map(({ lng, lat }, index) => ({ longitude: lng, latitude: lat, pointer: index }))
    },
    returnBack() {
      this.$router.back(-1)
    }
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


.title {
    display: flex;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;

    .span {
        display: inline-block;
        margin-right: 7px;
        width: 6px;
        height: 18px;
        background-color: #409eff;
    }
}

.license-detail {
    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        border: 1px solid #ebeef5;
        border-top: 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            border-top: 1px solid #ebeef5;
            border-right: 1px solid #ebeef5;
            padding: 10px 0;
            width: 33.33%;
            background-color: #ffffff;

            /deep/ .el-input--medium .el-input__inner {
                border: none;
            }

            .el-image {
                margin-left: 15px;
                width: 100px;
                height: 100px;
            }
        }
    }
}

.company_basic_detail {
    .two-column-input-table {
        display: flex;
        margin: 20px 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 50%;
            background-color: #ffffff;
        }
    }
}

.company_other_detail {
    .three-column-input-table {
        display: flex;
        margin: 20px 0;
        flex-wrap: wrap;

        .el-form-item {
            margin: 0 0 1px 0;
            padding: 10px 0;
            width: 33.33%;
            background-color: #ffffff;

            .el-image {
                margin-left: 15px;
                width: 100px;
                height: 100px;
            }

            .el-input-number {
                width: 100%;
            }
        }
    }
}

.base-ruleForm {
    .el-form-item {
        margin: 0;
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
