import { describe, expect, it } from "vitest";
import { formatPhoneBR, isValidPhoneBR, onlyDigits } from "@/lib/phone";

describe("onlyDigits", () => {
  it("remove caracteres que não são dígitos", () => {
    expect(onlyDigits("(12) 98108-5504")).toBe("12981085504");
    expect(onlyDigits("+55 abc")).toBe("55");
  });
});

describe("formatPhoneBR", () => {
  it("aplica a máscara progressivamente", () => {
    expect(formatPhoneBR("")).toBe("");
    expect(formatPhoneBR("1")).toBe("(1");
    expect(formatPhoneBR("12")).toBe("(12");
    expect(formatPhoneBR("129")).toBe("(12) 9");
    expect(formatPhoneBR("129810")).toBe("(12) 9810");
    expect(formatPhoneBR("1298108")).toBe("(12) 9810-8");
  });

  it("formata telefone fixo com 10 dígitos", () => {
    expect(formatPhoneBR("1133334444")).toBe("(11) 3333-4444");
  });

  it("formata celular com 11 dígitos", () => {
    expect(formatPhoneBR("12981085504")).toBe("(12) 98108-5504");
  });

  it("ignora caracteres extras e limita a 11 dígitos", () => {
    expect(formatPhoneBR("(12) 98108-5504 999")).toBe("(12) 98108-5504");
  });
});

describe("isValidPhoneBR", () => {
  it("aceita celular com DDD", () => {
    expect(isValidPhoneBR("(12) 98108-5504")).toBe(true);
    expect(isValidPhoneBR("11912345678")).toBe(true);
  });

  it("aceita telefone fixo com DDD", () => {
    expect(isValidPhoneBR("(11) 3333-4444")).toBe(true);
    expect(isValidPhoneBR("4133334444")).toBe(true);
  });

  it("rejeita tamanhos fora de 10 a 11 dígitos", () => {
    expect(isValidPhoneBR("")).toBe(false);
    expect(isValidPhoneBR("123456789")).toBe(false);
    expect(isValidPhoneBR("129810855041")).toBe(false);
  });

  it("rejeita DDD com zero", () => {
    expect(isValidPhoneBR("(01) 98108-5504")).toBe(false);
    expect(isValidPhoneBR("(10) 3333-4444")).toBe(false);
  });

  it("rejeita celular que não começa com 9", () => {
    expect(isValidPhoneBR("(12) 88108-5504")).toBe(false);
  });

  it("rejeita fixo que não começa com 2 a 5", () => {
    expect(isValidPhoneBR("(11) 9333-4444")).toBe(false);
    expect(isValidPhoneBR("(11) 1333-4444")).toBe(false);
  });
});
