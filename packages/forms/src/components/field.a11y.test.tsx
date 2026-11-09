import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Field } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('Field — accessible association', () => {
  it('associates label, description and error with the control', () => {
    const { getByLabelText } = render(
      <Field label="Full Name" description="Enter your full name" error="Required">
        <input />
      </Field>,
    );

    const input = getByLabelText('Full Name') as HTMLInputElement;
    const describedBy = input.getAttribute('aria-describedby');

    expect(describedBy).toBeTruthy();
    expect(input).toHaveAttribute('aria-invalid', 'true');

    const ids = describedBy!.split(' ');
    expect(document.getElementById(ids[0])?.textContent).toBe('Enter your full name');
    expect(document.getElementById(ids[1])?.textContent).toBe('Required');
  });
});
