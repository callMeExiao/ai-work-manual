---
title: 单页面视觉工作流
slug: visual-workflow
description: 从需求澄清、概念与资产审批，到候选实现、代码行为视觉验证和最终验收，完整记录一页前端视觉任务的可追溯流程。
tags: [视觉工作流, 前端, 设计验证, AI]
status: active
draft: false
createdAt: 2026-08-30
updatedAt: 2026-08-30
goal: 在写入目标仓库前，让单页面视觉任务经过可追溯的需求、概念、资产、实现和验证门禁。
input: 一个目标项目、一个页面、项目页面契约、用户需求，以及可选的图片 provider 选择（未指定时默认 Codex App）
output: 一份经过 digest、hash、revision 绑定，并具备代码、行为、视觉证据和最终验收的页面实现
tools: [Workflow Engine, Codex App, image_gen, 浏览器, Git]
version: v1.0
lastVerified: 2026-08-30
steps:
  - title: 确认状态与 provider
    detail: 先读取当前 run 和 workflow 状态，再根据请求选择图片生成 provider。未明确指定时使用 Codex App；只有明确要求 HTTP、API 或命名 profile 时才使用 HTTP，冲突时暂停询问。
    note: provider 选择不能在 Codex App 失败后静默切换到 HTTP。
  - title: 锁定页面契约
    detail: 确认 project.json、页面输入、workflow.json 和 run.json，确保本次运行只对应一个页面；如果没有 run，先完成需要绑定 revision 的模板选择，再从目标项目仓库根目录用选定的 provider 启动 Workflow Engine。
  - title: 澄清需求并生成概念
    detail: 需求不清时先整理 brief.md 和 concept-prompt.md。项目启用 awesome-gpt-image-2 时，先从 catalog 选择并持久化模板，再审查解析后的 prompt；概念图按请求生成，并通过带 requestHash 和 revision 的 manifest 使用 ingest 导入。
  - title: 规划并审批资产
    detail: 写出 asset-manifest.json 和 asset-plan.md，记录每项资产的用途、来源和目标位置，再以同一 provider、当前 revision 和精确 digest 交给用户审批。
  - title: 审批实施计划
    detail: 准备 operations JSON，展示 candidate paths、选择理由、target preimages、verification commands 和 implementation planHash；只有用户对这个精确版本做出持久化决定后，才能开始写入。
  - title: 写入候选实现
    detail: 按已批准的 create 或 modify 操作写入目标仓库。引擎不负责删除、重命名、暂存、提交、推送、发布或重置；写入结束只代表进入 IMPLEMENTED，不代表已经完成。
  - title: 验证代码、行为与视觉
    detail: 准备绑定 implementationPlanHash 的 verification report，并分别提供 code、behavior 和 visual 的通过结果与 verification/evidence/ 下的证据；build 通过不能替代行为或视觉验收。
  - title: 完成最终验收
    detail: 只有引擎进入 VERIFIED 后，才能用 verification report hash 和当前 workflow revision 请求最终视觉验收；最终决定持久化后，才可以报告 COMPLETED。
prompt: |
  请运行一个单页面 Visual Workflow，并把本地 Workflow Engine 当作唯一的状态机事实来源：

  1. 先检查当前 workflow 和 run 状态，确认项目、页面契约及本次运行只处理一个页面。
  2. 根据本次请求解析图片 provider：未指定时使用 Codex App；明确要求 HTTP、API 或 profile 时才使用 HTTP；如果选择冲突，先提出选择题。
  3. 需求不清时先形成 brief.md 和 concept-prompt.md。若项目启用 awesome-gpt-image-2，必须在启动 run 之前查看 catalog、选择并持久化模板，再审查 resolved prompt。
  4. 概念生成必须逐请求调用对应 provider，并通过带精确 requestHash 和 workflow revision 的 manifest 导入；不要直接覆盖概念图或资产目标路径。
  5. 在资产计划和实施计划阶段分别展示 manifest、notes、candidate paths、preimages、验证命令、digest/hash 和 revision，等待与展示版本完全匹配的持久化审批。审批在副作用开始时即被消费，不得用同一审批重试或重复写入。
  6. 审批通过后才执行批准的 create 或 modify 操作；随后提交同时覆盖代码、行为和视觉的 verification report 及 evidence。
  7. 只有 VERIFIED 且完成绑定 verification report hash、revision 的最终视觉验收后，才报告 COMPLETED。任何计划过期、候选或 preimage 改变、Git HEAD 改变、部分写入、验证失败或证据缺失都必须阻塞并重新计划或审批。

  不要用提示词自行重建状态机，不要静默 fallback，不要输出或保存 credentials、provider 原始响应、cookies、连接属性或业务数据。
