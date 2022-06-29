<template>
  <div id="home-main" class="system-container">
    <basic-head />
    <basic-menu />
    <div class="personal-card">
      <div class="list-title">个人中心</div>
      <div class="list-main">
        <el-tabs
          v-model="index"
          tab-position="left"
          @tab-click="handleClick"
        >
          <el-tab-pane name="1">
            <span slot="label" class="tabs-span"><svg-icon icon-class="per1" class="icon" />个人资料</span>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" class="tabs-span"><svg-icon icon-class="per2" class="icon" style="width: 14px; height: 18px;" />角色权限</span>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label" class="tabs-span"><svg-icon icon-class="per3" class="icon" style="width: 16px; height: 17px;" />修改密码</span>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label" class="tabs-span"><svg-icon icon-class="per4" class="icon" style="width: 13px; height: 16px;" />申请权限</span>
          </el-tab-pane>
        </el-tabs>
        <div class="list-wrap">
          <datasetting v-if="index === '1'" />
          <roleauthority v-if="index === '2'" />
          <changeassword v-if="index === '3'" />
          <authrole v-if="index === '4'" />
        </div>
      </div>
    </div>
    <basic-bottom />
  </div>
</template>

<script>
import BasicHead from '@/components/BasicHead'
import BasicMenu from '@/components/BasicMenu'
import datasetting from './data/index'
import roleauthority from './authority/index'
import changeassword from './password/index'
import authrole from './authrole/index'
import BasicBottom from '@/components/BasicBottom'
export default {
  components: {
    datasetting,
    roleauthority,
    changeassword,
    authrole,
    BasicHead,
    BasicMenu,
    BasicBottom,
  },
  data() {
    return {
      index: '1'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.index = tab.name
    }
  }
}
</script>
<style lang="scss" scoped>
#home-main {
    position: relative;
    top: 170px;
}

.personal-card {
    margin: 16px auto;
    width: 1200px;
    background-color: #ffffff;

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
        padding-bottom: 20px;
        min-height: calc(100vh - 208px);
        box-shadow: 0 8px 13px rgba(79, 135, 181, 0.1);

        .list-wrap {
            flex: 1;
        }
    }

    /deep/ .tabs-span {
        display: flex;
        align-items: center;

        .icon {
            margin: 0 8px 0 10px;
            width: 15px;
            height: 16px;
        }
    }
}
</style>
