<template>
  <div class="person-group">
    <el-table
      :data="persons"
      element-loading-text="Loading"
      stripe
      fit
      highlight-current-row
      class="table-border"
    >
      <el-table-column
        v-for="opt in options"
        :key="opt.id"
        :label="opt.label"
        align="center"
      >
        <template v-slot="scope">
          <span v-if="showOption">
            <span v-if="scope.row.saved">{{ scope.row[opt.value] }}</span>
            <el-input
              v-else
              v-model.trim="scope.row[opt.value]"
              :placeholder="`请输入`+opt.label"
              :maxlength="opt.maxlength"
              style="width: 80%;"
            />
          </span>
          <span v-else>{{scope.row[opt.value]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showOption"
        width="150"
        label="操作"
        align="center"
      >
        <template v-slot="scope">
          <el-button
            v-if="scope.row.saved"
            size="mini"
            type="text"
            @click="editPerson(scope.$index, scope.row)"
          >
            <em class="el-icon-edit" /> 编辑
          </el-button>
          <el-button
            v-else
            size="mini"
            type="text"
            @click="savePerson(scope.$index, scope.row)"
          >
            <em class="el-icon-success" /> 保存
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="removePerson(scope.$index, scope.row)"
          >
            <em class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if="onlyDelete"
        label="操作"
        align="center"
        width="100"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="text"
            @click="removePerson(scope.$index,scope.row)"
          >
            <em class="el-icon-delete" /> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div
      v-if="showAdd"
      class="add-agency"
    >
      <el-button
        icon="el-icon-circle-plus-outline"
        style="display: flex; justify-content: center; align-items: center;"
        type="text"
        @click="handleAddPerson"
      >
        {{ title }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { // 标题
      type: String,
      default: () => ''
    },
    emits:{
      type:String,
      default: ''
    },
    payload: { // 有效负载(用于区分等作用)
      type: String,
      default: () => ''
    },
    persons: { // 人员列表
      type: Array,
      default: () => []
    },
    options: { // 可配置化选项,自定义表头字段
      type: Array,
      required: true
    },
    showOption: { // 是否显示操作选项
      type: Boolean,
      default: () => false
    },
    showAdd: { // 是否显示底部添加按钮
      type: Boolean,
      default: () => false
    },
    onlyDelete: { // 只显示删除
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      rules: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ]
    }
  },
  methods: {
    editPerson(index) {
      this.$emit('editPerson', { payload: this.payload, index })
    },
    savePerson(index, item) {
      for (let i in item) {
        if (item[i]===""){
          this.$message.warning('请填写完整信息')
          return false
        }
      }
      if (item.phone && !/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(item.phone)) {
        this.$message.warning('请输入正确手机号码再保存')
        return
      }
      if (item.mobilePhone && !/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(item.mobilePhone)) {
        this.$message.warning('请输入正确手机号码再保存')
        return
      }
      this.$emit('savePerson', { payload: this.payload, index })
    },
    removePerson(index,item) {
      if (this.emits){
        this.$emit(this.emits, index, item)
      } else {
        this.$emit('removePerson', { payload: this.payload, index })
      }
    },
    handleAddPerson() {
      for (let i=0;i<this.persons.length;i++){
        if (this.persons[i].saved===false){
          this.$message.error('请先保存上一条数据')
          return false
        }
      }
      this.$emit('handleAddPerson', { payload: this.payload })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-border{
  margin-top: 0;
}
.add-agency {
    display: flex;
    margin-top: 10px;
    border: 1px dashed #e4e4e4;
    padding: 10px;
    justify-content: center;
    align-items: center;
}

.el-table .el-input.is-disabled /deep/ .el-input__inner {
    border: none;
    padding: 0;
    color: #909399;
}
</style>
