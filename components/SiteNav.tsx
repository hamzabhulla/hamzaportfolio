"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
];

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);

  function handleMobileNavKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    closeMenu();
    menuToggleRef.current?.focus();
  }

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand" aria-label="Hamza Bhulla, home" onClick={closeMenu}>
          <span className="brand-mark">h<span>.</span></span>
          <span className="brand-name">Hamza Bhulla</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a href="#contact" className="nav-contact">
          Get in touch <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button
          ref={menuToggleRef}
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          onKeyDown={(event) => {
            if (event.key !== "Escape" || !menuOpen) return;
            event.preventDefault();
            closeMenu();
            menuToggleRef.current?.focus();
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-nav"
        hidden={!menuOpen}
        onKeyDown={handleMobileNavKeyDown}
      >
        <nav className="mobile-nav-sections" aria-label="Page sections">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}<ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
          <a href="#contact" onClick={closeMenu}>
            Contact<ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
