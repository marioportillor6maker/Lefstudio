// @vitest-environment jsdom

import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProformasPagoPage, { numeroALetras } from "@/app/rac/proformas/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// window.open devuelve null en jsdom; printProforma lo maneja con `if (!win) return`
// No hace falta stub — simplemente no crashea.

// ─── Utilidad numeroALetras ───────────────────────────────────────────────────
describe("numeroALetras — conversión a letras", () => {
  it("convierte 1000 → MIL LEMPIRAS", () => {
    expect(numeroALetras(1000, "L")).toBe("MIL LEMPIRAS 00/100");
  });
  it("convierte 1150 → MIL CIENTO CINCUENTA LEMPIRAS", () => {
    expect(numeroALetras(1150, "L")).toBe("MIL CIENTO CINCUENTA LEMPIRAS 00/100");
  });
  it("convierte 4600 → CUATRO MIL SEISCIENTOS LEMPIRAS", () => {
    expect(numeroALetras(4600, "L")).toBe("CUATRO MIL SEISCIENTOS LEMPIRAS 00/100");
  });
  it("convierte 3450 → TRES MIL CUATROCIENTOS CINCUENTA LEMPIRAS", () => {
    expect(numeroALetras(3450, "L")).toBe("TRES MIL CUATROCIENTOS CINCUENTA LEMPIRAS 00/100");
  });
  it("convierte 5750 → CINCO MIL SETECIENTOS CINCUENTA LEMPIRAS", () => {
    expect(numeroALetras(5750, "L")).toBe("CINCO MIL SETECIENTOS CINCUENTA LEMPIRAS 00/100");
  });
  it("convierte 21 como VEINTIUNO (no VEINTE Y UNO)", () => {
    expect(numeroALetras(21, "L")).toBe("VEINTIUNO LEMPIRAS 00/100");
  });
  it("convierte 100 como CIEN (no CIENTO)", () => {
    expect(numeroALetras(100, "L")).toBe("CIEN LEMPIRAS 00/100");
  });
  it("convierte 101 como CIENTO UNO", () => {
    expect(numeroALetras(101, "L")).toBe("CIENTO UNO LEMPIRAS 00/100");
  });
  it("convierte 31 como TREINTA Y UNO", () => {
    expect(numeroALetras(31, "L")).toBe("TREINTA Y UNO LEMPIRAS 00/100");
  });
  it("soporta dólares", () => {
    expect(numeroALetras(500, "$")).toBe("QUINIENTOS DÓLARES 00/100");
  });
  it("retorna cadena vacía para valor 0", () => {
    expect(numeroALetras(0, "L")).toBe("");
  });
  it("incluye centavos correctamente", () => {
    expect(numeroALetras(1000.5, "L")).toBe("MIL LEMPIRAS 50/100");
  });
  it("convierte 200 como DOSCIENTOS", () => {
    expect(numeroALetras(200, "L")).toBe("DOSCIENTOS LEMPIRAS 00/100");
  });
});

