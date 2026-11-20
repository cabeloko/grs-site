"use client";

import { AlertCircle, ArrowLeft, CheckCircle2, ChevronDown, ExternalLink, Send } from "lucide-react";
import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { contactContent } from "@/config/content";
import {
  OTHER_OPTION,
  formLimits,
  goalOptions,
  projectTypeOptions,
  segmentOptions,
} from "@/config/form";
import { cn } from "@/lib/cn";
import { formatPhoneBR } from "@/lib/phone";
import {
  buildQuoteMessage,
  emptyQuoteValues,
  firstInvalidField,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteFormValues,
} from "@/lib/quote";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const controlBase =
  "w-full rounded-xl border bg-bg/60 px-4 text-[0.9375rem] text-fg placeholder:text-subtle " +
  "transition-[border-color,background-color,box-shadow] duration-200 " +
  "hover:border-white/25 focus:border-accent-soft focus:bg-bg focus:shadow-[0_0_0_4px_rgb(107_149_255/0.15)] focus-visible:outline-none";

function controlClasses(invalid: boolean, extra?: string) {
  return cn(
    controlBase,
    invalid ? "border-danger/80" : "border-line-strong",
    extra,
  );
}

type FieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  hintId?: string;
  children: ReactNode;
  className?: string;
};

