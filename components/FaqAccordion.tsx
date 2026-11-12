"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type FaqEntry = {
  question: string;
  answer: ReactNode;
};

/**
 * Real FAQ accordion: first item open by default, click a question to
 * expand or collapse it. Answers stay in the DOM when collapsed (hidden
 * attribute only), so the FAQPage schema always matches visible content.
 */
export default function FaqAccordion({ faqs }: { faqs: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <article
            className={"faq-item" + (isOpen ? " is-open" : "")}
            key={faq.question}
          >
            <h3>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-chevron" aria-hidden="true">
                  <ChevronDown size={16} />
                </span>
              </button>
            </h3>
            <p
              id={`faq-answer-${index}`}
              className="faq-answer"
              hidden={!isOpen}
            >
              {faq.answer}
            </p>
          </article>
        );
      })}
    </div>
  );
}
