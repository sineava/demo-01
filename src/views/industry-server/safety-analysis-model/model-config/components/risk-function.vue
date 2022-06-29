<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="margin-top: 20px; width: 100%;"
    >
      <el-table-column
        label="序号"
        width="65"
        align="center"
      >
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="类别"
        align="center"
        prop="name"
        width="160"
      />
      <el-table-column
        label="风险值"
      >
        <template v-slot="scope">
          <div v-for="(item, index) in scope.row.list" :key="index">
            <div v-if="scope.row.isGdz">
              <div v-if="item.valueType===0" class="gs-line">
                {{ item.riskMin !==null && item.riskMin !== undefined && item.riskMin !== 'undefined' ? `${item.riskMin} ${item.riskMinSymbol===1?' ≥ ':item.riskMinSymbol===2?' ＞ ':item.riskMinSymbol===3?' ≤ ':' ＜ '}`:'' }}
                X  {{ item.riskMax !==null && item.riskMax !==undefined && item.riskMax !== 'undefined' ? `${item.riskMaxSymbol===1?' ≥ ':item.riskMaxSymbol===2?' ＞ ':item.riskMaxSymbol===3?' ≤ ':' ＜ '} ${item.riskMax}`:'' }}
                <span style="margin: 0 10px;">=</span>
                {{ item.value }}
              </div>
              <div v-else class="gs-line">
                {{ item.riskMin !==null && item.riskMin !== undefined && item.riskMin !== 'undefined' ? `${item.riskMin} ${item.riskMinSymbol===1?' ≥ ':item.riskMinSymbol===2?' ＞ ':item.riskMinSymbol===3?' ≤ ':' ＜ '}`:'' }}
                X  {{ item.riskMax !==null && item.riskMax !== undefined && item.riskMax !== 'undefined' ? `${item.riskMaxSymbol===1?' ≥ ':item.riskMaxSymbol===2?' ＞ ':item.riskMaxSymbol===3?' ≤ ':' ＜ '} ${item.riskMax}`:'' }}
                <span style="margin: 0 10px;">=</span>
                <span v-if="item.moleculeType===0">{{ item.moleculeValue }}</span>
                <span v-if="item.moleculeType===1">({{ item.moleculeValue }} +  X) </span>
                <span v-if="item.moleculeType===2">(X - {{ item.moleculeValue }}) </span>
                <span v-if="item.moleculeType===3">({{ item.moleculeValue }} - X)</span>
                /
                <span v-if="item.denominatorType===0">{{ item.denominatorValue }}</span>
                <span v-if="item.denominatorType===1">({{ item.denominatorValue }} +  X )</span>
                <span v-if="item.denominatorType===2">(X - {{ item.denominatorValue }})</span>
                <span v-if="item.denominatorType===3">({{ item.denominatorValue }} -  X )</span>
              </div>
            </div>
            <div v-else>
              <el-input-number
                v-model="item.value"
                :precision="2"
                placeholder="请输入值"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        :width="modules!==5 ? 200 : 100"
      >
        <template v-slot="scope">
          <el-button
            v-if="modules!==5"
            size="mini"
            type="warning"
            @click="handleEidt(scope.row,scope.$index)"
          >
            <em class="el-icon-edit-outline" /> 函数
          </el-button>
          <el-button
            v-if="modules===5"
            size="mini"
            type="primary"
            @click="handleEidtGd(scope.row,scope.$index)"
          >
            <em class="el-icon-edit-outline" /> 固定值
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="函数"
      :visible.sync="dialogVisible"
      class="alert-config"
      width="80%"
    >
      <el-button type="success" icon="el-icon-circle-plus" style="margin:10px 0;" @click="cancelAdd()" size="small">{{isAdd ? (ruleForm.id ? '取消编辑' : '取消新增'): (ruleForm.id ? '编辑函数' : '新增函数')}}</el-button>
      <el-table
        :data="currentList"
        border
        style="width: 100%;"
      >
        <el-table-column
          label="编号"
          width="65"
          align="center"
        >
          <template v-slot="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="范围"
          align="center"
        >
          <template v-slot="scope">
            <span class="vlaue">
              <el-input-number
                v-model="scope.row.riskMin"
                :controls="false"
                :precision="2"
                placeholder="请输入值"
                style="width: 100px;"
              />
            </span>
            <span class="unit">
              <el-select v-model="scope.row.riskMinSymbol" placeholder="符号">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </span>
            <span class="variable">X</span>
            <span class="unit">
              <el-select v-model="scope.row.riskMaxSymbol" placeholder="符号">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </span>
            <span class="vlaue">
              <el-input-number
                v-model="scope.row.riskMax"
                :precision="2"
                placeholder="请输入值"
                style="width: 100px;"
                :controls="false"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="函数 / 固定值"
        >
          <template v-slot="scope">
            <div v-if="scope.row.valueType===0">{{ scope.row.value }}</div>
            <div v-else>
              <span v-if="scope.row.moleculeType===0">{{ scope.row.moleculeValue }}</span>
              <span v-if="scope.row.moleculeType===1">({{ scope.row.moleculeValue }} +  X) </span>
              <span v-if="scope.row.moleculeType===2">(X - {{ scope.row.moleculeValue }}) </span>
              <span v-if="scope.row.moleculeType===3">({{ scope.row.moleculeValue }} - X)</span>
              /
              <span v-if="scope.row.denominatorType===0">{{ scope.row.denominatorValue }}</span>
              <span v-if="scope.row.denominatorType===1">({{ scope.row.denominatorValue }} +  X )</span>
              <span v-if="scope.row.denominatorType===2">(X - {{ scope.row.denominatorValue }})</span>
              <span v-if="scope.row.denominatorType===3">({{ scope.row.denominatorValue }} -  X )</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          :width="100"
        >
          <template v-slot="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDetail(scope.$index,scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-form
        v-if="isAdd"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        size="medium"
      >
        <div class="icon-title" style="margin-top: 20px; width: 100%;">
          <span class="span" />计算函数
        </div>
        <el-form-item
          label="函数类型："
          prop="valueType"
        >
          <el-radio-group v-model="ruleForm.valueType">
            <el-radio :label="0">固定值</el-radio>
            <el-radio :label="1">函数</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.valueType===0"
          label="固定值："
          prop="value"
        >
          <el-input v-model.trim="ruleForm.value" />
        </el-form-item>
        <el-form-item
          v-if="ruleForm.valueType===1"
          label="函数："
        >
          <div>
            <div class="power">μ (x)=</div>
            <div class="equation">
              <div class="fz">
                <span>
                  <el-form-item prop="fzType">
                    <el-select
                      v-model="ruleForm.fzType"
                      class="select-title"
                      style="width: 100px;"
                      placeholder="请选择"
                    >
                      <el-option label="函数" :value="0" />
                      <el-option label="固定值" :value="1" />
                    </el-select>
                  </el-form-item>
                </span>
                <span v-if="ruleForm.fzType===0" class="fz-hs">
                  <span>
                    <el-form-item prop="fzl_type">
                      <el-select v-model="ruleForm.fzl_type" style="margin: 0 10px; width: 80px;" @change="fzChange">
                        <el-option label="数值" :value="0" />
                        <el-option label="X" :value="1" />
                      </el-select>
                    </el-form-item>
                  </span>
                  <span v-if="ruleForm.fzl_type===0">
                    <el-form-item prop="fzl_value">
                      <el-input-number
                        v-model="ruleForm.fzl_value"
                        :precision="2"
                        placeholder="请输入值"
                        :controls="false"
                      />
                    </el-form-item>
                  </span>
                  <span style="margin: 0 10px;">
                    <el-form-item prop="moleculeType">
                      <el-select v-model="ruleForm.moleculeType" style="width: 60px;">
                        <el-option label="+" :value="0" />
                        <el-option label="-" :value="1" />
                      </el-select>
                    </el-form-item>
                  </span>
                  <span>
                    <el-form-item prop="fzr_type">
                      <el-select v-model="ruleForm.fzr_type" :disabled="true" style="margin: 0 10px 0 0; width: 80px;">
                        <el-option label="数值" :value="0" />
                        <el-option label="X" :value="1" />
                      </el-select>
                    </el-form-item>
                  </span>
                  <span v-if="ruleForm.fzl_type===1">
                    <el-form-item prop="fzr_value">
                      <el-input-number
                        v-model="ruleForm.fzr_value"
                        :precision="2"
                        placeholder="请输入值"
                        :controls="false"
                      />
                    </el-form-item>
                  </span>
                </span>
                <span v-if="ruleForm.fzType===1" class="fz-gdz">
                  <el-form-item prop="moleculeValue">
                    <el-input-number
                      v-model="ruleForm.moleculeValue"
                      :precision="2"
                      placeholder="请输入值"
                      style="margin-left: 10px; width: 530px;"
                      :controls="false"
                    />
                  </el-form-item>
                </span>
              </div>
              <hr>
              <div class="fm">
                <span>
                  <el-form-item prop="fmType">
                    <el-select
                      v-model="ruleForm.fmType"
                      class="select-title"
                      style="width: 100px;"
                      placeholder="请选择"
                    >
                      <el-option label="函数" :value="0" />
                      <el-option label="固定值" :value="1" />
                    </el-select>
                  </el-form-item>
                </span>
                <span v-if="ruleForm.fmType===0" class="fz-hs">
                  <span>
                    <el-form-item prop="fml_type">
                      <el-select v-model="ruleForm.fml_type" style="margin: 0 10px; width: 80px;" @change="fmChange">
                        <el-option label="数值" :value="0" />
                        <el-option label="X" :value="1" />
                      </el-select>
                    </el-form-item>
                  </span>
                  <span v-if="ruleForm.fml_type===0">
                    <el-form-item prop="fml_value">
                      <el-input-number
                        v-model="ruleForm.fml_value"
                        :precision="2"
                        placeholder="请输入值"
                        :controls="false"
                      />
                    </el-form-item>
                  </span>
                  <span style="margin: 0 10px;">
                    <el-form-item prop="denominatorType">
                      <el-select v-model="ruleForm.denominatorType" style="width: 60px;">
                        <el-option label="+" :value="0" />
                        <el-option label="-" :value="1" />
                      </el-select>
                    </el-form-item>
                  </span>
                  <span>
                    <el-form-item prop="fmr_type">
                      <el-select v-model="ruleForm.fmr_type" :disabled="true" style="margin: 0 10px 0 0; width: 80px;">
                        <el-option label="数值" :value="0" />
                        <el-option label="X" :value="1" />
                      </el-select>
                    </el-form-item>
                  </span>
                  <span v-if="ruleForm.fml_type===1">
                    <el-form-item prop="fmr_value">
                      <el-input-number
                        v-model="ruleForm.fmr_value"
                        :precision="2"
                        placeholder="请输入值"
                        :controls="false"
                      />
                    </el-form-item>
                  </span>
                </span>
                <span v-if="ruleForm.fmType===1" class="fz-gdz">
                  <el-form-item prop="denominatorValue">
                    <el-input-number
                      v-model="ruleForm.denominatorValue"
                      :precision="2"
                      placeholder="请输入值"
                      style="margin-left: 10px; width: 530px;"
                      :controls="false"
                    />
                  </el-form-item>
                </span>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          label=""
        >
          <el-button type="primary" size="small" @click="submitForm('ruleForm')">{{ ruleForm.id ? '确认修改':'立即创建' }}</el-button>
          <el-button
            v-if="ruleForm.id"
            size="small"
            type="primary"
            @click="cancelForm"
          >
            取消修改
          </el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" v-if="!isAdd" class="dialog-footer">
        <el-button size="small" @click="handleCancel">取 消</el-button>
        <el-button size="small" type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    algorithms: {
      type: Array,
      default: () => []
    },
    modules:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible:false,
      isAdd:false,
      currentOperData:{
        riskGrade:'',
        name:'',
        list:[]
      },
      currentList:[],
      currentIndex: '',
      ruleForm:{
        id: '',
        valueType:1,
        value:undefined,
        fzType: 0, // 分子类型
        fzl_type: 0,// 分子左侧 类型
        fzl_value: undefined, // 分子左侧数据
        fzr_type: 1, // 分子右侧类型
        fzr_value: undefined ,// 分子右侧数据
        fmType: 0, // 分母类型
        fml_type: 0,// 分母左侧 类型
        fml_value: undefined, // 分母左侧数据
        fmr_type: 1, // 分母右侧类型
        fmr_value: undefined ,// 分母右侧数据
        moleculeValue: undefined, // 分子值
        denominatorValue:undefined, // 分母值
        denominatorType: 0, // 分母加减符号
        moleculeType: 0, // 分子加减符号
      },
      rules: {
        valueType: [
          { required: true, message: '请选择函数类型', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请输入固定值', trigger: 'blur' }
        ],
        moleculeType: [
          { required: true, message: '请选择运算符', trigger: 'change' }
        ],
        fzl_value:[
          { required: true, message: '请输入值', trigger: 'blur' }
        ],
        fzr_value:[
          { required: true, message: '请输入值', trigger: 'blur' }
        ],
        fml_value:[
          { required: true, message: '请输入值', trigger: 'blur' }
        ],
        fmr_value:[
          { required: true, message: '请输入值', trigger: 'blur' }
        ],
        denominatorType: [
          { required: true, message: '请选择运算符', trigger: 'change' }
        ],
        moleculeValue:[
          { required: true, message: '请输入值', trigger: 'blur' }
        ],
        denominatorValue:[
          { required: true, message: '请输入值', trigger: 'blur' }
        ],
      },
      options:[
        {value:1,label:'≥'},
        {value:2,label:'>'},
        {value:3,label:'≤'},
        {value:4,label:'<'},
      ],
      tableData:[
        {name:'高风险隶属度函数', isGdz:1, riskGrade:1, 'list':[]},
        {name:'较高风险隶属度函数', isGdz:1, riskGrade:2, 'list':[]},
        {name:'一般风险隶属度函数', isGdz:1, riskGrade:3, 'list':[]},
        {name:'较低风险隶属度函数', isGdz:1, riskGrade:4, 'list':[]},
        {name:'低风险隶属度函数', isGdz:1, riskGrade:5, 'list':[]}
      ],
    }
  },
  watch: {
    algorithms: {
      handler(newName, oldName) {
        this.algorithms = newName
        this.assembleTableData()
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
      deep:true
    }
  },
  /*
   * created() {
   *   this.assembleTableData()
   * },
   */
  methods:{
    assembleTableData(){
      this.tableData=[
        {name:'高风险隶属度函数', isGdz:1,riskGrade:1,'list':[]},
        {name:'较高风险隶属度函数', isGdz:1,riskGrade:2,'list':[]},
        {name:'一般风险隶属度函数', isGdz:1,riskGrade:3,'list':[]},
        {name:'较低风险隶属度函数', isGdz:1,riskGrade:4,'list':[]},
        {name:'低风险隶属度函数', isGdz:1,riskGrade:5,'list':[]}
      ]
      this.algorithms.forEach(item => {
        if (item.riskGrade>0 && item.riskGrade<6){
          this.tableData[item.riskGrade-1].list.push(item)
        }
      })
      this.tableData.forEach((item,index)=>{
        if (item.list && item.list.length===1 && item.list[0].scopeType===0){
          this.tableData[index].isGdz = 0
        }
      })
    },
    // 获取数据层指标等级隶属度函数
    getAlgorithms(){
      const algorithms = []
      this.tableData.forEach(item=>{
        item.list.forEach(val=>{
          val.riskGrade = item.riskGrade
          algorithms.push(val)
        })
      })
      return algorithms
    },
    // 固定值修改
    handleEidtGd(item,index){
      this.tableData[index].isGdz = 0
      this.tableData[index].list = [{
        denominatorType:0,
        denominatorValue:'',
        moleculeType:0,
        moleculeValue:'',
        riskGrade:'',
        riskMax:'',
        riskMaxSymbol:0,
        riskMin:'',
        riskMinSymbol:0,
        scopeType:0,
        sort:1,
        value:item.list[0] ? item.list[0].value : undefined,
        valueType:0
      }]
    },
    // 修改
    handleDetail(index,item){
      this.isAdd = true
      this.ruleForm={
        id: index+1,
        valueType:item?.valueType,
        value:item?.value,
        // 分子类型 moleculeType = 0-分子为固定值、1-加法、2-减法(参数为被减数)、3-减法(参数为减数)
        fzType: item.moleculeType===0 ? 1 : 0, // 分子类型 1-固定值，0-函数
        moleculeValue: item?.moleculeValue, // 分子值

        fzl_type: item.moleculeType===0 ? '' : (item.moleculeType===1 || item.moleculeType===2 ? 1 : 0),// 分子左侧 类型
        fzl_value: item?.moleculeValue, // 分子左侧数据
        fzr_type: item.moleculeType===0 ? '' : (item.moleculeType===3 ? 1 : 0), // 分子右侧类型
        fzr_value: item?.moleculeValue,// 分子右侧数据

        // 分母类型 denominatorType = 0-分子为固定值、1-加法、2-减法(参数为被减数)、3-减法(参数为减数)
        fmType: item.denominatorType===0 ? 1 : 0, // 分母类型
        denominatorValue:item.denominatorValue || undefined, // 分母值

        fml_type: item.denominatorType===0 ? '' : (item.denominatorType===1 || item.denominatorType===2 ? 1 : 0),// 分母左侧 类型
        fml_value: item?.denominatorValue, // 分母左侧数据
        fmr_type: item.denominatorType===0 ? '' : (item.denominatorType===3 ? 1 : 0), // 分母右侧类型
        fmr_value: item?.denominatorValue,// 分母右侧数据

        denominatorType:item.denominatorType===0 ? '' : (item.denominatorType===1 ? 0 : 1),
        moleculeType:item.moleculeType===0 ? '' : (item.moleculeType===1 ? 0 : 1)
      }
    },
    // 删除
    handleDelete(index){
      this.currentOperData.list.splice(index,1)
    },
    // 关闭弹出
    handleClose(){
      let i = 0
      this.currentList.forEach(item=>{
        if ((item.riskMin && !item.riskMinSymbol) ||(item.riskMax && !item.riskMaxSymbol)){
          i++
          return false
        }
      })
      if (i>0){
        this.$message.error('请完善表格内函数表单方式')
        return false
      }
      this.currentOperData.list = this.currentList
      this.currentOperData.isGdz = 1
      this.tableData[this.currentIndex] =this.currentOperData
      this.currentOperData = {
        riskGrade:'',
        name:'',
        isGdz: 1,
        list:[]
      }
      this.currentIndex = ''
      this.currentList = []
      this.dialogVisible = false

    },
    // 取消编辑
    handleCancel(){
      this.cancelForm()
      this.currentOperData = {
        riskGrade:'',
        name:'',
        list:[]
      }
      this.currentIndex = ''
      this.currentList = []
      this.dialogVisible = false
    },
    // 编辑函数公式
    handleEidt(item,index){
      this.dialogVisible = true
      this.currentOperData = item
      this.currentList = item.list
      this.currentIndex = index
    },
    cancelAdd(){
      this.isAdd = !this.isAdd
      this.cancelForm()
    },
    cancelForm(){
      this.ruleForm={
        id: '',
        valueType:1,
        value:undefined,
        fzType: 0, // 分子类型
        fzl_type: 0,// 分子左侧 类型
        fzl_value: undefined, // 分子左侧数据
        fzr_type: 1, // 分子右侧类型
        fzr_value: undefined ,// 分子右侧数据
        fmType: 0, // 分母类型
        fml_type: 0,// 分母左侧 类型
        fml_value: undefined, // 分母左侧数据
        fmr_type: 1, // 分母右侧类型
        fmr_value: undefined ,// 分母右侧数据
        moleculeValue: undefined, // 分子值
        denominatorValue:undefined, // 分母值
        denominatorType: 0, // 分母加减符号
        moleculeType: 0, // 分子加减符号
      }
    },
    // 保存提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const row = {
            denominatorType: this.ruleForm.fmType===1 ? 0 : (this.ruleForm.denominatorType === 0 ? 1 : this.ruleForm.fml_type === 1 ? 2 : 3),
            denominatorValue: this.ruleForm.fmType===1 ? this.ruleForm.denominatorValue : (this.ruleForm.fml_type === 0 ? this.ruleForm.fml_value : this.ruleForm.fmr_value),
            moleculeType: this.ruleForm.fzType===1 ? 0 : (this.ruleForm.moleculeType === 0 ? 1 : this.ruleForm.fzl_type === 1 ? 2 : 3),
            moleculeValue: this.ruleForm.fzType===1 ? this.ruleForm.moleculeValue : (this.ruleForm.fzl_type === 0 ? this.ruleForm.fzl_value : this.ruleForm.fzr_value),
            riskGrade: this.currentOperData.riskGrade,
            valueType:this.ruleForm.valueType,
            value:this.ruleForm.valueType===1 ? '' : this.ruleForm.value,
            scopeType:1,
            sort:this.currentList.length+1
          }
          if (this.ruleForm.id){ // 修改
            // this.currentList[this.ruleForm.id-1] = {...this.currentList[this.ruleForm.id-1],...row}
            this.$set(this.currentList,this.ruleForm.id-1,{...this.currentList[this.ruleForm.id-1],...row})
          } else { // 添加
            row.riskMax = undefined
            row.riskMaxSymbol = ''
            row.riskMin = undefined
            row.riskMinSymbol = ''
            row.scopeType = 1
            this.currentList.push(row)
          }
          this.isAdd = false
          this.cancelForm()
        } else {
          return false
        }
      })
    },
    // 分子类型变化
    fzChange(value){
      this.ruleForm.fzr_type = value ? 0 : 1
    },
    // 分子类型变化
    fmChange(value){
      this.ruleForm.fmr_type = value ? 0 : 1
    }
  },
}
</script>
<style lang="scss" scoped>
.alert-config {
    .power {
        display: inline-block;
        float: left;
        width: 120px;
        font-size: 40px;
        line-height: 90px;
    }

    .equation {
        display: inline-block;
        float: left;

        span {
            display: inline-block;
        }
    }

    .vlaue {
        margin: 0 5px;
    }

    .variable {
        margin: 0 5px;
        font-weight: bold;
    }

    .unit {
        width: 50px;

        /deep/ .el-select {
            width: 60px;
        }
    }
}

.select-title {
    /deep/ .el-input__inner {
        color: #ffffff;
        background: #409eff;
    }
}

.gs-line {
    border-bottom: 1px solid #c2c2c2;
    padding: 5px 0;
    font-weight: 600;
    line-height: 30px;
}
</style>
