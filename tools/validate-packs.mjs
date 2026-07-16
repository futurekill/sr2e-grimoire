// Pre-flight validator for the Grimoire packs. Runs with no Foundry: checks
// every packs-src/*/*.json document for valid JSON, required keys, correct _key
// form, duplicate _ids, and that each doc's `type` is one the sr2e system
// actually registers; reports per-pack counts. Exits non-zero if anything fails.
// Run: `node tools/validate-packs.mjs`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "packs-src";
const ACTOR_PACKS = new Set();   // this module ships Items only

// Item types the sr2e system registers (CONFIG.Item.dataModels in
// sr2e-foundryvtt/module/sr2e.mjs). A doc whose type is not in this list CANNOT
// be created in Foundry — it builds, ships, and silently fails to load. This
// module shipped six powers typed "adeptPower" instead of "adept_power" for
// exactly that reason, so the check is worth its keep. If the system adds a
// type, add it here.
const ITEM_TYPES = new Set(["skill", "weapon", "armor", "spell", "cyberware",
  "bioware", "gear", "program", "adept_power", "contact", "lifestyle", "ammo",
  "focus", "vehicle_mod", "race", "tradition", "quality"]);
const ACTOR_TYPES = new Set(["character", "npc", "vehicle", "spirit", "ic", "host"]);
let problems = 0;
const note = (m) => { console.error("  ✗ " + m); problems++; };

let packs;
try { packs = readdirSync(ROOT).filter((p) => statSync(join(ROOT, p)).isDirectory()); }
catch { console.error(`no ${ROOT}/ directory`); process.exit(1); }

for (const pack of packs.sort()) {
  const dir = join(ROOT, pack);
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  const ids = new Map();
  const collection = ACTOR_PACKS.has(pack) ? "actors" : "items";
  console.log(`\n${pack}  (${files.length} docs, expecting !${collection}!…)`);

  for (const f of files) {
    const path = join(dir, f);
    let doc;
    try { doc = JSON.parse(readFileSync(path, "utf8")); }
    catch (e) { note(`${f}: invalid JSON — ${e.message}`); continue; }

    for (const k of ["_id", "_key", "name", "type", "system"]) {
      if (doc[k] === undefined) note(`${f}: missing "${k}"`);
    }
    if (doc._id && doc._key && doc._key !== `!${collection}!${doc._id}`) {
      note(`${f}: _key "${doc._key}" should be "!${collection}!${doc._id}"`);
    }
    if (doc._id) {
      if (ids.has(doc._id)) note(`${f}: duplicate _id with ${ids.get(doc._id)}`);
      else ids.set(doc._id, f);
    }
    if (doc.system && typeof doc.system !== "object") note(`${f}: system is not an object`);
    const valid = ACTOR_PACKS.has(pack) ? ACTOR_TYPES : ITEM_TYPES;
    if (doc.type && !valid.has(doc.type)) {
      note(`${f}: type "${doc.type}" is not registered by sr2e — this document cannot be created`);
    }
  }
}

if (problems) { console.error(`\n${problems} problem(s) found.`); process.exit(1); }
console.log("\nAll packs valid.");
