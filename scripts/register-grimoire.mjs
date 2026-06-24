// Inject Grimoire (FASA 7903) content into the SR2E system at setup.
//
// Totems are system config, not droppable items, so we extend CONFIG.SR2E.totems
// in place (same shape the core totems use: { label, environment, spellBonus,
// spellPenalty, conjuringBonus }). Labels are plain strings — game.i18n.localize
// falls through to the string when there's no key, so no lang file is needed.
// Disadvantages are roleplay (the system doesn't model them for core totems
// either) and live in comments. The six Druid totems are book p.28-29.

const GRIMOIRE_TOTEMS = {
  // Moon: +2 manip/illusion, +1 detection, -1 combat. Subtle; avoids direct
  // confrontation (Willpower(4) to fight). Druid. (Grimoire p.28)
  moon:    { label: "Moon",    environment: "any",
             spellBonus: { manipulation: 2, illusion: 2, detection: 1 },
             spellPenalty: { combat: 1 }, conjuringBonus: {} },

  // Oak: +2 health; +2 forest spirits (esp. in oak structures). Patient;
  // requires Strength and Body >= 4. Druid. (Grimoire p.28)
  oak:     { label: "Oak",     environment: "forest",
             spellBonus: { health: 2 }, spellPenalty: {},
             conjuringBonus: { forest: 2 } },

  // Sea: +2 health & manipulation; +2 sea spirits. Never gives anything away
  // without payment. Druid. (Grimoire p.28)
  sea:     { label: "Sea",     environment: "sea",
             spellBonus: { health: 2, manipulation: 2 }, spellPenalty: {},
             conjuringBonus: { sea: 2 } },

  // Sun: +2 combat, health & detection; +2 conjuring in direct sunlight / +2 TN
  // at night. Noble leader; Charisma >= 4. Druid. (Grimoire p.29)
  sun:     { label: "Sun",     environment: "any",
             spellBonus: { combat: 2, health: 2, detection: 2 }, spellPenalty: {},
             conjuringBonus: {} },

  // Wildcat: +2 combat & health; +2 nature spirits during darkness; -1 Spell
  // Resistance vs illusions. Druid (British wilds). (Grimoire p.29)
  wildcat: { label: "Wildcat", environment: "any",
             spellBonus: { combat: 2, health: 2 }, spellPenalty: {},
             conjuringBonus: {} },

  // Wyrm: +2 health & manipulation; +2 mountain spirits. Fixates; slow & lazy
  // (sleeps ~70 hrs/week). Druid (Welsh). (Grimoire p.29)
  wyrm:    { label: "Wyrm",    environment: "mountain",
             spellBonus: { health: 2, manipulation: 2 }, spellPenalty: {},
             conjuringBonus: { mountain: 2 } }
};

// ponytail: typeof guard so this file is importable in plain Node (for the
// shape check in tools/check-totems.mjs) — Hooks only exists inside Foundry.
if (typeof Hooks !== "undefined") {
  Hooks.once("setup", () => {
    const totems = globalThis.CONFIG?.SR2E?.totems;
    if (!totems) {
      console.warn("sr2e-grimoire | CONFIG.SR2E.totems not found — is the sr2e system active?");
      return;
    }
    Object.assign(totems, GRIMOIRE_TOTEMS);
    console.log(`sr2e-grimoire | registered ${Object.keys(GRIMOIRE_TOTEMS).length} Druid totems`);
  });
}

export { GRIMOIRE_TOTEMS };
