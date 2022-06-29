<template>
  <div id="edit-menu">
    <div class="menu-list-title">编辑快捷菜单</div>
    <div class="menu-list-main">
      <div class="menu-icon-title">我的功能 <span style="color: red;"> （ 注：自定义功能，最多设置16个 ）</span></div>
      <el-row class="row" :gutter="0">
        <el-col
          v-for="(item, index) in checkTreeList"
          :key="index"
          :span="4"
        >
          <div class="menu-view">
            <img class="icon-img" :src="require(`@/assets/column/icon (${item.icon}).png`)">
            <div class="menu-text">{{ item.menuName }}</div>
            <i
              style="color: #f56c6c;"
              title="点击移除"
              class="el-icon-error icon"
              @click="checkTreeClose(index)"
            />
          </div>
        </el-col>
      </el-row>
      <div class="menu-icon-title" style="margin: 20px 0;">
        <span class="span" />全部功能
      </div>
      <div v-for="(item,index) in columnList" :key="index" class="check-box">
        <div class="menu-header">{{ item.columnName }}</div>
        <el-row class="row" :gutter="0">
          <el-col
            v-for="(citem, cindex) in item.sysColumnMenuVoList"
            :key="cindex"
            :span="4"
          >
            <div class="menu-view">
              <img class="icon-img" :src="require(`@/assets/column/icon (${citem.icon}).png`)">
              <div class="menu-text">{{ citem.menuName }}</div>
              <i
                v-if="citem.check"
                style="color: #f56c6c;"
                class="el-icon-error icon"
                title="点击移除"
                @click="checkboxChange(index, cindex, false)"
              />
              <i
                v-else
                style="color: #67c23a;"
                class="el-icon-circle-plus icon"
                title="点击添加至我的功能"
                @click="checkboxChange(index, cindex, true)"
              />
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="backstage-edit-btn">
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="handleSave"
        >
          保存
        </el-button>
        <el-button
          size="medium"
          @click="returnBack"
        >
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { addMenu, getColumnList } from '@/api/system-portal/index'
export default {
  props: {
    checkList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: [],
      columnList: [],
      checkTreeList: [],
      loading: false,
    }
  },
  mounted() {
    this.checkTreeList = [...this.checkList]
    this.checkTreeList.forEach(item => {
      item.menuName = item.name
    })
    this.getColumnList()
  },
  methods: {
    /**
     * 查询栏目列表
     */
    getColumnList() {
      getColumnList().then(res => {
        this.recombinationData(res.data)
      })
    },
    /**
     * 重组栏目所有数据
     */
    recombinationData(data) {
      data.forEach(item => {
        item.sysColumnMenuVoList.forEach(citem => {
          citem.check = false
          this.checkTreeList.forEach(checkItem => {
            if (citem.menuId === checkItem.menuId) {
              citem.check = true
            }
          })
        })
      })
      this.columnList = [...data]
    },
    /**
     * 去掉我的功能里面的功能
     */
    checkTreeClose(index) {
      this.checkTreeList.splice(index, 1)
      this.recombinationData([...this.columnList])
    },
    /**
     * 选中/取消功能
     */
    checkboxChange(index, cindex, e) {
      let obj = this.columnList[index].sysColumnMenuVoList[cindex]
      obj.check = e
      this.$set(this.columnList[index].sysColumnMenuVoList, cindex, obj)
      this.getCheckTreeList()
    },
    // 获取选中的菜单列表
    getCheckTreeList() {
      this.checkTreeList = []
      this.columnList.forEach(item => {
        item.sysColumnMenuVoList.forEach(citem => {
          if (citem.check) {
            this.checkTreeList.push(citem)
          }
        })
      })
    },
    returnBack() {
      this.$emit('editHide')
    },
    /**
     * 保存
     */
    handleSave() {
      if (this.checkTreeList.length <= 0) {
        this.$message.warning('请选择功能')
        return false
      }
      if (this.checkTreeList.length > 16) {
        this.$message.warning('最多设置16个功能')
        return false
      }
      const shortcutMenuDtoList = []
      this.checkTreeList.forEach(item => {
        shortcutMenuDtoList.push({
          icon: item.icon,
          menuDescribe: item.menuDescribe,
          menuId: item.menuId,
          name: item.menuName,
          url: item.url,
          userId: '4073'
        })
      })
      this.loading= true
      addMenu(shortcutMenuDtoList).then(res => {
        this.loading = false
        if (res.code === '0') {
          this.returnBack()
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}

</script>
<style lang="scss" scoped>
#edit-menu {
    margin: 20px auto;
    border-radius: 4px;
    width: 1200px;
    background-color: #ffffff;
    box-shadow: 0 8px 13px rgba(79, 135, 181, 0.1);

    .menu-list-title {
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

    .menu-icon-title {
        margin-bottom: 20px;
        width: 1140px;
        font-size: 14px;
        font-weight: 700;
    }

    .menu-list-main {
        padding: 24px 30px;
        width: 100%;

        .menu-view {
            display: flex;
            position: relative;
            margin: 0 20px 20px 0;
            border: 1px solid #f1f1f1;
            border-radius: 5px;
            padding: 0 20px;
            height: 120px;
            font-size: 14px;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            .icon-img {
                margin-bottom: 10px;
                width: 52px;
                height: 52px;
            }

            .menu-text {
                text-align: center;
            }

            .icon {
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
            }
        }
    }

    .menu-header {
        margin: 0 20px 20px 0;
        padding: 0 20px;
        height: 60px;
        font-weight: 700;
        line-height: 60px;
        background-color: #f5f5f5;
        align-items: center;
    }

    .backstage-edit-btn {
        width: 100%;
    }
}

</style>
