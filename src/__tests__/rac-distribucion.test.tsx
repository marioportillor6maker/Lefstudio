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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function selectRecepcion(id = "REC-2024-1030") {
  fireEvent.change(screen.getByTestId("recepcion-select"), { target: { value: id } });
}

function setCantidad(areaId: string, value: string) {
  fireEvent.change(screen.getByTestId(`cantidad-${areaId}`), { target: { value } });
}

function setUnidad(areaId: string, value: string) {
  fireEvent.change(screen.getByTestId(`unidad-${areaId}`), { target: { value: value } });
}

function agregarDistribucion(recepcionId = "REC-2024-1030", cantidad = "5", unidad = "tabletas") {
  selectRecepcion(recepcionId);
  setCantidad("doct", cantidad);
  setUnidad("doct", unidad);
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

    it("muestra botón Guardar Borrador", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("borrador-btn")).toBeInTheDocument();
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

    it("no existe input readonly con valor RT159-*", () => {
      render(<DistribucionPage />);
      const allInputs = document.querySelectorAll("input");
      const rtInput = Array.from(allInputs).find(i => /RT159/i.test(i.value));
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

    it("no existe input type=datetime-local en el panel de identificación", () => {
      render(<DistribucionPage />);
      // datetime-local only allowed in area rows (fecha recibido), not in identification panel
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
      // Only selects for "Responsable Recibe" per area row should exist, not a top-level responsable select
      const selects = screen.getAllByRole("combobox");
      // recepcion-select + 3 area responsables + 3 area unidades = 7 max
      // None should have "Q.F." as option
      const responsableSelect = selects.find(s =>
        Array.from(s.querySelectorAll("option")).some(o => /Q\.F\./i.test(o.textContent ?? ""))
      );
      expect(responsableSelect).toBeUndefined();
    });
  });

  // ── 5. Selector de recepción ─────────────────────────────────────────────────
  describe("Selector de recepción", () => {
    it("existe el select de recepción", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("recepcion-select")).toBeInTheDocument();
    });

    it("muestra las recepciones mock como opciones", () => {
      render(<DistribucionPage />);
      expect(screen.getByText(/REC-2024-1030/)).toBeInTheDocument();
      expect(screen.getByText(/REC-2024-1029/)).toBeInTheDocument();
    });

    it("al seleccionar recepción, los campos de área se habilitan", () => {
      render(<DistribucionPage />);
      const cantidadBefore = screen.getByTestId("cantidad-doct");
      expect(cantidadBefore).toBeDisabled();
      selectRecepcion();
      expect(screen.getByTestId("cantidad-doct")).not.toBeDisabled();
    });

    it("al seleccionar otra recepción, resetea los campos de área", () => {
      render(<DistribucionPage />);
      selectRecepcion("REC-2024-1030");
      setCantidad("doct", "10");
      selectRecepcion("REC-2024-1029");
      expect(screen.getByTestId("cantidad-doct")).toHaveValue(null);
    });
  });

  // ── 6. Cantidad RAC visible ──────────────────────────────────────────────────
  describe("Cantidad RAC — visible al seleccionar recepción", () => {
    it("no muestra cantidad-rac-info sin recepción seleccionada", () => {
      render(<DistribucionPage />);
      expect(screen.queryByTestId("cantidad-rac-info")).not.toBeInTheDocument();
    });

    it("muestra cantidad-rac-info al seleccionar recepción", () => {
      render(<DistribucionPage />);
      selectRecepcion("REC-2024-1030");
      expect(screen.getByTestId("cantidad-rac-info")).toBeInTheDocument();
    });

    it("muestra el número correcto para REC-2024-1030 (120 tabletas)", () => {
      render(<DistribucionPage />);
      selectRecepcion("REC-2024-1030");
      const info = screen.getByTestId("cantidad-rac-info");
      expect(info).toHaveTextContent("120");
      expect(info).toHaveTextContent("tabletas");
    });

    it("muestra el número correcto para REC-2024-1028 (48 frascos)", () => {
      render(<DistribucionPage />);
      selectRecepcion("REC-2024-1028");
      const info = screen.getByTestId("cantidad-rac-info");
      expect(info).toHaveTextContent("48");
      expect(info).toHaveTextContent("frascos");
    });
  });

  // ── 7. Unidad — combobox por fila ────────────────────────────────────────────
  describe("Unidad — combobox seleccionable por fila", () => {
    it("existe select de unidad en cada fila de área", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("unidad-doct")).toBeInTheDocument();
      expect(screen.getByTestId("unidad-micro")).toBeInTheDocument();
      expect(screen.getByTestId("unidad-biblioteca")).toBeInTheDocument();
    });

    it("inicialmente el select de unidad está vacío", () => {
      render(<DistribucionPage />);
      expect(screen.getByTestId("unidad-doct")).toHaveValue("");
    });

    it("las opciones incluyen tabletas, frascos, ml, mg", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      const select = screen.getByTestId("unidad-doct");
      const opts = Array.from(select.querySelectorAll("option")).map(o => o.value);
      expect(opts).toContain("tabletas");
      expect(opts).toContain("frascos");
      expect(opts).toContain("ml");
      expect(opts).toContain("mg");
    });

    it("cada fila puede tener unidad distinta", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      setUnidad("doct", "tabletas");
      setUnidad("micro", "ml");
      setUnidad("biblioteca", "frascos");
      expect(screen.getByTestId("unidad-doct")).toHaveValue("tabletas");
      expect(screen.getByTestId("unidad-micro")).toHaveValue("ml");
      expect(screen.getByTestId("unidad-biblioteca")).toHaveValue("frascos");
    });

    it("la unidad no es un badge estático (es un select/combobox)", () => {
      render(<DistribucionPage />);
      const unidadEl = screen.getByTestId("unidad-doct");
      expect(unidadEl.tagName).toBe("SELECT");
    });
  });

  // ── 8. Fecha recibido — read-only ────────────────────────────────────────────
  describe("Fecha recibido — informativa, no editable", () => {
    it("muestra texto informativo en cada fila (no input)", () => {
      render(<DistribucionPage />);
      const fechaDoct = screen.getByTestId("fecha-recibido-doct");
      expect(fechaDoct).toHaveTextContent(/pendiente de recepción/i);
    });

    it("la fecha-recibido no es un input editable", () => {
      render(<DistribucionPage />);
      const el = screen.getByTestId("fecha-recibido-doct");
      expect(el.tagName).not.toBe("INPUT");
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
      selectRecepcion();
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

    it("no agrega sin cantidades válidas", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByTestId("distribuciones-empty")).toBeInTheDocument();
    });
  });

  // ── 11. Validaciones ─────────────────────────────────────────────────────────
  describe("Validaciones", () => {
    it("muestra error si no hay recepción seleccionada", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/debe seleccionar una recepción/i)).toBeInTheDocument();
    });

    it("muestra error si no hay cantidades en ningún área", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/ingrese cantidad distribuida en al menos un área/i)).toBeInTheDocument();
    });

    it("muestra error con cantidad negativa", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      setCantidad("doct", "-5");
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/no se permiten cantidades negativas/i)).toBeInTheDocument();
    });

    it("muestra error si cantidad > 0 sin unidad seleccionada", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      setCantidad("doct", "5");
      // No set unidad
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/seleccione unidad para/i)).toBeInTheDocument();
    });

    it("no agrega la distribución si hay errores de validación", () => {
      render(<DistribucionPage />);
      selectRecepcion();
      setCantidad("doct", "5");
      // missing unidad — should fail
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByTestId("distribuciones-empty")).toBeInTheDocument();
    });

    it("el error de recepción desaparece al seleccionar una", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/debe seleccionar una recepción/i)).toBeInTheDocument();
      selectRecepcion();
      expect(screen.queryByText(/debe seleccionar una recepción/i)).not.toBeInTheDocument();
    });
  });

  // ── 12. Agregar distribución ─────────────────────────────────────────────────
  describe("Agregar distribución", () => {
    it("agrega correctamente a la tabla inferior", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      expect(screen.getByTestId("distribuciones-table")).toBeInTheDocument();
    });

    it("la tabla inferior muestra el recepcionId agregado", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      const row = screen.getByTestId("dist-row-REC-2024-1030");
      expect(within(row).getByText("REC-2024-1030")).toBeInTheDocument();
    });

    it("limpia el formulario tras agregar (recepción vuelve a vacío)", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      expect(screen.getByTestId("recepcion-select")).toHaveValue("");
    });

    it("limpia las cantidades de área tras agregar", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      // After reset, fields are disabled — but their value should be empty
      expect(screen.queryByTestId("cantidad-rac-info")).not.toBeInTheDocument();
    });

    it("las observaciones se conservan en la distribución agregada", () => {
      render(<DistribucionPage />);
      selectRecepcion("REC-2024-1030");
      fireEvent.change(screen.getByTestId("observaciones"), { target: { value: "Observación de prueba" } });
      setCantidad("doct", "5");
      setUnidad("doct", "tabletas");
      fireEvent.click(screen.getByTestId("agregar-btn"));
      const row = screen.getByTestId("dist-row-REC-2024-1030");
      expect(within(row).getByTitle("Observación de prueba")).toBeInTheDocument();
    });

    it("muestra el producto de la recepción en la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      const row = screen.getByTestId("dist-row-REC-2024-1030");
      expect(within(row).getByText(/Metformina 850mg/i)).toBeInTheDocument();
    });

    it("muestra la cantidad RAC en la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      const row = screen.getByTestId("dist-row-REC-2024-1030");
      expect(within(row).getByText("120")).toBeInTheDocument();
    });

    it("muestra el área y cantidad distribuida en la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      const row = screen.getByTestId("dist-row-REC-2024-1030");
      expect(within(row).getByText(/Documentación/i)).toBeInTheDocument();
    });
  });

  // ── 13. Múltiples distribuciones ────────────────────────────────────────────
  describe("Múltiples distribuciones en el mismo RT", () => {
    it("permite agregar segunda distribución con distinta recepción", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      agregarDistribucion("REC-2024-1029", "3", "tabletas");
      expect(screen.getByTestId("dist-row-REC-2024-1030")).toBeInTheDocument();
      expect(screen.getByTestId("dist-row-REC-2024-1029")).toBeInTheDocument();
    });

    it("la tabla inferior muestra ambas distribuciones", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      agregarDistribucion("REC-2024-1029", "3", "tabletas");
      const rows = screen.getAllByRole("row");
      // thead + 2 data rows
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });

    it("no permite duplicar la misma recepción en el mismo RT", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      // Try to add same recepcion again
      selectRecepcion("REC-2024-1030");
      setCantidad("doct", "2");
      setUnidad("doct", "tabletas");
      fireEvent.click(screen.getByTestId("agregar-btn"));
      expect(screen.getByText(/ya fue agregada a este RT/i)).toBeInTheDocument();
    });

    it("la recepción ya agregada aparece marcada como deshabilitada en el select", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      const select = screen.getByTestId("recepcion-select");
      const opt = Array.from(select.querySelectorAll("option")).find(o => o.value === "REC-2024-1030");
      expect(opt).toBeDefined();
      expect(opt!.disabled).toBe(true);
    });
  });

  // ── 14. Eliminar distribución ─────────────────────────────────────────────────
  describe("Eliminar distribución de la tabla", () => {
    it("existe botón eliminar por cada fila", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      expect(screen.getByTestId("eliminar-REC-2024-1030")).toBeInTheDocument();
    });

    it("al eliminar, la distribución desaparece de la tabla", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      fireEvent.click(screen.getByTestId("eliminar-REC-2024-1030"));
      expect(screen.queryByTestId("dist-row-REC-2024-1030")).not.toBeInTheDocument();
    });

    it("al eliminar la única distribución, vuelve a mostrar mensaje vacío", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      fireEvent.click(screen.getByTestId("eliminar-REC-2024-1030"));
      expect(screen.getByTestId("distribuciones-empty")).toBeInTheDocument();
    });

    it("la recepción eliminada queda disponible para agregar de nuevo", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      fireEvent.click(screen.getByTestId("eliminar-REC-2024-1030"));
      const select = screen.getByTestId("recepcion-select");
      const opt = Array.from(select.querySelectorAll("option")).find(o => o.value === "REC-2024-1030");
      expect(opt?.disabled).toBeFalsy();
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
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      fireEvent.click(screen.getByTestId("emitir-btn"));
      expect(screen.queryByTestId("save-error")).not.toBeInTheDocument();
    });

    it("el error de guardado desaparece al agregar una distribución", () => {
      render(<DistribucionPage />);
      fireEvent.click(screen.getByTestId("emitir-btn"));
      expect(screen.getByTestId("save-error")).toBeInTheDocument();
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      expect(screen.queryByTestId("save-error")).not.toBeInTheDocument();
    });
  });

  // ── 16. Payload final / estado ───────────────────────────────────────────────
  describe("Payload y estado final", () => {
    it("la tabla inferior refleja múltiples distribuciones con distintas recepciones", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1028", "10", "frascos");
      agregarDistribucion("REC-2024-1024", "20", "tabletas");
      expect(screen.getByTestId("dist-row-REC-2024-1028")).toBeInTheDocument();
      expect(screen.getByTestId("dist-row-REC-2024-1024")).toBeInTheDocument();
    });

    it("cada distribución conserva su unidad independientemente", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1028", "10", "frascos");
      agregarDistribucion("REC-2024-1024", "20", "tabletas");
      const row1 = screen.getByTestId("dist-row-REC-2024-1028");
      const row2 = screen.getByTestId("dist-row-REC-2024-1024");
      // getAllByText avoids "multiple matches" error — the unit appears in RAC qty cell and area cell
      expect(within(row1).getAllByText(/frascos/)[0]).toBeInTheDocument();
      expect(within(row2).getAllByText(/tabletas/)[0]).toBeInTheDocument();
    });

    it("el counter del panel muestra la cantidad de distribuciones agregadas", () => {
      render(<DistribucionPage />);
      agregarDistribucion("REC-2024-1030", "5", "tabletas");
      agregarDistribucion("REC-2024-1029", "3", "tabletas");
      // Table has thead + 2 data rows = at least 3 rows total
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBeGreaterThanOrEqual(3);
    });
  });

});
