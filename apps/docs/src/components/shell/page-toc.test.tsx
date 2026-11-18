import '@testing-library/jest-dom/vitest';

import { act, cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PageToc } from './page-toc';

const TOC = [
  { id: 'installation', title: 'Installation' },
  { id: 'peer-dependencies', title: 'Peer dependencies' },
];

class FakeObserver {
  callback: IntersectionObserverCallback;
  observed: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    FakeObserver.instances.push(this);
  }

  static instances: FakeObserver[] = [];

  observe(target: Element) {
    this.observed.push(target);
  }

  disconnect() {
    this.observed = [];
  }

  trigger(entries: { id: string; top: number }[]) {
    this.callback(
      entries.map(
        (entry) =>
          ({
            isIntersecting: true,
            target: document.getElementById(entry.id),
            boundingClientRect: { top: entry.top } as DOMRect,
          }) as unknown as IntersectionObserverEntry,
      ),
      this as unknown as IntersectionObserver,
    );
  }
}

afterEach(() => {
  cleanup();
  FakeObserver.instances = [];
  vi.unstubAllGlobals();
});

describe('page toc', () => {
  it('renders nothing for a page with fewer than two sections', () => {
    render(<PageToc items={[{ id: 'installation', title: 'Installation' }]} />);
    expect(screen.queryByRole('navigation', { name: 'On this page' })).toBeNull();
  });

  it('lists the sections and marks the first one as the current position', () => {
    render(<PageToc items={TOC} />);
    const nav = screen.getByRole('navigation', { name: 'On this page' });
    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '#installation');
    expect(links[0]).toHaveAttribute('aria-current', 'location');
    expect(links[1]).not.toHaveAttribute('aria-current');
  });

  it('moves the current position to the section in view', () => {
    vi.stubGlobal('IntersectionObserver', FakeObserver);
    render(
      <>
        <h2 id="installation">Installation</h2>
        <h2 id="peer-dependencies">Peer dependencies</h2>
        <PageToc items={TOC} />
      </>,
    );
    const observer = FakeObserver.instances[0];
    expect(observer.observed.map((element) => element.id)).toEqual([
      'installation',
      'peer-dependencies',
    ]);

    act(() => {
      observer.trigger([{ id: 'peer-dependencies', top: 10 }]);
    });
    expect(screen.getByRole('link', { name: 'Peer dependencies' })).toHaveAttribute(
      'aria-current',
      'location',
    );
    expect(screen.getByRole('link', { name: 'Installation' })).not.toHaveAttribute('aria-current');
  });
});
