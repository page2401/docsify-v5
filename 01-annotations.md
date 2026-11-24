---
title: "01. 专属标注与元数据"
description: "实测 Docsify v5 (5.1.0) 内核原生支持全部 GitHub > [!NOTE] / [!IMPORTANT] / [!CAUTION] 警报块。"
---

# 01. 专属标注与元数据（`docsify@5.1.0`）

将左栏选为 `docsify-v4`、右栏选为 `docsify-v5` 并排对比本页，可以直观看到 **Docsify 5 在标注能力上的质变**！

## 1. Frontmatter 元数据机制

与 v4 相同，Docsify v5 默认仍需加载官方插件 `dist/plugins/front-matter.min.js`（注意路径已从 `lib/plugins/` 变为 `dist/plugins/`）来剥离顶部的 YAML 元数据。

## 2. 经典 `?>` / `!>` 延续与不支持 `:::` 容器

Docsify v5 向下兼容了经典的 `?>` 与 `!>` 语法，同时依然不采用 `:::` 三冒号语法：

?> **一般提示（`?>` 语法）**：静态站点对比平台的每个子模块均独立维护 `main`（源码）与 `page`（静态产物）双分支。

!> **重点强调（`!>` 语法）**：自动化流水线在向 `page` 分支推送构建产物时会启用 `force_orphan: true`，切勿在 `page` 分支直接手工修改代码！

::: info
三冒号 `:::` 容器在 Docsify v5 中同样不被识别，官方推荐全面转向标准 GFM Callouts。
:::

## 3. 可折叠详情块（原生 HTML `<details>`）

<details>
<summary>点击展开查看 Docsify v5 原生 GFM Callout 源码</summary>

```markdown
> [!IMPORTANT]
> Docsify 5 已将 `[!TYPE]` 编译逻辑内置进 `blockquoteCompiler`，零插件开箱即用！
```

折叠块内同样支持公式 $f(x) = x^2 + 1$。
</details>

## 4. GitHub 风格引用警报（GFM Alerts — v5 零插件原生全支持！）

在 `docsify-v4` 中，即使安装了三方插件也无法识别 `[!IMPORTANT]` 与 `[!CAUTION]`；而在 **`docsify@5.1.0` 零三方插件**下，内核 `blockquote.js` 原生把以下所有块编译为 `<div class="callout ...">`：

> [!NOTE]
> 这是一段标准的 GitHub Flavored Markdown `[!NOTE]` 警报文本，由 Docsify 5 内核原生渲染！

> [!IMPORTANT]
> 在 Docsify v4 中失效的 `[!IMPORTANT]`，在 Docsify v5 中已获得一等公民原生样式支持！

> [!CAUTION]
> 在 Docsify v4 旧插件下退化为普通引用的 `[!CAUTION]`，在 Docsify v5 中同样原生完美渲染！
