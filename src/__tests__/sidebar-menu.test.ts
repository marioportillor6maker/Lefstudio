import { describe, it, expect } from "vitest";
import { MENU_SECTIONS_DATA } from "@/lib/sidebar-menu";

// Flat list of all items with subItems
const expandableItems = MENU_SECTIONS_DATA
  .flatMap((s) => s.items)
  .filter((item) => item.subItems != null);

// Flat list of all subItems across the whole menu
const allSubItems = expandableItems.flatMap((item) => item.subItems!);

// Expected subitem counts — update this when a subitem is intentionally added/removed
const EXPECTED_COUNTS: Record<string, number> = {
  ingresos:   3,
  rac:        4,
  doct:       6,
  est:        6,
  str:        6,
  ffqq:       8,
  micro:      5,
  stcc:       5,
  dt:         5,
  dg:         5,
  reportes:   8,
  dashboards: 6,
  admin:      5,
};

describe("sidebar-menu data integrity", () => {
  it("subitem counts match EXPECTED_COUNTS", () => {
    for (const item of expandableItems) {
      const expected = EXPECTED_COUNTS[item.id];
      if (expected == null) continue; // new item not yet in table — no regression
      expect(
        item.subItems!.length,
        `${item.label} (${item.id}): expected ${expected} subitems`
      ).toBe(expected);
    }
  });

  it("every subitem href starts with /", () => {
    for (const sub of allSubItems) {
      expect(sub.href, `"${sub.label}" href must start with /`).toMatch(/^\//);
    }
  });

  it("no duplicate subitem hrefs within the same parent", () => {
    for (const item of expandableItems) {
      const hrefs = item.subItems!.map((s) => s.href);
      const unique = new Set(hrefs);
      expect(
        unique.size,
        `${item.label} has duplicate subitem hrefs: ${hrefs.filter((h, i) => hrefs.indexOf(h) !== i)}`
      ).toBe(hrefs.length);
    }
  });

  it("no duplicate subitem labels within the same parent", () => {
    for (const item of expandableItems) {
      const labels = item.subItems!.map((s) => s.label);
      const unique = new Set(labels);
      expect(
        unique.size,
        `${item.label} has duplicate subitem labels`
      ).toBe(labels.length);
    }
  });

  it("ingresos keeps explicit badge 24 (queue count, not subitem count)", () => {
    const ingresos = MENU_SECTIONS_DATA.flatMap((s) => s.items).find((i) => i.id === "ingresos");
    expect(ingresos?.badge).toBe(24);
  });

  it("module items have no explicit badge (auto-computed from subItems.length)", () => {
    const MODULES_WITHOUT_EXPLICIT_BADGE = ["rac", "doct", "est", "str", "ffqq", "micro", "stcc", "dt", "dg"];
    const allItems = MENU_SECTIONS_DATA.flatMap((s) => s.items);
    for (const id of MODULES_WITHOUT_EXPLICIT_BADGE) {
      const item = allItems.find((i) => i.id === id);
      expect(item?.badge, `${id} must not have an explicit badge — auto-compute from subItems.length`).toBeUndefined();
    }
  });
});
