import {sidebar} from "vuepress-theme-hope";

export const sidebarConfig = sidebar({

    "/tech/": [
      {
        text: "计算机基础",
        icon: "java",
        prefix: "computer_basic/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "数据库存储",
        icon: "java",
        prefix: "database/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "部署运维",
        icon: "build",
        prefix: "dev_ops/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "日常记录",
        icon: "build",
        prefix: "glodon_records/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "java语言",
        icon: "java",
        prefix: "java_basic/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "中间件技术",
        icon: "java",
        prefix: "middleware_framework/",
        collapsible: true,
        children: "structure"
      },
      {
        text: "spring框架",
        icon: "hot",
        prefix: "spring_framework/",
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
      {
        text: "前端框架",
        icon: "hot",
        prefix: "web_framework/",
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
