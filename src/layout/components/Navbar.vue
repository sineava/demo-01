<template>
  <div class="navbar nav-top">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-top {
    position: fixed;
    z-index: 2000;
}

.navbar {
    overflow: hidden;
    width: 100%;
    height: 50px;
    background: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        float: left;
        height: 100%;
        line-height: 46px;
        transition: background 0.3s;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            vertical-align: text-bottom;
            color: #5a5e66;

            &.hover-effect {
                transition: background 0.3s;
                cursor: pointer;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                position: relative;
                margin-top: 5px;

                .user-avatar {
                    border-radius: 10px;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                }

                .el-icon-caret-bottom {
                    position: absolute;
                    top: 25px;
                    right: -20px;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
