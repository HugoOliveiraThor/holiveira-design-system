'use client';

import { Dropdown, DropdownClose, DropdownContent, DropdownTrigger } from '@ho-dev/primitives';

import { useState } from 'react';

const actions = [
  { label: 'Open order', hint: 'View the full timeline' },
  { label: 'Duplicate', hint: 'Start from this order' },
  { label: 'Archive', hint: 'Hide it from the open list' },
];

export function DropdownRealistic() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-end">
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        <DropdownTrigger
          chevron
          className="border-stroke dark:border-dark-3 rounded-lg border px-4 py-2 text-sm font-medium"
        >
          Order actions
        </DropdownTrigger>
        <DropdownContent align="end">
          {actions.map((action) => (
            <DropdownClose key={action.label}>
              <span className="block rounded px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5">
                <span className="text-dark block text-sm font-medium dark:text-white">
                  {action.label}
                </span>
                <span className="text-dark-4 dark:text-dark-6 block text-xs">{action.hint}</span>
              </span>
            </DropdownClose>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
