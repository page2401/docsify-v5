import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const docsDir = path.join(root, 'docs')
const distDir = path.join(root, 'dist')
const vendorDir = path.join(distDir, 'vendor')

fs.rmSync(distDir, { recursive: true, force: true })
fs.cpSync(docsDir, distDir, { recursive: true })
fs.mkdirSync(path.join(vendorDir, 'fonts'), { recursive: true })
fs.mkdirSync(path.join(vendorDir, 'themes', 'addons'), { recursive: true })
fs.mkdirSync(path.join(vendorDir, 'plugins'), { recursive: true })

// Docsify v5 moved artifacts from lib/ to dist/ with modern core CSS + addons
fs.copyFileSync(
  path.join(root, 'node_modules/docsify/dist/docsify.min.js'),
  path.join(vendorDir, 'docsify.min.js')
)
fs.copyFileSync(
  path.join(root, 'node_modules/docsify/dist/themes/core.min.css'),
  path.join(vendorDir, 'themes/core.min.css')
)
fs.copyFileSync(
  path.join(root, 'node_modules/docsify/dist/themes/addons/core-dark.min.css'),
  path.join(vendorDir, 'themes/addons/core-dark.min.css')
)
fs.copyFileSync(
  path.join(root, 'node_modules/docsify/dist/themes/addons/vue.min.css'),
  path.join(vendorDir, 'themes/addons/vue.min.css')
)
fs.copyFileSync(
  path.join(root, 'node_modules/docsify/dist/plugins/search.min.js'),
  path.join(vendorDir, 'plugins/search.min.js')
)
fs.copyFileSync(
  path.join(root, 'node_modules/docsify/dist/plugins/front-matter.min.js'),
  path.join(vendorDir, 'plugins/front-matter.min.js')
)
if (fs.existsSync(path.join(root, 'node_modules/docsify/dist/plugins/assets'))) {
  fs.cpSync(
    path.join(root, 'node_modules/docsify/dist/plugins/assets'),
    path.join(vendorDir, 'plugins/assets'),
    { recursive: true }
  )
}

fs.copyFileSync(
  path.join(root, 'node_modules/katex/dist/katex.min.js'),
  path.join(vendorDir, 'katex.min.js')
)
fs.copyFileSync(
  path.join(root, 'node_modules/katex/dist/katex.min.css'),
  path.join(vendorDir, 'katex.min.css')
)
for (const f of fs.readdirSync(path.join(root, 'node_modules/katex/dist/fonts'))) {
  fs.copyFileSync(
    path.join(root, 'node_modules/katex/dist/fonts', f),
    path.join(vendorDir, 'fonts', f)
  )
}
fs.copyFileSync(
  path.join(root, 'node_modules/mermaid/dist/mermaid.min.js'),
  path.join(vendorDir, 'mermaid.min.js')
)
fs.writeFileSync(path.join(distDir, '.nojekyll'), '')

console.log('[docsify-v5] Assembled static runtime bundle -> dist/')
