/**
 * Container dimension tokens.
 * Maps named sizes (3, 4, 7, 10, etc.) to rem values.
 */
export const containers = {
  "3": "0.75rem",
  "4": "1rem",
  "7": "1.75rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "13": "3.25rem",
  "14": "3.5rem",
  "15": "3.75rem",
  "16": "4rem",
  "25": "6.25rem",
  "30": "7.5rem",
  "34": "8.5rem",
  "35": "8.75rem",
  "40": "10rem",
  "44": "11rem",
  "45": "11.25rem",
  "60": "15rem",
  "70": "17.5rem",
  "90": "22.5rem",
  "94": "23.5rem",
  "100": "25rem",
  "103": "25.75rem",
  "125": "31.25rem",
  "150": "37.5rem",
  "180": "45rem",
  "203": "50.75rem",
  "230": "57.5rem",
  "270": "67.5rem",
  "280": "70rem",
} as const;

/**
 * Custom breakpoints extending Tailwind defaults.
 * Values are min-width media query thresholds.
 */
export const breakpoints = {
  "2xsm": "375px",
  xsm: "425px",
  "3xl": "2000px",
} as const;

/** Valid keys for the `breakpoints` object. */
export type Breakpoint = keyof typeof breakpoints;
