# Shadowrun 2E: The Grimoire

A content module for the [SR2E FoundryVTT system](../sr2e-foundryvtt) adding
character-facing magic content from *The Grimoire, 2nd Edition* (FASA 7903):
additional totems, foci, and physical adept powers.

The Grimoire is mostly *rules* (initiation, metamagic, enchanting, magical
groups); this module ships only the parts that map to droppable items or system
config. Requires the `sr2e` system (≥ 0.10.0) and is enabled per-world. Private
repo — copyrighted FASA content, personal use only.

## Status
- **Totems** ✅ — the 6 Druid totems (Moon, Oak, Sea, Sun, Wildcat, Wyrm) added
  to the shaman totem list via a setup-hook config injection.
- **Foci** — TODO (`grim-foci`).
- **Physical adept powers** — TODO (`grim-adept-powers`).

See `docs/PLAN.md`.

## Build
```
npm install
node tools/check-totems.mjs   # validate totem category/domain keys
npm run build-packs           # packs-src/ JSON -> packs/ LevelDB (once packs exist)
```
