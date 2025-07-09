import {navbar} from "vuepress-theme-hope";

export const navbarConfig = navbar([
  {text: "书籍阅读", icon: "read", link: "/book/"},
  {text: "个人随笔", icon: "leaf", link: "/essay/"},
  {text: "生产力", icon: "leaf", link: "/tech/"},
  {text: "投资理财", icon: "/investment/invest.svg", link: "/investment/"},
  {
    text: "网站相关",
    icon: "profile",
    children: [
      {text: "关于作者", icon: "like", link: "/about_me/"},
      {
        text: "更新历史",
        icon: "time",
        link: "/timeline/",
      },
    ]
  },
]);
