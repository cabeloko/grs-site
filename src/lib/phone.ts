/**
 * Utilitários de telefone brasileiro (fixo e celular, com DDD).
 *
 * Formatos aceitos:
 *   - Fixo:    (00) 0000-0000   → 10 dígitos, número começa com 2 a 5
 *   - Celular: (00) 00000-0000  → 11 dígitos, número começa com 9
 */

/** Remove tudo que não for dígito. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Aplica a máscara brasileira enquanto o usuário digita.
 * Limita a 11 dígitos e escolhe o formato pelo tamanho.
 */
export function formatPhoneBR(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);
  const len = digits.length;

  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (len <= 6) return `(${ddd}) ${rest}`;

  // 10 dígitos (ou menos): 0000-0000 | 11 dígitos: 00000-0000
  const split = len === 11 ? 7 : 6;
  return `(${ddd}) ${digits.slice(2, split)}-${digits.slice(split)}`;
}

/** Valida telefone brasileiro com DDD (10 ou 11 dígitos). */
export function isValidPhoneBR(value: string): boolean {
  const digits = onlyDigits(value);

  if (digits.length !== 10 && digits.length !== 11) return false;

  // DDD: dois dígitos de 1 a 9 (não existem DDDs com zero)
  if (!/^[1-9]{2}/.test(digits)) return false;

  const firstOfNumber = digits[2];
  if (digits.length === 11) return firstOfNumber === "9";
  return /[2-5]/.test(firstOfNumber);
}
