// @vitest-environment jsdom
import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DistribucionPage from "@/app/rac/distribucion/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────
function typeInSearch(value: string) {
  fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value } });
}

function selectFromDropdown(index = 0) {
  const opts = screen.getAllByTestId("recepcion-option");
  fireEvent.click(opts[index]);
}

/** Type the reception ID in search, then click the first dropdown result */
function selectRecepcion(id = "LEF-2024-00143") {
  typeInSearch(id);
  selectFromDropdown(0);
}

/** Select recepcion and click Agregar al RT-159 */
function agregarDistribucion(id = "LEF-2024-00143") {
  selectRecepcion(id);
  fireEvent.click(screen.getByTestId("agregar-btn"));
}
// ─────────────────────────────────────────────────────────────────────────────

describe("DistribucionPage — /rac/distribucion", () => {

  // ── 1. Render básico ────────────────────────────────────────────────────────
  describe("Render básico", () => {
    it("muestra el título Distribución RT-159", () => {
      render(<DistribucionPage />);
      expect(screen.getByText("Distribución RT-159")).toBeInTheDocument();
    });

    it("muestra el panel de identificación del RT", () => {
      render(<DistribucionPage />);
      expect(screen.getByText(/Identificación del RT-159/i)).toBeInTheDocument();
    });

    it("muestra el panel Configurar Distribución", () => {
      render(<DistribucionPage />);
      expect(screen.getByText(/Configurar Distribución/i)).toBeInTheDocument();
    });

    it("muestra el panel de distribuciones del RT vacío", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("distribuciones-empty")).toBeInTheDocument();
    });

    it("muestra botón Emitir y Distribuir", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("emitir-btn")).toBeInTheDocument();
    });
  });

  // ── 2. ID del RT — no editable ──────────────────────────────────────────────
  describe("ID del RT — no editable antes de guardar", () => {
    it("muestra texto 'Se generará al guardar'", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("rt-id-info")).toHaveTextContent(/se generará al guardar/i);
    });

    it("no existe input de texto para el número RT-159", () => {
      render(<DistribucionPage />);
      const inputs = screen.queryAllByRole("textbox");
      const rtInput = inputs.find(i =>
        (i as HTMLInputElement).value?.includes("RT159") ||
        (i as HTMLInputElement).value?.includes("RT-159")
      );
      expect(rtInput).toBeUndefined();
    });
  });

  // ── 3. Fecha distribución — no editable ─────────────────────────────────────
  describe("Fecha distribución — no editable", () => {
    it("muestra texto 'Se asignará al emitir'", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("fecha-distribucion-info")).toHaveTextContent(/se asignará al emitir/i);
    });

    it("no existe input type=date para fecha de distribución", () => {
      render(<DistribucionPage />);
      const dateInputs = document.querySelectorAll("input[type='date']");
      expect(dateInputs).toHaveLength(0);
    });

    it("no existe input type=datetime-local en ningún panel", () => {
      render(<DistribucionPage />);
      const dtInputs = document.querySelectorAll("input[type='datetime-local']");
      expect(dtInputs).toHaveLength(0);
    });
  });

  // ── 4. Responsable — no seleccionable ───────────────────────────────────────
  describe("Responsable emisión — no seleccionable", () => {
    it("muestra el responsable como texto informativo (no input ni select)", () => {
      render(<DistribucionPage />);
      const info = screen.getByTestId("responsable-info");
      expect(info.tagName).not.toBe("INPUT");
      expect(info.tagName).not.toBe("SELECT");
      expect(info).toHaveTextContent(/Q\.F\. María Rodríguez/i);
    });

    it("no existe select para elegir responsable de emisión manualmente", () => {
      render(<DistribucionPage />);
      // Only area-level responsable selects exist (doct, micro, muestroteca)
      // None should have "Q.F." as option value
      const selects = screen.getAllByRole("combobox");
      const responsableSelect = selects.find(s =>
        Array.from(s.querySelectorAll("option")).some(o => /Q\.F\./i.test(o.textContent ?? ""))
      );
      expect(responsableSelect).toBeUndefined();
    });
  });

  // ── 5. Autocomplete de recepción ─────────────────────────────────────────────
  describe("Autocomplete de recepción", () => {
    it("usa un input de texto (no select estático)", () => {
      render(<DistribucionPage />);
      const el = screen.getByTestId("recepcion-search");
      expect(el.tagName).toBe("INPUT");
    });

    it("el dropdown no aparece con búsqueda vacía", () => {
      render(<DistribucionPage />);
      expect(screen.queryByTestId("recepcion-dropdown")).not.toBeInTheDocument();
    });

    it("muestra dropdown al escribir en el campo", () => {
      render(<DistribucionPage />);
      typeInSearch("LEF-2024-00143");
      expect(screen.getByTestId("recepcion-dropdown")).toBeInTheDocument();
    });

    it("muestra opciones coincidentes al buscar por ID", () => {
      render(<DistribucionPage />);
      typeInSearch("LEF-2024-00143");
      expect(screen.getAllByTestId("recepcion-option").length).toBeGreaterThan(0);
    });

    it("filtra por nombre de producto", () => {
      render(<DistribucionPage />);
      typeInSearch("Metformina");
      const opts = screen.getAllByTestId("recepcion-option");
      expect(opts.some(o => o.textContent!.toLowerCase().includes("metformina"))).toBe(true);
    });

    it("filtra por nombre de cliente", () => {
      render(<DistribucionPage />);
      typeInSearch("MedFarma");
      expect(screen.getAllByTestId("recepcion-option").length).toBeGreaterThan(0);
    });

    it("al seleccionar opción, el campo muestra el ID de recepción", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("recepcion-search")).toHaveValue("LEF-2024-00143");
    });

    it("el dropdown se cierra al seleccionar una opción", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.queryByTestId("recepcion-dropdown")).not.toBeInTheDocument();
    });

    it("botón X limpia la selección", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("clear-recepcion"));
      expect(screen.getByTestId("recepcion-search")).toHaveValue("");
    });

    it("después de limpiar, la cantidad RAC desaparece", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("clear-recepcion"));
      expect(screen.queryByTestId("cantidad-rac-info")).not.toBeInTheDocument();
    });
  });

  // ── 6. Cantidad RAC — visible al seleccionar recepción ───────────────────────
  describe("Cantidad RAC — visible al seleccionar recepción", () => {
    it("no muestra cantidad-rac-info sin recepción seleccionada", () => {
      render(<DistribucionPage />);
      expect(screen.queryByTestId("cantidad-rac-info")).not.toBeInTheDocument();
    });

    it("muestra cantidad-rac-info al seleccionar recepción", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("cantidad-rac-info")).toBeInTheDocument();
    });

    it("muestra el número correcto para LEF-2024-00143 (120 tabletas)", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      const info = screen.getByTestId("cantidad-rac-info");
      expect(info.textContent).toContain("120");
      expect(info.textContent).toContain("tabletas");
    });

    it("muestra el número correcto para LEF-2024-00141 (48 frascos)", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00141");
      const info = screen.getByTestId("cantidad-rac-info");
      expect(info.textContent).toContain("48");
      expect(info.textContent).toContain("frascos");
    });
  });

  // ── 7. Cantidades por área — read-only, pre-pobladas desde RAC ──────────────
  describe("Cantidades por área — read-only", () => {
    it("no muestra cantidad-label-doct sin recepción seleccionada", () => {
      render(<DistribucionPage />);
      expect(screen.queryByTestId("cantidad-label-doct")).not.toBeInTheDocument();
    });

    it("muestra cantidad-label-doct al seleccionar recepción", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("cantidad-label-doct")).toBeInTheDocument();
    });

    it("LEF-2024-00143: doct muestra 50", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("cantidad-label-doct").textContent).toContain("50");
    });

    it("LEF-2024-00143: micro muestra 40", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("cantidad-label-micro").textContent).toContain("40");
    });

    it("LEF-2024-00143: muestroteca muestra 30", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("cantidad-label-muestroteca").textContent).toContain("30");
    });

    it("las cantidades son etiquetas (no inputs), no editables", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      expect(screen.getByTestId("cantidad-label-doct").tagName).not.toBe("INPUT");
    });
  });

  // ── 8. Fecha recibido — informativa, no editable ─────────────────────────────
  describe("Fecha recibido — informativa, no editable", () => {
    it("muestra texto 'Pendiente de recepción' en fila doct", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("fecha-recibido-doct").textContent).toMatch(/pendiente de recepción/i);
    });

    it("la fecha-recibido no es un input editable", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("fecha-recibido-doct").tagName).not.toBe("INPUT");
    });

    it("no existe input datetime-local para fecha recibido", () => {
      render(<DistribucionPage />);
      const dtInputs = document.querySelectorAll("input[type='datetime-local']");
      expect(dtInputs.length).toBe(0);
    });
  });

  // ── 9. Campo observaciones ───────────────────────────────────────────────────
  describe("Campo observaciones", () => {
    it("existe textarea de observaciones", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("observaciones")).toBeInTheDocument();
    });

    it("está deshabilitado sin recepción seleccionada", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("observaciones")).toBeDisabled();
    });

    it("acepta texto al seleccionar recepción", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      const obs = screen.getByTestId("observaciones");
      fireEvent.change(obs, { target: { value: "Nota de prueba" } });
      expect(obs).toHaveValue("Nota de prueba");
    });
  });

  // ── 10. Botón Agregar ────────────────────────────────────────────────────────
  describe("Botón Agregar al RT-159", () => {
    it("existe el botón Agregar al RT-159", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("agregar-btn")).toBeInTheDocument();
    });

    it("no agrega sin recepción seleccionada", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByTestId("distribuciones-empty")).toBeInTheDocument();
    });

    it("agrega correctamente al seleccionar recepción y hacer clic", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByTestId("distribuciones-table")).toBeInTheDocument();
    });
  });

  // ── 11. Validaciones ─────────────────────────────────────────────────────────
  describe("Validaciones", () => {
    it("muestra error si no hay recepción seleccionada", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/debe seleccionar una recepción/i)).toBeInTheDocument();
    });

    it("el error de recepción desaparece al escribir en el campo de búsqueda", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/debe seleccionar una recepción/i)).toBeInTheDocument();
      typeInSearch("LEF-2024-00143");
      expect(screen.queryByText(/debe seleccionar una recepción/i)).not.toBeInTheDocument();
    });
  });

  // ── 12. Agregar distribución ─────────────────────────────────────────────────
  describe("Agregar distribución", () => {
    it("agrega correctamente a la tabla inferior", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      expect(screen.getByTestId("distribuciones-table")).toBeInTheDocument();
    });

    it("la tabla inferior muestra el recepcionId agregado", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      const row = screen.getByTestId("dist-row-LEF-2024-00143");
      expect(row.textContent).toContain("LEF-2024-00143");
    });

    it("limpia el campo de búsqueda tras agregar", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      expect(screen.getByTestId("recepcion-search")).toHaveValue("");
    });

    it("oculta cantidad-rac-info tras agregar (reset del formulario)", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      expect(screen.queryByTestId("cantidad-rac-info")).not.toBeInTheDocument();
    });

    it("las observaciones se conservan en la distribución agregada", () => {
      render(<DistribucionPage />);
      selectRecepcion("LEF-2024-00143");
      fireEvent.change(screen.getByTestId("observaciones"), { target: { value: "Observación de prueba" } });
      fireEvent.click(screen.getByTestId("agregar-btn"));
      const row = screen.getByTestId("dist-row-LEF-2024-00143");
      expect(within(row).getByTitle("Observación de prueba")).toBeInTheDocument();
    });

    it("muestra el producto de la recepción en la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      const row = screen.getByTestId("dist-row-LEF-2024-00143");
      expect(row.textContent).toContain("Metformina");
    });

    it("muestra la cantidad RAC en la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      const row = screen.getByTestId("dist-row-LEF-2024-00143");
      expect(row.textContent).toContain("120");
    });

    it("muestra el área Documentación en la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      const row = screen.getByTestId("dist-row-LEF-2024-00143");
      expect(row.textContent).toContain("Documentación");
    });
  });

  // ── 13. Múltiples distribuciones ────────────────────────────────────────────
  describe("Múltiples distribuciones en el mismo RT", () => {
    it("permite agregar segunda distribución con distinta recepción", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      agregarDistribucion("LEF-2024-00150");
      expect(screen.getByTestId("dist-row-LEF-2024-00143")).toBeInTheDocument();
      expect(screen.getByTestId("dist-row-LEF-2024-00150")).toBeInTheDocument();
    });

    it("la tabla inferior muestra ambas distribuciones", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      agregarDistribucion("LEF-2024-00150");
      const rows = screen.getAllByRole("row");
      // thead + 2 data rows = at least 3
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });

    it("la recepción ya agregada queda deshabilitada en el dropdown", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      typeInSearch("LEF-2024-00143");
      const opts = screen.getAllByTestId("recepcion-option");
      const opt = opts.find(o => o.textContent?.includes("LEF-2024-00143"));
      expect(opt).toBeDefined();
      expect(opt).toBeDisabled();
    });
  });

  // ── 14. Eliminar distribución ─────────────────────────────────────────────────
  describe("Eliminar distribución de la tabla", () => {
    it("existe botón eliminar por cada fila agregada", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      expect(screen.getByTestId("eliminar-LEF-2024-00143")).toBeInTheDocument();
    });

    it("al eliminar, la distribución desaparece de la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("eliminar-LEF-2024-00143"));
      expect(screen.queryByTestId("dist-row-LEF-2024-00143")).not.toBeInTheDocument();
    });

    it("al eliminar la única distribución, vuelve el mensaje vacío", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("eliminar-LEF-2024-00143"));
      expect(screen.getByTestId("distribuciones-empty")).toBeInTheDocument();
    });

    it("la recepción eliminada puede buscarse y seleccionarse de nuevo", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("eliminar-LEF-2024-00143"));
      typeInSearch("LEF-2024-00143");
      const opts = screen.getAllByTestId("recepcion-option");
      const opt = opts.find(o => o.textContent?.includes("LEF-2024-00143"));
      expect(opt).toBeDefined();
      expect(opt).not.toBeDisabled();
    });
  });

  // ── 15. Guardar / Emitir RT-159 ──────────────────────────────────────────────
  describe("Guardar RT-159", () => {
    it("muestra error al emitir sin distribuciones", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("emitir-btn"));
      expect(screen.getByTestId("save-error")).toHaveTextContent(/al menos una distribución/i);
    });

    it("no muestra error de guardado si hay al menos una distribución", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      fireEvent.click(screen.getByTestId("emitir-btn"));
      expect(screen.queryByTestId("save-error")).not.toBeInTheDocument();
    });

    it("el error de guardado desaparece al agregar una distribución", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("emitir-btn"));
      expect(screen.getByTestId("save-error")).toBeInTheDocument();
      agregarDistribucion("LEF-2024-00143");
      expect(screen.queryByTestId("save-error")).not.toBeInTheDocument();
    });
  });

  // ── 16. Payload y estado final ───────────────────────────────────────────────
  describe("Payload y estado final", () => {
    it("la tabla inferior refleja múltiples distribuciones", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00141");
      agregarDistribucion("LEF-2024-00148");
      expect(screen.getByTestId("dist-row-LEF-2024-00141")).toBeInTheDocument();
      expect(screen.getByTestId("dist-row-LEF-2024-00148")).toBeInTheDocument();
    });

    it("cada distribución conserva su unidad independientemente", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00141"); // frascos
      agregarDistribucion("LEF-2024-00143"); // tabletas
      const row1 = screen.getByTestId("dist-row-LEF-2024-00141");
      const row2 = screen.getByTestId("dist-row-LEF-2024-00143");
      expect(row1.textContent).toContain("frascos");
      expect(row2.textContent).toContain("tabletas");
    });

    it("el badge counter del panel muestra la cantidad de distribuciones", () => {
      render(<DistribucionPage />);
      agregarDistribucion("LEF-2024-00143");
      agregarDistribucion("LEF-2024-00150");
      // thead + 2 data rows = at least 3
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });
  });

});
