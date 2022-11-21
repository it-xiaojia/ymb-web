<template>
	<div>
		<div class="blog-info">
			<div class="title">{{ blog.title }}</div>
			<div class="info">发布日期：{{ blog.publishDate }}</div>
			<div class="info">更新日期：{{ blog.updateDate }}</div>
		</div>
		<v-md-editor v-model="blog.section"
					 mode="preview"
					 @copy-code-success="handleCopyCodeSuccess"></v-md-editor>
	</div>
</template>

<script>
export default {
	name: "BlogView",
	data() {
		return {
			blog: {
				id: 11,
				title: "测试标题",
				section: "测试内容",
				publishDate: "2022-07-14 15:11:10",
				updateDate: "2022-07-14 15:11:12"
			},
		}
	},
	methods: {
		queryOneBlog() {
			this.$api.article.getArticle({
				id: this.blog.id
			}, data => {
				this.blog = data;
			});
		},
		handleCopyCodeSuccess() {
			this.$message.success("复制成功");
		}
	},
	mounted() {
		this.blog.id = this.$route.query.id;
		this.queryOneBlog();
	}
}
</script>

<style scoped>
.title {
	font-size: larger;
	margin-bottom: 1em;
}

.info {
	font-size: small;
	color: grey;
}

.blog-info {
	padding: 0 2.5em;
}
</style>
