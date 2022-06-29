<template>
  <div>
    <el-card class="body-card system-card">
      <div
        slot="header"
        class="clearfix"
      >
        <span class="left">{{ data.name }}</span>
        <el-checkbox
          v-model="checkAll"
          style="float: right;"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
      </div>
      <div class="box-container">
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="item in data.children"
            :key="item.name"
            :label="item.name"
            size="medium"
          />
        </el-checkbox-group>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true
    }
  },
  mounted() {
    const checkedCities = []
    this.data.children.forEach(element => {
      if (element.ischecked) {
        checkedCities.push(element.name)
      }
    })
    this.checkedCities = checkedCities
    this.handleCheckedCitiesChange(checkedCities)
  },
  methods: {
    // 全选
    handleCheckAllChange(val) {
      const options = []
      this.data.children.forEach(element => {
        options.push(element.name)
      })
      this.checkedCities = val ? options : []
      this.isIndeterminate = false
      this.$emit('change', { index: this.index, checkedCities: this.checkedCities })
    },
    // 选择
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.data.children.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.children.length
      this.$emit('change', { index: this.index, checkedCities: this.checkedCities })
    }
  }
}
</script>
<style lang="scss" scoped>
.system-card {
    margin: 0 0 20px 0;

    &.el-card.is-always-shadow {
        box-shadow: 0 0 0;
    }
}

.box-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
</style>
