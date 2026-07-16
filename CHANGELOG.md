# Changelog

## 0.1.3 — 2026-07-16
### Fixed
- **Requires sr2e 0.11.0, not 0.10.0.** The Fetish Focus uses
  `focus.system.expendable`, which the system only added in 0.11.0 — on 0.10.x it
  would install and quietly lose the single-use behaviour that defines it.

## 0.1.2 — 2026-07-16
### Fixed
- **The six adept powers could not be created.** They shipped with `type:
  "adeptPower"`, but the system registers `adept_power` — so Foundry silently
  refused to load them and Attribute Boost, Body Control, Enhanced Centering,
  Missile Parry, Mystic Armor and Suspended State were unusable. Fixed at the
  generator so it cannot come back, and `npm run validate` now rejects any
  document whose type the system doesn't register.

## 0.1.1

- The **Fetish Focus** is now flagged single-use (`expendable`), so the system's
  magic tab shows a one-click **Spend** button for it. Requires the system build
  that adds `FocusData.expendable`.

## 0.1.0 — Totems, foci, adept powers

Character-facing magic content from *The Grimoire, 2nd Edition* (FASA 7903),
render-verified:

- **6 Druid totems** (book p.28-29) — Moon, Oak, Sea, Sun, Wildcat, Wyrm —
  injected into `CONFIG.SR2E.totems` at setup (an `esmodules` script), so they
  appear in the shaman totem list. Same shape as core totems.
- **3 foci** (`grim-foci`, book p.23-27) — Fetish Focus (single-use), Specific
  Spell Focus, Spell Category Focus — with the Grimoire bonding ratios.
- **6 physical adept powers** (`grim-adept-powers`, book p.34) — Attribute Boost,
  Body Control, Enhanced Centering, Missile Parry, Mystic Armor, Suspended State.

The rest of the Grimoire is rules (the Ways, enchanting, initiation, metamagic,
geasa, magical groups, spell design) — system mechanics, not content, so out of
scope here. Requires the `sr2e` system ≥ 0.10.0.
