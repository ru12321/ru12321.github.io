import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({

    "/tech/": [
      {
        text: "java语言",
        icon: "java",
        prefix: "java/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "spring框架",
        icon: "hot",
        prefix: "spring/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "部署运维",
        icon: "build",
        prefix: "ops/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "系统设计",
        icon: "hot",
        prefix: "system_design/",
        collapsible: true,
        children: "structure"
      },
    ],
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
        },
        {
          text: "计算机相关",
          icon: "windows",
          prefix: "computer/",
          collapsible: true,
          children: "structure"
        },
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
    "/about_me/":[
      {
        text: "关于作者",
        icon: "study",
        children: "structure",
        collapsible: true,
      }
    ]
  })
;