// ─── Componente ProformasPagoPage ─────────────────────────────────────────────
describe("ProformasPagoPage — /rac/proformas", () => {

  // ── Render básico ────────────────────────────────────────────────────────────
  describe("Render básico", () => {
    it("muestra el título Proformas y Pago", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByText("Proformas y Pago")).toBeInTheDocument();
    });
    it("muestra el panel Emitir Nueva Proforma", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByText("Emitir Nueva Proforma")).toBeInTheDocument();
    });
    it("muestra la tabla Proformas Generadas", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByText("Proformas Generadas")).toBeInTheDocument();
    });
    it("muestra indicadores de proformas emitidas y pagos confirmados", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByText("Proformas Emitidas")).toBeInTheDocument();
      expect(screen.getByText("Pagos Confirmados")).toBeInTheDocument();
    });
    it("muestra los 3 registros mock en la tabla", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByText("PROF-2024-089")).toBeInTheDocument();
      expect(screen.getByText("PROF-2024-088")).toBeInTheDocument();
      expect(screen.getByText("PROF-2024-080")).toBeInTheDocument();
    });
    it("el botón Generar Proforma existe", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("generar-proforma")).toBeInTheDocument();
    });
  });

  // ── Recepción — autocomplete (no combobox simple) ────────────────────────────
  describe("Recepción — autocomplete, no select estático", () => {
    it("usa un input de búsqueda en vez de select estático", () => {
      render(<ProformasPagoPage />);
      const el = screen.getByTestId("recepcion-search");
      expect(el.tagName).toBe("INPUT");
    });
    it("no tiene la opción estática 'Seleccione una recepción...' (select antiguo)", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByText("Seleccione una recepción...")).not.toBeInTheDocument();
    });
    it("el dropdown no aparece si la búsqueda está vacía", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByTestId("recepcion-dropdown")).not.toBeInTheDocument();
    });
    it("muestra resultados al escribir en el campo", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      expect(screen.getByTestId("recepcion-dropdown")).toBeInTheDocument();
      expect(screen.getAllByTestId("recepcion-option").length).toBeGreaterThan(0);
    });
    it("filtra resultados por nombre de producto", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "amoxicilina" } });
      const opts = screen.getAllByTestId("recepcion-option");
      expect(opts.some(o => o.textContent!.toLowerCase().includes("amoxicilina"))).toBe(true);
    });
    it("filtra por número de recepción", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "REC-2024-1030" } });
      expect(screen.getByTestId("recepcion-dropdown")).toBeInTheDocument();
    });
    it("filtra por nombre de cliente", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "IHSS" } });
      expect(screen.getAllByTestId("recepcion-option").length).toBeGreaterThan(0);
    });
    it("al seleccionar una opción muestra la card de recepción", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      expect(screen.getByTestId("recepcion-card")).toBeInTheDocument();
    });
    it("el dropdown se cierra al seleccionar una opción", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      expect(screen.queryByTestId("recepcion-dropdown")).not.toBeInTheDocument();
    });
    it("la card de recepción muestra el ID seleccionado", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "REC-2024-1030" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      expect(screen.getByTestId("recepcion-card")).toHaveTextContent("REC-2024-1030");
    });
    it("aparece botón Ver Muestra al seleccionar una recepción", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      expect(screen.getByTestId("ver-muestra")).toBeInTheDocument();
    });
    it("el botón X elimina la selección", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.click(screen.getByTestId("clear-recepcion"));
      expect(screen.queryByTestId("recepcion-card")).not.toBeInTheDocument();
    });
  });

  // ── Precio L / $ — exclusión mutua ──────────────────────────────────────────
  describe("Precio — Lempiras y Dólares (exclusión mutua)", () => {
    it("tiene input de precio en Lempiras", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("precio-l")).toBeInTheDocument();
    });
    it("tiene input de precio en Dólares", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("precio-d")).toBeInTheDocument();
    });
    it("los dos campos están habilitados cuando no hay moneda activa", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("precio-l")).not.toBeDisabled();
      expect(screen.getByTestId("precio-d")).not.toBeDisabled();
    });
    it("al ingresar Lempiras deshabilita el campo Dólares", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      expect(screen.getByTestId("precio-d")).toBeDisabled();
    });
    it("al ingresar Dólares deshabilita el campo Lempiras", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-d"), { target: { value: "50" } });
      expect(screen.getByTestId("precio-l")).toBeDisabled();
    });
    it("al limpiar el campo L se rehabilita el campo $", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "" } });
      expect(screen.getByTestId("precio-d")).not.toBeDisabled();
    });
    it("al limpiar el campo $ se rehabilita el campo L", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-d"), { target: { value: "100" } });
      fireEvent.change(screen.getByTestId("precio-d"), { target: { value: "" } });
      expect(screen.getByTestId("precio-l")).not.toBeDisabled();
    });
    it("los inputs son de tipo number", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("precio-l")).toHaveAttribute("type", "number");
      expect(screen.getByTestId("precio-d")).toHaveAttribute("type", "number");
    });
  });

  // ── ISV automático, read-only ─────────────────────────────────────────────
  describe("ISV — calculado automáticamente, no editable", () => {
    it("la sección ISV no se muestra cuando no hay precio", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByTestId("isv-value")).not.toBeInTheDocument();
    });
    it("la sección ISV aparece al ingresar precio en L", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      expect(screen.getByTestId("isv-value")).toBeInTheDocument();
    });
    it("calcula ISV = 15% del precio base", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      // ISV = 1000 * 0.15 = 150.00
      expect(screen.getByTestId("isv-value")).toHaveTextContent("150");
    });
    it("recalcula ISV al cambiar el precio", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "2000" } });
      // ISV = 2000 * 0.15 = 300.00
      expect(screen.getByTestId("isv-value")).toHaveTextContent("300");
    });
    it("el ISV se muestra como texto (no input), no es editable", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      expect(screen.getByTestId("isv-value").tagName).not.toBe("INPUT");
      expect(screen.getByTestId("isv-value").tagName).not.toBe("TEXTAREA");
    });
    it("ISV también calcula con precio en Dólares", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-d"), { target: { value: "200" } });
      // ISV = 200 * 0.15 = 30.00
      expect(screen.getByTestId("isv-value")).toHaveTextContent("30");
    });
  });

  // ── Total — cálculo y total en letras ────────────────────────────────────────
  describe("Total — cálculo correcto y letras", () => {
    it("calcula total = precio + ISV", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      // 1000 + 150 = 1150
      expect(screen.getByTestId("total-value")).toHaveTextContent("1,150");
    });
    it("total en letras visible cuando hay precio", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      expect(screen.getByTestId("total-letras")).toBeInTheDocument();
    });
    it("total en letras muestra el valor correcto en L", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      expect(screen.getByTestId("total-letras")).toHaveTextContent("MIL CIENTO CINCUENTA LEMPIRAS");
    });
    it("total en letras muestra el valor correcto en $", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-d"), { target: { value: "100" } });
      // total = 100 + 15 = 115
      expect(screen.getByTestId("total-letras")).toHaveTextContent("CIENTO QUINCE DÓLARES");
    });
    it("total en letras no aparece sin precio", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByTestId("total-letras")).not.toBeInTheDocument();
    });
    it("total en letras desaparece al limpiar el precio", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "" } });
      expect(screen.queryByTestId("total-letras")).not.toBeInTheDocument();
    });
  });

  // ── Fecha de emisión — no existe como input ──────────────────────────────────
  describe("Fecha de emisión — no editable por el usuario", () => {
    it("no existe label de Fecha Emisión en el formulario", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByLabelText(/fecha.*emisi[oó]n/i)).not.toBeInTheDocument();
    });
    it("no existe input para fecha de emisión en el formulario principal", () => {
      render(<ProformasPagoPage />);
      const labels = Array.from(document.querySelectorAll("label"));
      const tieneLabel = labels.some(l =>
        l.textContent?.toLowerCase().replace(/\s+/g, " ").includes("fecha emisi")
      );
      expect(tieneLabel).toBe(false);
    });
  });

  // ── Campos nuevos ─────────────────────────────────────────────────────────────
  describe("Campos nuevos — Nro Oficio y Nro Orden ARSA", () => {
    it("existe input Número de Oficio", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("nro-oficio")).toBeInTheDocument();
    });
    it("Número de Oficio acepta texto", () => {
      render(<ProformasPagoPage />);
      const input = screen.getByTestId("nro-oficio");
      fireEvent.change(input, { target: { value: "OF-2026-001" } });
      expect(input).toHaveValue("OF-2026-001");
    });
    it("existe input Número de Orden ARSA", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("nro-orden-arsa")).toBeInTheDocument();
    });
    it("Número de Orden ARSA acepta texto", () => {
      render(<ProformasPagoPage />);
      const input = screen.getByTestId("nro-orden-arsa");
      fireEvent.change(input, { target: { value: "ARSA-2026-001" } });
      expect(input).toHaveValue("ARSA-2026-001");
    });
    it("los campos nuevos son opcionales (label indica opcional)", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByText(/número de oficio/i).closest("label")?.textContent).toContain("opcional");
    });
    it("Nro Orden ARSA se muestra en la proforma guardada (mock)", () => {
      render(<ProformasPagoPage />);
      // PROF-2024-088 tiene nroOrdenARSA = "ARSA-2026-100"
      fireEvent.click(screen.getAllByTestId("ver-btn")[1]);
      const modal = screen.getByTestId("ver-proforma-modal");
      expect(within(modal).getByText("ARSA-2026-100")).toBeInTheDocument();
    });
    it("Nro Oficio se muestra en la proforma guardada (mock)", () => {
      render(<ProformasPagoPage />);
      // PROF-2024-089 tiene nroOficio = "OF-2026-0442"
      fireEvent.click(screen.getAllByTestId("ver-btn")[0]);
      const modal = screen.getByTestId("ver-proforma-modal");
      expect(within(modal).getByText("OF-2026-0442")).toBeInTheDocument();
    });
  });

  // ── Validaciones ──────────────────────────────────────────────────────────────
  describe("Validaciones de submit", () => {
    it("muestra error cuando no hay recepción seleccionada", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByText("Debe seleccionar una recepción")).toBeInTheDocument();
    });
    it("muestra error cuando no se seleccionó tipo de análisis", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByText("Debe seleccionar el tipo de análisis")).toBeInTheDocument();
    });
    it("muestra error cuando no hay precio", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByText("Ingrese un precio mayor a cero")).toBeInTheDocument();
    });
    it("no genera proforma si hay errores de validación", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.queryByTestId("success-modal")).not.toBeInTheDocument();
    });
    it("el error de recepción desaparece al seleccionar una", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByText("Debe seleccionar una recepción")).toBeInTheDocument();
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      expect(screen.queryByText("Debe seleccionar una recepción")).not.toBeInTheDocument();
    });
  });

  // ── Generación de proforma — flujo completo ──────────────────────────────────
  describe("Generación de proforma + modal de éxito", () => {
    function fillForm() {
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.change(screen.getByTestId("tipo-analisis"), { target: { value: "completo" } });
      fireEvent.change(screen.getByTestId("precio-l"), { target: { value: "1000" } });
    }

    beforeEach(() => {
      render(<ProformasPagoPage />);
    });

    it("muestra modal de éxito al generar correctamente", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByTestId("success-modal")).toBeInTheDocument();
    });
    it("el modal de éxito muestra el total en letras", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByTestId("success-total-letras")).toHaveTextContent("MIL CIENTO CINCUENTA LEMPIRAS");
    });
    it("el modal de éxito tiene botón Imprimir", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByTestId("success-imprimir")).toBeInTheDocument();
    });
    it("el modal de éxito tiene botón Descargar PDF", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByTestId("success-descargar")).toBeInTheDocument();
    });
    it("el modal de éxito tiene botón Volver al listado (cerrar)", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      expect(screen.getByTestId("success-cerrar")).toBeInTheDocument();
    });
    it("cerrar el modal de éxito lo oculta", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      fireEvent.click(screen.getByTestId("success-cerrar"));
      expect(screen.queryByTestId("success-modal")).not.toBeInTheDocument();
    });
    it("la nueva proforma se agrega a la tabla", () => {
      const initialCount = screen.getAllByTestId("ver-btn").length;
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      fireEvent.click(screen.getByTestId("success-cerrar"));
      expect(screen.getAllByTestId("ver-btn").length).toBe(initialCount + 1);
    });
    it("el formulario se resetea tras generar", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      fireEvent.click(screen.getByTestId("success-cerrar"));
      expect(screen.getByTestId("recepcion-search")).toHaveValue("");
      expect(screen.getByTestId("precio-l")).toHaveValue(null);
    });
    it("el total en letras persiste en el modal de éxito (no desaparece al guardar)", () => {
      fillForm();
      fireEvent.click(screen.getByTestId("generar-proforma"));
      // El modal de éxito debe mostrar totalLetras
      const successLetras = screen.getByTestId("success-total-letras");
      expect(successLetras.textContent?.length).toBeGreaterThan(5);
    });
  });

  // ── Modal de información de muestra ─────────────────────────────────────────
  describe("Modal de información de muestra asociada", () => {
    it("el modal no está visible inicialmente", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByTestId("muestra-modal")).not.toBeInTheDocument();
    });
    it("abre el modal al hacer clic en Ver Muestra", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.click(screen.getByTestId("ver-muestra"));
      expect(screen.getByTestId("muestra-modal")).toBeInTheDocument();
    });
    it("el modal muestra el ID de la recepción seleccionada", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "REC-2024-1030" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.click(screen.getByTestId("ver-muestra"));
      expect(within(screen.getByTestId("muestra-modal")).getAllByText(/REC-2024-1030/)[0]).toBeInTheDocument();
    });
    it("el modal muestra el nombre del producto", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.click(screen.getByTestId("ver-muestra"));
      const modal = screen.getByTestId("muestra-modal");
      expect(within(modal).getByText(/Metformina/i)).toBeInTheDocument();
    });
    it("el modal muestra el cliente de la recepción", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.click(screen.getByTestId("ver-muestra"));
      const modal = screen.getByTestId("muestra-modal");
      expect(within(modal).getByText(/FarmaSalud/i)).toBeInTheDocument();
    });
    it("el modal se cierra con el botón Cerrar", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByTestId("recepcion-search"), { target: { value: "metformina" } });
      fireEvent.click(screen.getAllByTestId("recepcion-option")[0]);
      fireEvent.click(screen.getByTestId("ver-muestra"));
      const modal = screen.getByTestId("muestra-modal");
      fireEvent.click(within(modal).getByRole("button", { name: "Cerrar" }));
      expect(screen.queryByTestId("muestra-modal")).not.toBeInTheDocument();
    });
  });

  // ── Botones Ver / Descargar / Imprimir / Confirmar en tabla ─────────────────
  describe("Botones de acción en la tabla", () => {
    it("cada fila tiene botón Ver (FileText)", () => {
      render(<ProformasPagoPage />);
      expect(screen.getAllByTestId("ver-btn").length).toBe(3);
    });
    it("cada fila tiene botón Descargar", () => {
      render(<ProformasPagoPage />);
      expect(screen.getAllByTestId("descargar-btn").length).toBe(3);
    });
    it("cada fila tiene botón Imprimir", () => {
      render(<ProformasPagoPage />);
      expect(screen.getAllByTestId("imprimir-btn").length).toBe(3);
    });
    it("solo filas Pendiente/Vencido tienen botón Confirmar Pago", () => {
      render(<ProformasPagoPage />);
      // PROF-2024-089 (Pendiente) y PROF-2024-080 (Vencido) → 2 botones
      // PROF-2024-088 (Pagado) → sin botón confirmar
      expect(screen.getAllByTestId("confirmar-btn").length).toBe(2);
    });
    it("click en Ver abre el modal de detalle de proforma", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("ver-btn")[0]);
      expect(screen.getByTestId("ver-proforma-modal")).toBeInTheDocument();
    });
    it("el modal de proforma muestra desglose con ISV y total", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("ver-btn")[0]);
      const modal = screen.getByTestId("ver-proforma-modal");
      expect(within(modal).getByText(/ISV/i)).toBeInTheDocument();
      expect(within(modal).getByText(/TOTAL/i)).toBeInTheDocument();
    });
    it("el modal de proforma muestra total en letras", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("ver-btn")[0]);
      const modal = screen.getByTestId("ver-proforma-modal");
      expect(within(modal).getByText(/LEMPIRAS/)).toBeInTheDocument();
    });
    it("el modal de proforma tiene botón Imprimir", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("ver-btn")[0]);
      const modal = screen.getByTestId("ver-proforma-modal");
      expect(within(modal).getByRole("button", { name: /imprimir/i })).toBeInTheDocument();
    });
    it("el modal de proforma tiene botón Descargar PDF", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("ver-btn")[0]);
      const modal = screen.getByTestId("ver-proforma-modal");
      expect(within(modal).getByRole("button", { name: /descargar/i })).toBeInTheDocument();
    });
    it("los botones Imprimir/Descargar no crashean (window.open retorna null en jsdom)", () => {
      render(<ProformasPagoPage />);
      expect(() => {
        fireEvent.click(screen.getAllByTestId("imprimir-btn")[0]);
      }).not.toThrow();
      expect(() => {
        fireEvent.click(screen.getAllByTestId("descargar-btn")[0]);
      }).not.toThrow();
    });
  });

  // ── Confirmar Pago ────────────────────────────────────────────────────────────
  describe("Confirmar Pago", () => {
    it("abre el modal de confirmar pago al hacer clic en el botón", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("confirmar-btn")[0]);
      expect(screen.getByTestId("confirm-modal")).toBeInTheDocument();
    });
    it("el modal muestra el ID de la proforma seleccionada", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("confirmar-btn")[0]);
      expect(screen.getByTestId("confirm-modal")).toHaveTextContent("PROF-2024-089");
    });
    it("confirmar pago cierra el modal", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("confirmar-btn")[0]);
      fireEvent.click(screen.getByTestId("confirmar-pago-submit"));
      expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
    });
    it("confirmar pago actualiza estado a Pagado en la tabla", () => {
      render(<ProformasPagoPage />);
      const row = screen.getByText("PROF-2024-089").closest("tr");
      expect(within(row!).getByText("Pendiente")).toBeInTheDocument();
      fireEvent.click(screen.getAllByTestId("confirmar-btn")[0]);
      fireEvent.click(screen.getByTestId("confirmar-pago-submit"));
      expect(within(screen.getByText("PROF-2024-089").closest("tr")!).getByText("Pagado")).toBeInTheDocument();
    });
    it("cancelar pago cierra el modal sin cambiar estado", () => {
      render(<ProformasPagoPage />);
      fireEvent.click(screen.getAllByTestId("confirmar-btn")[0]);
      fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
      expect(screen.queryByTestId("confirm-modal")).not.toBeInTheDocument();
      expect(screen.getByText("PROF-2024-089").closest("tr")).toHaveTextContent("Pendiente");
    });
  });

  // ── Paginación ────────────────────────────────────────────────────────────────
  describe("Paginación de la tabla", () => {
    it("muestra el indicador de página", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("page-indicator")).toBeInTheDocument();
    });
    it("el indicador muestra el número de proformas", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("page-indicator")).toHaveTextContent("3 proformas");
    });
    it("indica Página 1 de 1 con datos mock", () => {
      render(<ProformasPagoPage />);
      expect(screen.getByTestId("page-indicator")).toHaveTextContent("Página 1 de 1");
    });
    it("no muestra botones de navegación con una sola página", () => {
      render(<ProformasPagoPage />);
      expect(screen.queryByTestId("pagination-prev")).not.toBeInTheDocument();
      expect(screen.queryByTestId("pagination-next")).not.toBeInTheDocument();
    });
  });

  // ── Búsqueda en tabla ─────────────────────────────────────────────────────────
  describe("Búsqueda en la tabla de proformas", () => {
    it("filtra proformas por ID de proforma", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByPlaceholderText("Buscar proforma..."), { target: { value: "PROF-2024-089" } });
      expect(screen.getByText("PROF-2024-089")).toBeInTheDocument();
      expect(screen.queryByText("PROF-2024-088")).not.toBeInTheDocument();
    });
    it("filtra proformas por estado", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByPlaceholderText("Buscar proforma..."), { target: { value: "pagado" } });
      expect(screen.getByText("PROF-2024-088")).toBeInTheDocument();
      expect(screen.queryByText("PROF-2024-089")).not.toBeInTheDocument();
    });
    it("filtra por recepción", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByPlaceholderText("Buscar proforma..."), { target: { value: "REC-2024-1030" } });
      expect(screen.getByText("REC-2024-1030")).toBeInTheDocument();
    });
    it("muestra mensaje vacío cuando no hay resultados", () => {
      render(<ProformasPagoPage />);
      fireEvent.change(screen.getByPlaceholderText("Buscar proforma..."), { target: { value: "ZZZZ-NO-EXISTE" } });
      expect(screen.getByText("No se encontraron proformas.")).toBeInTheDocument();
    });
    it("restaura todos los resultados al limpiar la búsqueda", () => {
      render(<ProformasPagoPage />);
      const tableSearch = screen.getByPlaceholderText("Buscar proforma...");
      fireEvent.change(tableSearch, { target: { value: "PROF-2024-089" } });
      fireEvent.change(tableSearch, { target: { value: "" } });
      expect(screen.getAllByTestId("ver-btn").length).toBe(3);
    });
  });

});
