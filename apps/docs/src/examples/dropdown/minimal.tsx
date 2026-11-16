'use client';

import { Dropdown, DropdownClose, DropdownContent, DropdownTrigger } from '@ho-dev/primitives';

import { useState } from 'react';

export function DropdownMinimal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        chevron
        className="border-stroke dark:border-dark-3 rounded-lg border px-4 py-2 text-sm font-medium"
      >
        Actions
      </DropdownTrigger>
      <DropdownContent align="start">
        <DropdownClose>
          <span className="block rounded px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5">
            Edit order
          </span>
        </DropdownClose>
      </DropdownContent>
    </Dropdown>
  );
}
