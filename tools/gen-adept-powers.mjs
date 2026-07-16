// Generate the Grimoire's additional physical-adept powers (book p.34) as system
// `adept_power` items into packs-src/grim-adept-powers. Six powers not in core.
// Leveled effects and the real caps (racial max, Magic Rating, drain table) live
// in the description; attributeMods stays 0 because these are situational/armor
// effects, not permanent attribute bonuses. Re-run, then build-packs.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/grim-adept-powers";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("grim-adept:" + s).digest("hex").slice(0, 16);

const POWERS = [
  { name: "Attribute Boost", pointCost: 0.5, maxLevel: 6,
    desc: "Temporarily boost a physical Attribute (Body, Quickness, or Strength). Activating it is a Magic Test; each success adds 1 to the Attribute (to a maximum of 1.5× its racial maximum) for (successes) Combat Turns, then causes Drain.",
    notes: "Cost 0.5 per Level. Drain by the boost reached (Attribute Boost Drain Table): ≤½ racial max = L, up to racial max = M, up to 1.5× = S, beyond = D; resisted like normal Drain (Willpower), every 2 successes reduces level, excess is Stun. Grimoire p.34." },
  { name: "Body Control", pointCost: 0.5, maxLevel: 6,
    desc: "Each level grants +1 die to resist the effects of gases, drugs, toxins, and poisons (added to the Damage Resistance Test against such substances).",
    notes: "Cost 0.5 per Level. Grimoire p.34." },
  { name: "Enhanced Centering", pointCost: 2, maxLevel: 5,
    desc: "An initiate power: the adept's Centering skill applies to one additional skill category per level (beyond the one chosen when Centering was learned).",
    notes: "Cost 2 per skill category. Requires the Centering metamagic. Grimoire p.34." },
  { name: "Missile Parry", pointCost: 1, maxLevel: 1,
    desc: "Pluck slow-moving missile weapons (arrows, thrown knives, shuriken) out of the air. Make a Reaction Test against a Target Number set by the attack; the successes parry it as a normal defense.",
    notes: "Cost 1 point. Does not work against bullets. Grimoire p.34." },
  { name: "Mystic Armor", pointCost: 1, maxLevel: 6,
    desc: "Each level grants 1 point of Mystic Armor, adding to both Ballistic and Impact armor against physical and impact damage. Maximum rating equals the adept's Magic Rating.",
    notes: "Cost 1 per point. Stacks with worn armor; affects spells that do physical/impact damage too. Grimoire p.34." },
  { name: "Suspended State", pointCost: 1, maxLevel: 1,
    desc: "Enter a hibernation-like trance: drastically slow the metabolism, reducing the need for food, water, and air, and slowing blood loss. Effectiveness mirrors the Hibernate critter power.",
    notes: "Cost 1 point. Grimoire p.34." }
];

function power(p) {
  const _id = idFor(p.name);
  return {
    _id, name: p.name, type: "adept_power", img: "icons/svg/aura.svg",
    system: {
      pointCost: p.pointCost, level: 1, maxLevel: p.maxLevel,
      description: `<p>${p.desc}</p>`,
      attributeMods: { body: 0, quickness: 0, strength: 0, reaction: 0 },
      notes: p.notes
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1782100000000, modifiedTime: 1782100000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

let n = 0;
for (const p of POWERS) {
  const safe = p.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(p.name)}.json`, JSON.stringify(power(p), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} adept powers`);
