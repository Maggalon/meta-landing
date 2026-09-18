"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { navigation } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="wordmark"
          href="#top"
          aria-label="МЕТА, на главную"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          МЕТА<span className="wordmark-dot">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="header-cta"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          Обсудить следующий шаг
          <ArrowUpRightIcon size={17} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen(!open)}
        >
          {open ? <XIcon size={25} /> : <ListIcon size={25} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Мобильная навигация"
        hidden={!open}
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <ArrowUpRightIcon size={18} aria-hidden="true" />
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Обсудить следующий шаг
          <ArrowUpRightIcon size={18} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
