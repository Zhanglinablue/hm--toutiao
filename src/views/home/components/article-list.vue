<template>
  <div class="scroll-wrapper">
     <van-pull-refresh
     v-model="downLoading"
     @refresh="onRefresh"
     :success-text="refreshSuccessText">
     <van-list v-model="upLoading"
     :finished="finished"
     finished-text="没有了"
     @load="onLoad">
     <van-cell
      v-for="article in articles"
     :key="article"
     :title="article"></van-cell>
     </van-list>
     </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      downLoading: false,
      upLoading: false,
      finished: false,
      articles: [],
      refreshSuccessText: ''
    }
  },
  methods: {
    onLoad () {
      console.log('开始加载数据')
      setTimeout(() => {
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
          this.articles.push(...arr)
          this.upLoading = false
        } else {
          this.finish = true
        }
      }, 1000)
    },
    // 下拉刷新方法
    onRefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr)
        this.downLoading = false
        this.refreshSuccessText = `更新了${arr.length}条数据`
      }, 1000)
    }
  }
}

</script>

<style lang="less" scoped>
</style>
