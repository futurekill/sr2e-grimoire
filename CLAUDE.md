# Grimoire Module — Development Notes

FoundryVTT **V13** content module adding character-facing magic content from
*The Grimoire, 2nd Edition* (FASA 7903) to the **Shadowrun 2nd Edition system**
(`sr2e`). Separate package: own repo, own packs, depends on the system via
`module.json` → `relationships.systems` (sr2e ≥ 0.10.0).

## What this module is (and isn't)
The Grimoire is ~95% **rules** (the Ways, enchanting, initiation, metamagic,
geasa, magical groups, spell *design*). This module ships only the bits that map
to existing system data: **totems** (config), **foci** (`focus` items), and
**physical adept powers** (`AdeptPowerData` items). The advanced-magic *mechanics*
(initiation/metamagic/anchoring/…) are system features, intentionally out of
scope here. See `docs/PLAN.md`.

## Source material — SCANNED, no text layer
Render pages and read them (`pdftoppm -r 150 -png`); tesseract returns garbage on
these scans. **Offset: PDF page = book page + 9.** Verify every stat against the
render. `_work/` is git-ignored.

## Totems (config injection, not items)
`scripts/register-grimoire.mjs` (an `esmodules` entry) extends
`CONFIG.SR2E.totems` at the `setup` hook — same shape as core totems
(`{ label, environment, spellBonus, spellPenalty, conjuringBonus }`), plain-string
labels (no lang file). Valid spell categories: combat/detection/health/illusion/
manipulation. Valid conjuring domains: city/field/forest/hearth/lake/mountain/
prairie/river/sea/desert/swamp/wind. `node tools/check-totems.mjs` asserts these.

## Packs (foci / adept powers)
`packs-src/` JSON → `npm run build-packs [name]` → `packs/` (committed, like the
other content modules). Add each pack to `module.json` only once populated.

## Copyright
*The Grimoire* / *Shadowrun* are © FASA and rights holders. Personal table use
from an owned PDF; not for distribution. Keep `_work/` out of git.
