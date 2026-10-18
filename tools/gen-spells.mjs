// Generate the Grimoire's new spells (Spell Directory, book p.126-132; Table of Spells
// p.133-134) as system `spell` items into packs-src/grim-spells. Every value was read
// from a 200 dpi page render, entry and table both. Where they disagree the user ruled
// (2026-10-18): Stun Bolt keeps the entry's drain [(F/2)-1]S (table: D); Spell Barrier
// takes the table's [(F/2)+1]M (entry: +2M; p.125 says the anti-spell barrier drains
// less). Stabilize is reprinted revised, so it ships as "Stabilize (Grimoire)" beside
// the core one. Notes are paraphrase. Ids are stable by name (the eight first shipped
// keep theirs). Re-run, then `npm run build-packs grim-spells`.
import { writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/grim-spells";
mkdirSync(DIR, { recursive: true });
const idFor = (name) => createHash("md5").update("grim-spell:" + name).digest("hex").slice(0, 16);
const I = "systems/sr2e/assets/item_icons/spells/";

// d(rain) shorthand: "+1D" → "((F / 2) + 1)D", "S" → "(F / 2)S", "-1S" → "((F / 2) - 1)S"
const drain = (s) => {
  const m = /^([+-]\d+)?([LMSD])$/.exec(s);
  if (!m) throw new Error(`bad drain ${s}`);
  return m[1] ? `((F / 2) ${m[1][0]} ${m[1].slice(1)})${m[2]}` : `(F / 2)${m[2]}`;
};

const SPELLS = [
  // ── Combat (p.126-127) ──
  ["Death Touch", "combat", "", "mana", "touch", "instant", "-1S", "Willpower (R)", "D", 0, 0, "mana-bolt", 126,
    "A lethal combat spell: the magician must touch the target, who takes Physical damage."],
  ["Fire Bolt", "combat", "", "physical", "los", "instant", "+1D", "Body (R)", "S", 0, 0, "fireball", 126,
    "A bolt of energy that does Physical damage to one target, with the elemental effect of fire (Grimoire p.112; resolve the fire effect by hand)."],
  ["Fire Cloud", "combat", "", "physical", "los", "instant", "+1D", "Body (R)", "M", 1, 0, "fireball", 126,
    "An area-effect cloud of magical energy doing Physical damage, with the elemental effect of fire (p.112; by hand)."],
  ["Fire Dart", "combat", "", "physical", "los", "instant", "+1M", "Body (R)", "L", 0, 0, "fireball", 126,
    "An energy dart doing Physical damage to one target, with the elemental effect of fire (p.112; by hand)."],
  ["Fire Missile", "combat", "", "physical", "los", "instant", "+1S", "Body (R)", "M", 0, 0, "fireball", 126,
    "Magical energy doing Physical damage to one target, with the elemental effect of fire (p.112; by hand)."],
  ["Mana Cloud", "combat", "", "mana", "los", "instant", "S", "Willpower (R)", "M", 1, 0, "manaball", 126,
    "An area-effect cloud of magical energy that does Physical damage."],
  ["Manablast", "combat", "", "mana", "los", "instant", "D", "Willpower (R)", "M", 1, 0, "manaball", 126,
    "A powerful area-effect blast of magical energy doing Physical damage, with the elemental effect of blast (p.112; by hand)."],
  ["Powerblast", "combat", "", "physical", "los", "instant", "+1D", "Body (R)", "M", 1, 0, "powerball", 127,
    "A powerful area-effect blast doing Physical damage, with the elemental effect of blast (p.112; by hand)."],
  ["Ram Touch", "combat", "", "physical", "touch", "instant", "-1M", "Special: Object Resistance Table", "S", 0, 0, "ram", 127,
    "Damages inanimate objects like the ram spell (SR2 p.151), but the magician must touch the target."],
  ["Slay (Race/Species)", "combat", "", "mana", "los", "instant", "-1S", "Willpower (R)", "S", 0, 0, "mana-bolt", 127,
    "Each version is a separate spell for one race or species (slay ork, slay dog, slay western dragon…). Restricted Target: that race or species. Rename the item for the version learned."],
  ["Spirit Bolt", "combat", "", "mana", "los", "instant", "-1S", "Force (R)", "S", 0, 0, "mana-bolt", 127,
    "A bolt of magical energy doing Physical damage to a single spirit (Restricted Target: spirits). Type printed \"Maria\", a typo for Mana."],
  ["Sterilize", "combat", "", "physical", "los", "instant", "+1D", "4", "D", 1, 0, "combat", 127,
    "Area effect: kills small life forms (bacteria, microorganisms) and destroys loose biomaterial (skin flakes, stray hair, spilled blood), so it can't serve as a ritual material link (p.35; SR2 p.135). It doesn't touch biomaterial attached to a living being, nor bioweapons. One success is enough."],
  ["Stun Bolt", "combat", "", "mana", "los", "instant", "-1S", "Willpower (R)", "S", 0, 0, "mana-bolt", 127,
    "A bolt of magical energy that does Stun damage to a single target. Drain from the entry, (F / 2) - 1, Serious; the Table of Spells (p.133) prints Deadly."],
  ["Stun Cloud", "combat", "", "mana", "los", "instant", "-1S", "Willpower (R)", "M", 1, 0, "manaball", 127,
    "An area-effect cloud of magical energy that does Stun damage."],
  ["Stun Missile", "combat", "", "mana", "los", "instant", "-1M", "Willpower (R)", "M", 0, 0, "mana-missile", 127,
    "A missile of magical energy that does Stun damage to a single target."],
  ["Stun Touch", "combat", "", "mana", "touch", "instant", "-2M", "Willpower (R)", "S", 0, 0, "mana-dart", 127,
    "A hands-on spell that does Stun damage to a single target."],
  ["Stunball", "combat", "", "mana", "los", "instant", "-1D", "Willpower (R)", "S", 1, 0, "manaball", 127,
    "An area-effect spell that does Stun damage. (The entry's \"to a single target\" is a slip: its name and its first words make it area-effect.) Type printed \"Maria\", a typo for Mana."],
  ["Stunblast", "combat", "", "mana", "los", "instant", "+1D", "Willpower (R)", "S", 1, 0, "manaball", 127,
    "An area-effect spell doing Stun damage with the elemental effect of blast (p.112; by hand)."],
  ["Urban Renewal", "combat", "", "physical", "los", "instant", "D", "Special: Object Resistance Table", "S", 1, 0, "ram", 127,
    "Like the ram spell (SR2 p.151), but affects only parts of buildings (Restricted Target: buildings), and is area-effect. The GM checks significant objects in the area; the rest at their discretion."],
  ["Wrecker", "combat", "", "physical", "los", "instant", "S", "Special: Object Resistance Table", "S", 0, 0, "ram", 127,
    "Like the ram spell (SR2 p.151), but affects only a single vehicle (Restricted Target: vehicles)."],

  // ── Detection (p.128). Background count affects ranged detection spells (p.89). ──
  ["Analyze Magic", "detection", "", "mana", "limited", "sustained", "M", "Force/Rating", "", 0, 0, "analyze-device", 128,
    "Analyzes a magic item as if assensing it: the Spell Success Test is against the Force or Rating of the spell, focus or other phenomenon; read the result off the Astral Examination table (SR2 p.146)."],
  ["Clairaudience (Extended Range)", "detection", "", "mana", "limited", "sustained", "-1S", "4", "", 0, 0, "clairaudience", 128,
    "Clairaudience (SR2 p.153) with the Extended Range option. Range is printed \"Extended\": the successes on the separate Force Success Test used for limited range, multiplied by ten times the magician's Magic, in metres (Grimoire p.123)."],
  ["Clairvoyance (Extended Range)", "detection", "", "mana", "limited", "sustained", "-1S", "4", "", 0, 1, "clairvoyance", 128,
    "Clairvoyance (SR2 p.153) with the Extended Range option. Range is printed \"Extended\": the successes on the separate Force Success Test used for limited range, multiplied by ten times the magician's Magic, in metres (Grimoire p.123)."],
  ["Detect Enemies (Extended Range)", "detection", "", "mana", "limited", "sustained", "S", "4", "", 1, 1, "detect-enemies", 128,
    "Detect enemies (SR2 p.153) with the Extended Range option. Range is printed \"Extended\": the successes on the separate Force Success Test used for limited range, multiplied by ten times the magician's Magic, in metres (Grimoire p.123)."],
  ["Detect Magic", "detection", "", "mana", "limited", "sustained", "L", "4", "", 1, 1, "detection", 128,
    "An area-effect general hypersense on a voluntary subject: within limited range, detects active magic (foci; sustained, quickened or anchored spells; spirits). It doesn't detect magically active characters."],
  ["Mindlink (Individual)", "detection", "", "mana", "limited", "sustained", "+2M", "4", "", 0, 1, "detection", 128,
    "A hypersense that lets the magician talk mind to mind (words, emotions, images) with one person chosen when the spell was designed (Restricted Target: that individual). The subject must be in line of sight and range when it's cast, then may leave line of sight but must stay in range. One success at TN 4 makes the link; an unwilling subject resists with Willpower against the spell's Force, reducing the caster's successes. A failed link means recasting, with Drain."],

  // ── Health (p.129) ──
  ...[1, 2, 3, 4].map(n => [`Decrease Cybered Attribute -${n}`, "health", "", "physical", "touch", "sustained", `+3${"LMSD"[n - 1]}`, "10 - Essence", "", 0, 0, "decrease-attribute", 129,
    `Like decrease (attribute) (SR2 p.154), but lowers a cybered attribute by ${n}. Against cybered Reaction, raise the Drain Level by one.`]),
  ...[[1, "+1S"], [2, "+1D"], [3, "+3D"]].map(([n, d]) => [`Decrease Reflexes -${n}`, "health", "", "mana", "los", "sustained", d, "2 x Reaction", "", 0, 0, "increase-reflexes", 129,
    `The reverse of increase reflexes (SR2 p.155): the target loses ${n} Initiative ${n === 1 ? "die" : "dice"}. No effect on characters with cybernetic Initiative enhancements; anyone left with no (or negative) Initiative dice uses Reaction as Initiative.`]),
  ["Healthy Glow", "health", "", "physical", "touch", "permanent", "L", "4", "", 0, 0, "health", 129,
    "Cosmetic: brightens eyes and hair, sloughs dead skin, improves circulation. Duration: Permanent (5 turns); it needs no sustaining but wears off in time with lifestyle, diet and vices."],
  ["Oxygenate", "health", "", "physical", "limited", "sustained", "+2M", "4", "", 0, 1, "health", 129,
    "On a voluntary subject: +1 Body die per 2 successes to resist suffocation, strangulation, inhaled gas or any oxygen deprivation, and the subject can breathe water."],
  ["Preserve", "health", "", "physical", "limited", "sustained", "+1M", "Special: Object Resistance Table", "", 0, 0, "health", 129,
    "Keeps dead organic matter from drying out, decaying or rotting. One success casts it. Used on food, and by forensic magicians on cadavers and on samples kept as ritual material links (p.35; SR2 p.135); often put in a spell lock."],
  ...[["L", "Light"], ["M", "Moderate"], ["S", "Serious"], ["D", "Deadly"]].map(([l, w]) => [`Prophylaxis (${l} Pathogen)`, "health", "", "physical", "limited", "sustained", `+2${l}`, "4", "", 0, 1, "health", 129,
    `On a voluntary subject: +1 Body die per 2 successes to resist infection, drugs or toxins of ${w} level. The subject also resists beneficial medicines.`]),
  ...[["Light", "M", 5], ["Moderate", "S", 10], ["Serious", "D", 15]].map(([w, d, t]) => [`Resist Pain (${w})`, "health", "", "mana", "limited", "permanent", d, "4", "", 0, 0, "health", 129,
    `Offsets the injury modifiers (TN and Initiative) of ${w} Physical damage (not Stun); it heals nothing. Duration: Permanent (${t} turns). It lasts until the damage rises past ${w} or the wounds heal. No version exists for Deadly damage (the character is unconscious and must be healed).`]),
  ["Stabilize (Grimoire)", "health", "", "physical", "los", "permanent", "S", "4 + minutes elapsed", "", 0, 0, "stabilize", 129,
    "The Grimoire's revision of stabilize: keeps a character with Deadly Physical damage from dying. Add the minutes since the damage to the Spell Success Test's TN. Duration: Permanent (20 turns). (The core book's version, Mana, Touch, is the system's Stabilize; pick one per table.)"],

  // ── Illusion (p.130). Illusions can't permanently harm a character. ──
  ["Overstimulation", "illusion", "", "mana", "los", "sustained", "+1M", "Willpower (R)", "", 0, 0, "stimulation", 130,
    "While it lasts, the subject takes the penalties of as many Stun boxes as the caster has successes (no real damage). At 10 or more successes the victim is conscious but can't act. Type printed \"Maria\", a typo for Mana."],
  ["Physical Mask", "illusion", "", "physical", "los", "sustained", "+1L", "4", "", 0, 1, "mask", 130,
    "Like the mask spell (SR2 p.156), but works against technological devices."],
  ["Spectacle", "illusion", "", "mana", "los", "sustained", "+1M", "4", "", 1, 1, "entertainment", 130,
    "A multi-sensory version of the entertainment spell (SR2 p.156)."],
  ["Trid Entertainment", "illusion", "", "physical", "los", "sustained", "+2L", "4", "", 1, 1, "entertainment", 130,
    "Like the entertainment spell (SR2 p.156), but electronic cameras can \"see\" it."],
  ["Trid Spectacle", "illusion", "", "physical", "los", "sustained", "+2M", "4", "", 1, 1, "entertainment", 130,
    "Spectacle that electronic cameras can \"see\"."],
  ["Vehicle Mask", "illusion", "", "physical", "touch", "sustained", "L", "6", "", 0, 0, "mask", 130,
    "Physical mask for vehicles. Only a vehicle with Body at most half the magician's Magic (round down), and the caster must touch it."],

  // ── Manipulation: control (p.130) ──
  ["Control Animal", "manipulation", "control", "mana", "los", "sustained", "+2D", "Willpower (R)", "", 0, 0, "control-actions", 130,
    "Like control thoughts (SR2 p.157), but only on non-sentient animals (the GM decides sentience). Paranormal animals resist with Willpower or Essence, whichever is higher."],
  ["Influence", "manipulation", "control", "mana", "limited", "permanent", "+2S", "Willpower (R)", "", 0, 0, "control-thoughts", 130,
    "Like control thoughts (SR2 p.157), but permanently implants a single suggestion; the victim acts on it as if it were their own idea. Proving the idea false to the victim, or forcing the caster to withdraw it, overcomes it. Duration: Permanent (10 turns)."],
  ["Mob Mind", "manipulation", "control", "mana", "limited", "sustained", "+3S", "Willpower (R)", "", 1, 0, "control-thoughts", 130,
    "Area effect: controls the thoughts of everyone in range. One Success Test treats the crowd as a single character (pedestrians are Willpower 3); major characters resist individually against the caster's successes."],
  ["Mob Mood", "manipulation", "control", "mana", "limited", "sustained", "+2M", "Willpower (R)", "", 1, 0, "control-emotion", 130,
    "Like mob mind, but only shifts a crowd's mood; it gives no control of the crowd."],

  // ── Manipulation: telekinetic (p.130-131) ──
  ["Animate", "manipulation", "telekinetic", "physical", "limited", "sustained", "+2M", "Special: Object Resistance Table", "", 0, 0, "levitate-item", 130,
    "Makes an inanimate object move as its shape allows (balls roll, rugs crawl, statues walk). Only the whole object moves, at metres per action equal to half the caster's Magic (round down)."],
  ["Clout", "manipulation", "telekinetic", "physical", "los", "instant", "M", "4", "(Willpower)M Stun", 0, 0, "magic-fingers", 131,
    "A telekinetic punch: damage (caster's Willpower)M Stun, with the normal Ranged Combat modifiers (SR2 p.87); casting successes increase the damage as in ranged combat, and Impact armour protects. Not a Force code, so the system leaves the damage to the GM."],
  ["Use (Skill)", "manipulation", "telekinetic", "physical", "los", "sustained", "+3L", "6", "", 0, 0, "magic-fingers", 131,
    "A limited magic fingers (SR2 p.157): use one skill telekinetically, with the caster's own Skill Rating deciding the effect. The GM decides which skills work (Armed Combat, B/R Electronics, Demolitions, Driving…); Knowledge skills don't. Rename the item for the skill."],

  // ── Manipulation: transformation (p.131-132) ──
  ["Acid", "manipulation", "transformation", "physical", "los", "instant", "+1S", "Body (R)", "(F)M", 0, 0, "flamethrower", 131,
    "Strikes the target with a spray of acid, with the elemental effect rules (p.112; the acid effect by hand)."],
  ["Acid Bomb", "manipulation", "transformation", "physical", "los", "instant", "+1D", "Body (R)", "(F)M", 1, 0, "flame-bomb", 131,
    "Area effect: a spray of acid over the area, with the elemental effect rules (p.112; by hand)."],
  ["Acid Stream", "manipulation", "transformation", "physical", "los", "instant", "+1D", "Body (R)", "(F)S", 0, 0, "flamethrower", 131,
    "Strikes the target with a stream of acid, with the elemental effect rules (p.112; by hand)."],
  ["Astral Static", "manipulation", "transformation", "mana", "limited", "sustained", "+1D", "6", "", 1, 0, "manipulation", 131,
    "Area effect: crackling mana in astral space gives a background count of 1 per 2 successes. Like background count (p.89), it raises the TN of every Astral Success Test in the area, the caster's included."],
  ["Bind", "manipulation", "transformation", "physical", "los", "sustained", "+2S", "Quickness (R)", "", 0, 0, "manipulation", 131,
    "Holds the target in bands of mystic energy: the Spell Success Test is against the target's Quickness, and the target resists with Quickness against the spell's Force; net successes are the bands' Barrier Rating. To break free, compare Strength to that rating (SR2 p.98); a Strength Test against the Force adds 1 effective Strength per 2 successes, and breaking free costs a Body test against (Strength)L Stun."],
  ["Blade Barrier", "manipulation", "transformation", "physical", "los", "sustained", "+2M", "6", "", 1, 0, "barrier", 131,
    "Like physical barrier (SR2 p.158), but protects against bladed weapons. Barrier Rating equals the Force; Impact armour may be added. The personal form drains ((F / 2) + 2)L."],
  ["Blast Barrier", "manipulation", "transformation", "physical", "los", "sustained", "+2M", "6", "", 1, 0, "barrier", 131,
    "Like physical barrier (SR2 p.158), but protects against blast from grenades and similar weapons. Barrier Rating equals the Force; Impact armour may be added. The personal form drains ((F / 2) + 2)L."],
  ["Bullet Barrier", "manipulation", "transformation", "physical", "los", "sustained", "+2M", "6", "", 1, 0, "barrier", 131,
    "Like physical barrier (SR2 p.158), but protects against bullets and other ballistic weapons. Barrier Rating equals the Force; Ballistic armour can be added. The personal form drains ((F / 2) + 2)L."],
  ["(Critter) Form", "manipulation", "transformation", "physical", "limited", "sustained", "+2M", "Willpower", "", 0, 1, "manipulation", 131,
    "Like shapechange, but into one specific non-paranormal animal; needs a voluntary subject. Rename the item for the animal (Wolf Form…)."],
  ["Fashion", "manipulation", "transformation", "physical", "los", "permanent", "+2M", "4", "", 0, 1, "manipulation", 131,
    "Instantly retailors a voluntary subject's clothing into any fashion; extra successes measure the style. It changes cut, colour and fit, never protection. Duration: Permanent (10 turns)."],
  ["Fire Strike", "manipulation", "transformation", "physical", "los", "instant", "+3D", "Body (R)", "(F)S", 1, 0, "flame-bomb", 132,
    "Area effect: blasts flame into an area, with the elemental effect of fire (p.112; the fire effect by hand)."],
  ["Flame Burst", "manipulation", "transformation", "physical", "los", "instant", "+1D", "Body (R)", "(F)S", 0, 0, "flamethrower", 132,
    "Strikes the target with a burst of flame, with the elemental effect of fire (p.112; by hand)."],
  ["Lock", "manipulation", "transformation", "physical", "los", "sustained", "+2M", "Special: Object Resistance Table", "", 0, 0, "manipulation", 132,
    "Holds a door, portal or other closure magically shut while sustained; it has the door's own strength, so opening it means breaking or blasting through."],
  ["Makeover", "manipulation", "transformation", "physical", "los", "permanent", "+2M", "4", "", 0, 1, "manipulation", 132,
    "A complete cosmetic makeover of a voluntary subject (make-up, hair, clothes, even teeth), as lasting as a real salon's; successes measure the style. Nothing really changes. Duration: Permanent (10 turns)."],
  ["Seal", "manipulation", "transformation", "physical", "los", "sustained", "+2S", "Special: Object Resistance Table", "", 0, 0, "manipulation", 132,
    "Like lock, reinforcing a locked doorway: +1 to the door's Barrier Rating per 2 successes."],
  ["Shapechange", "manipulation", "transformation", "physical", "limited", "sustained", "+2S", "Willpower", "", 0, 1, "manipulation", 132,
    "Turns a voluntary subject into a normal critter that keeps human consciousness. Physical attributes from the Critter Statistics Table (SR2 p.233), +1 to the base ratings per 2 successes; Reaction rises by the subject's Intelligence; mental attributes stay. Clothing and gear don't change. A magician can still cast, but not fulfil geasa or use centering that needs actions the animal can't do (speech)."],
  ["Spell Barrier", "manipulation", "transformation", "mana", "los", "sustained", "+1M", "6", "", 1, 0, "mana-barrier", 132,
    "Like mana barrier (SR2 p.158), but protects against spells. The personal form drains ((F / 2) + 2)L. Drain from the Table of Spells (p.134), ((F / 2) + 1)M; the entry prints ((F / 2) + 2)M, but the anti-spell barrier is designed to drain less (p.125)."],
  ["Thunderclap", "manipulation", "transformation", "physical", "los", "instant", "S", "Body (R)", "(F)M Stun", 0, 0, "manipulation", 132,
    "An explosion of air that does Stun damage and deafens the target 1 Combat Turn per 2 successes. Stun isn't automated for manipulation spells, so the GM resolves the damage."],
  ["Transform", "manipulation", "transformation", "physical", "limited", "sustained", "+2S", "Willpower", "", 0, 0, "manipulation", 132,
    "Turns the subject into a normal critter with only animal intelligence and no awareness of its former self. Clothing and gear don't change."]
];

const keep = new Set();
for (const [name, category, subcategory, type, range, duration, d, target, damageCode, area, vol, icon, page, text] of SPELLS) {
  const _id = idFor(name);
  const doc = {
    _id, name, type: "spell", img: `${I}${icon}.webp`,
    system: { category, subcategory, type, range, duration, force: 1, drainCode: drain(d), target, damageCode,
      isAreaEffect: !!area, isVoluntary: !!vol, notes: `${text} Grimoire (2nd ed.) p.${page}.` },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.105.0", createdTime: 1792000000000, modifiedTime: 1792000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
  const file = `${name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "")}_${_id}.json`;
  keep.add(file);
  writeFileSync(`${DIR}/${file}`, JSON.stringify(doc, null, 2) + "\n");
}
for (const f of readdirSync(DIR)) if (f.endsWith(".json") && !keep.has(f)) rmSync(`${DIR}/${f}`);
console.log(`grim-spells: ${SPELLS.length}`);
