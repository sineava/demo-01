<template>
  <div :class="{'has-logo':showLogo}">
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
      style="height: 0;"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      activePath: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const allMenu = this.$store.state.permission.menu // 获取所有左侧菜单
      const route = this.$route
      let { path } = route
      // 判断只有左侧菜单栏切换才更换菜单选中
      let activePath = ''
      allMenu.forEach(first => {
        first.children.forEach(second => {
          if (second.path === path) activePath = path
          if (second.children.length > 0) {
            second.children.forEach(third => {
              if (third.path === path) activePath = path
            })
          }
        })
      })
      // return activePath || this.activeMenu
      if (activePath) this.activePath = activePath
      return activePath || this.activePath || path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
}
</script>
