import {hopeTheme} from "vuepress-theme-hope";
// @ts-ignore
import {navbarConfig} from './navbar'
// @ts-ignore
import {sidebarConfig} from "./sidebar";


export default hopeTheme({
  //导航栏左侧logo图片
  logo: "/logo.svg",
  //github导航仓库链接
  repo: "ru12321",
  //文档在仓库中的目录
  docsDir: "docs",

  hostname: "https://mister-hope.github.io",
  author: {
    name: "Mr.Ru",
    url: "https://github.com/ru12321",
  },
  navbar: navbarConfig,
  sidebar: sidebarConfig,
  //每个文章标题下的页面信息展示
  pageInfo: ["Author", "Date", "Category", "Tag", "ReadingTime", "Word", "PageView"],

  blog: {
    description: "一个菜鸟",
    intro: "/me",
    medias: {
      Gitee: "https://example.com",
      GitHub: "https://example.com",
      Linkedin: "https://example.com",
      Twitter: "https://example.com",
      Wechat: "https://example.com",
      Weibo: "https://example.com",
      Zhihu: "https://example.com",
    },
  },

  metaLocales: {
    editLink: "在GitHub上编辑此页",
  },

  //true代表在开发时启动热部署，https://vuepress-theme-hope.gitee.io/v2/zh/config/theme/basic.html#locales
  //每次修改都会触发一些高耗时计算并且整个应用程序将重新启动，可能获得数秒白屏
  // hotReload: true,

  footer: "天若有情天亦老，人间正道是沧桑",
  displayFooter: true,

  //字体图标资源链接，支持 'iconfont' 和 'fontawesome' 关键字
  iconAssets: "iconfont",

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
  },

  //读取的标题的深度
  headerDepth: 3,
  //加密文件配置
  encrypt:{
    config: {
      // 这会加密整个 guide 目录，并且两个密码都是可用的
      "/about_me/博客评论系统.html": ["ruyiruyi77"],
    },
  },

  plugins: {
    blog: true,
    comment: {
      /**
       * Using Giscus
       */
      // provider: "Giscus",
      // repo: "vuepress-theme-hope/giscus-discussions",
      // repoId: "R_kgDOG_Pt2A",
      // category: "Announcements",
      // categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      provider: "Waline",
      serverURL: "https://comment.goruyi.top",
      login: 'disable',
    },
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: false,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({tag}) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: {type: "tip"},
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    copyright: true,
    feed: {
      json: true,
    },

  },
});

