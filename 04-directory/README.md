---
title: "04. 目录结构与路由取舍"
---

# 04. 目录结构与路由取舍（`_sidebar.md` + Hash 路由派）

虽然 Docsify v5 全面升级了主题架构与内置 Callouts，但其核心目录模型仍延续了 **`_sidebar.md` 控制文件 + `#/` Hash 路由**，优缺点与编译型 SSG 截然相反：

> [!IMPORTANT]
> **编译型 SSG vs 运行时 Docsify 的目录权衡**：
> - **编译效率**：无论是 10 篇还是 5,000 篇 `.md`，Docsify 构建耗时恒定接近 **0 秒**（因为根本无需预编译 HTML）；
> - **代价**：`_sidebar.md` 强依赖 `.nojekyll` 存活，且多级子目录在不配 `alias` 时会产生向上冒泡探测 `_sidebar.md` 的额外网络请求。

## 嵌套子目录实测入口

- [进入嵌套子页 A：`04-directory/nested/01-underscore-trap`](/04-directory/nested/01-underscore-trap.md)
- [进入嵌套子页 B：`04-directory/nested/02-hash-routing`](/04-directory/nested/02-hash-routing.md)
