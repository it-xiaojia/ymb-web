<template>
  <div class="blog-list">
    <el-timeline style="padding: 0">
      <div v-for="(activity, index) in blogs"
           :key="index"
           @click="toViewBlog(activity.id)"
           class="blog-item">
        <el-timeline-item :timestamp="activity.publishDate">
          <span class="blog-title">{{ activity.title }}</span>
        </el-timeline-item>
      </div>
    </el-timeline>
    <el-pagination
        style="position: absolute; bottom: 3%;"
        layout="prev, pager, next"
        @current-change="queryCurrentChange"
        :page-size="listQueryParam.pageSize"
        :current-page="listQueryParam.currentPage"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "BlogList",
  data() {
    return {
      blogs: [{title: "标题1", publishDate: "2022-12-11 12:00:11"}],
      listQueryParam: {
        currentPage: 1,
        pageSize: 8
      },
      total: 0
    };
  },
  methods: {
    queryArticleList() {
      this.$api.article.getArticleList(this.listQueryParam, data => {
        this.blogs = data.rows;
        this.total = data.total;
      });
    },
    queryCurrentChange(currentPage) {
      this.listQueryParam.currentPage = currentPage;
      this.queryArticleList();
    },
    toViewBlog(id) {
      this.$router.push({
        path: '/view',
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
    this.queryArticleList();
  }
}
</script>

<style scoped>
.blog-item:hover .blog-title {
  cursor: pointer;
  color: deepskyblue;
}

.blog-list {
	padding: 0 2.5em;
}
</style>
