import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex min-h-11 whitespace-nowrap items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_8px_24px_-8px_rgb(46_98_245/0.6)] " +
    "hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgb(255_255_255/0.14)_inset,0_10px_30px_-8px_rgb(56_217_240/0.45)]",
  secondary:
    "border border-line-strong bg-white/[0.02] text-fg hover:border-cyan/50 hover:bg-white/[0.05]",
  ghost: "text-muted hover:text-fg hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-sm",
  lg: "min-h-12 px-6 text-[0.9375rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Botão nativo. */
export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}

/**
 * Link com aparência de botão. Usa next/link para rotas internas e <a>
 * para âncoras, links externos, mailto e tel.
 */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  external,
  ...props
}: CommonProps &
  Omit<ComponentProps<"a">, "href"> & {
    href: string;
    /** Abre em nova aba com rel seguro. */
    external?: boolean;
  }) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      />
    );
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return <Link href={href} className={classes} {...props} />;
  }

  return <a href={href} className={classes} {...props} />;
}
