# Changelog

## Unreleased

### Added
- **The rest of the Grimoire's spells:** 68 more, so the pack holds all 76 new spells of
  the Spell Directory (p.126–132), each read from a page render. Combat: the fire and
  stun families, Death Touch, Mana Cloud, Manablast, Powerblast, Ram Touch, Slay, Spirit
  Bolt, Sterilize, Urban Renewal. Detection: Analyze Magic, the Extended Range spells,
  Detect Magic, Mindlink. Health: Decrease Cybered Attribute, Decrease Reflexes, Healthy
  Glow, Oxygenate, Preserve, Prophylaxis, Resist Pain, and the Grimoire's revised
  Stabilize (as "Stabilize (Grimoire)", beside the core one). Illusion: Overstimulation,
  Physical Mask, Spectacle, the Trid spells, Vehicle Mask. Manipulation: Control Animal,
  Mob Mind, Mob Mood, Animate, Clout, Use (Skill), the acid spells, Astral Static, Bind,
  Blade Barrier, (Critter) Form, Fashion, Fire Strike, Flame Burst, Lock, Makeover, Seal,
  Shapechange, Thunderclap, Transform.
- Fire, acid and blast elemental effects, and Clout's and Thunderclap's Stun damage, are
  noted on the spell for the GM; the rest casts like any spell of its kind.

### Fixed
- **Spell Barrier drains ((F / 2) + 1)M,** the Table of Spells' value (p.134), not the
  entry's +2: the book's design notes (p.125) give the anti-spell barrier the lower
  drain. Stun Bolt keeps its entry's Serious drain (the table prints Deadly). A copy
  already in your world keeps the old value; import it again from the compendium.

## 0.3.0 — 2026-10-16

### Added
- **Grimoire — Spells:** eight spells from the book's spell list (p.127–132): Stun Bolt,
  Stunball, Wrecker, Detect Enemies (Extended Range), Influence, Blast Barrier, Bullet
  Barrier and Spell Barrier. They're the Grimoire spells the Corporate Security
  Handbook's magicians know. Each was read from a page render. The book's typos are
  noted on the spell (Stunball's "Maria" for Mana, and its "single target"), and the
  Extended Range rule (p.123) is spelled out, since the system has no Extended range.

## 0.2.0 — 2026-07-26

### Added
- Custom art for all 9 documents, replacing Foundry's stock icons. The three foci
  escalate from a crude single-use fetish to an ornate category focus; the six
  adept powers are luminous emblems in indigo and pale gold.

### Fixed
- The README and dev notes gave the required system as sr2e 0.10.0; it is 0.11.0
  (the Fetish Focus needs `focus.system.expendable`).
- Releases no longer package `.DS_Store` files.

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
