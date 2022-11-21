<template>
	<div id="app">
		<div class="blog-header">
			<div @click="toIndex" title="点击回到首页">
				<img :src="url" alt="博客logo"/>
				<span style="font-size: 2rem; margin-left: 2%;">忆梦博客</span>
			</div>
			<el-divider/>
		</div>
		<router-view/>
	</div>
</template>

<script>

export default {
	name: "App",
	data() {
		return {
			url: "/logo.png"
		}
	},
	methods: {
		changeWindowHeight() {
			// 计算网页文档高度（减去浏览器横向滚动条的高度）
			let height = window.innerHeight - 17;
			// console.log("高度=", height);
			document.getElementById("app").style.height = height + "px";
		},
		toIndex() {
			if (this.$route.path !== "/") {
				this.$router.push('/')
			}
		}
	},
	mounted() {
		this.changeWindowHeight();
		window.onresize = () => {
			return (() => {
				this.$nextTick(() => {
					this.changeWindowHeight();
				});
			})();
		};
	}
}
</script>

<style>
.blog-header {
	position: relative;
	overflow: hidden;
	padding: 0 2.5em;
}
</style>
