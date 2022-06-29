<template>
  <div id="home-main" class="system-container">
    <basic-head />
    <basic-menu :index="1077" />
    <div class="column-card">
      <div class="list-title">系统管理</div>
      <div class="list-main">
        <el-tabs
          v-model="activeName"
          tab-position="left"
          @tab-click="handleClick"
        >
          <el-tab-pane name="3">
            <span slot="label" class="tabs-span">
              <svg-icon icon-class="sys1" class="icon" />
              权限申请管理
            </span>
          </el-tab-pane>
          <el-tab-pane name="1">
            <span slot="label" class="tabs-span">
              <svg-icon icon-class="sys2" class="icon" />
              行业端栏目管理
            </span>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" class="tabs-span">
              <svg-icon icon-class="sys3" class="icon" />
              企业端栏目管理
            </span>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label" class="tabs-span">
              <svg-icon icon-class="sys4" class="icon" />
              操作日志
            </span>
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label" class="tabs-span">
              <svg-icon icon-class="sys5" class="icon" />
              登录日志
            </span>
          </el-tab-pane>
        </el-tabs>
        <div class="list-wrap">
          <Column v-if="activeName === '1' || activeName === '2'" ref="column" />
          <Apply v-if="activeName === '3'" ref="apply" />
          <PlayLog v-if="activeName === '4'" />
          <LoginLog v-if="activeName === '5'" />
        </div>
      </div>
    </div>
    <basic-bottom />
  </div>
</template>
<script>
import BasicHead from '@/components/BasicHead'
import BasicMenu from '@/components/BasicMenu'
import Column from './column.vue'
import Apply from '../jurisdiction/apply/index.vue'
import PlayLog from './playLog.vue'
import LoginLog from './loginLog.vue'
import BasicBottom from '@/components/BasicBottom'
export default {
  components: {
    BasicHead,
    BasicMenu,
    BasicBottom,
    Column,
    Apply,
    PlayLog,
    LoginLog
  },
  data() {
    return {
      activeName: '3',
      type:'list'
    }
  },
  methods: {
    /**
     * tab切换
     */
    handleClick(el) {
      this.activeName = el.name
      if (el.name === '1' || el.name === '2') {
        this.$nextTick(() => {
          this.$refs.column.typeClick(el.name)
          this.$refs.column.switchList()
        })
      }
      if (el.name === '3'){
        this.$nextTick(() => {
          this.$refs.apply.switchList()
        })
      }
    }
  }

}
</script>
<style  lang="scss" scoped>
#home-main {
    position: relative;
    top: 170px;
}

.column-card {
    margin: 0 auto;
    width: 1200px;
    background-color: #ffffff;

    .list-title {
        margin-top: 16px;
        border: 1px solid #edf1f5;
        border-radius: 4px 4px 0 0;
        padding: 0 24px;
        height: 60px;
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        color: #3e95fc;
        background-color: #f8fbfd;
    }

    .list-main {
        display: flex;
        overflow: hidden;
        border-radius: 10px;
        min-height: calc(100vh - 208px);
        box-shadow: 0 8px 13px rgba(79, 135, 181, 0.1);

        .list-wrap {
            margin: 30px 35px 30px 0;
            flex: 1;
        }
    }

    /deep/ .el-tabs {
        margin-right: 40px;
        padding: 0;
        padding-top: 20px;
        width: 180px;

        .el-tabs__item {
            height: 50px;
            font-size: 15px;
            line-height: 50px;
            text-align: center;
            color: #999999;

            &.is-active {
                font-weight: bold;
                color: #333333;
            }
        }
    }

    /deep/ .el-tabs--left .el-tabs__header.is-left {
        width: 180px;
    }

    /deep/ .tabs-span {
        display: flex;
        align-items: center;

        .icon {
            margin: 0 8px 0 0;
            width: 16px;
            height: 16px;
        }
    }

    /deep/ .pagination {
        justify-content: flex-start;
    }
}
</style>
