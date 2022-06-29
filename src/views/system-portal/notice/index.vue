<template>
  <div id="home-main" class="system-container">
    <basic-head />
    <basic-menu :index="1076" />
    <div class="notice-card">
      <div class="list-title">
        消息通知
        <el-button
          v-if="activeName === 'notice' && type === 'list' && roleButton.put_notice"
          style="margin-left: 10px;"
          type="primary"
          size="small"
          @click="type = 'sendNotice'"
        >
          发布公告
        </el-button>
      </div>
      <div class="list-main">
        <!-- tabs切换 -->
        <el-tabs
          v-model="activeName"
          tab-position="left"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="item in noticeType"
            :key="item.id"
            :name="item.name"
          >
            <span slot="label" class="tabs-span">
              <svg-icon :icon-class="item.icon" class="icon" />
              {{ item.label }}
            </span>
          </el-tab-pane>
        </el-tabs>
        <div v-if="type === 'list'" class="list-wrap">
          <div v-if="activeName === 'message'" class="msg-tab-main">
            <div class="msg-tab">
              <div :class="{ active: detailType === 'email' }" @click="detailType = 'email'"> 收信箱</div>
              <div v-if="roleButton.put_message" :class="{ active: detailType === 'send' }" @click="detailType = 'send'"> 发信息</div>
              <div :class="{ active: detailType === 'save' }" @click="detailType = 'save'"> 已发送</div>
              <div :class="{ active: detailType === 'delete' }" @click="detailType = 'delete'"> 已删除</div>
            </div>
            <div v-if="detailType !== 'send'">
              <el-input
                v-model="keyword"
                placeholder="请输入标题"
                size="small"
                @input="fetchMessage"
              >
                <i slot="prefix" class="el-input__icon el-icon-search" />
              </el-input>
            </div>
          </div>
          <!-- 发信息 -->
          <sendMsg v-if="detailType === 'send'" @submit="detailType = 'save'" />
          <div
            v-else
            ref="container"
            v-loading="loading"
            class="unread-container"
          >
            <div
              v-for="(item, index) in tableData"
              :key="index"
              class="notice-list"
              @mouseover="hover(item)"
              @click="handleSee"
            >
              <div class="notice-icon">
                <svg-icon :icon-class="noticeType.filter(x => x.id === id)[0].icon" class="icon" />
              </div>
              <div class="notice-content">
                <div class="notice-head">
                  <div class="head-left">
                    <img v-if="item.isRead===0" src="../../../assets/new-system/unread.png">
                    {{ item.messageTitle }}
                    <el-tag
                      v-if="activeName === 'message' && detailType === 'email' && item.signType > 0 && item.signType < 3"
                      size="mini"
                      style="margin-left: 10px;"
                      :class="['red', 'blue'][item.signType - 1]"
                    >
                      {{ ['重要','一般'][item.signType - 1] }}
                    </el-tag>
                  </div>
                  <div class="head-right">{{ item.createTime || item.pubDate }}</div>
                </div>
                <div class="notice-desc">
                  {{ item.messageContent }}
                </div>
              </div>
            </div>
            <el-empty v-if="!tableData ||tableData.length===0" description="暂无数据" />
            <pagination
              v-if="total"
              :total="total"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              layout="prev, pager, next,sizes"
              :page-size="pageSize"
              background
              @change="paginationChange"
            />
            <VueContextMenu
              v-if="activeName === 'message'&&detailType === 'email'"
              ref="contextMenu"
              class="right-menu"
              :target="contextMenuTarget"
              :show="contextMenuVisible"
              @update:show="(show) => contextMenuVisible = show"
            >
              <p @click="handleSee">
                查看
              </p>
              <p @click="handleRemark(1)">
                删除
              </p>
              <p @click="handleRemark(2)">
                标记为已读
              </p>
              <p @click="handleRemark(3)">
                标记为重要
              </p>
              <p @click="handleRemark(4)">
                标记为一般
              </p>
              <p @click="handleRemark(5)">
                取消标记
              </p>
            </VueContextMenu>
          </div>
        </div>
        <!-- 详情 -->
        <detail
          v-if="type === 'detail'"
          :type="id"
          :detailType="detailType"
          :notice="notice"
          @return="handleReturn"
        />
        <!-- 发公告 -->
        <SendNotice v-if="type === 'sendNotice'" :roleButton="roleButton" @return="handleReturn" />
      </div>
    </div>
    <basic-bottom />
  </div>
</template>

