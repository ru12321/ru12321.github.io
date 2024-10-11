import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({
    "/book/":
      [
        {
          text: "人文社科",
          icon: "share",
          prefix: "social/",
          children: "structure",
          collapsible: true,
        },
        {
          text: "小说作品",
          icon: "read",
          prefix: "novel/",
          collapsible: true,
          children: "structure"
        }
      ],
    "/essay/":
      [
        {
          text: "个人随笔",
          icon: "alias",
          children: "structure",
          collapsible: true,
        }
      ],
    "/investment/": [
      {
        text: "A股短线",
        icon: "/investment/A股短线.svg",
        children: "structure",
        collapsible: true,
      },
      {
        text: "A股价投",
        icon: "/investment/A股价投.svg",
        children: "structure",
        collapsible: true,
      },
      {
        text: "美股投资",
        icon: "/investment/美股.svg",
        children: "structure",
        collapsible: true,
      }
    ],
    "/about_me/": [
      {
        text: "关于作者",
        icon: "study",
        children: "structure",
        collapsible: true,
      }
    ]
  })
;
