import {defineUserConfig} from "vuepress";
import theme from "./theme.js";
import {searchProPlugin} from "vuepress-plugin-search-pro";

export default defineUserConfig({
  //整个项目的baseUrl
  base: "/",
  //站点的语言
  lang: "zh-CN",
  //站点的标题。它将会作为所有页面标题的后缀，并且在默认主题的导航栏中显示。它可以设置在不同语言的 locales 中。
  title: "Mr.Ru",
  //它会被每个页面的 Frontmatter 中的 description 字段覆盖
  description: "Mr.Ru的博客",

  //设置站点要使用的主题。
  theme,

  //控制文章右侧的标题栏 显示的标题级别
  markdown: {
    headers: {
      level: [1, 2, 3]
    }
  },
  shouldPrefetch: false,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
  ]
});
