<template>
  <div class="scroll-wrapper">
      <van-list
      v-model="upLoading"
      :finished="finished"
      finished-text="没有了"
       @load="onLoad">
       <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
       </van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: []
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
    }
  }
}

</script>

<style lang="less" scoped>
</style>
