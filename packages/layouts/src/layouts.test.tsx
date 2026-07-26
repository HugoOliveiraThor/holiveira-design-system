import { cleanup } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { afterEach } from 'vitest';

import { render } from './test-utils';

import { SidebarProvider, Sidebar, useSidebarContext } from './index';
import { Header, HeaderToggle, HeaderActions } from './index';

afterEach(cleanup);

function extractContextValue(ui: React.ReactElement) {
  let contextValue: any = null;
  const Consumer = () => {
    contextValue = useSidebarContext();
    return null;
  };
  render(
    <SidebarProvider>
      {ui}
      {<Consumer />}
    </SidebarProvider>,
  );
  return contextValue;
}

describe('SidebarProvider', () => {
  it('provides sidebar context', () => {
    const TestComponent = () => {
      const ctx = useSidebarContext();
      return <div data-testid="expanded">{ctx.expanded ? 'true' : 'false'}</div>;
    };

    const { getByTestId } = render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>,
    );
    expect(getByTestId('expanded')).toHaveTextContent('true');
  });

  it('starts collapsed when defaultCollapsed is true', () => {
    const TestComponent = () => {
      const ctx = useSidebarContext();
      return <div data-testid="collapsed">{ctx.collapsed ? 'true' : 'false'}</div>;
    };

    const { getByTestId } = render(
      <SidebarProvider defaultCollapsed>
        <TestComponent />
      </SidebarProvider>,
    );
    expect(getByTestId('collapsed')).toHaveTextContent('true');
  });
});

describe('Sidebar + Header composition', () => {
  it('renders sidebar and header together', () => {
    const { getByRole } = render(
      <SidebarProvider>
        <div className="flex">
          <Sidebar logo={<span>Logo</span>} />
          <Header>
            <HeaderToggle />
            <HeaderActions>
              <span>Actions</span>
            </HeaderActions>
          </Header>
        </div>
      </SidebarProvider>,
    );

    expect(getByRole('complementary')).toBeVisible();
  });
});
