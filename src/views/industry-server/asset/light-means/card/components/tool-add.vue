<template>
  <el-button
    v-if="button_roles.create"
    type="primary"
    size="small"
    @click="handleAdd"
  >
    新建资产卡片
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
      this.$router.push({ path: '/lightMeans/card/details'})
    }
  }
}
</script>

