# Shadowrun 2E: The Grimoire

A Foundry VTT V13 module bringing *The Grimoire, 2nd Edition* (FASA 7903) to the [Shadowrun 2nd Edition system](https://github.com/futurekill/sr2e-foundryvtt) (`sr2e`). The Grimoire's droppable content: six Druid totems, three new focus types, six physical adept powers, and every new spell in the book.

## Contents

| Pack | Contents |
|---|---|
| Grimoire — Foci | 3 items |
| Grimoire — Adept Powers | 6 items |
| Grimoire — Spells | 76 spells |

## Notes

- **Totems** (Moon, Oak, Sea, Sun, Wildcat, Wyrm) are added to the system's shaman totem list when the module is enabled; there's no pack for them.
- **Foci:** Fetish, Specific Spell and Spell Category, with the Grimoire bonding ratios.
- **Adept powers:** Attribute Boost, Body Control, Enhanced Centering, Missile Parry, Mystic Armor, Suspended State.
- **Spells:** all 76 new spells of the Spell Directory (book p.126–132): 20 combat, 6 detection, 18 health, 6 illusion and 26 manipulation, each read from a page render. Where the entry and the Table of Spells disagree, the spell's notes say which was used. The core-book spells the table also lists are in the system already.
- The rest of the book is rules (initiation, metamagic, enchanting, magical groups) and isn't imported.

## Requirements

- Foundry VTT V13
- The `sr2e` system, version 0.11.0 or later

## Installation

In Foundry, **Add-on Modules → Install Module**, and paste this manifest URL:

```
https://github.com/futurekill/sr2e-grimoire/releases/latest/download/module.json
```

Then enable it in your world (**Game Settings → Manage Modules**).

## Development

`packs-src/` (one JSON file per document) is the source of truth. `packs/` is built from it, gitignored, and rebuilt by the release workflow.

```bash
npm install
npm run build-packs     # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
npm run extract-packs   # pull edits made in Foundry back to packs-src/
npm run validate        # pre-flight checks on the pack sources
npm run lint
```

To release: add a `## X.Y.Z — date` section to `CHANGELOG.md` (the release notes come from it), bump `module.json`, then tag and push `vX.Y.Z`.

## Copyright

*The Grimoire, 2nd Edition* and *Shadowrun* are © FASA and their rights holders. This is a fan-made, non-commercial module for personal table use by owners of the book.
