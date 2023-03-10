import {navbar} from "vuepress-theme-hope";

export const navbarConfig = navbar([
  {
    text: "技术学习",
    icon: "software",
    link: "/tech/"
  },

  {text: "书籍阅读", icon: "read", link: "/book/"},
  {text: "个人随笔", icon: "leaf", link: "/essay/"},

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
