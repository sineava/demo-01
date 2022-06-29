<template>
  <div>
    <div
      v-loading="isLoading"
      class="search-content"
    >
      <div v-if="!noData" class="search-body">
        <div class="search-wrapper">
          <div class="search-title">
            为您找到“{{ keyword }}”相关结果<span> {{ total }}</span> 个。
          </div>
          <div
            v-for="(item, index) in list"
            :key="index"
            class="search-item"
            @click="searchClick(item)"
          >
            <div class="search-head">
              <img :src="`${require(`@/assets/new-system/${item.noticeType===7?'search-yw':(item.noticeType===1?'search-gk':'search-new')}.png`)}`">
              <div v-html="item.title" />
            </div>
            <div class="content-wrapper" v-html="item.content" />
          </div>
        </div>
        <pagination
          :total="total"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize"
          background
          @change="paginationChange"
        />
      </div>
      <div
        v-else
        class="no-data"
      >
        <img src="../../../assets/new-system/no-search.png">
        抱歉，未找到“{{ keyword }}”的相关内容
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/system-portal/search-engines'
import pagination from '@/components/Pagination'
export default {
  components: {
    pagination,
  },
  props: {
    keyword: {
      type: String,
      default: ""
    },
    noticeType: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      isLoading: false,
      list: [],
      noData: false
    }
  },
  watch: {
    keyword() {
      // this.init()
    },
    noticeType() {
      this.init()
    },
  },
  mounted() {

  },
  methods: {
    init() {
      this.list = []
      this.currentPage = 1
      this.fetchData()
    },
    clickSearch(){
      this.init()
    },
    async fetchData() {
      const keyword = this.keyword
      if (!keyword){return false}
      this.isLoading = true
      getList({
        searchKeyword: keyword,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        noticeType: this.noticeType
      }).then(res => {
        if ( res.data&&res.data.records) {
          this.list = res.data.records.map(record => {
            const replaceReg = new RegExp(keyword, 'g')
            const replaceString = `<span style="color:#EC1E1E">${keyword}</span>`
            // const type = ['重要公告', '发文待办', '收文待办', '待审批事项', '会议通知', '信息通知', '业务'][record.noticeType - 1]
            const title = record.noticeTitle.replace(replaceReg, replaceString)
            // const content = record.noticeContent ? record.noticeContent.replace(replaceReg, replaceString) : ''
            return {
              ...record,
              title,
              content: record.noticeContent
            }
          })
        }
        this.total = res.data ? res.data.total : 0
        this.noData = this.list&&this.list.length > 0 ? false : true
        this.isLoading = false
      })
    },
    paginationChange(val) {
      this.currentPage = val.currentPage
      this.pageSize = val.pageSize
      this.fetchData()
    },
    // 点击列表判断跳转
    searchClick(item) {
      if (item.noticeType === 7) { // 业务
        this.$router.push({ path: item.url })
      } else if (item.noticeType === 1) { // 公告
        this.$router.push({ path: '/system/notice', query: { tabType:'notice', payload: item.id }})
      } else { // 消息
        this.$router.push({ path: '/system/notice', query: { tabType:'message', payload: item.id }})
      }
    },
    jump(route) {
      this.$router.push({ path: route })
    },
    handleBusinese(url) {
      this.$router.push({ path: url })
    },
    // 查询详情
    toDetail(id) {
      this.$emit('changeTab', 'noticeDetail', { noticeId: id }, 'search')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-content {
    overflow: hidden;
    margin: 0 auto;
    margin-top: 18px;
    border-radius: 10px;
    width: 1200px;
    background-color: #ffffff;
    box-shadow: 0 8px 15px rgba(95, 143, 219, 0.1);

    .search-body {
        padding: 24px;
    }

    .search-title {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: bold;
        color: #333333;

        span {
            color: #006cca;
        }
    }

    .search-item {
        border-bottom: 1px solid #dde5eb;
        padding: 24px 0;
        cursor: pointer;

        .search-head {
            display: flex;
            margin-bottom: 12px;
            align-items: center;

            img {
                margin-right: 12px;
                width: 48px;
                height: 22px;
                font-size: 16px;
                color: #333333;
            }
        }
    }
}

.content-wrapper {
    display: -webkit-box;
    overflow: hidden;
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #999999;

    /* -webkit-box-orient: vertical; /
    /! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.no-data {
    display: flex;
    padding-bottom: 60px;
    width: 100%;
    height: 440px;
    line-height: 60px;
    color: #666666;
    box-shadow: 0 8px 15px rgba(95, 143, 219, 0.1);
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        width: 120px;
        height: 120px;
    }
}
</style>
