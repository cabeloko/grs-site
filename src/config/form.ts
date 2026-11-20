/** Opções do formulário de orçamento. */

/** Valor que habilita o campo de texto complementar. */
export const OTHER_OPTION = "Outro";

export const projectTypeOptions = [
  "Site institucional",
  "Landing page",
  "Loja virtual",
  "Soluções de presença digital",
  "Ainda não sei qual solução preciso",
] as const;

export const segmentOptions = [
  "Advocacia e serviços jurídicos",
  "Saúde e bem-estar",
  "Beleza e estética",
  "Alimentação",
  "Construção e reformas",
  "Consultoria e serviços profissionais",
  "Educação",
  "Comércio e varejo",
  "Tecnologia",
  OTHER_OPTION,
] as const;

export const goalOptions = [
  "Atrair novos clientes",
  "Transmitir mais credibilidade",
  "Apresentar meus serviços",
  "Ser encontrado no Google",
  "Vender pela internet",
  OTHER_OPTION,
] as const;

export const formLimits = {
  nameMin: 3,
  detailsMax: 1000,
  otherMax: 80,
} as const;
