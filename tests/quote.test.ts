import { describe, expect, it } from "vitest";
import {
  buildQuoteMessage,
  emptyQuoteValues,
  firstInvalidField,
  validateQuote,
  type QuoteFormValues,
} from "@/lib/quote";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const complete: QuoteFormValues = {
  name: "  Maria da Conceição  ",
  company: "Ateliê São João",
  phone: "12981085504",
  projectType: "Site institucional",
  segment: "Beleza e estética",
  segmentOther: "",
  goal: "Atrair novos clientes",
  goalOther: "",
  details: "Preciso de um site com galeria.\nPrazo: até março.",
};

describe("buildQuoteMessage", () => {
  it("monta a mensagem completa no modelo definido", () => {
    expect(buildQuoteMessage(complete)).toBe(
      [
        "Olá! Gostaria de solicitar um orçamento pelo site da GRS.",
        "",
        "*Nome:* Maria da Conceição",
        "*Empresa:* Ateliê São João",
        "*WhatsApp:* (12) 98108-5504",
        "*Tipo de projeto:* Site institucional",
        "*Segmento:* Beleza e estética",
        "*Objetivo:* Atrair novos clientes",
        "*Informações adicionais:* Preciso de um site com galeria.\nPrazo: até março.",
      ].join("\n"),
    );
  });

  it("omite campos opcionais vazios", () => {
    const message = buildQuoteMessage({ ...complete, company: "   ", details: "" });
    expect(message).not.toContain("*Empresa:*");
    expect(message).not.toContain("*Informações adicionais:*");
    expect(message).toContain("*Nome:* Maria da Conceição");
  });

  it("usa o texto livre quando a opção é 'Outro'", () => {
    const message = buildQuoteMessage({
      ...complete,
      segment: "Outro",
      segmentOther: "Pet shop",
      goal: "Outro",
      goalOther: "Divulgar eventos",
    });
    expect(message).toContain("*Segmento:* Outro – Pet shop");
    expect(message).toContain("*Objetivo:* Outro – Divulgar eventos");
  });
});

describe("buildWhatsAppUrl", () => {
  it("codifica acentos, quebras de linha e asteriscos", () => {
    const url = buildWhatsAppUrl(buildQuoteMessage(complete), "5512981085504");

    expect(url.startsWith("https://wa.me/5512981085504?text=")).toBe(true);
    // Sem espaços, quebras ou acentos crus na URL
    expect(url).not.toMatch(/[\s\nçãéó]/);
    expect(url).toContain("%0A"); // quebra de linha
    expect(url).toContain("Ol%C3%A1"); // "Olá"
    expect(url).toContain("*Nome%3A*"); // negrito preservado

    // A decodificação devolve exatamente a mensagem original
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe(buildQuoteMessage(complete));
  });

  it("remove caracteres não numéricos do número", () => {
    expect(buildWhatsAppUrl("oi", "+55 (12) 98108-5504")).toBe(
      "https://wa.me/5512981085504?text=oi",
    );
  });
});

describe("validateQuote", () => {
  it("não retorna erros para dados válidos", () => {
    expect(validateQuote(complete)).toEqual({});
  });

  it("exige os campos obrigatórios", () => {
    const errors = validateQuote(emptyQuoteValues);
    expect(Object.keys(errors).sort()).toEqual(
      ["goal", "name", "phone", "projectType", "segment"].sort(),
    );
    expect(errors.company).toBeUndefined();
    expect(errors.details).toBeUndefined();
  });

  it("exige nome com pelo menos 3 caracteres", () => {
    expect(validateQuote({ ...complete, name: " Al " }).name).toBeDefined();
    expect(validateQuote({ ...complete, name: "Ana" }).name).toBeUndefined();
  });

  it("valida o telefone", () => {
    expect(validateQuote({ ...complete, phone: "(12) 9810" }).phone).toBeDefined();
  });

  it("exige o texto livre quando 'Outro' é escolhido", () => {
    const errors = validateQuote({ ...complete, segment: "Outro", goal: "Outro" });
    expect(errors.segmentOther).toBeDefined();
    expect(errors.goalOther).toBeDefined();
  });

  it("rejeita opções que não estão na lista", () => {
    expect(validateQuote({ ...complete, projectType: "Aplicativo" }).projectType).toBeDefined();
  });

  it("limita as informações adicionais a 1000 caracteres", () => {
    expect(validateQuote({ ...complete, details: "a".repeat(1001) }).details).toBeDefined();
    expect(validateQuote({ ...complete, details: "a".repeat(1000) }).details).toBeUndefined();
  });

  it("aponta o primeiro campo inválido na ordem da tela", () => {
    expect(firstInvalidField(validateQuote(emptyQuoteValues))).toBe("name");
    expect(firstInvalidField(validateQuote({ ...complete, phone: "", goal: "" }))).toBe("phone");
  });
});
