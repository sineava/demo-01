<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      当前位置: 行业服务端首页
    </div>
    <div class="dashboard-text">
      name: {{ name }}
    </div>
    <div class="dashboard-text">
      roles: <span
        v-for="role in roles"
        :key="role"
      >{{ role }}</span>
    </div>
    <div class="dashboard-text">
      按钮roles: <span
        v-for="role in button_roles"
        :key="role"
      >{{ role }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'button_roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
