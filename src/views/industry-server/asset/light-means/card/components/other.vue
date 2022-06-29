<template>
  <div id="other">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="oper==='info'?true:false"
    >
      <div class="icon-title">
        <span class="span" />使用信息
      </div>
      <el-row :gutter="20">
        <span v-if="aType===1">
          <el-col :span="12">
            <el-form-item label="自用价值（元）" prop="selfUseValue">
              <el-input-number
                v-model="ruleForm.selfUseValue"
                :min="0"
                :max="10000000000"
                :precision="2"
                style="width: 100%;"
                clearable
                placeholder="请输入自用价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出借价值（元）" prop="loanedValue">
              <el-input-number
                v-model="ruleForm.loanedValue"
                :min="0"
                :max="10000000000"
                :precision="2"
                style="width: 100%;"
                clearable
                placeholder="请输入出借价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出租价值（元）" prop="leasedValue">
              <el-input-number
                v-model="ruleForm.leasedValue"
                :min="0"
                :max="10000000000"
                :precision="2"
                style="width: 100%;"
                clearable
                placeholder="请输入出租价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="闲置价值（元）" prop="idleValue">
              <el-input-number
                v-model="ruleForm.idleValue"
                :min="0"
                :max="10000000000"
                :precision="2"
                style="width: 100%;"
                clearable
                placeholder="请输入闲置价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他价值（元）" prop="otherValue">
              <el-input-number
                v-model="ruleForm.otherValue"
                :min="0"
                :max="10000000000"
                :precision="2"
                style="width: 100%;"
                clearable
                placeholder="请输入其他价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
        </span>

        <span v-if="aType===2">
          <el-col :span="12">
            <el-form-item label="使用状态" prop="usingState">
              <el-select
                v-model="ruleForm.usingState"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择使用状态"
              >
                <el-option
                  v-for="(item,index) in usingStateArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用人" prop="userThe">
              <el-input
                v-model="ruleForm.userThe"
                placeholder="请输入使用人"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用部门" prop="useDeptId">
              <el-select
                v-model="ruleForm.useDeptId"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择使用部门"
              >
                <el-option
                  v-for="(item,index) in orgList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地点" prop="storagePlace">
              <el-input
                v-model="ruleForm.storagePlace"
                placeholder="请输入存放地点"
                clearable
              />
            </el-form-item>
          </el-col>
        </span>

        <span v-if="aType===3 || aType===4 || aType===5">
          <el-col :span="12">
            <el-form-item label="使用人" prop="userThe">
              <el-input
                v-model="ruleForm.userThe"
                placeholder="请输入使用人"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用部门" prop="useDeptId">
              <el-select
                v-model="ruleForm.useDeptId"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择使用部门"
              >
                <el-option
                  v-for="(item,index) in orgList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地点" prop="storagePlace">
              <el-input
                v-model="ruleForm.storagePlace"
                placeholder="请输入存放地点"
                clearable
              />
            </el-form-item>
          </el-col>
        </span>

        <span v-if="aType===6">
          <el-col :span="12">
            <el-form-item label="使用部门" prop="useDeptId">
              <el-select
                v-model="ruleForm.useDeptId"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择使用部门"
              >
                <el-option
                  v-for="(item,index) in orgList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存放地点" prop="storagePlace">
              <el-input
                v-model="ruleForm.storagePlace"
                placeholder="请输入存放地点"
                clearable
              />
            </el-form-item>
          </el-col>
        </span>

        <span v-if="aType===102">
          <el-col :span="12">
            <el-form-item label="自用面积" prop="selfUseArea">
              <el-input-number
                v-model="ruleForm.selfUseArea"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入自用面积（m2）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自用价值" prop="selfUseValue">
              <el-input-number
                v-model="ruleForm.selfUseValue"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入自用价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出借面积" prop="loanedArea">
              <el-input-number
                v-model="ruleForm.loanedArea"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入出借面积（m2）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出借价值" prop="loanedValue">
              <el-input-number
                v-model="ruleForm.loanedValue"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入出借价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出租面积" prop="leasedArea">
              <el-input-number
                v-model="ruleForm.leasedArea"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入出租面积（m2）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出租价值" prop="leasedValue">
              <el-input-number
                v-model="ruleForm.leasedValue"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入出租价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="闲置面积" prop="idleArea">
              <el-input-number
                v-model="ruleForm.idleArea"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入闲置面积（m2）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="闲置价值" prop="idleValue">
              <el-input-number
                v-model="ruleForm.idleValue"
                :precision="2"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入闲置价值（元）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
        </span>

        <span v-if="aType===201">
          <el-col :span="12">
            <el-form-item label="使用状态" prop="usingState">
              <el-select
                v-model="ruleForm.usingState"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择使用状态"
              >
                <el-option
                  v-for="(item,index) in usingStateArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用人" prop="userThe">
              <el-input
                v-model="ruleForm.userThe"
                placeholder="请输入使用人"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆用途" prop="vehicleUse">
              <el-select
                v-model="ruleForm.vehicleUse"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择车辆用途"
              >
                <el-option
                  v-for="(item,index) in vehicleUseArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用部门" prop="useDeptId">
              <el-select
                v-model="ruleForm.useDeptId"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择使用部门"
              >
                <el-option
                  v-for="(item,index) in orgList"
                  :key="index"
                  :label="item.orgName"
                  :value="item.orgId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执法勤用车分类" prop="vehicleClassification">
              <el-input
                v-model="ruleForm.vehicleClassification"
                placeholder="请输入执法执勤用车分类"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否喷涂标识" prop="visMark">
              <el-select
                v-model="ruleForm.visMark"
                clearable
                filterable
                style="width: 100%;"
                placeholder="请选择是否喷涂执法执勤标识"
              >
                <el-option
                  v-for="(item,index) in visMarkArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本年行驶里程" prop="vcurrentYearMileage">
              <el-input-number
                v-model="ruleForm.vcurrentYearMileage"
                :min="0"
                :max="100000000000"
                style="width: 100%;"
                clearable
                placeholder="请输入本年行驶里程(公里)"
                :controls="false"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已使用年限" prop="serviceLife">
              <el-input-number
                v-model="ruleForm.serviceLife"
                :min="0"
                :max="12000"
                style="width: 100%;"
                clearable
                placeholder="请输入已使用年限（月）"
                :controls="false"
              />
            </el-form-item>
          </el-col>
        </span>

        <el-col :span="12">
          <el-form-item label="管理部门" prop="deptId">
            <el-select
              v-model="ruleForm.deptId"
              clearable
              filterable
              :disabled="user_info.orgid!=='1375' ? true : false"
              style="width: 100%;"
              placeholder="请选择管理部门"
            >
              <el-option
                v-for="(item,index) in orgList"
                :key="index"
                :label="item.orgName"
                :value="item.orgId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备用字段" prop="standby">
            <el-input
              v-model="ruleForm.standby"
              placeholder="请输入备用字段"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              placeholder="请输入备注"
              maxlength="500"
              :autosize="{ minRows: 4, maxRows: 6 }"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="照片" prop="filePath">
            <upload
              :file-list="fileList"
              :limit="9"
              multiple
              :disabled="oper==='info'?true:false"
              @fileSuccess="uploadSuccess"
              @remove="uploadRemove"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import upload from '@/components/upload'
