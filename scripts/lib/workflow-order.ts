/**
 * Artifact assembly order.
 *
 * ADS-011 §7.3 fixes the order: `build` produces both exports, `build:storybook`
 * produces the artifact root (and therefore wipes anything copied earlier), then
 * the playground and the portal are copied in, then the smoke proves the three
 * public paths, then the artifact is uploaded. Checking the order in one place
 * keeps the workflow honest without duplicating the rules in prose.
 */

const STEPS: ReadonlyArray<{ action: string; marker: RegExp }> = [
  { action: 'build', marker: /pnpm run build$/m },
  { action: 'build:storybook', marker: /pnpm run build:storybook$/m },
  { action: 'playground copy', marker: /cp -R apps\/playground\/out\/\./ },
  { action: 'docs copy', marker: /cp -R apps\/docs\/out\/\./ },
  {
    action: 'artifact smoke',
    marker: /scripts\/check-artifact\.ts\s+--artifact\s+apps\/storybook\/storybook-static/,
  },
  { action: 'upload', marker: /uses: actions\/upload-pages-artifact/ },
];

export interface OrderViolation {
  action: string;
  detail: string;
}

/** Every way the workflow breaks the assembly order, naming the two steps. */
export function orderViolations(workflow: string): OrderViolation[] {
  const violations: OrderViolation[] = [];
  const found: Array<{ action: string; index: number }> = [];

  for (const step of STEPS) {
    const match = step.marker.exec(workflow);
    if (match === null) {
      violations.push({ action: step.action, detail: `${step.action} is missing` });
      continue;
    }
    found.push({ action: step.action, index: match.index });
  }

  for (let index = 0; index < found.length; index += 1) {
    for (let earlier = 0; earlier < index; earlier += 1) {
      const current = found[index];
      const previous = found[earlier];
      if (current.index < previous.index) {
        violations.push({
          action: current.action,
          detail: `${current.action} runs before ${previous.action}`,
        });
      }
    }
  }

  return violations;
}
