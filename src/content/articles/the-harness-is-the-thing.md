---
title: The Harness Is the Thing
slug: the-harness-is-the-thing
description: Scott Fryxell 讨论 AI 时代真正重要的不是某个模型，而是围绕模型建立的工作环境、工具链与协作流程。
tags: [AI, Agent, Workflow, Harness, 开发工具]
status: unread
draft: false
createdAt: 2026-08-29
updatedAt: 2026-08-29
author: Scott Fryxell
source: Scott Fryxell's Blog
publishedAt: 2026-08-25
url: https://scott-fryxell.github.io/blog/the-harness-is-the-thing/
readingStatus: unread
featured: true
keyPoints:
  - AI 编程的竞争重点正在从模型能力转向围绕模型建立的工作环境。
  - 一个好的 harness 应该统一工具、上下文、文件系统、技能和执行脚本。
  - Explore、Planner、Worker、Critic、Promoter 的角色分离，有助于减少单个 Agent 同时承担多个目标造成的混乱。
  - 普通模型可以处理维护性工作，复杂探索和重构再交给更强的模型。
  - 可持续的 AI 工作流，需要让人的判断、审查和沟通继续留在流程中。
personalJudgment: 待读：这篇文章与我正在整理的工作手册高度相关，读完后需要验证这套角色拆分是否适合我的日常开发工作。
diagram:
  kind: harness-loop
  alt: Explore、Planner、Worker、Critic、Promoter 五个阶段组成的 AI 工作循环
  caption: 根据原文观点重新绘制；五个阶段分别负责探索、规划、执行、审查和交付。
  source: https://scott-fryxell.github.io/blog/the-harness-is-the-thing/
related:
  workflows: [research-unknown-article, prompt-verification]
  components: [command-menu]
  articles: []
---

## 我的摘要

这篇文章的核心观点是：在 AI 工具逐渐商品化之后，真正构成生产力差异的，不再只是你使用哪个模型，而是你如何搭建和管理模型工作的环境。

作者把这个环境称为 **harness**。它不仅包括 Cursor、Claude、Pi 等工具，还包括工作目录、`AGENTS.md`、skills、extensions、规划与审查流程，以及可以被重复运行的脚本。

## 我特别注意到的部分

作者将自己的工作拆成五个角色：Explore、Planner、Worker、Critic 和 Promoter。每个阶段只承担一种主要目标，因此更容易检查，也更容易在失败后回到正确的阶段重新处理。

这不是一条只能单向通过的流水线。Critic 可能会把任务送回 Worker，新的探索也可能改变原来的计划。

## 和我的工作流的关系

这篇文章可以直接关联到“研究陌生技术文章”和“Prompt 验证与迭代”。它让我重新注意到，真正需要沉淀的不是某一次 Prompt，而是让模型能够稳定工作的目录、规则、工具、角色和验证机制。

## 待验证

- 这套五阶段拆分是否适合我的日常开发工作？
- 哪些任务可以交给普通模型，哪些任务值得使用更强的模型？
- 如何把一个已经验证有效的 Prompt 固化成可重复执行的脚本？
- `AGENTS.md`、skills 和项目目录怎样组织，才不会随着时间推移变成过时的约束？
