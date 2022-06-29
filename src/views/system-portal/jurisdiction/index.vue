<template>
  <div class="app-container">
    <!-- <el-tabs v-model="activeName" style="height: 100px;">
      <el-tab-pane label="权限申请管理" name="apply" />
      <el-tab-pane label="组织架构管理" name="organize" />
      <el-tab-pane label="角色管理" name="role" />
    </el-tabs> -->
    <component :is="activeName" />
  </div>
</template>

<script>
import apply from './apply'
/*
 * import organize from './organize'
 * import role from './role'
 */
export default {
  components: {
    apply
    /*
     * organize,
     * role
     */
  },
  data() {
    return {
      activeName: 'apply'
    }
  }
}
</script>
