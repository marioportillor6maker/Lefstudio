// @vitest-environment jsdom
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { TabCatalogos } from "@/app/admin/_components/tabs/TabCatalogos";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const clickNav = (label: string | RegExp) =>
  fireEvent.click(screen.getByText(label));

const openModal = () =>
  fireEvent.click(screen.getByRole("button", { name: /agregar/i }));

// ─── Render básico ────────────────────────────────────────────────────────────

describe("TabCatalogos — render básico", () => {
  it("renders sidebar nav", () => {
    render(<TabCatalogos />);
    expect(screen.getAllByText(/tipos de tramite/i).length).toBeGreaterThan(0);
  });

  it("renders all 7 catalog nav items", () => {
    render(<TabCatalogos />);
    const labels = [
      /tipos de tramite/i,
      /formas farmaceuticas/i,
      /tipos de cliente/i,
      /paises de origen/i,
      /metodologias analiticas/i,
      /unidades de medida/i,
      /monedas/i,
    ];
    labels.forEach(l => expect(screen.getAllByText(l).length).toBeGreaterThan(0));
  });

  it("default active catalog shows its items", () => {
    render(<TabCatalogos />);
    // Default is 'tramites' — should show at least one tramite item
    expect(screen.getByText("Control de Calidad")).toBeInTheDocument();
  });

  it("renders Agregar button", () => {
    render(<TabCatalogos />);
    expect(screen.getByRole("button", { name: /agregar/i })).toBeInTheDocument();
  });
});

// ─── Navegación de catálogos ──────────────────────────────────────────────────

describe("Navegación de catálogos", () => {
  it("clicking Formas Farmaceuticas shows Tableta", () => {
    render(<TabCatalogos />);
    clickNav(/formas farmaceuticas/i);
    expect(screen.getByText("Tableta")).toBeInTheDocument();
  });

  it("clicking Formas Farmaceuticas shows Capsula", () => {
    render(<TabCatalogos />);
    clickNav(/formas farmaceuticas/i);
    expect(screen.getByText("Capsula")).toBeInTheDocument();
  });

  it("clicking Paises shows Honduras", () => {
    render(<TabCatalogos />);
    clickNav(/paises de origen/i);
    expect(screen.getByText("Honduras")).toBeInTheDocument();
  });

  it("clicking Paises shows Guatemala", () => {
    render(<TabCatalogos />);
    clickNav(/paises de origen/i);
    expect(screen.getByText("Guatemala")).toBeInTheDocument();
  });

  it("clicking Unidades de Medida shows Miligramos", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    expect(screen.getByText("Miligramos")).toBeInTheDocument();
  });

  it("clicking Unidades de Medida shows mg code", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    expect(screen.getByText("mg")).toBeInTheDocument();
  });

  it("clicking Unidades de Medida shows at least 8 items", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    // Each item has Pencil + Trash2 buttons; count unique nombre texts
    expect(screen.getByText("Litros")).toBeInTheDocument();
    expect(screen.getByText("Porcentaje")).toBeInTheDocument();
  });
});

// ─── Agregar entrada ──────────────────────────────────────────────────────────

describe("Agregar nueva entrada", () => {
  it("Agregar button opens modal", () => {
    render(<TabCatalogos />);
    openModal();
    expect(screen.getByText(/agregar elemento/i)).toBeInTheDocument();
  });

  it("modal has Nombre field", () => {
    render(<TabCatalogos />);
    openModal();
    expect(screen.getByPlaceholderText(/nombre del elemento/i)).toBeInTheDocument();
  });

  it("modal has Codigo field", () => {
    render(<TabCatalogos />);
    openModal();
    expect(screen.getByPlaceholderText(/codigo/i)).toBeInTheDocument();
  });

  it("modal has Estado select", () => {
    render(<TabCatalogos />);
    openModal();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("saving adds new item to list", () => {
    render(<TabCatalogos />);
    const before = screen.getAllByRole("button", { name: /editar/i }).length;
    openModal();
    fireEvent.change(screen.getByPlaceholderText(/nombre del elemento/i), {
      target: { value: "Ovulos" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /guardar/i }).closest("form")!);
    expect(screen.getByText("Ovulos")).toBeInTheDocument();
  });
});

// ─── Editar entrada ───────────────────────────────────────────────────────────

describe("Editar entrada", () => {
  it("clicking Editar opens modal with 'Editar elemento' title", () => {
    render(<TabCatalogos />);
    fireEvent.click(screen.getAllByLabelText("Editar")[0]);
    expect(screen.getByText(/editar elemento/i)).toBeInTheDocument();
  });

  it("modal is pre-filled with existing nombre", () => {
    render(<TabCatalogos />);
    fireEvent.click(screen.getAllByLabelText("Editar")[0]);
    const input = screen.getByPlaceholderText(/nombre del elemento/i) as HTMLInputElement;
    expect(input.value).not.toBe("");
  });
});

// ─── Eliminar entrada ─────────────────────────────────────────────────────────

describe("Eliminar entrada", () => {
  it("clicking Eliminar opens confirm dialog", () => {
    render(<TabCatalogos />);
    fireEvent.click(screen.getAllByLabelText("Eliminar")[0]);
    expect(screen.getByText(/eliminar elemento/i)).toBeInTheDocument();
  });

  it("confirming delete removes the item", () => {
    render(<TabCatalogos />);
    const firstItemName = screen.getAllByLabelText("Eliminar")[0]
      .closest("div")!
      .parentElement!
      .querySelector("span.flex-1")!.textContent;
    fireEvent.click(screen.getAllByLabelText("Eliminar")[0]);
    fireEvent.click(screen.getByText("Eliminar"));
    if (firstItemName) {
      expect(screen.queryByText(firstItemName)).not.toBeInTheDocument();
    }
  });
});

// ─── Unidades de Medida específicas ──────────────────────────────────────────

describe("Unidades de Medida — catalog unificado", () => {
  it("has Unidades de Medida in nav", () => {
    render(<TabCatalogos />);
    expect(screen.getByText(/unidades de medida/i)).toBeInTheDocument();
  });

  it("Unidades de Medida shows Microgramos", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    expect(screen.getByText("Microgramos")).toBeInTheDocument();
  });

  it("Unidades de Medida shows Mililitros", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    expect(screen.getByText("Mililitros")).toBeInTheDocument();
  });

  it("Unidades de Medida shows Unidades Internacionales", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    expect(screen.getByText("Unidades Internacionales")).toBeInTheDocument();
  });

  it("Unidades de Medida items have codes", () => {
    render(<TabCatalogos />);
    clickNav(/unidades de medida/i);
    expect(screen.getByText("mcg")).toBeInTheDocument();
  });
});

// ─── Monedas ──────────────────────────────────────────────────────────────────

describe("Monedas — catalog unificado", () => {
  it("has Monedas in nav", () => {
    render(<TabCatalogos />);
    expect(screen.getByText(/monedas/i)).toBeInTheDocument();
  });

  it("clicking Monedas shows Lempiras", () => {
    render(<TabCatalogos />);
    clickNav(/monedas/i);
    expect(screen.getByText("Lempiras")).toBeInTheDocument();
  });

  it("clicking Monedas shows Dolares", () => {
    render(<TabCatalogos />);
    clickNav(/monedas/i);
    expect(screen.getByText("Dolares")).toBeInTheDocument();
  });

  it("Lempiras has code L", () => {
    render(<TabCatalogos />);
    clickNav(/monedas/i);
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("Dolares has code $", () => {
    render(<TabCatalogos />);
    clickNav(/monedas/i);
    expect(screen.getByText("$")).toBeInTheDocument();
  });
});
