import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// 第三方引入
// ============ElementUI==============
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// ============VueMarkdownEditor预览版==============
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 代码高亮
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {Prism});
// 引入代码行号插件
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
VueMarkdownEditor.use(createLineNumbertPlugin());
// 快捷复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VueMarkdownEditor.use(createCopyCodePlugin());
Vue.use(VueMarkdownEditor);

// 自定义引入
import api from "@/api/api";
import common from "@/common/common";
import util from "@/common/util";
import init from "@/api/init";

// 将自定义引入挂载到原型链
Vue.prototype.$api = api;
Vue.prototype.$common = common;
Vue.prototype.$util = util;

Vue.config.productionTip = false;

let vm = new Vue({
	render: h => h(App),
	router
}).$mount("#app");

// 得到Vue实例对象
init.setContext(vm);
