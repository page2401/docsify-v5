---
title: "02. 流程图与时序图"
---

# 02. 流程图与时序图（Mermaid 12 · `docsify@5.1.0`）

> [!WARNING]
> **Docsify v4 -> v5 重大破坏性变更实录**：
> 在 v4 中覆写代码块渲染器的签名为 `code(code, lang)`（两个字符串参数）；而在 `docsify@5.1.0` 中底层升级了新版 `marked`，入参变更为单个 Token 对象 **`code({ text, lang })`**！若直接复制 v4 的配置代码到 v5，所有图表源码都会变成字符串 `"[object Object]"` 导致渲染报错。

## 1. 复杂子图与架构流程图（`flowchart TD`）

```mermaid
flowchart TD
    subgraph MainRepo["主仓库 page2401.github.io"]
        Spec["相似 *.md 基准规范"]
        SubPtr["Git Submodule 指针 (sites/*)"]
        Workbench["对比工作台源码 (main)"]
    end

    subgraph SubRepo["独立子仓库 (docsify-v5)"]
        SrcBranch["main 分支: 原始 *.md + v5 新主题配置"]
        Actions{"GitHub Actions 组装"}
        PageBranch["page 孤儿分支: dist/ + .nojekyll"]
        SrcBranch --> Actions
        Actions -->|"写入 .nojekyll 保住 _sidebar.md"| PageBranch
    end

    SubPtr -.->|"跟踪最新提交"| SrcBranch
    Workbench -->|"构建期提取真实 *.md"| Portal["https://page.2401.xyz/"]
    PageBranch -->|"GitHub Organization Pages"| SubSite["https://page.2401.xyz/docsify-v5/"]
```

## 2. 运行时拉取渲染时序图（`sequenceDiagram`）

```mermaid
sequenceDiagram
    autonumber
    actor Reader as 访问读者
    participant Browser as 浏览器 Docsify v5 (5.1.0)
    participant Pages as GitHub Pages (page 分支)

    Reader->>Browser: 访问 /docsify-v5/#/02-diagrams
    activate Browser
    Browser->>Pages: fetch _sidebar.md & 02-diagrams.md
    Pages-->>Browser: 返回原始 Markdown 纯文本
    Browser->>Browser: beforeEach 钩子执行 KaTeX 公式替换
    Browser->>Browser: 新版 marked 解析 code({ text, lang })
    Browser->>Browser: doneEach 调用 mermaid@12.3.0 绘图
    Browser-->>Reader: 完成首屏渲染并联动 core-dark 主题
    deactivate Browser
```

## 3. 子模块同步状态机（`stateDiagram-v2`）

```mermaid
stateDiagram-v2
    [*] --> CleanSubmodule: git clone --recurse-submodules
    CleanSubmodule --> SubmoduleModified: 编辑子模块 *.md 基准文档
    SubmoduleModified --> SubmodulePushed: 子模块 commit & push origin main
    SubmodulePushed --> PageDeploying: 子仓库 Actions 自动更新 page 分支
    SubmodulePushed --> MainRepoUpdated: 主仓库 git add sites/* 更新指针
    PageDeploying --> LiveSynced: 子站实测渲染已就绪
    MainRepoUpdated --> LiveSynced: 主站源码差异视图已同步
    LiveSynced --> [*]
```
