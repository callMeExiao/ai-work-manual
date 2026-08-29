---
title: Command Menu
slug: command-menu
description: 把搜索、导航和高频操作收进一个清晰的键盘入口。
tags: [导航, 快捷操作, 设计系统]
status: used
draft: false
createdAt: 2026-08-10
updatedAt: 2026-08-27
category: 导航与操作
technology: [React, Radix UI, CSS]
source: https://ui.shadcn.com/docs/components/command
used: true
preview: command
reason: 搜索和执行被放进同一个入口，适合高频工具，也能减少侧边栏的层级。
scenarios: [知识库, 开发工具, 管理后台]
implementationNotes: 键盘导航、焦点管理和无结果状态比打开弹层本身更值得复用。
related:
  workflows: [research-unknown-article, prompt-verification]
  components: []
  articles: [ai-workflows-that-last]
---

## 观察

好的 Command Menu 不只是一个输入框。它需要让用户知道自己正在搜索什么、还能执行什么，以及没有结果时下一步该做什么。
