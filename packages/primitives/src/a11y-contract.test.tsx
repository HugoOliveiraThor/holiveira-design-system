import { cleanup, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { render } from './test-utils';

import {
  Dropdown,
  DropdownClose,
  DropdownContent,
  DropdownTrigger,
  Modal,
  NotificationBar,
  Switch,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './index';

afterEach(cleanup);

describe('Tabs — keyboard and ARIA contract', () => {
  function Demo() {
    const [value, setValue] = useState('one');
    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>
    );
  }

  it('links tabs to panels and supports ArrowRight navigation', () => {
    const { getAllByRole, getByRole } = render(<Demo />);
    const tabs = getAllByRole('tab');

    expect(tabs[0]).toHaveAttribute('aria-controls');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');

    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

    expect(getAllByRole('tab')[1]).toHaveAttribute('aria-selected', 'true');
    expect(getByRole('tabpanel')).toHaveTextContent('Panel two');
  });

  it('panel is labelled by its tab', () => {
    const { getAllByRole, getByRole } = render(<Demo />);
    const tab = getAllByRole('tab')[0];
    const panel = getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });
});

describe('Switch — accessible name', () => {
  it('uses the visible label as the accessible name', () => {
    const { getByRole } = render(<Switch label="Notifications" />);
    expect(getByRole('switch', { name: 'Notifications' })).toBeTruthy();
  });
});

describe('Dropdown — trigger and close semantics', () => {
  it('trigger defaults to type="button"', () => {
    const { getByRole } = render(
      <Dropdown isOpen={false} setIsOpen={() => {}}>
        <DropdownTrigger>Open menu</DropdownTrigger>
      </Dropdown>,
    );
    expect(getByRole('button', { name: 'Open menu' })).toHaveAttribute('type', 'button');
  });

  it('DropdownClose renders a real button', () => {
    const { getByRole } = render(
      <Dropdown isOpen={true} setIsOpen={() => {}}>
        <DropdownContent>
          <DropdownClose>Close menu</DropdownClose>
        </DropdownContent>
      </Dropdown>,
    );
    expect(getByRole('button', { name: 'Close menu' })).toBeInTheDocument();
  });
});

describe('NotificationBar — close affordance', () => {
  it('does not render a dead close button when onClose is absent', () => {
    const { queryByRole } = render(<NotificationBar title="Saved" />);
    expect(queryByRole('button', { name: /close notification/i })).toBeNull();
  });

  it('renders a close button when onClose is provided', () => {
    const { getByRole } = render(<NotificationBar title="Saved" onClose={() => {}} />);
    expect(getByRole('button', { name: /close notification/i })).toBeInTheDocument();
  });
});

describe('Table — header semantics', () => {
  it('TableHead defaults to scope="col"', () => {
    const { getByRole } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(getByRole('columnheader')).toHaveAttribute('scope', 'col');
  });
});

describe('Modal — focus management', () => {
  it('moves focus inside on open and closes on Escape', () => {
    const setIsOpen = vi.fn();
    const { getByRole } = render(
      <Modal isOpen={true} setIsOpen={setIsOpen}>
        <button>Inside modal</button>
      </Modal>,
    );

    expect(document.activeElement).toBe(getByRole('button', { name: 'Inside modal' }));

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