import { getAllOrgList } from '@/api/general-services/enterpriseInfo/external'
import { mapGetters } from 'vuex'
export default {
  components: {
    upload
  },
  props:{
    infoData:{
      type:[Object,Array],
      default:()=>{}
    },
    assetsTypeData:{
      type:[Object,Array],
      default:()=>{}
    },
    oper:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      ruleForm: {
        deptId:'',
        useDeptId:'',
        vehicleUse:'',
        visMark:'',
      },
      data:{},
      aTypeData:{},
      aType: '',
      fileList:[],
      orgList:[],
      vehicleUseArr:[
        {label:'副部（省）级级以上领导用车',value:1},
        {label:'机要通讯用车',value:2},
        {label:'应急保障用车',value:3},
        {label:'执法执勤用车',value:4},
        {label:'特种专业技术用车',value:5},
        {label:'离退休干部用车',value:6},
        {label:'其他用车',value:7},
      ],
      visMarkArr:[
        {label:'是',value:1},
        {label:'否',value:0},
      ],
      usingStateArr:[
        {label:'在用',value:'在用'},
        {label:'闲置',value:'闲置'},
        {label:'待处置',value:'待处置'},
      ],
      rules:{
        deptId:{ required: true, message: '请选择管理部门', trigger: 'change' },
        // 房屋 housingInfoDto
        selfUseValue: [
          { required: true, message: '请输入自用价值', trigger: 'blur' },
        ],
        loanedValue: [
          { required: true, message: '请输入出借价值', trigger: 'blur' },
        ],
        leasedValue: [
          { required: true, message: '请输入出租价值', trigger: 'blur' },
        ],
        idleValue: [
          { required: true, message: '请输入闲置价值', trigger: 'blur' },
        ],
        otherValue: [
          { required: true, message: '请输入其他价值', trigger: 'blur' },
        ],
        // 2-设备 equipmentInfoDto
        usingState: [
          { required: true, message: '请输入使用状态', trigger: 'blur' },
        ],
        useDeptId: [
          { required: true, message: '请选择使用部门', trigger: 'change' },
        ],
        storagePlace: [
          { required: true, message: '请输入存放地点', trigger: 'blur' },
        ],
        userThe:[
          { required: true, message: '请输入使用人', trigger: 'blur' },
        ],
        // 102-土地 landInfoDto
        selfUseArea: [
          { required: true, message: '请输入自用面积（m2）', trigger: 'blur' },
        ],
        loanedArea: [
          { required: true, message: '请输入出借面积（m2）', trigger: 'blur' },
        ],
        leasedArea: [
          { required: true, message: '请输入出租面积（m2）', trigger: 'blur' },
        ],
        idleArea: [
          { required: true, message: '请输入闲置面积（m2）', trigger: 'blur' },
        ],
        // 201-车辆 vehicleInfoDto
        vehicleUse: [
          { required: true, message: '请选择车辆用途', trigger: 'change' },
        ],
        visMark: [
          { required: true, message: '请选择是否喷涂执法执勤标识', trigger: 'change' },
        ],
        vcurrentYearMileage: [
          { required: true, message: '请输入本年行驶里程(公里)', trigger: 'blur' },
        ],
        serviceLife: [
          { required: true, message: '请输入已使用年限（月）(公里)', trigger: 'blur' },
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  },
  watch:{
    infoData(newV,oldV) {
      this.data = newV
      this.initData()
    },
    assetsTypeData(newV){
      this.aTypeData = newV
      this.initData()
    }
  },
  async mounted() {
    this.data = this.infoData
    this.aTypeData = this.assetsTypeData
    this.initData()
    this.fetchOrgs()
  },
  methods: {
    initData(){
      const data = this.data
      this.aType = Number(this.aTypeData.type)
      let currency = {
        deptId: data && data.deptId ? data.deptId : '',// 管理部门编号
        deptName: data && data.deptName ? data.deptName : '',// 管理部门名称
        standby: data && data.standby ? data.standby : '',// 备用字段
        remark: data && data.remark ? data.remark : '',// 备注
        filePath: data && data.filePath ? data.filePath : ''// 照片
      }
      if (this.user_info.orgid!=='1375'){
        currency.deptId = Number(this.user_info.orgid)
      }
      let other = {}
      switch (this.aType) {
      case 1: // 1-房屋 housingInfoDto
        other = {
          selfUseValue: data && data.selfUseValue ? data.selfUseValue : 0, // 自用价值（元）
          loanedValue: data && data.loanedValue ? data.loanedValue : 0,// 出借价值（元）
          leasedValue: data && data.leasedValue ? data.leasedValue : 0, // 出租价值（元）
          idleValue: data && data.idleValue ? data.idleValue : 0,// 闲置价值（元）
          otherValue: data && data.otherValue ? data.otherValue : 0,// 其他价值（元）
        }
        break
      case 2: // 2-设备 equipmentInfoDto
        other = {
          usingState: data && data.usingState ? data.usingState : '',// 使用状态
          useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
          useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
          storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
          userThe: data && data.userThe ? data.userThe : '',// 使用人
        }
        break
      case 3: // 3-文物 culturalRelicsInfoDto
        other = {
          userThe:  data && data.userThe ? data.userThe : '',// 使用人
          useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
          useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
          storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
        }
        break
      case 4: // 4-图书 bookInfoDto
        other = {
          userThe:  data && data.userThe ? data.userThe : '',// 使用人
          useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
          useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
          storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
        }
        break
      case 5: // 5-家具 furnitureInfoDto
        other = {
          userThe:  data && data.userThe ? data.userThe : '',// 使用人
          useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
          useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
          storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
        }
        break
      case 6: // 6-动植物 plantAnimalInfoDto
        other = {
          useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
          useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
          storagePlace: data && data.storagePlace ? data.storagePlace : '',// 存放地点
        }
        break
      case 7: // 7-物资 suppliesInfoDto

        break
      case 101: // 101-构筑物 structuresInfoDto

        break
      case 102: // 102-土地 landInfoDto
        other = {
          selfUseArea: data && data.selfUseArea ? data.selfUseArea : 0,// 自用面积（m2）
          selfUseValue: data && data.selfUseValue ? data.selfUseValue : 0,// 自用价值（元）
          loanedArea: data && data.loanedArea ? data.loanedArea : 0,// 出借面积（m2）
          loanedValue: data && data.loanedValue ? data.loanedValue : 0,// 出借价值
          leasedArea: data && data.leasedArea ? data.leasedArea : 0,// 出租面积（m2）
          leasedValue: data && data.leasedValue ? data.leasedValue : 0,// 出租价值（元）
          idleArea: data && data.idleArea ? data.idleArea : 0,// 闲置面积（m2）
          idleValue: data && data.idleValue ? data.idleValue : 0,// 闲置价值（元）
        }
        break
      case 201: // 201-车辆 vehicleInfoDto
        other = {
          usingState: data && data.usingState ? data.usingState : '',// 使用状态
          userThe: data && data.userThe ? data.userThe : '',// 使用人
          useDeptId: data && data.useDeptId ? data.useDeptId : '',// 使用部门编号
          useDeptName: data && data.useDeptName ? data.useDeptName : '', // 使用部门名称
          vehicleUse: data && data.vehicleUse ? data.vehicleUse : '',// 车辆用途:（1）副部（省）级级以上领导用车、（2）机要通讯用车、（3）应急保障用车、（4）执法执勤用车、（5）特种专业技术用车、（6）离退休干部用车、（7）其他用车
          vehicleClassification: data && data.vehicleClassification ? data.vehicleClassification : '',// 执法执勤用车分类
          visMark: data && data.visMark ? data.visMark : '',// 是否喷涂执法执勤标识(0-否，1-是)
          vcurrentYearMileage: data && data.vcurrentYearMileage ? data.vcurrentYearMileage : 0,// 本年行驶里程
          serviceLife: data && data.serviceLife ? data.serviceLife : 0,// 已使用年限（月）
        }
        break
      default:
        break
      }
      this.ruleForm = Object.assign(currency, other)
      this.assembleFilePath()
    },
    fetchOrgs() {
      this.orgLoading = true
      // *type:2 -> 区县机构
      getAllOrgList().then(res => {
        this.orgList = res.data || []
      })
    },
    assembleFilePath(){
      this.fileList = []
      const filePath = this.ruleForm.filePath ? JSON.parse(this.ruleForm.filePath) : []
      filePath.forEach(element => {
        this.fileList.push({url:element})
      })
    },
    // 文件上传成功时的钩子
    uploadSuccess(file) {
      this.fileList.push({
        url: file.response.data,
        name: file.name
      })
    },
    // 文件列表移除文件时的钩子
    uploadRemove(file) {
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
    },
    /**
     * 保存
     */
    submitForm(formName) {
      let res = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const filePath = []
          this.fileList.forEach(item=>{
            filePath.push(item.url)
          })
          if (this.ruleForm.deptId){
            this.orgList.forEach(item=>{
              if (item.orgId===this.ruleForm.deptId){
                this.ruleForm.deptName = item.orgName
                return false
              }
            })
          }
          if (this.ruleForm.useDeptId){
            this.orgList.forEach(item=>{
              if (item.orgId===this.ruleForm.useDeptId){
                this.ruleForm.useDeptName = item.orgName
                return false
              }
            })
          }
          this.ruleForm.filePath = JSON.stringify(filePath)
          res = this.ruleForm
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
#other {
    /deep/ .el-input-number {
        input {
            text-align: left;
        }
    }
}
</style>