related:
  workflows: [prompt-verification, research-unknown-article]
  components: []
  articles: [ai-workflows-that-last]
---

## 为什么需要这套流程

视觉任务很容易在“看起来完成”时提前结束：概念图生成了，页面文件也写进去了，构建命令还通过了，但需求是否被澄清、资产是否得到批准、实现是否符合用户选择，以及页面在真实浏览器里是否成立，都可能没有证据。

Visual Workflow 把这些判断拆成一条有边界的证据链。它每次只处理一个页面，`project.json`、页面输入、`workflow.json` 和 `run.json` 共同构成项目契约；本地 Workflow Engine 是确定性的状态机来源，Prompt 只负责提供执行意图，不能另行发明一套状态转换规则。

## 从状态检查开始

第一步不是生成图片，而是读取当前状态并解析 provider。`Codex App`、`Codex 内置`、内置 `image_gen` 对应 `codex-app`；明确出现 `HTTP`、`API`、外部接口、`profile` 或命名 profile 时才使用 `http`。没有 provider 选择时，默认使用 Codex App；请求中出现互相冲突的选择，需要让用户明确决定。

provider 是工作流契约的一部分，不能因为某个路径暂时不顺利，就把 Codex App 静默替换成 HTTP。确认项目和页面契约后，再从目标项目或已安装 Workflow Engine 的仓库根目录启动引擎；本博客仓库不包含 `scripts/visual-workflow.mjs`。已有 run 时先继续检查它的状态，没有 run 时才创建新的运行记录。

核心 CLI 入口如下，命令必须在包含 Workflow Engine 的目标项目仓库根目录执行。`<project>`、`<page>`、`<profile>`、`<revision>` 和文件路径都要替换为当前 run 的实际值：

```bash
node scripts/visual-workflow.mjs status <project> <page>
```

如果项目启用了 `awesome-gpt-image-2`，先读取 catalog、持久化模板选择，再启动 run：

```bash
node scripts/visual-workflow.mjs style <project> <page>
node scripts/visual-workflow.mjs style <project> <page> --template <template-id> --language zh
```

模板选择完成后，使用用户请求对应的 provider 启动；HTTP 只在用户明确选择时使用：

```bash
node scripts/visual-workflow.mjs start <project> <page> --provider codex-app
node scripts/visual-workflow.mjs start <project> <page> --provider http --profile <profile>
```

概念图和资产计划都通过引擎入口写入状态机，而不是直接改 workflow 文件。Codex App 生成的结果先放到项目本地 staging 目录；import manifest 至少包含引擎当前显示的精确 `requestHash`，以及每个输出的请求 `id` 和生成文件 `sourcePath`：

```json
{
  "requestHash": "<sha256>",
  "outputs": [
    {
      "id": "<request-id>",
      "sourcePath": "/absolute/path/to/generated.png"
    }
  ]
}
```

```bash
node scripts/visual-workflow.mjs ingest <project> <page> \
  --manifest /absolute/path/to/import-manifest.json \
  --revision <revision>

node scripts/visual-workflow.mjs asset-plan <project> <page> \
  --manifest /absolute/path/to/asset-manifest.json \
  --notes /absolute/path/to/asset-plan.md \
  --provider codex-app \
  --revision <revision>
```

HTTP 资产计划只在用户明确选择 HTTP 时使用 `--provider http --profile <profile>`。概念选择和实施计划也要通过引擎记录：

```bash
node scripts/visual-workflow.mjs pick <project> <page> \
  --pick <concept-id> \
  --revision <revision>

node scripts/visual-workflow.mjs plan <project> <page> \
  --kind implementation \
  --operations /absolute/path/to/operations.json \
  --revision <revision>
```

资产和实施审批必须使用引擎展示的 digest 和 revision；具体审批入口以当前状态提示为准，不要自行构造决定。写入完成后，再按照引擎当前状态提示调用 `verify`，提交绑定 implementation `planHash` 且包含代码、行为和视觉证据的 verification report：

```bash
node scripts/visual-workflow.mjs verify <project> <page>
```

## 需求、模板与概念

如果需求仍然含糊，先做需求澄清，并把结果落成 `brief.md` 和 `concept-prompt.md`。这样后续的概念选择有可回看的输入，而不是依赖一次对话中的临时理解。

