import { FaqToggleIcon } from "./FaqToggleIcon";
import type { FaqEntry } from "./faqContent";
import styles from "./FaqCategoryEntries.module.scss";

type FaqCategoryEntriesProps = {
  categoryId: string;
  entries: FaqEntry[];
};

export function FaqCategoryEntries({ categoryId, entries }: FaqCategoryEntriesProps) {
  const groupName = `qoves-faq-${categoryId}`;

  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <details key={entry.id} className={styles.entry} name={groupName} data-faq-entry>
          <summary className={styles.summary}>
            <span className={`body-2-medium ${styles.question}`}>{entry.question}</span>
            <FaqToggleIcon variant="entry" />
          </summary>
          <div className={styles.answerWrap}>
            <p className={`body-3-regular ${styles.answer}`}>{entry.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