<script>
import BasicHead from '@/components/BasicHead'
import BasicMenu from '@/components/BasicMenu'
import { component as VueContextMenu } from '@xunlei/vue-context-menu'
import { getNoticeList, getDispatchList, getIncomingList, getExamineList, getMeetingList, getAdviseList, getAdviseSendList, getAdviseDelList, setSignMessage } from '@/api/system-portal/new-notice'
import pagination from '@/components/Pagination'
import detail from './detail'
import SendMsg from './sendMsg.vue'
import SendNotice from './addNotice.vue'
import BasicBottom from '@/components/BasicBottom'
import { mapGetters } from 'vuex'
export default {
  components: {
    detail,
    pagination,
    VueContextMenu,
    BasicHead,
    BasicMenu,
    BasicBottom,
    SendMsg,
    SendNotice
  },
  data() {
    return {
      id: null, // 左侧tabID
      contextMenuTarget: null, // 可右键区域，这里也可以绑定$refs
      contextMenuVisible: false,
      current: null,
      loading: false,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      type: 'list',
      title: '公告通知',
      noticeType: [ // 左侧列表
        { id: 1, label: '重要公告', name: 'notice', icon: 'gonggao' },
        /*
         * { id: 2, label: '发文待办', name: 'post', icon: 'fawen' },
         * { id: 3, label: '收文待办', name: 'receive', icon: 'shouwen' },
         */
        { id: 4, label: '待审批事项', name: 'approve', icon: 'shenpi' },
        // { id: 5, label: '会议通知', name: 'meeting', icon: 'huiyi' },
        { id: 6, label: '信息通知', name: 'message', icon: 'new' }
      ],
      notice: null,
      detailType: 'email',
      tabType: '',
      keyword: '',
      roleButton:[],
      roleMenu:[
        'put_notice',// 发布公告
        'inside_notice',// 内部公告
        'port_notice',//   港口公告
        'wt_notice',//    水路运输公告
        'channel_notice',//  航道公告
        'emeng_notice',//  应急公告
        'inspec_notice',// 船检公告
        'sea_notice',// 海事公告
        'synthesize_notice',// 综合类公告
        'put_message',// 发布消息
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user_results'
    ])
  },
  watch: {
    detailType(val) {
      if (val !== 'send') {
        this.fetchMessage()
      }
      if (val === 'email') {
        this.contextMenuTarget = null // *****必须重置*****
        this.$nextTick(() => {
          this.contextMenuTarget = this.$refs.container
        })
      }
    }
  },
  mounted() {
    this.roleButton = []
    this.user_results.forEach(element => {
      if (this.roleMenu.indexOf(element.func_URL)!==-1){
        this.roleButton[element.func_URL] = true
      }
    })
  },
  created() {
    this.tabType = this.$route.query.tabType || 'notice'
    this.activeName = this.tabType
    this.id = this.noticeType.filter(x => x.name === this.tabType)[0].id

    if (this.$route.query.payload) { // 进入详情
      this.current = { id: this.$route.query.payload }
      this.handleSee()
    }
    this.fetchMessage()
    this.$nextTick(() => {
      this.contextMenuTarget = this.$refs.container
    })
  },
  methods: {
    hover(item) {
      this.current = item
    },
    /**
     * 查询列表(每个tab一个接口列表)
     */
    async fetchMessage() {
      this.loading = true
      // 判断接口地址
      let res = {}
      const data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        title: this.keyword
      }
      switch (this.id) {
      case 1: // 重要公告
        res = await getNoticeList({ ...data, title: '' })
        break
      case 2: // 发文待办
        res = await getDispatchList({ ...data, title: '' })
        break
      case 3: // 收文待办
        res = await getIncomingList({ ...data, title: '' })
        break
      case 4: // 待批消息
        res = await getExamineList({ ...data, title: '' })
        break
      case 5: // 会议消息
        res = await getMeetingList({ ...data, title: '' })
        break
      case 6: // 信息通知
        if (this.detailType === 'email') { // 收件箱
          res = await getAdviseList(data)
        } else if (this.detailType === 'save') { // 已发送
          res = await getAdviseSendList(data)
        } else { // 已删除
          res = await getAdviseDelList(data)
        }
        break
      default:
        break
      }
      this.tableData = res.data ? res.data.records : []
      this.total = res.data ? res.data.total : 0
      this.loading = false
    },
    handleClick(tab) {
      this.type = 'list'
      this.detailType='email'
      this.activeName = tab.name
      this.id = this.noticeType.filter(x => x.name === this.activeName)[0].id
      this.fetchMessage()
    },
    /**
     * 切换每页大小
     */
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchMessage()
      this.type = 'list'
      this.contextMenuTarget = null // *****必须重置*****
      this.$nextTick(() => {
        this.contextMenuTarget = this.$refs.container
      })
    },
    /**
     * 查看
     */
    handleSee() {
      if (this.id === 4) {
        this.$router.push({ path: this.current.menuUrl})
      } else {
        this.contextMenuVisible = false
        this.notice = this.current
        this.type = 'detail'
      }
    },
    /**
     * 标记消息
     */
    handleRemark(type) {
      this.contextMenuVisible = false
      if (type === 1) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '操作确认').then(() => {
          this.setMessage(type)
        }).catch(err => err)
      } else {
        this.setMessage(type)
      }
    },
    setMessage(type) {
      setSignMessage({id:this.current.id,type}).then(res => {
        if (res.code === '0') {
          this.fetchMessage()
          this.$message.success('标记成功!')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 详情返回
     */
    handleReturn() {
      this.fetchMessage()
      this.type = 'list'
      this.contextMenuTarget = null // *****必须重置*****
      this.$nextTick(() => {
        this.contextMenuTarget = this.$refs.container
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './notice.scss';

#home-main {
    position: relative;
    top: 170px;
}
</style>
