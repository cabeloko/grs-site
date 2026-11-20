/**
 * Regras do formulário de orçamento: tipos, validação e montagem da
 * mensagem enviada pelo WhatsApp. Funções puras, cobertas por testes.
 */
import {
  OTHER_OPTION,
  formLimits,
  goalOptions,
  projectTypeOptions,
  segmentOptions,
} from "@/config/form";
import { formatPhoneBR, isValidPhoneBR } from "./phone";

export type QuoteFormValues = {
  name: string;
  company: string;
  phone: string;
  projectType: string;
  segment: string;
  segmentOther: string;
  goal: string;
  goalOther: string;
  details: string;
};

export type QuoteField = keyof QuoteFormValues;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const emptyQuoteValues: QuoteFormValues = {
  name: "",
  company: "",
  phone: "",
  projectType: "",
  segment: "",
  segmentOther: "",
  goal: "",
  goalOther: "",
  details: "",
};

/** Ordem dos campos na tela (usada para focar o primeiro inválido). */
export const quoteFieldOrder: QuoteField[] = [
  "name",
  "company",
  "phone",
  "projectType",
  "segment",
  "segmentOther",
  "goal",
  "goalOther",
  "details",
];

const includes = (list: readonly string[], value: string) => list.includes(value);

/** Valida os campos e retorna as mensagens de erro (vazio = válido). */
export function validateQuote(values: QuoteFormValues): QuoteErrors {
  const errors: QuoteErrors = {};
  const name = values.name.trim();

  if (!name) {
    errors.name = "Informe seu nome completo.";
  } else if (name.length < formLimits.nameMin) {
    errors.name = `O nome deve ter pelo menos ${formLimits.nameMin} caracteres.`;
  }

  if (!values.phone.trim()) {
    errors.phone = "Informe um WhatsApp para contato.";
  } else if (!isValidPhoneBR(values.phone)) {
    errors.phone = "Informe um telefone válido com DDD, ex.: (11) 91234-5678.";
  }

  if (!includes(projectTypeOptions, values.projectType)) {
    errors.projectType = "Selecione o tipo de projeto.";
  }

  if (!includes(segmentOptions, values.segment)) {
    errors.segment = "Selecione o segmento de atuação.";
  } else if (values.segment === OTHER_OPTION && !values.segmentOther.trim()) {
    errors.segmentOther = "Descreva o seu segmento.";
  }

  if (!includes(goalOptions, values.goal)) {
    errors.goal = "Selecione o objetivo principal.";
  } else if (values.goal === OTHER_OPTION && !values.goalOther.trim()) {
    errors.goalOther = "Descreva o seu objetivo.";
  }

  if (values.details.length > formLimits.detailsMax) {
    errors.details = `Use no máximo ${formLimits.detailsMax} caracteres.`;
  }

  return errors;
}

/** Primeiro campo inválido, na ordem em que aparece na tela. */
export function firstInvalidField(errors: QuoteErrors): QuoteField | undefined {
  return quoteFieldOrder.find((field) => errors[field]);
}

/** Usa o texto livre quando a opção "Outro" foi escolhida. */
function resolveOther(option: string, other: string) {
  return option === OTHER_OPTION ? `Outro – ${other.trim()}` : option;
}

/** Normaliza espaços sem perder as quebras de linha do texto livre. */
function cleanMultiline(text: string) {
  return text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Monta a mensagem legível do orçamento. Campos opcionais vazios são
 * omitidos. O negrito usa a sintaxe do WhatsApp (*texto*).
 */
export function buildQuoteMessage(values: QuoteFormValues): string {
  const lines: Array<[string, string]> = [
    ["Nome", values.name.trim()],
    ["Empresa", values.company.trim()],
    ["WhatsApp", formatPhoneBR(values.phone)],
    ["Tipo de projeto", values.projectType],
    ["Segmento", resolveOther(values.segment, values.segmentOther)],
    ["Objetivo", resolveOther(values.goal, values.goalOther)],
    ["Informações adicionais", cleanMultiline(values.details)],
  ];

  const body = lines
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `*${label}:* ${value}`)
    .join("\n");

  return `Olá! Gostaria de solicitar um orçamento pelo site da GRS.\n\n${body}`;
}
