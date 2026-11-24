---
title: "05. 高阶代码块与语法高亮"
description: "实测 Docsify v5 (5.1.0) 全新 CSS 变量暗色代码主题、新版 marked Token 入参变更，以及延续自 v4 的客户端 Prism.js 外挂语言包机制。"
---

# 05. 高阶代码块与语法高亮（`docsify@5.1.0` · 模块化代码主题与客户端 Prism.js）

将 `docsify-v4` 与 `docsify-v5` 并排对比本页，可以清晰观察到新一代运行时引擎在代码块渲染上的**一变与一不变**：

> [!TIP]
> **跨代进化（CSS 变量深浅色 Token 主题）**：Docsify v5 废弃了旧版写死亮色值的单体 `vue.css`，改用 `dist/themes/core.min.css` + `addons/core-dark.min.css` 的 `--code-*` CSS 自定义属性体系，切换深浅色时语法 Token 自动平滑变色；同时因升级现代版 `marked`，自定义 `markdown.renderer.code` 的入参由 `(code, lang)` 破坏性变更为 `({ text, lang })` Token 对象。

> [!IMPORTANT]
> **架构延续（核心语言裁剪与外挂顺序铁律）**：为了维持零编译主包轻量化，`dist/docsify.min.js` 依然只内置 `markup`、`css`、`clike`、`javascript` 四种核心 Prism 语法。诸如 `ts`、`json`、`bash`、`diff` 必须在 `docsify.min.js` **之后**额外引入 `prism-*.min.js` 才能获得词法着色。

## 1. 代码块文件名标题栏与外挂 TypeScript 语法高亮

Docsify v5 的内置 `code` 编译器同样只读取围栏语言标识并输出 `<pre v-pre data-lang="ts"><code class="lang-ts">`，不解析 `[filename]` 或 `title="..."` 元信息串。本站在 `scripts/build-static.mjs` 中将 `node_modules/prismjs/components/prism-typescript.min.js` 拷入本地 `./vendor/prism/`，实现零外部 CDN 的 TypeScript 语法高亮：

**`scripts/resolve-route.ts`**

```ts
export interface RouteContext {
  basePath: string
  slug: string
  cleanUrls: boolean
}

export function formatDocRoute(ctx: RouteContext): string {
  const prefix = ctx.basePath.endsWith('/') ? ctx.basePath : `${ctx.basePath}/`
  const normalized = ctx.slug.replace(/^\/+|\/+$/g, '')
  if (!normalized || normalized === 'index') return prefix
  return ctx.cleanUrls ? `${prefix}${normalized}/` : `${prefix}${normalized}.html`
}
```

## 2. 关键行聚焦与高亮（Line Highlighting 能力边界）

与构建期将每一行包裹为 `<span class="line highlighted">` 的 Shiki 不同，Docsify v5 在浏览器端调用 `Prism.highlight()` 直接返回连续 HTML 字符串，内核未内置 `{3,7-9}` 行号区间解析器或 `// [!code highlight]` 转换器。此处加载 `prism-json.min.js` 渲染完整 JSON 配置，并在正文中提示重点关注第 `3` 行与第 `7–9` 行：

```json
{
  "id": "ssg-benchmark",
  "routeStyle": "clean",
  "strictZeroCdn": true,
  "markdown": {
    "mathEngine": "katex",
    "diagramEngine": "mermaid",
    "lineHighlight": true,
    "codeTransformers": ["diff", "focus"]
  }
}
```

## 3. 代码增删对比着色（`prism-diff.min.js` + 深浅色自适应）

通过挂载 `./vendor/prism/prism-diff.min.js` 并配合深浅色 `.token.deleted` / `.token.inserted` 整行背景规则，Docsify v5 可在客户端渲染标准 `diff` 补丁块（但与所有未挂载双层语法复合器的传统 Prism `diff` 一样，增删行内部不再二次解析 TypeScript 关键字）：

```diff
 export function mountSubsite(baseDir: string, subPath: string): string | null {
-  const cleanRel = decodeURIComponent(subPath).replace(/\.\./g, '')
-  return `${baseDir}/${cleanRel}`
+  const resolvedBase = path.resolve(baseDir)
+  const target = path.resolve(resolvedBase, decodeURIComponent(subPath).replace(/^\/+/, ''))
+  return target.startsWith(`${resolvedBase}${path.sep}`) ? target : null
 }
```

## 4. 多语言运行时命令组（原生 `<details>` 折叠替代三方 Tabs 插件）

Docsify v5 官方核心依然保持克制，未将多语言标签页纳入内核（社区方案依赖 `docsify-tabs` 插件的 `<!-- tabs:start -->` HTML 注释协议，脱离 Docsify 即失效）。在零三方插件约束下，结合 `prism-bash.min.js` 与原生 `<details>` 是兼顾交互收起与 GitHub 原始可读性的稳健方案：

<details open>
<summary><strong>Node.js (<code>package.json</code>)</strong></summary>

```bash
npm ci && npm run build
```

</details>

<details>
<summary><strong>Deno 2 (<code>deno.json</code>)</strong></summary>

```bash
deno task build
```

</details>

<details>
<summary><strong>Python (<code>requirements.txt</code>)</strong></summary>

```bash
pip install -r requirements.txt && sphinx-build -b dirhtml . _build/dirhtml
```

</details>

<details>
<summary><strong>Ruby (<code>Gemfile</code>)</strong></summary>

```bash
bundle install && bundle exec jekyll build
```

</details>

## 5. 四大底层高亮引擎与 Docsify v5 跨代定位对照

| 高亮引擎代表 | 典型采用框架 | 构建期零运行时 JS | 原生行号 / 行高亮 | 保留词法着色的 Diff |
| :--- | :--- | :--- | :--- | :--- |
| **Shiki / Expressive Code** | VitePress、Starlight、Fumadocs、Nextra、Rspress、Nuxt、Quartz | ✅ 纯静态内联样式 | ✅ `{1,3-5}` / `[!code highlight]` | ✅ `// [!code ++]` |
| **Prism.js（构建期）** | Docusaurus、VuePress、Eleventy (plugin)、Gatsby | ✅ 静态 Token 类名 | ✅ `{1,3-5}` / 魔法注释 | ⚠️ 需配 diff-highlight 插件 |
| **Prism.js（Docsify v5 运行时）** | **Docsify v5 (`5.1.0`)**（支持 CSS 变量暗色模式） | ❌ 浏览器端实时分词 + 外挂 `prism-*.min.js` | ❌ 内核未集成 `{1,3-5}` 行高亮 | ⚠️ 需加载 `prism-diff` 并补背景样式 |
| **Pygments / Chroma / Giallo** | MkDocs Material、Sphinx、Jekyll、Hugo、Zola | ✅ 编译期直出静态 HTML | ✅ `hl_lines` / `emphasize-lines` | ⚠️ 仅标准 `diff` 块红绿 |
