"use client";

import { useEffect, useState } from "react";

export function LegalLinks() {
  const [links, setLinks] = useState<{ label: string; url: string }[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setLinks(data.links ?? []))
      .catch(() => {});
    return () => controller.abort();
  }, []);
  if (!links.length) return null;
  return (
    <nav className="legal-links" aria-label="Документы">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
