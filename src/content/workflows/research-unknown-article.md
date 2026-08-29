---
title: 研究陌生技术文章
slug: research-unknown-article
description: 用一轮结构化预读，判断文章价值并留下可复用的研究笔记。
tags: [研究, 信息整理, Claude]
status: active
draft: false
createdAt: 2026-08-16
updatedAt: 2026-08-28
goal: 在有限时间内判断一篇长文是否值得精读，并把观点沉淀进已有主题。
input: 一篇文章、PDF 或网页链接
output: 一份带来源核验的结构化研究笔记
tools: [浏览器, Claude, Obsidian]
version: v2.1
lastVerified: 2026-08-28
steps:
  - title: 预读
    detail: 让 AI 先提取文章的核心论点、证据类型和陌生概念，不急着接受结论。
    note: 先看结构，再决定是否投入完整阅读时间。
  - title: 核验
    detail: 打开原始来源，逐项检查关键数据、引用和作者的论证边界。
  - title: 重组
    detail: 把值得保留的观点改写成自己的语言，并补上与现有主题的关联。
  - title: 归档
    detail: 将笔记保存到知识库，记录来源、验证日期和下一步可行动的尝试。
prompt: |
  请把下面这篇文章整理成研究预读卡片：
  1. 作者想解决什么问题？
  2. 核心论点之间是什么关系？
  3. 哪些结论依赖外部数据或未经证明的假设？
  4. 我应该优先核验哪三处？
  最后用五句话说明它是否值得精读。
related:
  workflows: [prompt-verification]
  components: [command-menu]
  articles: [ai-workflows-that-last]
---

## 判断标准

一篇值得留下的文章，不一定给出全新的观点，但应该改变我处理一个问题的方式。预读阶段只负责建立判断，不负责替代阅读。

## 复盘

这套流程从 `v1.0` 的“让 AI 总结全文”迭代到现在，最大的变化是把**来源核验**单独拆出来。总结可以加速理解，但不能替我确认事实。
