import Link from "next/link";
import { Container } from "@/components/ui/Container/Container";
import styles from "./Footer.module.scss";

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "#analysis", label: "Facial analysis" },
      { href: "#philosophy", label: "How it works" },
      { href: "#faq", label: "FAQ" },
      { href: "#", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Research library" },
      { href: "#", label: "Aesthetic glossary" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Help center" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Qoves" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Press" },
      { href: "#", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Privacy policy" },
      { href: "#", label: "Terms of service" },
      { href: "#", label: "Cookie settings" },
      { href: "#", label: "Medical disclaimer" },
    ],
  },
] as const;

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "X" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "LinkedIn" },
] as const;

export function Footer() {
  return (
    <footer id="footer" className={styles.root}>
      <Container className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="#top" className={`heading-6 ${styles.logo}`}>
              Qoves
            </Link>
            <p className={`body-3-regular ${styles.tagline}`}>
              Science-backed facial analysis and personalized aesthetic guidance—built to
              help you improve with clarity, not guesswork.
            </p>
            <p className={`body-4 ${styles.note}`}>
              London · Remote-first · Est. 2019
            </p>
          </div>

          <div className={styles.columns}>
            {footerColumns.map((column) => (
              <div key={column.title} className={styles.column}>
                <p className={`body-4-zagma ${styles.columnTitle}`}>{column.title}</p>
                <ul className={styles.linkList}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={`body-3-regular ${styles.link}`}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.middle}>
          <div className={styles.newsletter}>
            <p className={`heading-7 ${styles.newsletterTitle}`}>Stay in the loop</p>
            <p className={`body-3-regular ${styles.newsletterCopy}`}>
              Occasional updates on new research, product features, and protocol tips. No
              spam—unsubscribe anytime.
            </p>
            <form className={styles.newsletterForm} action="#" method="post">
              <label className="visually-hidden" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                className={styles.newsletterInput}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <button type="submit" className={`body-3-regular ${styles.newsletterButton}`}>
                Subscribe
              </button>
            </form>
          </div>

          <div className={styles.contact}>
            <p className={`body-4-zagma ${styles.columnTitle}`}>Contact</p>
            <p className="body-3-regular">
              <a href="mailto:hello@qoves.com" className={styles.link}>
                hello@qoves.com
              </a>
            </p>
            <p className={`body-3-regular ${styles.contactMeta}`}>
              Support hours: Mon–Fri, 9am–6pm GMT
            </p>
            <p className={`body-3-regular ${styles.contactMeta}`}>
              42 Fitzroy Street, London W1T 4BQ
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={`body-4 ${styles.copyright}`}>
            © {new Date().getFullYear()} Qoves Ltd. All rights reserved.
          </p>
          <ul className={styles.socialList}>
            {socialLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={`body-4 ${styles.socialLink}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