只有项目启用了 `awesome-gpt-image-2`，才需要从内置 catalog 选择模板。选择应基于项目证据；如果有两个或三个都同样合理的模板，要把选项交给用户。模板选择持久化后，还要检查解析后的 prompt，再进入概念生成。

概念生成遵守“一请求一张图”。对 Codex App 返回的生成请求，要使用请求提供的 prompt 和 `transparentBackground` 设置，把生成的 PNG 放到项目本地 staging 目录，再建立包含精确 `requestHash` 的 import manifest。导入时必须带上当前 workflow revision，并通过 `ingest` 完成。不能直接覆盖 `concepts/concept-*.png` 或已经批准的资产目标路径。

## 资产和实施都先审批

概念被选择后，工作流进入 `WAITING_FOR_ASSET_APPROVAL`。此时需要同时提供 `asset-manifest.json` 和 `asset-plan.md`，说明资产的用途、来源、目标路径和生成 provider。用户批准的不是“这一类资产”，而是当前 revision 下、具有精确 digest 的那一版计划。

实施同样先计划后写入。operations JSON 要明确候选路径、每个路径为什么被选中、写入前的 target preimage，以及完成后如何验证。展示给用户精确的 implementation `planHash`，并让引擎持久化与该 hash 和 revision 匹配的审批。自然语言里的“同意”不能代替这条决定。

## 五个确定性门禁

工作流一次只推进到下一个门禁，然后停止等待必要决定：

1. `WAITING_FOR_CONCEPT_SELECTION`：展示概念图，让用户明确选择一个概念。
2. `WAITING_FOR_ASSET_APPROVAL`：展示资产 manifest、计划说明、digest 和 revision，等待资产计划审批。
3. `WAITING_FOR_IMPLEMENTATION_APPROVAL`：展示候选路径、理由、preimages、验证命令和 implementation `planHash`，等待实施计划审批。
4. `IMPLEMENTED`：已按批准的操作写入候选实现，下一步必须提交完整验证报告。
5. `VERIFIED`：代码、行为和视觉验证均有证据，下一步才可以请求最终视觉验收。

审批只授权一个完全匹配的 digest，并在对应副作用开始时立即视为已消费。超时重试或重复调用不能继续使用同一审批，必须由引擎阻塞，并根据当前 revision 重新计划或重新审批。计划过期、候选路径变化、目标 preimage 变化、Git HEAD 变化、发生部分写入、验证失败或缺少证据时，原审批同样不应继续使用；引擎必须阻塞，并要求重新生成计划或重新审批。

## 验证不是一句“构建通过”

批准写入后，验证报告要绑定 `implementationPlanHash`，同时报告三类结果：

- `code.passed`：实现和静态检查是否通过；
- `behavior.passed`：页面交互和用户流程是否按预期工作；
- `visual.reviewed`：真实页面的视觉结果是否经过检查。

每类结果都要有证据，统一放在 `verification/evidence/`。构建通过只能说明编译或静态构建没有报错，不能证明行为正确，也不能替代浏览器中的视觉复核。只有引擎报告 `VERIFIED` 后，才可以把 verification report hash 与当前 revision 一起交给最终视觉验收。

## 判断标准

这套流程的完成标准不是“候选文件存在”，而是从用户选择到最终页面之间的每一次授权都能被追溯：概念对应哪个 `requestHash`，资产计划属于哪个 digest，实施写入使用哪个 `planHash`，验证报告又绑定了哪次 revision。

状态机还划出了一条重要边界：引擎可以执行获批的创建或修改，但不会替你删除、重命名、暂存、提交、推送、发布或重置仓库。与本任务无关的 dirty work 必须保留。凭据、provider 原始响应、浏览器 cookies、连接属性和业务数据也不应被复制到文章、报告或回复中。

## 复盘

把视觉实现拆成多个门禁，会让流程比“一次生成并直接改代码”更慢一点，却换来了可定位的失败点。概念不合适时停在概念门禁，资产不明确时停在资产门禁，候选实现发生漂移时重新计划，验证证据不足时不进入最终验收。

最终状态只能诚实地报告为 `ACTION_REQUIRED`、`BLOCKED`、`VERIFIED` 或 `COMPLETED`。只有最终视觉验收决定已经持久化，才允许使用最后一个状态；这正是证据链防止“生成了文件”被误报为“工作完成”的地方。
