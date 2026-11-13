# Grimoire — Content Plan

Source: *The Grimoire, 2nd Edition* (FASA 7903). **Scanned PDF, no text layer** —
render pages (`pdftoppm -r 150 -png`) and read; tesseract is broken on these
scans. **Page offset: PDF page = book page + 9** (book p.20 = PDF p.29).

## Scope decision
The Grimoire is ~95% rules (the Ways, enchanting/talismongering/alchemy, foci,
initiation, metamagic, centering, quickening, anchoring, geasa, magical groups).
There is **no pre-made spell catalog** — its "Spells" chapter (book p.110+) is
spell-*design* rules, not a list of new named spells. So this module ships only
the droppable / config-mappable bits and skips the rules mechanics (those would
be system features, not content).

## Batches
1. **Totems → config** ✅ DONE. The 6 Druid totems (book p.28-29): Moon, Oak,
   Sea, Sun, Wildcat, Wyrm — injected into `CONFIG.SR2E.totems` at setup by
   `scripts/register-grimoire.mjs`. Disadvantages are roleplay (not modeled, as
   with core totems); kept in comments. `node tools/check-totems.mjs` validates
   the category/domain keys.
2. **Foci → `grim-foci` pack** (TODO). Book p.23-27 (PDF p.32-36): the foci /
   unique-enchantment catalog as system `focus` items (focusType, force,
   bondingCost, costPerForce/cost). Dedupe against the core foci already shipped.
3. **Physical adept powers → `grim-adept-powers` pack** (TODO). Book p.34 (PDF
   p.43, "Additional Powers"): new powers as `AdeptPowerData` items (pointCost,
   level/maxLevel, attributeMods, description). Dedupe against core adept powers.

Add each pack to `module.json` packs[] + packFolders only once populated. A
`_work/core-spells.txt` dedup list exists but needs regenerating robustly
(filename spaces truncated it) before any spell-adjacent work.

## Skipped (rules, not content)
Initiation/grades, metamagic (centering/quickening/masking/shielding/dispelling/
anchoring), geasa, enchanting/talismongering/alchemy procedures, magical groups.
These are system mechanics — out of scope for this content module.
