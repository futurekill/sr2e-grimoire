# QA plan — The Grimoire

Manual checks for a live Foundry world with the sr2e system and this module enabled.

## 0. Offline
- [ ] `npm run validate` passes (pack shape + every catalog entry cites its page); `npm run lint` is clean.
- [ ] `node tools/check-totems.mjs` passes (the Druid totems match the system's totem shape).

## 1. Totems (p.28–29)
- [ ] The console logs "registered 6 Druid totems" on load.
- [ ] A shaman can pick Moon, Oak, Sea, Sun, Wildcat and Wyrm on the Magic tab.
- [ ] A **Moon** shaman's manipulation spell gets +2 dice and a combat spell −1; an **Oak** shaman conjuring a forest spirit gets +2.

## 2. Spells (76, p.127–132)
- [ ] The Spells pack opens; every spell shows its art and its Grimoire page badge (sr2e 0.156.0+).
- [ ] Cast **Spell Barrier**: drain is ((F ÷ 2) + 1)M (Table of Spells, p.134).
- [ ] Cast **Clout** at a target: the damage is Stun; a fire, acid or blast elemental spell applies its elemental effect.

## 3. Foci and adept powers
- [ ] Bond the **Fetish Focus**: it is single-use (spent after the spell it aids).
- [ ] The Specific and Spirit foci bond and add their dice.
- [ ] The six physical adept powers (p.34) drop onto an adept and cost their Magic points.
