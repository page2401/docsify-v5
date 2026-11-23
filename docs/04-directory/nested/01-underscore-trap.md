# 嵌套实测 A：子目录 `_sidebar.md` 向上冒泡查找机制

当开启 `loadSidebar: true` 且用户访问 `/docsify-v5/#/04-directory/nested/01-underscore-trap` 时，Docsify 会先请求同级目录的 `_sidebar.md`，未命中后再逐级回退至根 `/_sidebar.md`（若需消除 `404` 探测请求，需在 `window.$docsify.alias` 中配置 `{ '/.*/_sidebar.md': '/_sidebar.md' }`）。

- [返回《04. 目录结构与路由取舍》](/04-directory/)
- [下一篇：《嵌套实测 B：Hash 路由特征》](/04-directory/nested/02-hash-routing.md)
