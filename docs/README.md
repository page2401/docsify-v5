---
title: "Docsify v5 基准实测"
---

# Docsify v5 (`5.1.0`) · 新一代运行时引擎跨代实测

> [!TIP]
> **对比 `docsify-v4` (`4.13.1`) 的四大跨代升级**：
> 1. **内核原生支持 `> [!NOTE]` / `[!IMPORTANT]` / `[!CAUTION]`**：不再需要安装停滞的 `docsify-plugin-flexible-alerts` 三方插件！
> 2. **全新模块化 CSS 变量主题体系**：废弃旧版耦合样式，改由 `dist/themes/core.min.css` + `addons/core-dark.min.css` 原生提供深浅色主题支持。
> 3. **包结构重构（`lib/` -> `dist/`）**：发布包全面转向 `dist/` 并提供原生 ESM 导出。
> 4. **破坏性 API 变更**：升级现代版 `marked` 后，`markdown.renderer.code` 入参由 `(code, lang)` 变更为对象 Token `({ text, lang })`。

## 精确锁定版本清单

| 依赖模块 | 精确锁定版本 | 与 v4 (`4.13.1`) 的差异 |
| :--- | :--- | :--- |
| `docsify` | `5.1.0` | 新一代核心（原生内置 GFM Callouts 与 `core-dark.min.css` 暗色模式） |
| `katex` | `0.19.1` | 浏览器端实时公式排版引擎 |
| `mermaid` | `12.3.0` | 升级至最新第 12 代 Mermaid 引擎 |
