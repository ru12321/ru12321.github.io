import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
    "/book/":
      [
        {
          text: "人文社科",
          icon: "iconfont icon-ruyb-shehui",
          prefix: "social/",
          children: "structure",
          collapsible: true,
        },
        {
          text: "小说作品",
          icon: "iconfont icon-ruyb-duxiaoshuo",
          prefix: "novel/",
          collapsible: true,
          children: "structure"
        }
      ],
    "/essay/":
      [
        {
          text: "短记吐槽",
          icon: "iconfont icon-ruyb-duanpian",
          prefix: "short/",
          children: "structure",
          collapsible: true,
        },
        {
          text: "长篇大论",
          icon: "iconfont icon-ruyb-changpiangushi",
          prefix: "long/",
          children: "structure",
          collapsible: true,
        }
      ],
    "/tech/":
      [
        {
          text: "日常办公",
          icon: "iconfont icon-ruyb-bangong",
          prefix: "daily/",
          children: "structure",
          collapsible: true,
        },
        {
          text: "常看常新",
          icon: "iconfont icon-ruyb-a-smlsicon_kuaijiejian",
          prefix: "orders/",
          children: "structure",
          collapsible: true,
        },
        {
          text: "案例归纳",
          icon: "iconfont icon-ruyb-chenggonganli",
          prefix: "examples/",
          children: "structure",
          collapsible: true,
        },
      ],
    "/investment/": [
      {
        text: "A股短线",
        prefix: "cnshort/",
        icon: "/investment/A股短线.svg",
        children: "structure",
        collapsible: true,
      },
      {
        text: "A股价投",
        prefix: "cnlong/",
        icon: "/investment/A股价投.svg",
        children: "structure",
        collapsible: true,
      },
      {
        text: "美股投资",
        prefix: "uslong/",
        icon: "/investment/美股.svg",
        children: "structure",
        collapsible: true,
      }
    ],
    "/about_me/": [
      {
        text: "关于作者",
        icon: "iconfont icon-ruyb-zuozhe2",
        prefix: "man/",
        children: "structure",
        collapsible: true,
      },
      {
        text: "博客搭建",
        icon: "iconfont icon-ruyb-jieshao",
        prefix: "blog/",
        children: "structure",
        collapsible: true,
      }
    ]
  })
;