/** Rótulo + controle + dica + mensagem de erro (associados por id). */
function Field({ id, label, optional, error, hint, hintId, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-medium text-fg">
        {label}
        {optional && <span className="text-xs font-normal text-subtle">(opcional)</span>}
      </label>
      {children}
      {hint && (
        <p id={hintId} className="mt-2 text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Junta ids para o aria-describedby, ignorando os vazios. */
function describedBy(...ids: Array<string | false | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export function QuoteForm() {
  const uid = useId();
  const fieldId = (field: QuoteField) => `${uid}-${field}`;

  const [values, setValues] = useState<QuoteFormValues>(emptyQuoteValues);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  const successRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: QuoteField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Após a primeira tentativa de envio, valida enquanto o usuário corrige
    if (attempted) setErrors(validateQuote(next));
  };

  const onChange =
    (field: QuoteField) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(field, event.target.value);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    const found = validateQuote(values);
    setErrors(found);

    const first = firstInvalidField(found);
    if (first) {
      // Foco no primeiro campo inválido (após renderizar as mensagens)
      requestAnimationFrame(() => document.getElementById(fieldId(first))?.focus());
      return;
    }

    const url = buildWhatsAppUrl(buildQuoteMessage(values));
    window.open(url, "_blank", "noopener,noreferrer");
    setWhatsAppUrl(url);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  const backToForm = () => {
    setWhatsAppUrl(null);
    requestAnimationFrame(() =>
      formRef.current?.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus(),
    );
  };

  // Estado de sucesso
  if (whatsAppUrl) {
    return (
      <div role="status" className="flex flex-col items-start py-4">
        <span className="flex size-12 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
          <CheckCircle2 aria-hidden className="size-6" />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-6 text-2xl font-semibold text-fg outline-none"
        >
          Sua mensagem está pronta no WhatsApp
        </h3>
        <p className="mt-3 max-w-lg leading-relaxed text-muted">
          Abrimos o WhatsApp em uma nova aba com o seu pedido de orçamento. Para concluir,
          revise a mensagem e <strong className="font-medium text-fg">confirme o envio por lá</strong>.
        </p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-subtle">
          O WhatsApp não abriu? O navegador pode ter bloqueado a nova aba. Use o botão abaixo.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ size: "lg" })}
          >
            Abrir o WhatsApp novamente
            <ExternalLink aria-hidden className="size-4" />
          </a>
          <Button variant="secondary" size="lg" onClick={backToForm}>
            <ArrowLeft aria-hidden className="size-4" />
            Voltar ao formulário
          </Button>
        </div>
      </div>
    );
  }

  const err = (field: QuoteField) => (attempted ? errors[field] : undefined);
  const errId = (field: QuoteField) => err(field) && `${fieldId(field)}-error`;
  const phoneHintId = `${fieldId("phone")}-hint`;
  const countId = `${fieldId("details")}-count`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field id={fieldId("name")} label="Nome completo" error={err("name")} className="sm:col-span-2">
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={onChange("name")}
          aria-invalid={Boolean(err("name"))}
          aria-describedby={describedBy(errId("name"))}
          className={controlClasses(Boolean(err("name")), "min-h-12")}
        />
      </Field>

      <Field id={fieldId("company")} label="Nome da empresa ou negócio" optional>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={onChange("company")}
          className={controlClasses(false, "min-h-12")}
        />
      </Field>

      <Field
        id={fieldId("phone")}
        label="WhatsApp de contato"
        error={err("phone")}
        hint="Com DDD. Celular ou fixo."
        hintId={phoneHintId}
      >
        <input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="(00) 00000-0000"
          required
          value={values.phone}
          onChange={(e) => update("phone", formatPhoneBR(e.target.value))}
          aria-invalid={Boolean(err("phone"))}
          aria-describedby={describedBy(phoneHintId, errId("phone"))}
          className={controlClasses(Boolean(err("phone")), "min-h-12 tabular-nums")}
        />
      </Field>

      <Field
        id={fieldId("projectType")}
        label="Tipo de projeto"
        error={err("projectType")}
        className="sm:col-span-2"
      >
        <Select
          id={fieldId("projectType")}
          name="projectType"
          value={values.projectType}
          onChange={onChange("projectType")}
          options={projectTypeOptions}
          invalid={Boolean(err("projectType"))}
          describedById={errId("projectType")}
        />
      </Field>

      <Field id={fieldId("segment")} label="Segmento de atuação" error={err("segment")}>
        <Select
          id={fieldId("segment")}
          name="segment"
          value={values.segment}
          onChange={onChange("segment")}
          options={segmentOptions}
          invalid={Boolean(err("segment"))}
          describedById={errId("segment")}
        />
      </Field>

      <Field id={fieldId("goal")} label="Objetivo principal" error={err("goal")}>
        <Select
          id={fieldId("goal")}
          name="goal"
          value={values.goal}
          onChange={onChange("goal")}
          options={goalOptions}
          invalid={Boolean(err("goal"))}
          describedById={errId("goal")}
        />
      </Field>

      {values.segment === OTHER_OPTION && (
        <Field id={fieldId("segmentOther")} label="Qual é o seu segmento?" error={err("segmentOther")}>
          <input
            id={fieldId("segmentOther")}
            name="segmentOther"
            type="text"
            maxLength={formLimits.otherMax}
            required
            value={values.segmentOther}
            onChange={onChange("segmentOther")}
            aria-invalid={Boolean(err("segmentOther"))}
            aria-describedby={describedBy(errId("segmentOther"))}
            className={controlClasses(Boolean(err("segmentOther")), "min-h-12")}
          />
        </Field>
      )}

      {values.goal === OTHER_OPTION && (
        <Field
          id={fieldId("goalOther")}
          label="Qual é o seu objetivo?"
          error={err("goalOther")}
          className={values.segment === OTHER_OPTION ? undefined : "sm:col-start-2"}
        >
          <input
            id={fieldId("goalOther")}
            name="goalOther"
            type="text"
            maxLength={formLimits.otherMax}
            required
            value={values.goalOther}
            onChange={onChange("goalOther")}
            aria-invalid={Boolean(err("goalOther"))}
            aria-describedby={describedBy(errId("goalOther"))}
            className={controlClasses(Boolean(err("goalOther")), "min-h-12")}
          />
        </Field>
      )}

      <Field
        id={fieldId("details")}
        label="Informações adicionais"
        optional
        error={err("details")}
        className="sm:col-span-2"
      >
        <textarea
          id={fieldId("details")}
          name="details"
          rows={5}
          maxLength={formLimits.detailsMax}
          value={values.details}
          onChange={onChange("details")}
          placeholder="Conte um pouco sobre o seu negócio, referências ou prazos."
          aria-invalid={Boolean(err("details"))}
          aria-describedby={describedBy(countId, errId("details"))}
          className={controlClasses(Boolean(err("details")), "resize-y py-3 leading-relaxed")}
        />
        <p
          id={countId}
          className={cn(
            "mt-2 text-right font-mono text-xs tabular-nums",
            values.details.length >= formLimits.detailsMax ? "text-danger" : "text-subtle",
          )}
        >
          {values.details.length}/{formLimits.detailsMax}
          <span className="sr-only"> caracteres usados</span>
        </p>
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          <Send aria-hidden className="size-4" />
          {contactContent.submitLabel}
        </Button>
        <p className="mt-4 text-sm leading-relaxed text-muted">{contactContent.submitHint}</p>
        <p className="mt-3 text-xs leading-relaxed text-subtle">
          {contactContent.privacyNotice}{" "}
          <Link
            href="/politica-de-privacidade"
            className="text-accent-soft underline decoration-accent-soft/40 underline-offset-2 hover:decoration-accent-soft"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

type SelectProps = {
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
  invalid: boolean;
  describedById?: string | false;
};

/** Select nativo (acessível por padrão) com seta personalizada. */
function Select({ id, name, value, onChange, options, invalid, describedById }: SelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required
        value={value}
        onChange={onChange}
        aria-invalid={invalid}
        aria-describedby={describedBy(describedById)}
        className={controlClasses(
          invalid,
          cn("min-h-12 cursor-pointer appearance-none pr-11", !value && "text-subtle"),
        )}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-surface text-fg">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle"
      />
    </div>
  );
}
