import { vi, describe, it, expect } from 'vitest';

vi.mock('@ho-dev/db', () => ({ db: {} }));

import { roles } from './index';

describe('roles', () => {
  it('defines viewer role with read permissions', () => {
    expect(roles.viewer).toBeDefined();
  });

  it('defines editor role with read and create permissions', () => {
    expect(roles.editor).toBeDefined();
  });

  it('defines admin role with full permissions', () => {
    expect(roles.admin).toBeDefined();
  });

  it('contains exactly three roles', () => {
    expect(Object.keys(roles)).toHaveLength(3);
  });
});
