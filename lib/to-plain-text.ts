import type { ReactNode } from "react";

/**
 * Plain-text version of a ReactNode, for the FAQPage schema.
 * Link (and other element) markup is stripped; only the text survives,
 * so the schema answer always matches the visible answer.
 */
export function toPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return toPlainText(
      (node as { props?: { children?: ReactNode } }).props?.children,
    );
  }
  return "";
}
