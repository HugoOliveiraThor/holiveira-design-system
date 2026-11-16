/**
 * Commit message rule: no AI mentions.
 *
 * The maintainer's history reads as his own work, so a commit that names an AI
 * vendor or states AI generation is rejected. The bare token "ai" never
 * matches: only a vendor name, a generation phrase that spells out the agent,
 * or a robot emoji does. A dependabot co-author trailer stays allowed.
 */

/** Vendors whose name alone is enough to reject the message. */
const VENDORS = ['claude', 'deepseek', 'chatgpt', 'copilot', 'anthropic', 'openai'];

const PATTERNS = [
  {
    name: 'ai vendor',
    pattern: new RegExp(`\\b(?:${VENDORS.join('|')})\\b`, 'i'),
  },
  {
    name: 'ai generation',
    pattern:
      /\b(?:ai[- ](?:assisted|generated|written|powered)|generated (?:by|with) (?:an? )?ai|written by ai|created by ai|co-authored-by:\s*(?:an? )?ai|by ai\b|with ai\b)/i,
  },
  {
    name: 'robot emoji',
    pattern: /\u{1F916}/u,
  },
];

export const FAILURE_MESSAGE = 'commit message must not mention AI';

/**
 * commitlint rule implementation.
 *
 * Returns `[valid, message]`; the message names the matched text so the author
 * can see what to remove.
 */
export function noAiMentions(parsed, when = 'always', value = true) {
  const text = [parsed.header, parsed.body, parsed.footer, parsed.raw]
    .filter((field) => typeof field === 'string' && field.length > 0)
    .join('\n');

  const hit = PATTERNS.map((entry) => ({
    name: entry.name,
    found: entry.pattern.exec(text),
  })).find((entry) => entry.found !== null);

  const clean = hit === undefined;
  const valid = value === false ? true : when === 'never' ? !clean : clean;
  if (clean) return [valid, FAILURE_MESSAGE];
  return [valid, `${FAILURE_MESSAGE} (found "${hit.found[0]}", an ${hit.name})`];
}

export default {
  rules: {
    'no-ai-mentions': noAiMentions,
  },
};
