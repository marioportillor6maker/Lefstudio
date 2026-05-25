// @vitest-environment node
import { describe, it, expect } from "vitest";
import { MONEDAS_CATALOG, getMoneda } from "@/app/rac/proformas/_data/monedasCatalog";

describe("MONEDAS_CATALOG — integridad del catálogo", () => {
  it("tiene al menos una entrada", () => {
    expect(MONEDAS_CATALOG.length).toBeGreaterThan(0);
  });

  it("cada entrada tiene code, label, symbol, nombreLetras y slug", () => {
    MONEDAS_CATALOG.forEach(m => {
      expect(m.code).toBeTruthy();
      expect(m.label).toBeTruthy();
      expect(m.symbol).toBeTruthy();
      expect(m.nombreLetras).toBeTruthy();
      expect(m.slug).toBeTruthy();
    });
  });

  it("los códigos son únicos", () => {
    const codes = MONEDAS_CATALOG.map(m => m.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("los slugs son únicos", () => {
    const slugs = MONEDAS_CATALOG.map(m => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("los slugs no contienen caracteres especiales (solo a-z)", () => {
    MONEDAS_CATALOG.forEach(m => {
      expect(m.slug).toMatch(/^[a-z]+$/);
    });
  });

  it("incluye 'L' (Lempiras)", () => {
    expect(MONEDAS_CATALOG.some(m => m.code === "L")).toBe(true);
  });

  it("incluye '$' (Dólares)", () => {
    expect(MONEDAS_CATALOG.some(m => m.code === "$")).toBe(true);
  });

  it("L tiene símbolo 'L.'", () => {
    expect(MONEDAS_CATALOG.find(m => m.code === "L")?.symbol).toBe("L.");
  });

  it("$ tiene símbolo 'US$'", () => {
    expect(MONEDAS_CATALOG.find(m => m.code === "$")?.symbol).toBe("US$");
  });

  it("L tiene nombreLetras 'LEMPIRAS'", () => {
    expect(MONEDAS_CATALOG.find(m => m.code === "L")?.nombreLetras).toBe("LEMPIRAS");
  });

  it("$ tiene nombreLetras 'DÓLARES'", () => {
    expect(MONEDAS_CATALOG.find(m => m.code === "$")?.nombreLetras).toBe("DÓLARES");
  });

  it("L tiene slug 'lempiras'", () => {
    expect(MONEDAS_CATALOG.find(m => m.code === "L")?.slug).toBe("lempiras");
  });

  it("$ tiene slug 'dolares'", () => {
    expect(MONEDAS_CATALOG.find(m => m.code === "$")?.slug).toBe("dolares");
  });

  it("nombreLetras está en mayúsculas", () => {
    MONEDAS_CATALOG.forEach(m => {
      expect(m.nombreLetras).toBe(m.nombreLetras.toUpperCase());
    });
  });
});

describe("getMoneda — helper de lookup", () => {
  it("retorna la entrada correcta para 'L'", () => {
    const m = getMoneda("L");
    expect(m.code).toBe("L");
    expect(m.symbol).toBe("L.");
  });

  it("retorna la entrada correcta para '$'", () => {
    const m = getMoneda("$");
    expect(m.code).toBe("$");
    expect(m.symbol).toBe("US$");
  });

  it("retorna el mismo objeto que MONEDAS_CATALOG.find()", () => {
    const viaHelper = getMoneda("L");
    const viaFind = MONEDAS_CATALOG.find(m => m.code === "L");
    expect(viaHelper).toEqual(viaFind);
  });
});
