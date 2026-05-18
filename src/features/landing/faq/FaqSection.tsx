import Image from "next/image";
import beforeAmbient from "@/assets/Before 5676.png";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { FaqCategoryEntries } from "./FaqCategoryEntries";
import { FaqCategoryPanel } from "./FaqCategoryPanel";
import { FaqToggleIcon } from "./FaqToggleIcon";
import { faqCategories, faqSectionContent } from "./faqContent";
import styles from "./FaqSection.module.scss";

export function FaqSection() {
  return (
    <section id="faq" className={styles.root}>
      <div className={styles.content}>
        <div className={styles.glowUp}>
          <SectionLabel
            className={styles.label}
            badge={faqSectionContent.badge}
            title={faqSectionContent.title}
            titleAccent={faqSectionContent.titleAccent}
            subtitle={faqSectionContent.subtitle}
            align="center"
          />

          <div className={styles.detailsContainer}>
            <nav className={styles.faqList} aria-label="FAQ categories">
              {faqCategories.map((category) => (
                <details
                  key={category.id}
                  className={styles.category}
                  name="qoves-faq"
                  data-faq-category
                >
                  <summary className={styles.categorySummary}>
                    <span className={`heading-8-medium ${styles.categoryTitle}`}>
                      {category.title}
                    </span>
                    <FaqToggleIcon variant="category" />
                  </summary>

                  <FaqCategoryPanel className={styles.categoryPanel}>
                    <div className={styles.ambient} aria-hidden>
                      <Image
                        className={styles.ambientImage}
                        src={beforeAmbient}
                        alt=""
                        width={444}
                        height={542}
                      />
                    </div>
                    <div className={styles.entriesGlass}>
                      <FaqCategoryEntries
                        categoryId={category.id}
                        entries={category.entries}
                      />
                    </div>
                  </FaqCategoryPanel>
                </details>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
