import Link from "next/link";
import type { ReactNode } from "react";
import { legal } from "@/lib/legal";

export function LegalDocument({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="legal-document">
      <Link className="legal-back" href="/">← На главную МЕТА</Link>
      <header>
        <p className="eyebrow">Документы МЕТА</p>
        <h1>{title}</h1>
        <p className="legal-version">Проект от 18 сентября 2026 года</p>
      </header>
      <aside className="legal-draft" aria-label="Статус документа">
        <strong>Проект для проверки владельцем</strong>
        <p>
          Это проект документа для проверки владельцем. Перед публикацией нужно
          утвердить порядок получения согласия при обращении несовершеннолетнего
          и проверить текст с юристом. Эта редакция ещё не утверждена.
        </p>
      </aside>
      <article>{children}</article>
      <footer>
        <nav aria-label="Документы о персональных данных">
          <Link href="/privacy">Политика обработки данных</Link>
          <Link href="/consent">Согласие на обработку данных</Link>
        </nav>
        <p>{legal.operator} · {legal.address} · <a href={`mailto:${legal.email}`}>{legal.email}</a></p>
      </footer>
    </main>
  );
}
