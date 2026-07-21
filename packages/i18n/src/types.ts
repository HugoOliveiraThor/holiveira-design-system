export type Locale = string;
export type DateInput = Date | string | number;

export type FormatDateOptions = Intl.DateTimeFormatOptions & {
  locale?: string;
};

export interface FormatCurrencyOptions {
  locale?: string;
  currency?: string;
}

export interface FormatMessageTimeOptions {
  locale?: string;
  now?: Date | number;
}
