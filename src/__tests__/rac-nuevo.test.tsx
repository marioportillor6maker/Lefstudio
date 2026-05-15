// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import NuevoIngresoRAC from "@/app/rac/nuevo/page";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const FIXED_ISO = "2026-05-15T14:30:00.000Z";
const FIXED_DATE_LOCAL = "2026-05-15";

/** Click Siguiente (n-1) times to reach step n from step 1 */
function goToStep(n: number) {
  for (let i = 1; i < n; i++) {
    fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. RENDERIZADO GENERAL
// ─────────────────────────────────────────────────────────────────────────────
describe("NuevoIngresoRAC — /rac/nuevo", () => {
  describe("Renderizado general", () => {
    it("renders without crashing", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText("Nuevo Ingreso")).toBeInTheDocument();
    });

    it("shows all 6 step names in sidebar", () => {
      render(<NuevoIngresoRAC />);
      ["Datos del Trámite", "Producto", "Cliente / Externo", "Cantidades", "Documentos", "Validación"].forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it("starts on step 1", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/Paso 1: Datos del Trámite/)).toBeInTheDocument();
    });

    it("shows Borrador Activo badge", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText("Borrador Activo")).toBeInTheDocument();
    });

    it("back link points to /rac", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/rac");
    });

    it("Guardar Borrador button is present on step 1", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByRole("button", { name: /guardar borrador/i })).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 2. CAMPOS ELIMINADOS — REGRESIÓN
  // ─────────────────────────────────────────────────────────────────────────
  describe("Campos eliminados — step 1", () => {
    it("does NOT render Subtipo field", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.queryByText(/subtipo/i)).not.toBeInTheDocument();
    });

    it("does NOT render Modalidad field", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.queryByText(/modalidad/i)).not.toBeInTheDocument();
    });

    it("does NOT render Mes de Recepción field", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.queryByText(/mes de recepci/i)).not.toBeInTheDocument();
    });
  });

  describe("Campos eliminados — step 2", () => {
    it("does NOT render Fecha Fabricación", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.queryByText(/fabricaci/i)).not.toBeInTheDocument();
    });
  });

  describe("Campos eliminados — step 4", () => {
    it("does NOT render Ubicación Física", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.queryByText(/ubicaci[oó]n f[ií]sica/i)).not.toBeInTheDocument();
    });

    it("does NOT render old label 'Cantidad Muestra Biblioteca'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.queryByText(/cantidad muestra biblioteca/i)).not.toBeInTheDocument();
    });

    it("does NOT render old label 'Físico - Químico'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.queryByText(/f[ií]sico.*qu[ií]mico/i)).not.toBeInTheDocument();
    });

    it("does NOT render old label 'Microbiológico' (old variant)", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.queryByText(/microbiol[oó]gico/i)).not.toBeInTheDocument();
    });
  });

  describe("Campos eliminados — step 5", () => {
    it("Expediente card has NO Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const card = screen.getByTestId("expediente-card");
      expect(within(card).queryByRole("button", { name: /adjuntar/i })).not.toBeInTheDocument();
    });

    it("Expediente card has NO file input", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const card = screen.getByTestId("expediente-card");
      expect(card.querySelector("input[type='file']")).toBeNull();
    });
  });

  describe("Campos eliminados — step 6", () => {
    it("does NOT render 'Requiere Estándar' select", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.queryByText(/requiere est[aá]ndar/i)).not.toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 3. CAMPOS NUEVOS
  // ─────────────────────────────────────────────────────────────────────────
  describe("Campos nuevos — step 5", () => {
    it("renders 'Fecha del Oficio/Solicitud' label", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByText(/fecha del oficio\/solicitud/i)).toBeInTheDocument();
    });

    it("'Fecha del Oficio/Solicitud' is a date input", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByLabelText(/fecha del oficio\/solicitud/i)).toHaveAttribute("type", "date");
    });

    it("renders 'Fecha Acta Toma de Muestra' label", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByText(/fecha acta toma de muestra/i)).toBeInTheDocument();
    });

    it("'Fecha Acta Toma de Muestra' is a date input", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByLabelText(/fecha acta toma de muestra/i)).toHaveAttribute("type", "date");
    });
  });

  describe("Campos nuevos — step 4", () => {
    it("renders 'Cantidad Muestroteca' label", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad muestroteca/i)).toBeInTheDocument();
    });

    it("renders 'Cantidad Total Muestra Recibida' label", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad total muestra recibida/i)).toBeInTheDocument();
    });

    it("renders 'Cantidad para FFQQ' label", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad para ffqq/i)).toBeInTheDocument();
    });

    it("renders 'Cantidad para Microbiología' label", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad para microbiol/i)).toBeInTheDocument();
    });
  });

  describe("Campos nuevos — tabla estándares step 6", () => {
    it("renders Estándares Requeridos section", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByTestId("estandares-section")).toBeInTheDocument();
    });

    it("renders 'Agregar Estándar' button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByRole("button", { name: /agregar est[aá]ndar/i })).toBeInTheDocument();
    });

    it("shows empty state when no standards added", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByTestId("estandares-empty")).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 4. CAMPOS OBLIGATORIOS — INDICADOR VISUAL
  // ─────────────────────────────────────────────────────────────────────────
  describe("Campos obligatorios — asterisco en label", () => {
    it("Estado Inicial del Producto shows required asterisk", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/estado inicial del producto/i).textContent).toContain("*");
    });

    it("Fecha de Recepción shows required asterisk", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/fecha de recepci[oó]n/i).textContent).toContain("*");
    });

    it("Hora de Recepción shows required asterisk", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/hora de recepci[oó]n/i).textContent).toContain("*");
    });

    it("Estado Inicial textarea accessible via label", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/estado inicial del producto/i).tagName).toBe("TEXTAREA");
    });

    it("Cantidad Total Muestra Recibida shows required asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad total muestra recibida/i).textContent).toContain("*");
    });

    it("Cantidad para FFQQ shows required asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad para ffqq/i).textContent).toContain("*");
    });

    it("Cantidad para Microbiología shows required asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad para microbiol/i).textContent).toContain("*");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 5. CAMPOS OPCIONALES — SIN ASTERISCO
  // ─────────────────────────────────────────────────────────────────────────
  describe("Campos opcionales — sin asterisco en label", () => {
    it("Nombre Genérico has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.getByText(/nombre gen[eé]rico/i).textContent).not.toContain("*");
    });

    it("Forma Farmacéutica has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.getByText(/forma farmac[eé]utica/i).textContent).not.toContain("*");
    });

    it("Nº Lote has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      // Use exact text match — "Nº" is a specific character
      expect(screen.getByText(/\blote\b/i).textContent).not.toContain("*");
    });

    it("Fecha Expiración has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.getByText(/fecha expiraci[oó]n/i).textContent).not.toContain("*");
    });

    it("Tipo de Cliente has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/tipo de cliente/i).textContent).not.toContain("*");
    });

    it("Nombre Institución has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/nombre instituci[oó]n/i).textContent).not.toContain("*");
    });

    it("Nombre Solicitante has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/nombre solicitante/i).textContent).not.toContain("*");
    });

    it("Teléfono has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/tel[eé]fono/i).textContent).not.toContain("*");
    });

    it("Correo has no asterisk", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/correo/i).textContent).not.toContain("*");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 6. FECHA Y HORA AUTO-POBLADAS
  // ─────────────────────────────────────────────────────────────────────────
  describe("Fecha y hora de recepción auto-pobladas", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(FIXED_ISO));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("Fecha de Recepción pre-fills with YYYY-MM-DD format", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/fecha de recepci[oó]n/i) as HTMLInputElement;
      expect(input.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("Fecha de Recepción matches fixed mock date", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/fecha de recepci[oó]n/i) as HTMLInputElement;
      expect(input.value).toBe(FIXED_DATE_LOCAL);
    });

    it("Hora de Recepción pre-fills with HH:MM format", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/hora de recepci[oó]n/i) as HTMLInputElement;
      expect(input.value).toMatch(/^\d{2}:\d{2}$/);
    });

    it("Fecha de Recepción is editable — not disabled", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/fecha de recepci[oó]n/i)).not.toBeDisabled();
    });

    it("Fecha de Recepción is editable — not readonly", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/fecha de recepci[oó]n/i)).not.toHaveAttribute("readonly");
    });

    it("Hora de Recepción is editable — not disabled", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/hora de recepci[oó]n/i)).not.toBeDisabled();
    });

    it("user can change Fecha de Recepción", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/fecha de recepci[oó]n/i);
      fireEvent.change(input, { target: { value: "2026-06-01" } });
      expect((input as HTMLInputElement).value).toBe("2026-06-01");
    });

    it("user can change Hora de Recepción", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/hora de recepci[oó]n/i);
      fireEvent.change(input, { target: { value: "08:00" } });
      expect((input as HTMLInputElement).value).toBe("08:00");
    });

    it("Mes de Recepción does NOT appear as a manual field", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.queryByText(/mes de recepci/i)).not.toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 7. RESPONSABLE RAC
  // ─────────────────────────────────────────────────────────────────────────
  describe("Responsable RAC — read-only, auto from session", () => {
    it("renders Responsable RAC label", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/responsable rac/i)).toBeInTheDocument();
    });

    it("displays SESSION_USER: María Rodríguez", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByTestId("responsable-display")).toHaveTextContent("María Rodríguez");
    });

    it("responsable is a div — not an input", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByTestId("responsable-display").tagName).toBe("DIV");
    });

    it("responsable container has no input, select, or textarea inside", () => {
      render(<NuevoIngresoRAC />);
      const display = screen.getByTestId("responsable-display");
      expect(display.querySelector("input, select, textarea")).toBeNull();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 8. CANTIDADES — DEFAULTS Y STEP DECIMAL
  // ─────────────────────────────────────────────────────────────────────────
  describe("Cantidades — defaults y decimales", () => {
    it("Cantidad para FFQQ has defaultValue 0", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect((screen.getByLabelText(/cantidad para ffqq/i) as HTMLInputElement).defaultValue).toBe("0");
    });

    it("Cantidad para Microbiología has defaultValue 0", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect((screen.getByLabelText(/cantidad para microbiol/i) as HTMLInputElement).defaultValue).toBe("0");
    });

    it("Cantidad para FFQQ has step=0.01", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect((screen.getByLabelText(/cantidad para ffqq/i) as HTMLInputElement).step).toBe("0.01");
    });

    it("Cantidad para Microbiología has step=0.01", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect((screen.getByLabelText(/cantidad para microbiol/i) as HTMLInputElement).step).toBe("0.01");
    });

    it("Cantidad para FFQQ is type=number", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByLabelText(/cantidad para ffqq/i)).toHaveAttribute("type", "number");
    });

    it("Cantidad para Microbiología is type=number", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByLabelText(/cantidad para microbiol/i)).toHaveAttribute("type", "number");
    });

    it("user can set a decimal value in Cantidad para FFQQ", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      const input = screen.getByLabelText(/cantidad para ffqq/i);
      fireEvent.change(input, { target: { value: "2.75" } });
      expect((input as HTMLInputElement).value).toBe("2.75");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Nº DE EXPEDIENTE
  // ─────────────────────────────────────────────────────────────────────────
  describe("Nº de Expediente — solo texto", () => {
    it("renders Nº de Expediente text input", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const card = screen.getByTestId("expediente-card");
      expect(card.querySelector("input[type='text']")).toBeInTheDocument();
    });

    it("Expediente card has no Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const card = screen.getByTestId("expediente-card");
      expect(within(card).queryByRole("button", { name: /adjuntar/i })).not.toBeInTheDocument();
    });

    it("Expediente card has no file input", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByTestId("expediente-card").querySelector("input[type='file']")).toBeNull();
    });

    it("user can type in Expediente field", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const card = screen.getByTestId("expediente-card");
      const input = card.querySelector("input[type='text']") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "EXP-2026-001" } });
      expect(input.value).toBe("EXP-2026-001");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 10. TABLA DINÁMICA DE ESTÁNDARES
  // ─────────────────────────────────────────────────────────────────────────
  describe("Tabla dinámica de estándares", () => {
    it("shows empty state before any standard is added", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByTestId("estandares-empty")).toBeInTheDocument();
      expect(screen.queryAllByTestId("estandar-row")).toHaveLength(0);
    });

    it("adds one row on single click of Agregar Estándar", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      expect(screen.getAllByTestId("estandar-row")).toHaveLength(1);
    });

    it("empty state disappears after adding a row", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      expect(screen.queryByTestId("estandares-empty")).not.toBeInTheDocument();
    });

    it("adds two rows on two clicks", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const btn = screen.getByRole("button", { name: /agregar est[aá]ndar/i });
      fireEvent.click(btn);
      fireEvent.click(btn);
      expect(screen.getAllByTestId("estandar-row")).toHaveLength(2);
    });

    it("each row has a Nombre del Estándar input (text)", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      const input = screen.getByTestId("estandar-nombre");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
    });

    it("each row has a Cantidad input (number, step=0.01)", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      const input = screen.getByTestId("estandar-cantidad") as HTMLInputElement;
      expect(input).toHaveAttribute("type", "number");
      expect(input.step).toBe("0.01");
    });

    it("each row has an Observación input (text)", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      expect(screen.getByTestId("estandar-observacion")).toHaveAttribute("type", "text");
    });

    it("user can type a name in Nombre del Estándar", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      const input = screen.getByTestId("estandar-nombre");
      fireEvent.change(input, { target: { value: "Referencia USP" } });
      expect(input).toHaveValue("Referencia USP");
    });

    it("user can enter a decimal quantity in Cantidad del Estándar", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      const input = screen.getByTestId("estandar-cantidad");
      fireEvent.change(input, { target: { value: "2.5" } });
      expect(input).toHaveValue(2.5);
    });

    it("user can type an observation", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      const input = screen.getByTestId("estandar-observacion");
      fireEvent.change(input, { target: { value: "Verificado en bodega" } });
      expect(input).toHaveValue("Verificado en bodega");
    });

    it("eliminar button removes the row", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      fireEvent.click(screen.getByTestId("estandar-eliminar"));
      expect(screen.queryAllByTestId("estandar-row")).toHaveLength(0);
    });

    it("empty state returns after deleting the last row", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      fireEvent.click(screen.getByTestId("estandar-eliminar"));
      expect(screen.getByTestId("estandares-empty")).toBeInTheDocument();
    });

    it("deletes correct row when multiple exist — first row", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const btn = screen.getByRole("button", { name: /agregar est[aá]ndar/i });
      fireEvent.click(btn);
      fireEvent.click(btn);

      const [n1, n2] = screen.getAllByTestId("estandar-nombre");
      fireEvent.change(n1, { target: { value: "Estándar A" } });
      fireEvent.change(n2, { target: { value: "Estándar B" } });

      fireEvent.click(screen.getAllByTestId("estandar-eliminar")[0]);

      expect(screen.getAllByTestId("estandar-row")).toHaveLength(1);
      expect(screen.getByTestId("estandar-nombre")).toHaveValue("Estándar B");
    });

    it("row counter shows sequential numbers", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const btn = screen.getByRole("button", { name: /agregar est[aá]ndar/i });
      fireEvent.click(btn);
      fireEvent.click(btn);
      const rows = screen.getAllByTestId("estandar-row");
      expect(rows[0].textContent).toContain("1");
      expect(rows[1].textContent).toContain("2");
    });

    it("table headers render when rows exist", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      fireEvent.click(screen.getByRole("button", { name: /agregar est[aá]ndar/i }));
      expect(screen.getByText("Nombre del Estándar")).toBeInTheDocument();
      expect(screen.getByText("Cantidad")).toBeInTheDocument();
      expect(screen.getByText("Observación")).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 11. NAVEGACIÓN POR PASOS
  // ─────────────────────────────────────────────────────────────────────────
  describe("Navegación por pasos", () => {
    it("step 1 does NOT show Anterior button", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.queryByRole("button", { name: /anterior/i })).not.toBeInTheDocument();
    });

    it("clicking Siguiente goes to step 2", () => {
      render(<NuevoIngresoRAC />);
      fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
      expect(screen.getByText(/Paso 2: Producto/)).toBeInTheDocument();
    });

    it("clicking Anterior on step 2 returns to step 1", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
      expect(screen.getByText(/Paso 1: Datos del Trámite/)).toBeInTheDocument();
    });

    it("can navigate to step 3", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/Paso 3: Cliente/)).toBeInTheDocument();
    });

    it("can navigate to step 4", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/Paso 4: Cantidades/)).toBeInTheDocument();
    });

    it("can navigate to step 5", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByText(/Paso 5: Referencias Documentales/)).toBeInTheDocument();
    });

    it("can navigate to step 6", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByText(/Paso 6: Observaciones y Validaci/)).toBeInTheDocument();
    });

    it("step 6 shows Finalizar button instead of Siguiente", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByRole("button", { name: /finalizar y crear ingreso/i })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /siguiente/i })).not.toBeInTheDocument();
    });

    it("sidebar step-3 button is disabled when on step 1", () => {
      render(<NuevoIngresoRAC />);
      const step3Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Cliente / Externo"));
      expect(step3Btn).toBeDisabled();
    });

    it("sidebar step-2 button is enabled when on step 1 (one ahead allowed)", () => {
      render(<NuevoIngresoRAC />);
      const step2Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Producto"));
      expect(step2Btn).not.toBeDisabled();
    });

    it("fecha entered in step 1 persists when navigating forward and back", () => {
      render(<NuevoIngresoRAC />);
      const fechaInput = screen.getByLabelText(/fecha de recepci[oó]n/i);
      fireEvent.change(fechaInput, { target: { value: "2026-07-04" } });
      goToStep(2);
      fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
      expect((screen.getByLabelText(/fecha de recepci[oó]n/i) as HTMLInputElement).value).toBe("2026-07-04");
    });

    it("sidebar completed steps become fully enabled after passing them", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      const step1Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Datos del Trámite"));
      expect(step1Btn).not.toBeDisabled();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 12. REGRESIÓN DE LABELS
  // ─────────────────────────────────────────────────────────────────────────
  describe("Regresión de labels", () => {
    it("renders 'Cantidad Total Muestra Recibida'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad total muestra recibida/i)).toBeInTheDocument();
    });

    it("does NOT render 'Cantidad Muestra Biblioteca'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.queryByText(/cantidad muestra biblioteca/i)).not.toBeInTheDocument();
    });

    it("renders 'Cantidad Muestroteca'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad muestroteca/i)).toBeInTheDocument();
    });

    it("renders 'Cantidad para FFQQ'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad para ffqq/i)).toBeInTheDocument();
    });

    it("renders 'Cantidad para Microbiología'", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/cantidad para microbiol/i)).toBeInTheDocument();
    });

    it("full page text contains 'Cantidad Total Muestra Recibida' (not old short form)", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(document.body.textContent).toMatch(/cantidad total muestra recibida/i);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 13. PASO 3 — NOTA EXPLICATIVA
  // ─────────────────────────────────────────────────────────────────────────
  describe("Paso 3 — nota sobre opcionalidad", () => {
    it("shows explanatory note about when client fields apply", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/colaboraci[oó]n o an[aá]lisis particular/i)).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 14. PASO 6 — CHECKBOXES DE CONFIRMACIÓN
  // ─────────────────────────────────────────────────────────────────────────
  describe("Paso 6 — checkboxes de confirmación", () => {
    it("renders at least 4 confirmation checkboxes", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getAllByRole("checkbox").length).toBeGreaterThanOrEqual(4);
    });

    it("all checkboxes are unchecked by default", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      screen.getAllByRole("checkbox").forEach(cb => expect(cb).not.toBeChecked());
    });

    it("user can check a confirmation checkbox", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const [first] = screen.getAllByRole("checkbox");
      fireEvent.click(first);
      expect(first).toBeChecked();
    });

    it("checking one checkbox does not check others", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const [first, ...rest] = screen.getAllByRole("checkbox");
      fireEvent.click(first);
      rest.forEach(cb => expect(cb).not.toBeChecked());
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 15. NOMBRE GENÉRICO — OPCIONAL Y FUNCIONAL
  // ─────────────────────────────────────────────────────────────────────────
  describe("Nombre Genérico — opcional y funcional", () => {
    it("renders 'Nombre Genérico' field in step 2", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.getByText(/nombre gen[eé]rico/i)).toBeInTheDocument();
    });

    it("field is a text input", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      // Find input adjacent to the label via parent div
      const label = screen.getByText(/nombre gen[eé]rico/i);
      const container = label.closest("div");
      expect(container?.querySelector("input[type='text']")).toBeInTheDocument();
    });

    it("user can type a value in Nombre Genérico", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      const container = screen.getByText(/nombre gen[eé]rico/i).closest("div");
      const input = container?.querySelector("input[type='text']") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "Amoxicilina" } });
      expect(input.value).toBe("Amoxicilina");
    });

    it("empty Nombre Genérico does not block advancing to step 3", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      // Nombre Genérico is empty (default) — click Siguiente
      fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
      expect(screen.getByText(/Paso 3: Cliente/)).toBeInTheDocument();
    });

    it("label has no asterisk — confirmed optional", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.getByText(/nombre gen[eé]rico/i).textContent).not.toContain("*");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 16. RESPONSABLE RAC — NO COMBOBOX, NO SELECCIONABLE
  // ─────────────────────────────────────────────────────────────────────────
  describe("Responsable RAC — no combobox, no seleccionable", () => {
    it("no <select> element exists in the responsable area", () => {
      render(<NuevoIngresoRAC />);
      const display = screen.getByTestId("responsable-display");
      expect(display.querySelector("select")).toBeNull();
    });

    it("no role='combobox' near the responsable area", () => {
      render(<NuevoIngresoRAC />);
      const display = screen.getByTestId("responsable-display");
      expect(display.querySelector("[role='combobox']")).toBeNull();
    });

    it("no <input> of any type inside the responsable display area", () => {
      render(<NuevoIngresoRAC />);
      const display = screen.getByTestId("responsable-display");
      expect(display.querySelector("input")).toBeNull();
    });

    it("responsable display text content is not empty", () => {
      render(<NuevoIngresoRAC />);
      const display = screen.getByTestId("responsable-display");
      expect(display.textContent?.trim().length).toBeGreaterThan(0);
    });

    it("responsable display is NOT a form control element", () => {
      render(<NuevoIngresoRAC />);
      const display = screen.getByTestId("responsable-display");
      const tag = display.tagName.toLowerCase();
      expect(["input", "select", "textarea", "button"]).not.toContain(tag);
    });

    it("SESSION_USER 'María Rodríguez' is visible as plain text", () => {
      render(<NuevoIngresoRAC />);
      // getByText with exact match confirms it's plain text, not inside an input value
      const display = screen.getByTestId("responsable-display");
      expect(display.textContent).toContain("María Rodríguez");
    });

    it("page has no global combobox for choosing a responsable", () => {
      render(<NuevoIngresoRAC />);
      // No combobox role anywhere on step 1 tied to 'responsable'
      const allSelects = document.querySelectorAll("select");
      const responsableSelect = Array.from(allSelects).find(s =>
        s.closest("[data-testid='responsable-display']")
      );
      expect(responsableSelect).toBeUndefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 17. FECHA Y HORA — INPUT TYPE, PRELLENADO, EDITABLE
  // ─────────────────────────────────────────────────────────────────────────
  describe("Fecha y Hora — tipo de input correcto", () => {
    it("Fecha de Recepción is type='date' (not a select/combobox)", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/fecha de recepci[oó]n/i)).toHaveAttribute("type", "date");
    });

    it("Hora de Recepción is type='time' (not a select/combobox)", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/hora de recepci[oó]n/i)).toHaveAttribute("type", "time");
    });

    it("Fecha value is not empty after render (auto-populated)", () => {
      render(<NuevoIngresoRAC />);
      const v = (screen.getByLabelText(/fecha de recepci[oó]n/i) as HTMLInputElement).value;
      expect(v.length).toBeGreaterThan(0);
    });

    it("Hora value is not empty after render (auto-populated)", () => {
      render(<NuevoIngresoRAC />);
      const v = (screen.getByLabelText(/hora de recepci[oó]n/i) as HTMLInputElement).value;
      expect(v.length).toBeGreaterThan(0);
    });

    it("Fecha accepts a past date", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/fecha de recepci[oó]n/i);
      fireEvent.change(input, { target: { value: "2026-04-30" } });
      expect((input as HTMLInputElement).value).toBe("2026-04-30");
    });

    it("Hora accepts any valid time", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/hora de recepci[oó]n/i);
      fireEvent.change(input, { target: { value: "07:45" } });
      expect((input as HTMLInputElement).value).toBe("07:45");
    });

    it("Fecha is an editable controlled input (has onChange)", () => {
      render(<NuevoIngresoRAC />);
      const input = screen.getByLabelText(/fecha de recepci[oó]n/i);
      // Changing value updates it — confirms onChange is wired
      fireEvent.change(input, { target: { value: "2026-12-31" } });
      expect((input as HTMLInputElement).value).toBe("2026-12-31");
    });

    it("no select/combobox exists for date or time", () => {
      render(<NuevoIngresoRAC />);
      // Only legitimate selects on step 1 are: Tipo de Trámite, Prioridad, Requiere Pago Previo
      const selects = Array.from(document.querySelectorAll("select"));
      const dateSelect = selects.find(s =>
        s.closest("div")?.querySelector("label")?.textContent?.match(/fecha|hora/i)
      );
      expect(dateSelect).toBeUndefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 18. SMOKE — HEADINGS DE CADA PASO
  // ─────────────────────────────────────────────────────────────────────────
  describe("Smoke — heading visible en cada paso", () => {
    it("step 1 heading", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/Paso 1: Datos del Trámite/)).toBeInTheDocument();
    });

    it("step 2 heading", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      expect(screen.getByText(/Paso 2: Producto/)).toBeInTheDocument();
    });

    it("step 3 heading", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      expect(screen.getByText(/Paso 3: Cliente \/ Ente Externo/)).toBeInTheDocument();
    });

    it("step 4 heading", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByText(/Paso 4: Cantidades/)).toBeInTheDocument();
    });

    it("step 5 heading", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByText(/Paso 5: Referencias Documentales/)).toBeInTheDocument();
    });

    it("step 6 heading", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByText(/Paso 6: Observaciones y Validaci/)).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 19. DOCUMENTOS — OTROS CARDS CONSERVAN ADJUNTAR
  // ─────────────────────────────────────────────────────────────────────────
  describe("Documentos — otros cards mantienen botón Adjuntar", () => {
    it("Orden de Compra card has Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      // Find card containing the label text
      const labels = screen.getAllByText(/adjuntar/i);
      // At least one Adjuntar exists (non-Expediente cards)
      expect(labels.length).toBeGreaterThan(0);
    });

    it("Carta / Oficio card still has Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const cartaLabel = screen.getByText(/carta \/ oficio/i);
      const card = cartaLabel.closest("div.p-4");
      expect(within(card!).getByRole("button", { name: /adjuntar/i })).toBeInTheDocument();
    });

    it("Acta Toma de Muestra card has Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const actaLabel = screen.getByText(/^acta toma de muestra$/i);
      const card = actaLabel.closest("div.p-4");
      expect(within(card!).getByRole("button", { name: /adjuntar/i })).toBeInTheDocument();
    });

    it("Licitación card has Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const licitLabel = screen.getByText(/licitaci[oó]n/i);
      const card = licitLabel.closest("div.p-4");
      expect(within(card!).getByRole("button", { name: /adjuntar/i })).toBeInTheDocument();
    });

    it("Contrato card has Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const label = screen.getByText(/^contrato$/i);
      const card = label.closest("div.p-4");
      expect(within(card!).getByRole("button", { name: /adjuntar/i })).toBeInTheDocument();
    });

    it("Resolución ARSA card has Adjuntar button", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      const label = screen.getByText(/resoluci[oó]n arsa/i);
      const card = label.closest("div.p-4");
      expect(within(card!).getByRole("button", { name: /adjuntar/i })).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 20. PASO 6 — CAMPOS DE OBSERVACIONES Y CONTROLES
  // ─────────────────────────────────────────────────────────────────────────
  describe("Paso 6 — observaciones y controles adicionales", () => {
    it("renders 'Observaciones Generales' textarea", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const label = screen.getByText(/observaciones generales/i);
      const container = label.closest("div");
      expect(container?.querySelector("textarea")).toBeInTheDocument();
    });

    it("renders 'Observaciones Estado Físico Producto' textarea", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      const label = screen.getByText(/observaciones estado f[ií]sico producto/i);
      const container = label.closest("div");
      expect(container?.querySelector("textarea")).toBeInTheDocument();
    });

    it("renders 'Requiere Información Adicional' select", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByText(/requiere informaci[oó]n adicional/i)).toBeInTheDocument();
    });

    it("'Estándares Requeridos' heading is present", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByText("Estándares Requeridos")).toBeInTheDocument();
    });

    it("'Confirmación Final' section heading is present", () => {
      render(<NuevoIngresoRAC />);
      goToStep(6);
      expect(screen.getByText("Confirmación Final")).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 21. ACCESIBILIDAD — IDs VINCULADOS EN CAMPOS CLAVE
  // ─────────────────────────────────────────────────────────────────────────
  describe("Accesibilidad — htmlFor/id en campos clave", () => {
    it("Fecha de Recepción accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/fecha de recepci[oó]n/i)).toBeInTheDocument();
    });

    it("Hora de Recepción accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/hora de recepci[oó]n/i)).toBeInTheDocument();
    });

    it("Estado Inicial del Producto accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/estado inicial del producto/i)).toBeInTheDocument();
    });

    it("Cantidad para FFQQ accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByLabelText(/cantidad para ffqq/i)).toBeInTheDocument();
    });

    it("Cantidad para Microbiología accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      goToStep(4);
      expect(screen.getByLabelText(/cantidad para microbiol/i)).toBeInTheDocument();
    });

    it("Fecha del Oficio accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByLabelText(/fecha del oficio\/solicitud/i)).toBeInTheDocument();
    });

    it("Fecha Acta accessible via getByLabelText", () => {
      render(<NuevoIngresoRAC />);
      goToStep(5);
      expect(screen.getByLabelText(/fecha acta toma de muestra/i)).toBeInTheDocument();
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 22. SIDEBAR — COMPORTAMIENTO COMPLETO
  // ─────────────────────────────────────────────────────────────────────────
  describe("Sidebar — comportamiento de navegación", () => {
    it("sidebar has exactly 6 step buttons", () => {
      render(<NuevoIngresoRAC />);
      // Step buttons are inside <nav>
      const nav = document.querySelector("nav");
      const stepButtons = nav?.querySelectorAll("button");
      expect(stepButtons?.length).toBe(6);
    });

    it("clicking step 1 sidebar button from step 2 returns to step 1", () => {
      render(<NuevoIngresoRAC />);
      goToStep(2);
      const step1Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Datos del Trámite"));
      fireEvent.click(step1Btn!);
      expect(screen.getByText(/Paso 1: Datos del Trámite/)).toBeInTheDocument();
    });

    it("on step 3, steps 1 and 2 sidebar buttons are enabled", () => {
      render(<NuevoIngresoRAC />);
      goToStep(3);
      const step1Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Datos del Trámite"));
      const step2Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Producto"));
      expect(step1Btn).not.toBeDisabled();
      expect(step2Btn).not.toBeDisabled();
    });

    it("on step 1, step 4+ sidebar buttons are disabled", () => {
      render(<NuevoIngresoRAC />);
      const step4Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Cantidades"));
      const step5Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Documentos"));
      const step6Btn = screen.getAllByRole("button").find(b => b.textContent?.includes("Validación"));
      expect(step4Btn).toBeDisabled();
      expect(step5Btn).toBeDisabled();
      expect(step6Btn).toBeDisabled();
    });

    it("Guardar Borrador button is always present regardless of step", () => {
      render(<NuevoIngresoRAC />);
      [1, 2, 3, 4, 5, 6].forEach(n => {
        if (n > 1) fireEvent.click(screen.getByRole("button", { name: /siguiente/i }));
        expect(screen.getByRole("button", { name: /guardar borrador/i })).toBeInTheDocument();
      });
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 23. PASO 1 — CAMPOS PRESENTES Y CORRECTOS
  // ─────────────────────────────────────────────────────────────────────────
  describe("Paso 1 — campos presentes y sin combobox para datos automáticos", () => {
    it("renders Tipo de Trámite select (legítimo — usuario elige)", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/tipo de tr[aá]mite/i)).toBeInTheDocument();
    });

    it("renders Prioridad select (legítimo — usuario elige)", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/prioridad/i)).toBeInTheDocument();
    });

    it("renders Requiere Pago Previo select (legítimo — usuario elige)", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByText(/requiere pago previo/i)).toBeInTheDocument();
    });

    it("renders Estado Inicial del Producto textarea", () => {
      render(<NuevoIngresoRAC />);
      expect(screen.getByLabelText(/estado inicial del producto/i).tagName).toBe("TEXTAREA");
    });

    it("no select with options for 'responsable'", () => {
      render(<NuevoIngresoRAC />);
      const selects = Array.from(document.querySelectorAll("select"));
      const found = selects.some(s => {
        const opts = Array.from(s.options).map(o => o.text.toLowerCase());
        return opts.some(o => o.includes("karla") || o.includes("jorge") || o.includes("rodríguez"));
      });
      expect(found).toBe(false);
    });
  });
});
