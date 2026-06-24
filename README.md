# Shadowrun 2E: The Grimoire

A content module for the [SR2E FoundryVTT system](../sr2e-foundryvtt) adding
character-facing magic content from *The Grimoire, 2nd Edition* (FASA 7903):
additional totems, foci, and physical adept powers.

The Grimoire is mostly *rules* (initiation, metamagic, enchanting, magical
groups); this module ships only the parts that map to droppable items or system
config. Requires the `sr2e` system (≥ 0.10.0) and is enabled per-world. Private
repo — copyrighted FASA content, personal use only.

## Status — v0.1.0
- **Totems** ✅ — 6 Druid totems (Moon, Oak, Sea, Sun, Wildcat, Wyrm) added to the
  shaman totem list via a setup-hook config injection.
- **Foci** ✅ — 3 new focus types (`grim-foci`): Fetish, Specific Spell, Spell
  Category, with the Grimoire bonding ratios.
- **Physical adept powers** ✅ — 6 powers (`grim-adept-powers`): Attribute Boost,
  Body Control, Enhanced Centering, Missile Parry, Mystic Armor, Suspended State.

That's the Grimoire's droppable content; the rest is rules (out of scope). See
`docs/PLAN.md`.

## Build
```
npm install
node tools/check-totems.mjs   # validate totem category/domain keys
npm run build-packs           # packs-src/ JSON -> packs/ LevelDB (once packs exist)
```
