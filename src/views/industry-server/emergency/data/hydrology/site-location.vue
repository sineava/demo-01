<template>
  <el-dialog
    :title="`站点“${name}”位置信息`"
    :visible.sync="dialogVisible"
    width="80%"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      size="small"
      class="demo-ruleForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="站点纬度" prop="latitude">
            <el-input v-model.trim="ruleForm.latitude" placeholder="请输入站点纬度" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="站点经度" prop="longitude">
            <el-input v-model.trim="ruleForm.longitude" placeholder="请输入站点经度" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="icon-title">
        <span class="span" />站点位置信息
      </div>
      <Maptable
        ref="businessBaseMap"
        :is-edit="isEdit"
        :isTable="false"
        :tool="['spot']"
        :height="400"
        @change="confirmMap"
      />
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Maptable from '@/components/Maptable/index'
import { updateSite } from '@/api/emergency-services/hydrological'
export default {
  components: {
    Maptable,
  },
  data() {
    return {
      geographyInfos: [],
      dialogVisible:false,
      name:'',
      ruleForm: {
        latitude: '',
        longitude: '',
        id:''
      },
      isEdit:true,
      rules: {
        latitude: [
          { required: true, message: '请输入站点纬度或地图标点', trigger: 'blur' }
        ],
        longitude:[
          { required: true, message: '请输入站点经度或地图标点', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(item){
      this.ruleForm = {
        latitude: item.latitude,
        longitude: item.longitude,
        id:item.id
      }
      this.name = item.name
      this.dialogVisible = true
      this.geographyInfos = [{
        longitude:item.longitude,
        latitude:item.latitude
      }]
      this.$nextTick(() => {
        if (this.$refs.businessBaseMap){
          this.$refs.businessBaseMap.init(this.geographyInfos)
        }
      })
    },
    /**
     * 经纬度变化
     */
    confirmMap(val) {
      if (val && val.length>0){
        this.ruleForm.latitude = val[0].latitude
        this.ruleForm.longitude = val[0].longitude
      }
      this.geographyInfos = val
    },
    /**
     * 保存
     */
    submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          updateSite(this.ruleForm).then(res=>{
            if (res.code==='0'){
              this.$message.success('修改成功')
              this.dialogVisible = false
              this.$emit('refresh')
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.required::after {
    color: rgb(255, 0, 0);
    content: "* ";
}
</style>
