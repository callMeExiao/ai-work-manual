---
title: Prompt 验证与迭代
slug: prompt-verification
description: 把一次看似有效的 Prompt，变成可重复、可检查的工作步骤。
tags: [Prompt, 实验, AI]
status: experimental
draft: false
createdAt: 2026-08-21
updatedAt: 2026-08-26
goal: 在投入真实工作前，确认 Prompt 对输入变化保持稳定，并且输出可被快速检查。
input: 一组代表性输入、预期输出样例、评价标准
output: 一份带失败样例和修订记录的 Prompt
tools: [Claude, ChatGPT, Markdown]
version: v1.3
lastVerified: 2026-08-26
steps:
  - title: 定义边界
    detail: 写清楚输入不包含什么、输出必须包含什么，以及哪些情况应该直接拒答。
  - title: 准备样例
    detail: 准备正常、模糊和极端三类输入，避免只用一条“漂亮样例”验证。
  - title: 记录失败
    detail: 保存模型偏离要求的输出，用具体例子定位 Prompt 中含糊的词语。
  - title: 固化检查
    detail: 把人工判断转成短清单，下一次修改后重复同一组测试。
prompt: |
  你是一个谨慎的工作流助手。先列出你对输入的理解和不确定点，
  再按输出格式回答。若输入缺少完成任务所需的信息，请明确指出缺口，
  不要用猜测填补。回答末尾给出一项最值得人工复核的内容。
related:
  workflows: [research-unknown-article]
  components: [command-menu]
  articles: [ai-workflows-that-last]
---

## 为什么还在实验

目前的瓶颈不是写出更长的 Prompt，而是建立更稳定的评价方式。下一版会把失败样例整理成一组可复制的回归测试。
