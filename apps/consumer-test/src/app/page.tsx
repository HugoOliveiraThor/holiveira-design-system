import Link from 'next/link';

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Consumer Test — HO Design System</h1>
      <p>Validation harness for published packages. Not a demo.</p>
      <nav>
        <ul>
          <li>
            <Link href="/ssr">SSR Validation</Link>
          </li>
          <li>
            <Link href="/rsc">RSC Validation</Link>
          </li>
          <li>
            <Link href="/charts">Charts</Link>
          </li>
          <li>
            <Link href="/forms">Forms</Link>
          </li>
          <li>
            <Link href="/theme">Theme</Link>
          </li>
          <li>
            <Link href="/layouts">Layouts</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
