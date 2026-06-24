// Generate the Grimoire's new foci types (book p.23-27) as system `focus` items
// into packs-src/grim-foci. The Grimoire adds three Spell-focus variants beyond
// the core five; the genuinely new, verifiable data is the Karma bonding ratio
// (Magical Item Bonding Table, p.27) — stored as bondingCost. Nuyen cost is not
// tabulated there (it derives from the enchanting/design system), so costPerForce
// is left 0 (manual, per FocusData) rather than guessed. Re-run, then
// build-packs grim-foci.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/grim-foci";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("grim-focus:" + s).digest("hex").slice(0, 16);

// bondingCost = Karma ratio per Force (FocusData min is 1; Fetish has no bonding
// but the schema floor is 1, so the single-use truth lives in notes).
const FOCI = [
  { name: "Fetish Focus", focusType: "spell", bondingCost: 1, expendable: true,
    notes: "Single-use, expendable fetish focus: enhances one casting of a spell of its category, then is spent. No Karma bonding. Comes in per-category versions (combat fetish focus, manipulation fetish focus, etc.). If the spell requires a fetish, the fetish focus satisfies that requirement. Grimoire p.23, 27." },
  { name: "Specific Spell Focus", focusType: "spell", bondingCost: 1,
    notes: "Bonded to one specific named spell (cheaper and narrower than a category focus). Bonding Karma = 1 × Force. Grimoire p.24, 27." },
  { name: "Spell Category Focus", focusType: "spell", bondingCost: 3,
    notes: "Covers one entire spell category (Combat, Detection, Health, Illusion, or Manipulation). Bonding Karma = 3 × Force. (Also called a Spell Purpose Focus.) Grimoire p.24, 27." }
];

function focus(f) {
  const _id = idFor(f.name);
  return {
    _id, name: f.name, type: "focus", img: "icons/svg/daze.svg",
    system: {
      focusType: f.focusType, force: 1, bondingCost: f.bondingCost,
      bonded: false, active: false, expendable: f.expendable ?? false,
      costPerForce: 0, cost: 0, notes: f.notes
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1782100000000, modifiedTime: 1782100000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

let n = 0;
for (const f of FOCI) {
  const safe = f.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(f.name)}.json`, JSON.stringify(focus(f), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} foci`);
