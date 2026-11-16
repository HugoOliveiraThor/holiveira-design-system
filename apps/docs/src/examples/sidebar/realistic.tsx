import { Sidebar, SidebarProvider } from '@ho-dev/layouts';

const sections = [
  { title: 'Overview', items: ['Dashboard', 'Analytics'] },
  { title: 'Sales', items: ['Orders', 'Customers', 'Refunds'] },
  { title: 'Workspace', items: ['Team', 'Settings'] },
];

export function SidebarRealistic() {
  return (
    <div className="border-stroke dark:border-dark-3 flex h-[420px] overflow-hidden rounded-lg border">
      <SidebarProvider>
        <Sidebar className="h-full" logo={<span className="text-sm font-bold">Holiveira Ops</span>}>
          <nav aria-label="Example navigation" className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-dark-4 dark:text-dark-6 px-3 pb-2 text-xs font-semibold uppercase">
                  {section.title}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="block rounded-lg px-3 py-2 text-sm font-medium"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
