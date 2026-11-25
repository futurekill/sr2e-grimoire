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
    desc: "Boost one physical Attribute (Body, Quickness or Strength; each bought separately) by the power's level. Activate with a Magic Rating test against the Attribute's current value: any success raises it by the full level for as many Combat Turns as successes. When it ends, resist Drain (Willpower against half the boosted value, rounded down).",
    notes: "Cost 0.5 per Level, one Attribute per purchase. Drain Level by the boosted rating: up to ½ racial maximum L, up to the maximum M, up to 1.5× S, beyond D; 2 successes lower it one level; Stun. Not with cyberware, bioware or spells raising that Attribute; works with Improved Physical Attributes. Grimoire p.34." },
  { name: "Body Control", pointCost: 0.5, maxLevel: 6,
    desc: "Each level grants +1 die to resist the effects of gases, drugs, toxins, and poisons (added to the Damage Resistance Test against such substances).",
    notes: "Cost 0.5 per Level. Grimoire p.34." },
  { name: "Enhanced Centering", pointCost: 2, maxLevel: 5,
    desc: "An initiate's power: the adept's Centering may reduce the penalties on tests in one more skill category (Build/Repair, Combat, Knowledge, Language, Magical, Social, Technical or Vehicle) or one Special Skill. Buy it once per category.",
    notes: "Cost 2 per skill category, 1 per Special Skill. Needs the Centering metamagic. Magical skills stay mundane (no spellcasting). Grimoire p.34." },
  { name: "Missile Parry", pointCost: 1, maxLevel: 1,
    desc: "Catch a slow missile (an arrow, a thrown knife, a shuriken) out of the air as a Free Action: roll Reaction (plus Combat Pool, if wanted) against 10 minus the attack's range target number; it works only with more successes than the attacker's (ties to the attacker).",
    notes: "Cost 1 point. Grimoire p.34." },
  { name: "Mystic Armor", pointCost: 1, maxLevel: 6,
    desc: "Each point adds 1 to Impact armor; it adds to worn impact armor. At most the adept's current Magic Rating counts.",
    notes: "Cost 1 per point. Impact only. Grimoire p.34." },
  { name: "Suspended State", pointCost: 1, maxLevel: 1,
    desc: "A meditative trance like the Hibernate spell (core p.157): slows the metabolism, the need for food, water and air, and bleeding. Roll Willpower (plus a meditative Special Skill's dice) against 4, with injury modifiers, and use the successes as for Hibernate.",
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
