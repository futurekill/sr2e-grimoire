// One runnable check: every Grimoire totem's spell categories and conjuring
// domains are valid system keys (a typo would silently break the bonus). Run:
// node tools/check-totems.mjs
import assert from "node:assert";
import { GRIMOIRE_TOTEMS } from "../scripts/register-grimoire.mjs";

const CATEGORIES = new Set(["combat", "detection", "health", "illusion", "manipulation"]);
const DOMAINS = new Set(["city", "field", "forest", "hearth", "lake", "mountain", "prairie", "river", "sea", "desert", "swamp", "wind"]);

for (const [key, t] of Object.entries(GRIMOIRE_TOTEMS)) {
  for (const c of [...Object.keys(t.spellBonus), ...Object.keys(t.spellPenalty)]) {
    assert(CATEGORIES.has(c), `${key}: bad spell category "${c}"`);
  }
  for (const d of Object.keys(t.conjuringBonus)) {
    assert(DOMAINS.has(d), `${key}: bad conjuring domain "${d}"`);
  }
}
console.log(`ok: ${Object.keys(GRIMOIRE_TOTEMS).length} totems, all categories & domains valid`);
