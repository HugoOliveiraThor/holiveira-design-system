import type { FormatCurrencyOptions } from "./types"
import { _defaultLocale } from "./internal/locale"

export function formatCurrency(
  value: number,
  options?: FormatCurrencyOptions,
): string {
  const locale = options?.locale ?? _defaultLocale
  const currency = options?.currency ?? "USD"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value)
}
