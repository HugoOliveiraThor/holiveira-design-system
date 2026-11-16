import noAiMentionsPlugin from './commitlint/no-ai-mentions.mjs';

export default {
  extends: ['@commitlint/config-conventional'],
  plugins: [noAiMentionsPlugin],
  rules: {
    'no-ai-mentions': [2, 'always'],
  },
};
