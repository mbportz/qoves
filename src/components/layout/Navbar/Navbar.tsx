"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container/Container";
import { cn } from "@/lib/utils/cn";
import styles from "./Navbar.module.scss";

const navLinks = [
  { href: "#analysis", label: "Analysis" },
  { href: "#faq", label: "FAQ" },
  { href: "#story", label: "Story" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.root}>
      <Container className={styles.inner}>
        <Link href="#top" className={cn("body-4-zagma", styles.logo)}>
          Qoves
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="visually-hidden">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <span className={styles.menuIcon} aria-hidden />
        </button>
        <nav
          id="primary-navigation"
          className={cn(styles.nav, menuOpen && styles.navOpen)}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("body-3-regular", styles.link)}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
