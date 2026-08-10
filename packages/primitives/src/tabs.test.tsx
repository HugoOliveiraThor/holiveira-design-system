import { cleanup, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './index';

afterEach(cleanup);

function TabsHarness() {
  const [tab, setTab] = useState('one');
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="one">Tab One</TabsTrigger>
        <TabsTrigger value="two">Tab Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content One</TabsContent>
      <TabsContent value="two">Content Two</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders triggers with tab role', () => {
    const { getAllByRole } = render(<TabsHarness />);
    expect(getAllByRole('tab').length).toBe(2);
  });

  it('marks active trigger aria-selected', () => {
    const { getAllByRole } = render(<TabsHarness />);
    expect(getAllByRole('tab')[0]).toHaveAttribute('aria-selected', 'true');
    expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('shows only the active content panel', () => {
    const { getByText, queryByText } = render(<TabsHarness />);
    expect(getByText('Content One')).toBeVisible();
    expect(queryByText('Content Two')).toBeNull();
  });

  it('switches content on trigger click', () => {
    const { getByRole, getByText, queryByText } = render(<TabsHarness />);
    fireEvent.click(getByRole('tab', { name: 'Tab Two' }));
    expect(getByText('Content Two')).toBeVisible();
    expect(queryByText('Content One')).toBeNull();
  });

  it('calls onValueChange with trigger value', () => {
    const onValueChange = vi.fn();
    function Controlled() {
      return (
        <Tabs value="one" onValueChange={onValueChange}>
          <TabsList>
            <TabsTrigger value="two">Tab Two</TabsTrigger>
          </TabsList>
          <TabsContent value="one">Content</TabsContent>
        </Tabs>
      );
    }
    const { getByRole } = render(<Controlled />);
    fireEvent.click(getByRole('tab', { name: 'Tab Two' }));
    expect(onValueChange).toHaveBeenCalledWith('two');
  });
});

describe('TabsList variants', () => {
  it('applies pills classes by default', () => {
    const { getAllByRole } = render(<TabsHarness />);
    const list = getAllByRole('tab')[0].closest('[role="tablist"]') as HTMLElement;
    expect(list).toHaveClass('bg-gray-100');
  });

  it('applies underline classes', () => {
    const { getAllByRole } = render(
      <Tabs value="one" onValueChange={() => {}}>
        <TabsList variant="underline">
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content</TabsContent>
      </Tabs>,
    );
    const tab = getAllByRole('tab')[0];
    expect(tab).toHaveClass('border-b-2');
    expect(tab).toHaveClass('border-brand-500');
  });

  it('applies vertical orientation classes', () => {
    const { getAllByRole } = render(
      <Tabs value="one" onValueChange={() => {}} orientation="vertical">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content</TabsContent>
      </Tabs>,
    );
    const list = getAllByRole('tab')[0].closest('[role="tablist"]') as HTMLElement;
    expect(list).toHaveClass('sm:flex-col');
  });
});
