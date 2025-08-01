import {navbar} from "vuepress-theme-hope";

export const navbarConfig = navbar([
  {text: "书籍阅读", icon: "iconfont icon-ruyb-shuji", link: "/book/"},
  {text: "个人随笔", icon: "iconfont icon-ruyb-wenji-suibi", link: "/essay/"},
  {text: "生产力", icon: "iconfont icon-ruyb-shengchanli", link: "/tech/"},
  {text: "投资理财", icon: "iconfont icon-ruyb-a-cattlegushiniushiniudongwu", link: "/investment/"},
  {
    text: "网站相关",
    icon: "iconfont icon-ruyb-guanyu",
    children: [
      {text: "关于作者", icon: "iconfont icon-ruyb-zuozhe2", link: "/about_me/"},
      {
        text: "更新历史",
        icon: "iconfont icon-ruyb-lishi",
        link: "/timeline/",
      },
    ]
  },
]);
