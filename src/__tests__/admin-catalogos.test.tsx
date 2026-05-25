// @vitest-environment jsdom
import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CatalogosPage from "@/app/admin/catalogos/page";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const clickTab = (key: string) => fireEvent.click(screen.getByTestId(`tab-${key}`));

// ─── Render básico ────────────────────────────────────────────────────────────

describe("CatalogosPage — render básico", () => {
  it("renders page heading", () => {
    render(<CatalogosPage />);
    expect(screen.getByText(/catálogos del sistema/i)).toBeInTheDocument();
  });

  it("renders three tabs", () => {
    render(<CatalogosPage />);
    expect(screen.getByTestId("tab-formas")).toBeInTheDocument();
    expect(screen.getByTestId("tab-paises")).toBeInTheDocument();
    expect(screen.getByTestId("tab-unidades")).toBeInTheDocument();
  });

  it("default tab is Formas Farmacéuticas", () => {
    render(<CatalogosPage />);
    expect(screen.getByTestId("tab-formas")).toHaveClass("border-primary");
  });

  it("renders catalogo-table", () => {
    render(<CatalogosPage />);
    expect(screen.getByTestId("catalogo-table")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<CatalogosPage />);
    expect(screen.getByTestId("catalogo-search")).toBeInTheDocument();
  });

  it("renders Nuevo button", () => {
    render(<CatalogosPage />);
    expect(screen.getByTestId("catalogo-nuevo")).toBeInTheDocument();
  });
});

// ─── Formas Farmacéuticas ─────────────────────────────────────────────────────

describe("Formas Farmacéuticas", () => {
  it("shows Tableta row", () => {
    render(<CatalogosPage />);
    expect(screen.getByText("Tableta")).toBeInTheDocument();
  });

  it("shows Cápsula row", () => {
    render(<CatalogosPage />);
    expect(screen.getByText("Cápsula")).toBeInTheDocument();
  });

  it("shows at least 8 rows", () => {
    render(<CatalogosPage />);
    expect(screen.getAllByTestId("catalogo-row").length).toBeGreaterThanOrEqual(8);
  });

  it("shows Activo/Inactivo badges", () => {
    render(<CatalogosPage />);
    expect(screen.getAllByText("Activo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Inactivo").length).toBeGreaterThan(0);
  });
});

// ─── Navegación de tabs ───────────────────────────────────────────────────────

describe("Navegación de tabs", () => {
  it("switching to Países shows Honduras", () => {
    render(<CatalogosPage />);
    clickTab("paises");
    expect(screen.getByText("Honduras")).toBeInTheDocument();
  });

  it("switching to Países shows Guatemala", () => {
    render(<CatalogosPage />);
    clickTab("paises");
    expect(screen.getByText("Guatemala")).toBeInTheDocument();
  });

  it("switching to Unidades de Medida shows Miligramos", () => {
    render(<CatalogosPage />);
    clickTab("unidades");
    expect(screen.getByText("Miligramos")).toBeInTheDocument();
  });

  it("switching to Unidades de Medida shows mg code", () => {
    render(<CatalogosPage />);
    clickTab("unidades");
    expect(screen.getByText("mg")).toBeInTheDocument();
  });

  it("switching tabs clears search", () => {
    render(<CatalogosPage />);
    const search = screen.getByTestId("catalogo-search") as HTMLInputElement;
    fireEvent.change(search, { target: { value: "tableta" } });
    clickTab("paises");
    expect(search.value).toBe("");
  });
});

// ─── Búsqueda ─────────────────────────────────────────────────────────────────

describe("Búsqueda", () => {
  it("filters rows by nombre", () => {
    render(<CatalogosPage />);
    fireEvent.change(screen.getByTestId("catalogo-search"), { target: { value: "Tableta" } });
    expect(screen.getAllByTestId("catalogo-row").length).toBeLessThan(10);
    expect(screen.getByText("Tableta")).toBeInTheDocument();
  });

  it("filters by código", () => {
    render(<CatalogosPage />);
    fireEvent.change(screen.getByTestId("catalogo-search"), { target: { value: "CAP" } });
    expect(screen.getByText("Cápsula")).toBeInTheDocument();
  });

  it("shows empty message when no results", () => {
    render(<CatalogosPage />);
    fireEvent.change(screen.getByTestId("catalogo-search"), { target: { value: "ZZZZ-NADA" } });
    expect(screen.getByText(/sin resultados/i)).toBeInTheDocument();
  });
});

// ─── Agregar entrada ──────────────────────────────────────────────────────────

describe("Agregar nueva entrada", () => {
  it("clicking Nuevo opens modal", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    expect(screen.getByTestId("catalogo-modal")).toBeInTheDocument();
  });

  it("modal has nombre input", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    expect(screen.getByTestId("modal-nombre")).toBeInTheDocument();
  });

  it("modal has codigo input", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    expect(screen.getByTestId("modal-codigo")).toBeInTheDocument();
  });

  it("Guardar disabled when nombre is empty", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    expect(screen.getByTestId("modal-guardar")).toBeDisabled();
  });

  it("Guardar enabled after typing nombre", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    fireEvent.change(screen.getByTestId("modal-nombre"), { target: { value: "Gel" } });
    expect(screen.getByTestId("modal-guardar")).not.toBeDisabled();
  });

  it("saving adds a new row to the table", () => {
    render(<CatalogosPage />);
    const before = screen.getAllByTestId("catalogo-row").length;
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    fireEvent.change(screen.getByTestId("modal-nombre"), { target: { value: "Gel" } });
    fireEvent.click(screen.getByTestId("modal-guardar"));
    expect(screen.getAllByTestId("catalogo-row").length).toBe(before + 1);
  });

  it("modal closes after saving", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    fireEvent.change(screen.getByTestId("modal-nombre"), { target: { value: "Gel" } });
    fireEvent.click(screen.getByTestId("modal-guardar"));
    expect(screen.queryByTestId("catalogo-modal")).not.toBeInTheDocument();
  });

  it("Cancelar closes modal without adding", () => {
    render(<CatalogosPage />);
    const before = screen.getAllByTestId("catalogo-row").length;
    fireEvent.click(screen.getByTestId("catalogo-nuevo"));
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(screen.queryByTestId("catalogo-modal")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("catalogo-row").length).toBe(before);
  });
});

// ─── Editar entrada ───────────────────────────────────────────────────────────

describe("Editar entrada", () => {
  it("clicking editar opens modal", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getAllByTestId("catalogo-editar")[0]);
    expect(screen.getByTestId("catalogo-modal")).toBeInTheDocument();
  });

  it("modal is pre-filled with existing nombre", () => {
    render(<CatalogosPage />);
    fireEvent.click(screen.getAllByTestId("catalogo-editar")[0]);
    const input = screen.getByTestId("modal-nombre") as HTMLInputElement;
    expect(input.value).not.toBe("");
  });
});

// ─── Eliminar entrada ─────────────────────────────────────────────────────────

describe("Eliminar entrada", () => {
  it("clicking eliminar removes the row", () => {
    render(<CatalogosPage />);
    const before = screen.getAllByTestId("catalogo-row").length;
    fireEvent.click(screen.getAllByTestId("catalogo-eliminar")[0]);
    expect(screen.getAllByTestId("catalogo-row").length).toBe(before - 1);
  });
});
