---
title: Dense Data Table
slug: dense-data-table
description: 在有限空间里呈现可比较、可扫描、可继续操作的数据表格。
tags: [表格, 信息密度, 数据界面]
status: saved
draft: false
createdAt: 2026-08-12
updatedAt: 2026-08-24
category: 数据展示
technology: [TanStack Table, CSS]
source: https://tanstack.com/table/latest
used: false
preview: table
reason: 行高、数字对齐和列级操作被处理得很克制，信息密度高但仍然可以快速定位重点。
scenarios: [运营后台, 资源管理, 任务列表]
implementationNotes: 需要先定义列优先级，再决定哪些信息默认展示；排序和筛选状态应该可被键盘访问。
related:
  workflows: [prompt-verification]
  components: []
  articles: []
---

## 观察

表格的“密”不是把字号变小，而是让每一列都承担明确的比较任务。留白应该用于分组，而不是平均分配。
