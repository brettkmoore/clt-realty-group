/**
 * The copy gate. Fails the build on the things that keep slipping in.
 *
 *   1. Em dashes and en dashes, anywhere a reader sees text.
 *   2. Double hyphens in prose files.
 *   3. The "not X, it's Y" reframe and the "isn't X, it's Y" reframe.
 *   4. British spellings.
 *   5. Fair housing phrases that describe people instead of property.
 *   6. Client surnames from the internal client dossiers. Never public.
 *   7. Street addresses from the dossiers, outside image filenames.
 *
 * Run: node scripts/check-copy.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const roots = ['content', 'src/content', 'src/app', 'src/components', 'src/lib']
const exts = new Set(['.md', '.ts', '.tsx'])

const files = []
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (exts.has(path.extname(p))) files.push(p)
  }
}
roots.forEach((r) => fs.existsSync(r) && walk(r))

const rules = [
  { name: 'em dash', re: /—/g },
  { name: 'en dash', re: /–/g },
  { name: 'double hyphen', re: /(?<![-\w/(])--(?![-\w>])/g, only: /\.md$/ },
  { name: 'not X, it is Y reframe', re: /\b(?:is|was|are|were)n[’']?t\b[^.!?\n]{0,80},\s*(?:it[’']?s|it is|they[’']?re|it was)\b/gi },
  { name: 'not X, but Y reframe', re: /\bnot\s+(?:a|an|the|about|just)\b[^.!?\n]{0,60},\s*(?:but|it[’']?s)\b/gi },
  { name: 'British spelling', re: /\b(?:colour|favour|behaviour|organis(?:e|ation)|realis(?:e|ation)|centre|neighbour|programme|travelling|cancelled|grey|licence|catalogue|analyse|defence|enquir)\w*/gi },
  {
    name: 'fair housing: describes people, not property',
    re: /\b(?:safe neighbou?rhood|safe area|great schools|good schools|best schools|family[- ]friendly|perfect for (?:families|a family|couples|singles|retirees|seniors)|ideal for (?:families|a family|couples|retirees)|young professionals|empty nesters|starter home for|walk(?:ing distance)? to (?:church|st\.|temple|mosque)|christian|exclusive neighbou?rhood|no (?:kids|children)|adults only|able[- ]bodied|master bedroom|quiet neighbou?rhood|top[- ]rated schools|best schools in|great for kids|kid[- ]friendly|perfect for (?:downsizers|empty nesters|first[- ]time buyers)|ideal for (?:downsizers|empty nesters)|retirement community for)\b/gi,
  },
  {
    name: 'client name from the internal brief',
    re: /\b(?:Scotland|Richardson|Wetli|Favors|Jerome|Pryor|Dagnese|Martin Brown|Bailey|Catoe|McCourty)\b/g,
    only: /content\/stories\//,
  },
  {
    name: 'street address',
    re: /\b\d{3,5}\s+(?:Ainslie Downs|Fosters Glen|Pickens|Spindle Ridge|Cambria|Lowergate|Sunset Ridge|Christopher Cir|Fawnborough|Dayton)\b/gi,
    /* Filenames may carry the address (Brett, 2026-09-18); body copy and alt text may not. */
    skipFileRefs: true,
  },
]

let failures = 0
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  for (const rule of rules) {
    if (rule.only && !rule.only.test(file)) continue
    const lines = text.split('\n')
    lines.forEach((line, i) => {
      // Skip comment lines in code so design notes can quote patterns.
      if (/\.tsx?$/.test(file) && /^\s*(?:\*|\/\/|\/\*)/.test(line)) return
      const m = (rule.skipFileRefs ? line.replace(/\/stories\/[\w-]+\.webp/g, '') : line).match(rule.re)
      if (m) {
        failures++
        console.log(`${file}:${i + 1}  [${rule.name}]  ${m[0]}  ::  ${line.trim().slice(0, 120)}`)
      }
    })
  }
}

if (failures) {
  console.log(`\n${failures} copy problem(s).`)
  process.exit(1)
} else {
  console.log(`Copy check passed on ${files.length} files.`)
}
