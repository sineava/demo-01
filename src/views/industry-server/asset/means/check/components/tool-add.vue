<template>
  <el-button
    v-if="button_roles.create"
    type="success"
    size="small"
    icon="el-icon-circle-plus"
    @click="handleAdd"
  >
    新建盘点计划
  </el-button>
</template>

<script>
export default {
  props:{
    button_roles:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    handleAdd(){
      this.$router.push({ path: '/means/check/details'})
    }
  }
}
</script>

