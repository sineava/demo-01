<template>
  <div
    :class="[collapse ? 'collapse' : '', 'sidebar-logo-container']"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
          alt=""
        >
        <h1
          v-else
          class="sidebar-title"
        >
          {{ title }}
        </h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
          alt=""
        >
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '港口综合管理系统',
      logo: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #2b2f3a;

    & .sidebar-logo-link {
        width: 100%;
        height: 100%;

        & .sidebar-logo {
            margin-right: 12px;
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }

        & .sidebar-title {
            display: inline-block;
            margin: 0;
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 600;
            line-height: 50px;
            vertical-align: middle;
            color: #ffffff;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 0;
        }
    }
}
</style>
